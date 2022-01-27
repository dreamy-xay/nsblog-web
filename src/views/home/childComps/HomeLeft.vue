<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-17 10:18:16
 * @LastEditors: continue-hs
 * @LastEditTime: 2022-01-27 21:13:04
-->
<template>
  <div class="home-left">
    <div class="home-left-top">
      <base-select-head
        :selectTag="listIndex"
        :selectTime="timeIndex"
        :type=false
        @changeTag="changeList"
        @changeSelect="changeTime"
      />
    </div>

    <div class="home-left-middle">
      <article-item
        v-for="article in allArticles[typeIndex]"
        :key="article"
        :articleItem="article"
        :swidth="660"
        @change-like="changeLike(article)"
      />
    </div>

    <div class="home-left-bottom">
      <div
        class="home-left-bottom-load"
        role="button"
        @click="uploadMore"
      >
        <div class="home-left-bottom-load-text">加载更多...</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMessage } from 'naive-ui';
import { mapGetters } from '@/util/store';
import { getArticles } from '@/network/api/articles';
import { defineComponent, reactive, ref, watch } from 'vue';
import ArticleItem from '@/views/tag/childComps/ArticleItem.vue';
import { modifyArticleRecommendEvaluation } from '@/network/api/articles';
import BaseSelectHead from '@/components/common/baseSelectHead/BaseSelectHead.vue';

export default defineComponent({
  name: 'homeLeft',
  props: {
    topic: {
      type: String,
      default: '推荐',
    },
    tag: {
      type: String,
      default: '',
    },
    isclick: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ArticleItem,
    BaseSelectHead,
  },
  setup(props) {
    const msg = useMessage();
    const listIndex = ref(0);
    const timeIndex = ref(0);
    const allArticles = reactive([[], [], [], [], [], []]);
    const topic = ref('推荐');
    const tag = ref('');
    const limit = ref(7);
    const typeIndex = ref(0);
    const { isLogin } = mapGetters('global', ['isLogin']); // 是否登录

    initArticlesHome('', '', '', 0, limit.value, 0, 0, topic.value, tag.value, typeIndex.value);

    watch(
      () => props.topic,
      (data) => {
        limit.value = 7;
        topic.value = data;
        tag.value = '';
        initArticlesHome('', '', '', 0, limit.value, 0, 0, topic.value, tag.value, typeIndex.value);
      }
    );

    watch(
      () => props.tag,
      (data) => {
        limit.value = 7;
        tag.value = data;
        initArticlesHome('', '', '', 0, limit.value, 0, 0, topic.value, tag.value, typeIndex.value);
      }
    );

    watch(
      () => props.isclick,
      (data) => {
        if (data === true) initArticlesHome('', '', '', 0, limit.value, 0, 0, topic.value, '', typeIndex.value);
      }
    );

    watch(
      () => listIndex.value,
      (data) => {
        typeIndex.value = data + timeIndex.value;
      }
    );

    watch(
      () => timeIndex.value,
      (data) => {
        typeIndex.value = data + listIndex.value;
      }
    );

    watch(
      () => typeIndex.value,
      (data) => {
        typeIndex.value = data;
        initArticlesHome('', '', '', 0, limit.value, 0, 0, topic.value, tag.value, typeIndex.value);
      }
    );

    function changeList(index) {
      listIndex.value = index.index;
    }

    function changeTime(index) {
      timeIndex.value = index.index;
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
          allArticles[type].splice(0, allArticles[type].length, ...res.articles);
        })
        .catch((error) => {
          console.log('initArticlesHomeError: ' + error);
        });
    }

    function uploadMore() {
      limit.value += 6;
      initArticlesHome('', '', '', 0, limit.value, 0, 0, topic.value, tag.value, typeIndex.value);
    }

    function changeLike(article) {
      if (isLogin.value) {
        const res = ref(0);
        if (article.recommend === 0) res.value = 1;
        modifyArticleRecommendEvaluation(article.id, res.value)
          .then(() => {
            article.recommend = res.value;
            if (res.value === 1) article.recommend_count++;
            else article.recommend_count--;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        msg.error('请先登录');
      }
    }

    return {
      listIndex,
      timeIndex,
      changeList,
      changeTime,
      allArticles,
      typeIndex,
      uploadMore,
      changeLike,
    };
  },
});
</script>

<style lang="scss" scoped>
.home-left {
  width: 700px;

  .home-left-top {
    height: 46px;
    @include flex(center);

    .home-left-top-list {
      margin: 16px;
      font-size: 14px;
      font-weight: 400;

      &.active {
        color: $green-1;
      }
    }
  }

  .home-left-line {
    height: 1px;
    border-bottom: 1px solid $grey-2;
  }

  .home-left-middle {
    margin: 12px 0 16px;
  }

  .home-left-bottom {
    width: 100%;
    @include flex(center, center);

    .home-left-bottom-load {
      width: 300px;
      height: 32px;
      background: $grey-0;
      border-radius: 8px;
      box-shadow: $shadow-0;
      @include flex(cneter, center);

      .home-left-bottom-load-text {
        margin-top: 7px;
        width: 68px;
        height: 19px;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
        color: $grey-9;
      }
    }
  }
}
</style>
