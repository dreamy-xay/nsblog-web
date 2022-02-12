<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-24 18:20:31
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-12 23:32:42
-->
<template>
  <base-view
    :background="true"
    :top-bar="true"
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
        </div>
      </div>
      <div class="bottom">
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
import { defineComponent, reactive, ref, watch } from 'vue';
import TagButton from '@/views/tag/childComps/TagButton.vue';
import ArticleItem from '@/views/tag/childComps/ArticleItem.vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import { modifyArticleRecommendEvaluation } from '@/network/api/articles';
import BaseSelectHead from '@/components/common/baseSelectHead/BaseSelectHead.vue';

export default defineComponent({
  name: 'tag',
  components: {
    TagTop,
    BaseView,
    TagButton,
    ArticleItem,
    BaseSelectHead,
  },
  setup() {
    const msg = useMessage(); // 'naive-ui'
    const route = useRoute(); // route
    const tagName = route.params.tagName;
    const listIndex = ref(0); //  选择 0:'综合', 1:'最新', 2:'热门'标签
    const timeIndex = ref(0); // 选择 0:'时间不限', 1:'最近一天', 2:'最近一周', 3:'最近三月'时间筛选
    const typeIndex = ref(0); // 记录类型，可点击加载更多
    const tagArticles = reactive([]); // 保存数据
    let limit = 7;
    const detail = reactive({
      name: '',
      remark: '',
      article_count: 0,
      attention_count: 0,
      attention: 0,
    });
    const { isLogin } = mapGetters('global', ['isLogin']); // 是否登录

    initArticlesTag('', '', '', 0, limit, 0, 0, '', tagName, listIndex.value);

    // 监听列表下标变化
    watch(
      () => listIndex.value,
      () => {
        tagArticles.splice(0, tagArticles.length);
        typeIndex.value = listIndex.value;
        initArticlesTag('', '', '', 0, limit, 0, 0, '', tagName, typeIndex.value);
      }
    );

    // 监听下拉框下标变化
    watch(
      () => timeIndex.value,
      () => {
        tagArticles.splice(0, tagArticles.length);
        typeIndex.value = timeIndex.value + 2;
        initArticlesTag('', '', '', 0, limit, 0, 0, '', tagName, typeIndex.value);
      }
    );

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
      getArticles(username, category, tag, offset, limit, release_time, browsing_count, topic_name, tag_name, type)
        .then((res) => {
          console.log(res);
          tagArticles.splice(tagArticles.length, 0, ...res.articles);
        })
        .catch((error) => {
          console.log('initArticlesHomeError: ' + error);
        });
    }

    /**
     * @description: 改变列表下标
     * @return {void}
     * @author: continue-hs
     */
    function changeList(index) {
      listIndex.value = index.index;
    }

    /**
     * @description: 改变下拉框下标
     * @return {void}
     * @author: continue-hs
     */
    function changeTime(index) {
      timeIndex.value = index.index;
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
      if (detail.attention === 1) {
        delUserTag(tagName)
          .then(() => {
            detail.attention = 0;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        addUserTag(tagName)
          .then(() => {
            detail.attention = 1;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    return {
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
        margin-bottom: 16px;
        padding-bottom: 12px;
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
      }
    }
  }
}
</style>
