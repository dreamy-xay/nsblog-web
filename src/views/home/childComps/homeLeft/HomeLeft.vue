<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-17 10:18:16
 * @LastEditors: continue-hs
 * @LastEditTime: 2022-01-23 17:00:17
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

    <div class="home-left-middle">
      <home-left-item
        v-for="article in allArticles[typeIndex]"
        :key="article"
        :articleItem="article"
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
import HomeLeftItem from '@/views/home/childComps/homeLeft/childComps/HomeLeftItem.vue';

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
  },
  components: {
    BaseSelect,
    HomeLeftItem,
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
        if (data === '推荐' || data === '关注') tag.value = '';
        topic.value = data;
        initArticlesHome('', '', '', offset.value, limit.value, 0, 0, topic.value, tag.value, typeIndex.value);
      }
    );

    watch(
      () => props.tag,
      (data) => {
        if (data === '全部') tag.value = '';
        else tag.value = data;
        initArticlesHome('', '', '', offset.value, limit.value, 0, 0, topic.value, tag.value, typeIndex.value);
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

    function clickTopic(topic) {
      router.push({
        name: router.name,
        query: {
          topic: topic,
        },
      });
    }

    function clickTag(tag) {
      router.push({
        name: router.name,
        query: {
          topic: topic,
          tag: tag,
        },
      });
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
      clickTopic,
      clickTag,
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

  .home-left-middle {
    margin: 20px;
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
