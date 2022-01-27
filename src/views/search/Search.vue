<!--
 * @Description: 搜索主页
 * @Version:
 * @Autor: Ban
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: Ban
 * @LastEditTime: 2022-01-25 19:44:48
-->

<template>
  <base-view
    :background="true"
    :top-bar="true"
    :top-bar-scroll="true"
    bind-class="search"
    :footer="true"
  >
    <template #top-bar-bottom>
      <div class="search-top-bar">
        <div class="search-top-bar-inner">
          <div class="left">
            <div
              class="topic"
              v-for="(item, index) in topics"
              :class="{'topic-active': topicActiveIndex === index}"
              :key="index"
              role="button"
              @click="clickTopic(index)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="search-content">
      <div class="search-content-left">
        <div
          class="loading"
          v-if="!loadingState[topicActiveIndex]"
        >
          <base-content-loading>
          </base-content-loading>
        </div>
        <router-view
          v-show="loadingState[topicActiveIndex]"
          @changeLoadingState="changeLoadingState"
          @changeActiveIndex="changeActiveIndex"
        >
        </router-view>

      </div>
      <div class="search-content-right">
        <base-rank-card title="热门搜索"></base-rank-card>
        <base-tag-card title="相关搜索"></base-tag-card>
      </div>
    </div>
  </base-view>
</template>

<script>
import { defineComponent, reactive, ref, watch } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import BaseContentLoading from '@/components/content/baseContentLoading/BaseContentLoading.vue';
import BaseRankCard from '@/components/common/baseRankCard/BaseRankCard.vue';
import BaseTagCard from '@/components/common/baseTagCard/BaseTagCard.vue';

/**
 * @description: 搜索主页
 * @author: Ban
 */

export default defineComponent({
  name: 'search',
  components: {
    BaseView,
    BaseContentLoading,
    BaseRankCard,
    BaseTagCard,
  },
  setup() {
    const loadingState = reactive([false, false, false, false, false, false, false]); // 数据获取状态

    const topics = [
      // 专题列表
      {
        name: '综合',
        path: 'comprehensive',
      },
      {
        name: '文章',
        path: 'article',
      },
      {
        name: '问答',
        path: 'question',
      },
      {
        name: '学习小组',
        path: 'group',
      },
      {
        name: '资源',
        path: 'resource',
      },
      {
        name: '标签',
        path: 'tag',
      },
      {
        name: '用户',
        path: 'user',
      },
    ];
    const topicActiveIndex = ref(0); // 专题激活
    const route = useRoute();
    const key = ref(route.query.value);

    /**
     * @description: 点击专题
     * @param {Number} index 专题索引号 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function clickTopic(index) {
      topicActiveIndex.value = index;
      router.push({ path: `/search/${topics[index].path}`, query: route.query });
    }

    /**
     * @description: 改变专题
     * @param {Number} index `索引`
     * @author: Ban
     */
    function changeActiveIndex(index) {
      topicActiveIndex.value = index;
    }

    /**
     * @description: 改变数据加载状态
     * @param {Number} index `索引`
     * @author: Ban
     */
    function changeLoadingState(index, state) {
      loadingState[index] = state;
      console.log(loadingState[index]);
    }

    return {
      topics,
      topicActiveIndex,
      clickTopic,
      loadingState,
      changeLoadingState,
      changeActiveIndex,
      key,
    };
  },
});
</script>

<style lang="scss" scoped>
.search-top-bar {
  width: 100%;
  height: 44px;
  @include flex(center, center);
  background-color: $grey-0;
  border-top: 1px solid $grey-3;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);

  .search-top-bar-inner {
    height: 100%;
    width: 1000px;
    @include flex(center, space-between);

    .left {
      height: 100%;
      @include flex(center, flex-start);

      .topic {
        margin: 0 12px;

        &:first-child {
          margin-left: 0;
        }

        &.topic-active {
          color: $green-1;
        }
      }
    }

    .left .topic {
      font-size: 15px;
      color: $grey-9;
      transition: 0.25s;

      &:hover {
        color: $green-0;
      }
    }
  }
}

:deep(.search) {
  @include flex(center, center, column);

  .search-content {
    height: 100%;
    width: 1000px;
    margin-top: 16px;
    @include flex(initial, space-between);

    .search-content-left {
      width: 700px;

      .loading {
        box-sizing: border-box;
        padding: 16px 24px;
        background: $grey-0;
      }
    }

    .search-content-right {
      width: 284px;
      height: 366px;
      background: #fff;
    }
  }
}
</style>
