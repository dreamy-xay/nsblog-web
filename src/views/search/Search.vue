<!--
 * @Description: 搜索主页
 * @Version:
 * @Autor: Ban
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: Ban
 * @LastEditTime: 2022-01-16 15:32:36
-->

<template>
  <base-view
    :background="true"
    :top-bar="true"
    :top-bar-scroll="true"
    bind-class="search"
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
        <router-view>

        </router-view>
      </div>
      <div class="search-content-right"></div>
    </div>
  </base-view>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import router from '@/router';

/**
 * @description: 搜索主页
 * @author: Ban
 */

export default defineComponent({
  name: 'search',
  components: {
    BaseView,
  },
  setup() {
    const topics = [
      // 专题列表
      {
        name: '综合',
      },
      {
        name: '文章',
      },
      {
        name: '问答',
      },
      {
        name: '学习小组',
      },
      {
        name: '资源',
      },
      {
        name: '标签',
        path: '/search/tag',
      },
      {
        name: '用户',
        path: '/search/user',
      },
    ];
    const topicActiveIndex = ref(5); // 专题激活

    /**
     * @description: 点击专题
     * @param {Number} index 专题索引号 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function clickTopic(index) {
      topicActiveIndex.value = index;
      router.push(topics[index].path);
    }

    return {
      topics,
      topicActiveIndex,
      clickTopic,
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

.search {
  height: 100%;
  width: 100%;
  overflow: hidden;

  .search-content {
    height: 100%;
    width: 1000px;
    margin-top: 16px;
    @include flex(initial, space-between);

    // .search-content-left {
    //   width: 700px;
    //   height: 500px;
    //   background: #fff;
    // }

    .search-content-right {
      width: 284px;
      height: 366px;
      background: #fff;
    }
  }
}
</style>
