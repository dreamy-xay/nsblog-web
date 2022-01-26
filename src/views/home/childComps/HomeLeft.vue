<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-17 10:18:16
 * @LastEditors: continue-hs
 * @LastEditTime: 2022-01-25 15:22:38
-->
<template>
  <div class="home-left">
    <div class="home-left-top">
      <div
        class="home-left-top-list"
        v-for="(item,index) in topList"
        :key="index"
        :class="{active:index === listIndex}"
        role="button"
        @click="changeList(index)"
      >
        {{item}}
      </div>
      <base-select
        v-if="listIndex === 2"
        :swidth="74"
        :spaddingTop="8"
        :spaddingLeft="10"
        :showText="selectTag"
        :sdata="timeList"
        @changeItem="changeTime($event)"
      />
    </div>
    <div class="home-left-line"></div>

    <div class="home-left-middle">
      <home-item
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
      >
        <div
          class="home-left-bottom-load-text"
          role="button"
          @click="uploadMore"
        >加载更多...</div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, watch } from 'vue';
import { getArticles } from '@/network/api/articles';
import BaseSelect from '@/components/content/baseSelect/BaseSelect.vue';
import router from '@/router';
import HomeItem from '@/views/home/childComps/HomeItem.vue';
import { modifyArticleRecommendEvaluation } from '@/network/api/articles';

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
    BaseSelect,
    HomeItem,
  },
  setup(props) {
    const topList = reactive(['热门', '最新', '排行']);
    const listIndex = ref(0);
    const timeList = reactive(['3天内', '7天内', '30天内', '全部']);
    const selectTag = ref('3天内');
    const timeIndex = ref(0);
    const allArticles = reactive([[], [], [], [], [], []]);

    const topic = ref('推荐');
    const tag = ref('');
    const offset = ref(0);
    const limit = ref(7);
    const typeIndex = ref(0);

    initArticlesHome('', '', '', offset.value, limit.value, 0, 0, topic.value, tag.value, typeIndex.value);

    watch(
      () => props.topic,
      (data) => {
        console.log(data + 'xx');
        limit.value = 7;
        topic.value = data;
        tag.value = '';
        initArticlesHome('', '', '', offset.value, limit.value, 0, 0, topic.value, tag.value, typeIndex.value);
      }
    );

    watch(
      () => props.tag,
      (data) => {
        console.log(data + 'xx');
        limit.value = 7;
        tag.value = data;
        initArticlesHome('', '', '', offset.value, limit.value, 0, 0, topic.value, tag.value, typeIndex.value);
      }
    );

    watch(
      () => props.isclick,
      (data) => {
        if (data === true)
          initArticlesHome('', '', '', offset.value, limit.value, 0, 0, topic.value, '', typeIndex.value);
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
        initArticlesHome('', '', '', offset.value, limit.value, 0, 0, topic.value, tag.value, typeIndex.value);
      }
    );

    function changeList(index) {
      listIndex.value = index;
    }

    function changeTime($event) {
      timeIndex.value = $event;
      selectTag.value = timeList[$event];
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
      initArticlesHome('', '', '', offset.value, limit.value, 0, 0, topic.value, tag.value, typeIndex.value);
    }

    function changeLike(article) {
      if (article.recommend === 0)
        modifyArticleRecommendEvaluation(article.id, 1)
          .then(() => {
            article.recommend = 1;
            article.recommend_count++;
          })
          .catch((error) => {
            console.log(error);
          });
      else if (article.recommend === 1)
        modifyArticleRecommendEvaluation(article.id, 0)
          .then(() => {
            article.recommend = 0;
            article.recommend_count--;
          })
          .catch((error) => {
            console.log(error);
          });
    }

    return {
      topList,
      listIndex,
      timeList,
      timeIndex,
      selectTag,
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
        color: #4bd8aa;
      }
    }
  }

  .home-left-line {
    height: 1px;
    border: 1px solid #f4f4f4;
  }

  .home-left-middle {
    margin: 12px 20px 16px;
  }

  .home-left-bottom {
    width: 100%;
    @include flex(center, center);

    .home-left-bottom-load {
      width: 300px;
      height: 32px;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.16);
      @include flex(cneter, center);

      .home-left-bottom-load-text {
        width: 68px;
        height: 19px;
        font-size: 14px;
        font-family: Arial, Arial-Regular;
        font-weight: 400;
        text-align: center;
        color: #595959;
      }
    }
  }
}
</style>
