<!--
 * @Description: 标签详细信息页面
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-24 18:20:31
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-16 15:23:04
-->
<template>
  <base-view
    :background="true"
    :top-bar="true"
    :back-top="true"
    :footer="true"
    bind-class="tag"
  >
    <div class="tag-container">
      <div class="top">
        <tag-top :detail="detail" />
      </div>
      <div class="middle">
        <div class="middle-top">
          <base-select-head
            :selectTag="listIndex"
            :selectTime="timeIndex"
            :type="false"
            @changeTag="changeList"
            @changeSelect="changeTime"
            :style="{width : '100%'}"
          />
          <div
            class="middle-top-button"
            v-if="isLogin"
          >
            <tag-button
              :attention="detail.attention"
              @click-attention="clickAttention"
            />
          </div>
        </div>
        <div class="middle-article">
          <article-item
            :articleItem="tagArticles"
            @change-like="changeLike($event)"
          />

          <base-content-loading
            v-show="showContentLoading"
            :style="{padding: '16px  0 4px 0', borderTop: tagArticles.length ? `1px solid ${styles.grey4}` : 0}"
          />
        </div>

      </div>

      <div
        class="bottom"
        v-if="showButton && !showContentLoading"
      >
        <div
          class="bottom-load"
          role="button"
          @click="uploadMore"
        >
          <div class="bottom-load-text">
            加载更多...
          </div>
        </div>
      </div>
    </div>

  </base-view>
</template>

<script>
import { useMessage } from 'naive-ui';
import { useRoute } from 'vue-router';
import { mapGetters } from '@/util/store';
import { getTagDetails } from '@/network/api/topics';
import { getArticles } from '@/network/api/articles';
import TagTop from '@/views/tag/childComps/TagTop.vue';
import { addUserTag, delUserTag } from '@/network/api/user';
import { defineComponent, reactive, ref } from 'vue';
import TagButton from '@/views/tag/childComps/TagButton.vue';
import ArticleItem from '@/views/tag/childComps/ArticleItem.vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import { modifyArticleRecommendEvaluation } from '@/network/api/articles';
import BaseSelectHead from '@/components/common/baseSelectHead/BaseSelectHead.vue';
import BaseContentLoading from '@/components/content/baseContentLoading/BaseContentLoading.vue';
import styles from '@/assets/style/define.scss';

/**
 * @description: 标签详细信息页面
 * @author: Z_Y_C
 */
export default defineComponent({
  name: 'tag',
  components: {
    TagTop,
    BaseView,
    TagButton,
    ArticleItem,
    BaseSelectHead,
    BaseContentLoading,
  },
  setup() {
    const msg = useMessage(); // 'naive-ui'
    const route = useRoute(); // route
    const tagName = route.params.tagName;
    const listIndex = ref(0); //  选择 0:'综合', 1:'最新', 2:'热门'标签
    const timeIndex = ref(0); // 选择 0:'时间不限', 1:'最近一天', 2:'最近一周', 3:'最近三月'时间筛选
    const typeIndex = ref(0); // 记录类型，可点击加载更多
    const tagArticles = reactive([]); // 保存数据
    const showButton = ref(false); // 显示加载更多按钮
    const limit = 7;
    const showContentLoading = ref(false); // 是否显示加载内容过渡
    const detail = reactive({
      name: '',
      remark: '',
      article_count: 0,
      attention_count: 0,
      attention: 0,
    });
    const { isLogin } = mapGetters('global', ['isLogin']); // 是否登录

    initArticlesTag('', '', '', 0, limit, 0, 0, '', tagName, listIndex.value);

    /**
     * @description: 获取文章详情
     * @return {void}
     * @author: continue-hs
     */
    getTagDetails(tagName)
      .then((res) => {
        detail.name = res.name;
        detail.remark = res.remark;
        detail.article_count = res.article_count;
        detail.attention_count = res.attention_count;
        detail.attention = res.attention;
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取文章详情失败');
      });

    /**
     * @description: 初始化文章列表
     * @return {void}
     * @author: continue-hs
     */
    function initArticlesTag(
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
      showButton.value = true;
      getArticles(username, category, tag, offset, limit, release_time, browsing_count, topic_name, tag_name, type, {
        beforeRequest() {
          showContentLoading.value = true;
        },
        afterResopnse() {
          showContentLoading.value = false;
        },
      })
        .then((res) => {
          showButton.value = limit === res.articles.length;
          tagArticles.splice(tagArticles.length, 0, ...res.articles);
        })
        .catch((error) => {
          console.log(error);
          msg.error('获取文章信息失败');
        });
    }

    /**
     * @description: 改变列表下标
     * @return {void}
     * @author: continue-hs
     */
    function changeList(index) {
      listIndex.value = index.index;
      tagArticles.splice(0, tagArticles.length);
      typeIndex.value = listIndex.value;
      initArticlesTag('', '', '', 0, limit, 0, 0, '', tagName, typeIndex.value);
    }

    /**
     * @description: 改变下拉框下标
     * @return {void}
     * @author: continue-hs
     */
    function changeTime(index) {
      timeIndex.value = index.index;
      tagArticles.splice(0, tagArticles.length);
      typeIndex.value = timeIndex.value + 2;
      initArticlesTag('', '', '', 0, limit, 0, 0, '', tagName, typeIndex.value);
    }

    /**
     * @description: 改变文章点赞情况
     * @return {void}
     * @author: continue-hs
     */
    function changeLike(e) {
      if (isLogin.value) {
        let res = tagArticles[e.index].recommend ? 0 : 1;
        modifyArticleRecommendEvaluation(tagArticles[e.index].id, res)
          .then(() => {
            tagArticles[e.index].recommend = res;
            if (res === 1) tagArticles[e.index].recommend_count++;
            else tagArticles[e.index].recommend_count--;
          })
          .catch((error) => {
            console.log(error);
            if (res == 1) msg.success('点赞失败');
            else msg.error('取消失败');
          });
      } else {
        msg.error('请先登录');
      }
    }

    /**
     * @description: 加载更多
     * @return {void}
     * @author: continue-hs
     */
    function uploadMore() {
      initArticlesTag('', '', '', tagArticles.length, limit, 0, 0, '', tagName, typeIndex.value);
    }

    /**
     * @description: 改变标签关注情况
     * @return {void}
     * @author: continue-hs
     */
    function clickAttention() {
      if (detail.attention) {
        delUserTag(tagName)
          .then(() => {
            detail.attention = 0;
            msg.success('取消关注成功');
          })
          .catch((error) => {
            console.log(error);
            msg.error('取消关注失败');
          });
      } else {
        addUserTag(tagName)
          .then(() => {
            detail.attention = 1;
            msg.success('关注成功');
          })
          .catch((error) => {
            console.log(error);
            msg.error('关注失败');
          });
      }
    }
    return {
      styles,
      detail,
      isLogin,
      listIndex,
      timeIndex,
      tagArticles,
      changeList,
      changeTime,
      changeLike,
      uploadMore,
      clickAttention,
      showButton,
      showContentLoading,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.tag) {
  @include flex(center, center, column);

  .tag-container {
    width: 1000px;
    margin-bottom: 6px;

    .top {
      background: $grey-0;
      border-radius: 8px;
      margin-top: 16px;
      box-shadow: $shadow-0;
      @include flex(initial, center);
    }

    .middle {
      margin-top: 16px;
      background: $grey-0;
      border-radius: 8px;
      box-shadow: $shadow-0;

      .middle-top {
        @include flex(center);
        position: relative;

        .middle-top-button {
          position: absolute;
          right: 20px;
        }
      }

      .middle-article {
        padding-bottom: 12px;
        margin: 0 20px 10px 20px;
      }
    }

    .bottom {
      width: 100%;
      @include flex(initial, center);

      .bottom-load {
        width: 300px;
        height: 32px;
        background: $grey-0;
        border-radius: 8px;
        box-shadow: $shadow-0;
        @include flex(cneter, center);

        .bottom-load-text {
          width: 68px;
          height: 19px;
          font-size: 14px;
          font-weight: 400;
          text-align: center;
          color: $grey-9;
          margin-top: 7px;
        }

        &:hover {
          background: $grey-1;
        }
      }
    }
  }
}
</style>
