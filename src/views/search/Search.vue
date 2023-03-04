<!--
 * @Description: 搜索主页
 * @Version:
 * @Autor: Ban
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-03 15:29:49
-->

<template>
  <base-view
    :background="true"
    :top-bar="true"
    :back-top="true"
    :top-bar-scroll="true"
    bind-class="search"
    :footer="true"
    ref="view"
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
        <router-view
          @changeActiveIndex="changeActiveIndex"
          v-slot="{Component}"
        >
          <component :is="Component"></component>
        </router-view>
      </div>
      <div class="search-content-right">
        <base-rank-card
          :loading="searchListLoading"
          title="热门搜索"
          :data="searchList"
        ></base-rank-card>
        <base-tag-card
          :loading="searchAboutLoading"
          title="相关搜索"
          :tags="searchAbout"
          :hotIcon="false"
        ></base-tag-card>
      </div>
    </div>
  </base-view>
</template>

<script>
import { defineComponent, reactive, ref, watch } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import BaseRankCard from '@/components/common/baseRankCard/BaseRankCard.vue';
import BaseTagCard from '@/components/common/baseTagCard/BaseTagCard.vue';
import { searchAbout as getSearchAbout } from '@/network/api/search';
import { getSearchList } from '@/network/api/list';
import { useMessage } from 'naive-ui';

/**
 * @description: 搜索主页
 * @author: Ban
 */

export default defineComponent({
  name: 'search',
  components: {
    BaseView,
    BaseRankCard,
    BaseTagCard,
  },
  setup() {
    // 热门搜索数据
    const searchList = reactive([]);
    // 热门搜索是否显示加载状态
    const searchListLoading = ref(false);
    // 相关搜索数据
    const searchAbout = reactive([]);
    // 相关搜索是否显示加载状态
    const searchAboutLoading = ref(false);
    const msg = useMessage();
    const view = ref(null); // base-view

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
    const route = useRoute(); // 路由
    let key = route.query.keyword; // 搜索关键字

    /**
     * @description: 获取热门搜索
     * @author: Ban
     */

    function getSearchListData() {
      getSearchList({
        beforeRequest() {
          searchListLoading.value = true;
        },
        afterResponse() {
          searchListLoading.value = false;
        },
      })
        .then((data) => {
          searchList.splice(0, searchList.length);
          data.search.forEach((item) => {
            searchList.push({
              title: item,
              url: ``,
            });
          });
        })
        .catch((error) => {
          console.log(error);
          msg.error('获取热门搜索失败');
        });
    }
    // 初始化
    getSearchListData();

    /**
     * @description: 获取相关搜索
     * @author: Ban
     */

    function getSearchAboutData() {
      getSearchAbout(
        key,
        {
          beforeRequest() {
            searchAboutLoading.value = true;
          },
        },
        {
          afterResponse() {
            searchAboutLoading.value = false;
          },
        }
      )
        .then((data) => {
          searchAbout.splice(0, searchAbout.length);
          data.about.forEach((item) => {
            searchAbout.push({
              name: item,
              url: ``,
            });
          });
          searchAboutLoading.value = false;
          // console.log(data);
          // console.log(searchAbout);
        })
        .catch((error) => {
          console.log(error);
          msg.error('获取相关搜索失败');
        });
    }
    // 初始化
    getSearchAboutData();

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
      view.value.setScrollTop(true);
    }

    // 监听关键字改变相关搜索
    watch(
      () => route.query.keyword,
      () => {
        key = route.query.keyword;
        getSearchAboutData();
      }
    );

    return {
      topics,
      topicActiveIndex,
      clickTopic,
      changeActiveIndex,
      searchList,
      searchListLoading,
      searchAbout,
      searchAboutLoading,
      view,
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
      margin-bottom: 6px;

      .loading {
        box-sizing: border-box;
        padding: 16px 24px;
        background: $grey-0;
      }
    }

    .search-content-right {
      .base-rank-card {
        margin-bottom: 16px;
      }
    }
  }
}
</style>
