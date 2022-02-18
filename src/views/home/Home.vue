<!--
 * @Description: 博客主页
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: Ban
 * @LastEditTime: 2022-02-18 20:15:03
-->
<template>
  <base-view
    :background="true"
    :top-bar="true"
    :top-bar-scroll="true"
    :footer="true"
    :back-top="true"
    bind-class="home"
    ref="view"
  >
    <template #top-bar-bottom>
      <base-topic-bar
        @selectTag="selectTag"
        @selectTopic="selectTopic"
        @selectTopicTag="selectTopicTag"
      />
    </template>
    <base-topic-tags />
    <div class="home-container">
      <div class="left">
        <home-left
          :all-articles="allArticles"
          :list-index="listIndex"
          :time-index="timeIndex"
          :show-content-loading="showContentLoading"
          @change-list="changeList($event)"
          @change-time="changeTime($event)"
          @change-like="changeLike($event)"
        />
        <div
          class="button"
          role="button"
          v-show="showButton && !showContentLoading"
          @click="uploadMore(false)"
        >加载更多...</div>

      </div>

      <div class="right">
        <home-right />
      </div>
    </div>
  </base-view>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import HomeLeft from '@/views/home/childComps/HomeLeft.vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import HomeRight from '@/views/home/childComps/homeRight/HomeRight.vue';
import BaseTopicBar from '@/components/common/baseTopicBar/BaseTopicBar.vue';
import BaseTopicTags from '@/components/common/baseTopicBar/BaseTopicTags.vue';
import { useMessage } from 'naive-ui';
import { mapGetters } from '@/util/store';
import { getArticles } from '@/network/api/articles';
import { modifyArticleRecommendEvaluation } from '@/network/api/articles';

/**
 * @description: 博客主页
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'home',
  components: {
    BaseView,
    BaseTopicBar,
    BaseTopicTags,
    HomeLeft,
    HomeRight,
  },
  setup() {
    const topicSelect = ref('推荐'); // 记录当前专题
    const tagSelect = ref(''); // 记录当前标签
    const msg = useMessage(); // 'naive-ui';
    const listIndex = ref(0); // 记录 0:'综合', 1:'最新', 2:'热门'标签
    const timeIndex = ref(0); // 记录 0:'时间不限', 1:'最近一天', 2:'最近一周', 3:'最近三月'时间筛选
    const allArticles = reactive([]); // 记录数据
    const limit = 7; // 获取信息长度
    const typeIndex = ref(0); // 获取信息类型
    const showButton = ref(false); // 显示加载更多按钮
    const showContentLoading = ref(true); // 是否显示加载内容过渡
    const view = ref(null); // base-view

    const { isLogin } = mapGetters('global', ['isLogin']); // 是否登录

    /**
     * @description: 加载更多数据
     * @param {boolean} topTop 是否回顶部 `默认为true`
     * @return {void}
     * @author: Z_Y_C
     */
    function uploadMore(topTop = true) {
      if (view.value && topTop) view.value.setScrollTop(true);
      getArticles(
        '',
        '',
        '',
        allArticles.length,
        limit,
        0,
        0,
        ['推荐', '关注'].includes(topicSelect.value) ? '' : topicSelect.value,
        tagSelect.value,
        typeIndex.value,
        {
          beforeRequest() {
            showContentLoading.value = true;
          },
          afterResponse() {
            showContentLoading.value = false;
          },
        }
      )
        .then((res) => {
          showButton.value = res.articles.length === limit;
          allArticles.splice(allArticles.length, 0, ...res.articles);
          showButton.value = true;
        })
        .catch((error) => {
          console.log(error);
          msg.error('获取文章信息失败');
        });
    }

    /**
     * @description: 改变文章点赞情况
     * @param {object} e 数据下标e.index
     * @return {void}
     * @author: Z_Y_C
     */
    function changeLike(e) {
      if (isLogin.value) {
        let res = allArticles[e.index].recommend ? 0 : 1;
        modifyArticleRecommendEvaluation(allArticles[e.index].id, res)
          .then(() => {
            allArticles[e.index].recommend = res;
            if (res === 1) allArticles[e.index].recommend_count++;
            else allArticles[e.index].recommend_count--;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        msg.error('请先登录');
      }
    }

    /**
     * @description: 选择了专题
     * @param {string} topic 专题名
     * @return {void}
     * @author: dreamy-xay
     */
    function selectTopic(topic) {
      tagSelect.value = '';
      topicSelect.value = topic;
      allArticles.splice(0, allArticles.length);
      uploadMore();
    }

    /**
     * @description: 选择了标签
     * @param {string} top 标签名
     * @return {void}
     * @author: dreamy-xay
     */
    function selectTag(tag) {
      tagSelect.value = tag;
      allArticles.splice(0, allArticles.length);
      uploadMore();
    }

    /**
     * @description: 选择专题标签
     * @param {string} topic 专题名 `必传参数`
     * @param {string} tag 标签名 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function selectTopicTag(topic, tag) {
      tagSelect.value = tag;
      topicSelect.value = topic;
      allArticles.splice(0, allArticles.length);
      uploadMore();
    }

    /**
     * @description: 选择 0:'综合', 1:'最新', 2:'热门'标签
     * @param {object} e e.index
     * @return {void}
     * @author: Z_Y_C
     */
    function changeList(e) {
      if (e.index !== listIndex.value) {
        listIndex.value = e.index;
        allArticles.splice(0, allArticles.length);
        typeIndex.value = listIndex.value;
        uploadMore();
      }
    }

    /**
     * @description: 选择 0:'时间不限', 1:'最近一天', 2:'最近一周', 3:'最近三月'时间筛选
     * @param {object} e e.index
     * @return {void}
     * @author: Z_Y_C
     */
    function changeTime(e) {
      if (timeIndex.value !== e.index) {
        timeIndex.value = e.index;
        allArticles.splice(0, allArticles.length);
        typeIndex.value = timeIndex.value + 2;
        uploadMore();
      }
    }

    return {
      selectTopic,
      selectTag,
      selectTopicTag,
      listIndex,
      timeIndex,
      allArticles,
      uploadMore,
      changeLike,
      topicSelect,
      tagSelect,
      changeList,
      changeTime,
      showButton,
      showContentLoading,
      view,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.home) {
  @include flex(center, center, column);

  .home-container {
    width: 1000px;
    margin-top: 16px;
    margin-bottom: 6px;
    @include flex(initial, space-between);

    .left {
      width: 700px;
      @include flex(center, initial, column);

      .button {
        @include flex(center, center);
        height: 32px;
        margin-top: 10px;
        width: 300px;
        border-radius: $border-radius-0;
        box-shadow: $shadow-0;
        background-color: $grey-0;

        transition: 0.25s;

        &:hover {
          background: $grey-1;
        }
      }
    }

    .right {
      width: 284px;
    }
  }
}
</style>
