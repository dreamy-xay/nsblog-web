<!--
 * @Description: 博客主页
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-13 13:30:23
-->
<template>
  <base-view
    :background="true"
    :top-bar="true"
    :top-bar-scroll="true"
    :footer="true"
    :back-top="true"
    bind-class="home"
  >
    <template #top-bar-bottom>
      <base-topic-bar
        @selectTag="selectTag"
        @selectTopic="selectTopic"
      />
    </template>
    <base-topic-tags
      @selectTag="selectTag"
      @selectTopic="selectTopic"
    />
    <div class="home-container">
      <div class="left">
        <home-left
          :all-articles="allArticles"
          :list-index="listIndex"
          :time-index="timeIndex"
          @change-list="changeList($event)"
          @change-time="changeTime($event)"
        />

        <div
          class="button"
          role="button"
          v-show="true"
          @click="uploadMore()"
        >加载更多...</div>

      </div>

      <div class="right">
        <home-right />
      </div>
    </div>
  </base-view>
</template>

<script>
import { defineComponent, reactive, ref, watch } from 'vue';
import HomeLeft from '@/views/home/childComps/HomeLeft.vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import HomeRight from '@/views/home/childComps/homeRight/HomeRight.vue';
import BaseTopicBar from '@/components/common/baseTopicBar/BaseTopicBar.vue';
import BaseTopicTags from '@/components/common/baseTopicBar/BaseTopicTags.vue';
import { useMessage } from 'naive-ui';
import { mapGetters } from '@/util/store';
import { getArticles } from '@/network/api/articles';
import { modifyArticleRecommendEvaluation } from '@/network/api/articles';

// import BaseContentLoading from '@/components/content/baseContentLoading/BaseContentLoading.vue';

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
    const topicSelect = ref('');
    const tagSelect = ref('');
    const isClick = ref(false);
    const msg = useMessage();
    const listIndex = ref(0);
    const timeIndex = ref(0);
    const allArticles = reactive([]);
    const topic = ref('推荐');
    const tag = ref('');
    const limit = ref(7);
    const typeIndex = ref(0);
    const { isLogin } = mapGetters('global', ['isLogin']); // 是否登录

    initArticlesHome('', '', '', 0, limit.value, 0, 0, topic.value, tag.value, typeIndex.value);

    watch(
      () => topic.value,
      (data) => {
        topic.value = data;
        tag.value = '';
        allArticles.splice(0, allArticles.length);
        initArticlesHome('', '', '', allArticles.length, limit.value, 0, 0, topic.value, tag.value, typeIndex.value);
      }
    );

    watch(
      () => tag.value,
      (data) => {
        tag.value = data;
        topic.value = '';
        allArticles.splice(0, allArticles.length);
        initArticlesHome('', '', '', allArticles.length, limit.value, 0, 0, topic.value, tag.value, typeIndex.value);
      }
    );

    watch(
      () => isClick.value,
      (data) => {
        if (data === true) initArticlesHome('', '', '', 0, limit.value, 0, 0, topic.value, '', typeIndex.value);
      }
    );

    watch(
      () => listIndex.value,
      () => {
        allArticles.splice(0, allArticles.length);
        typeIndex.value = listIndex.value;

        initArticlesHome('', '', '', allArticles.length, limit.value, 0, 0, topic.value, tag.value, typeIndex.value);
      }
    );

    watch(
      () => timeIndex.value,
      () => {
        allArticles.splice(0, allArticles.length);
        typeIndex.value = 2 + timeIndex.value;
        initArticlesHome('', '', '', allArticles.length, limit.value, 0, 0, topic.value, tag.value, typeIndex.value);
      }
    );

    function changeList(e) {
      console.log(e.index);
      listIndex.value = e.index;
      console.log('ppppppppp' + listIndex.value);
    }

    function changeTime(e) {
      timeIndex.value = e.index;
      console.log('vvvvvv' + timeIndex.value);
    }

    function initArticlesHome(
      username,
      category,
      tag,
      offset,
      limit,
      release_time,
      browsing_count,
      topic_name,
      tag_name,
      type
    ) {
      getArticles(username, category, tag, offset, limit, release_time, browsing_count, topic_name, tag_name, type)
        .then((res) => {
          allArticles.splice(allArticles.length, 0, ...res.articles);
        })
        .catch((error) => {
          console.log('initArticlesHomeError: ' + error);
        });
    }

    function uploadMore() {
      initArticlesHome('', '', '', allArticles.length, limit.value, 0, 0, topic.value, tag.value, typeIndex.value);
    }

    /**
     * @description: 改变文章点赞情况
     * @return {void}
     * @author: continue-hs
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
      if (topicSelect.value === topic) isClick.value = true;
      else {
        topicSelect.value = topic;
        isClick.value = false;
      }
      console.log(`select Topic: ${topic}`);
    }

    /**
     * @description: 选择了标签
     * @param {string} topic 专题名
     * @return {void}
     * @author: dreamy-xay
     */
    function selectTag(tag) {
      tagSelect.value = tag;
      isClick.value = false;
      console.log(`select Tag: ${tag}`);
    }

    return {
      selectTopic,
      selectTag,
      listIndex,
      timeIndex,
      changeList,
      changeTime,
      allArticles,
      typeIndex,
      uploadMore,
      changeLike,
      topicSelect,
      tagSelect,
      isClick,
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
