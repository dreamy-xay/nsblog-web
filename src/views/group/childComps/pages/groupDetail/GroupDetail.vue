<!--
 * @Description: 学习小组详情页
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-29 14:37:16
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-12 14:07:34
-->
<template>
  <base-view
    :background="true"
    :top-bar="true"
    :top-bar-scroll="true"
    :footer="true"
    :footer-show-all="false"
    bind-class="group-detail"
  >
    <template #top-bar-bottom>
      <div class="group-detail-top-bar">
        <div class="inner">
          <div
            class="item"
            v-for="(item, index) in menuList"
            :key="index"
            :class="{'item-active': index === activeIndex}"
            role="button"
            @click="clickMenuItem(index)"
          >
            <div class="icon">
              <i
                class="iconfont"
                :class="item.icon"
              ></i>
            </div>
            {{ item.name }}
          </div>
        </div>
      </div>
    </template>
    <div class="group-detail-body">
      <div class="left">
        <router-view v-slot="{ Component }">
          <!-- 将页面数据缓存 -->
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
      <div class="right">
        <div
          class="create-solicitation"
          role="button"
          @click="releaseSolicitation"
        >
          <div class="create-solicitation-inner">
            <div class="icon">
              <i class="iconfont blog-zhiling"></i>
            </div>
            发布征集令
          </div>
        </div>
        <group-solicitation-popover v-model="showSolicitation" />
        <group-detail-info />
        <base-rank-card
          :menu-list="['最近', '长期']"
          title="活跃用户"
          :data="userRankingList"
          :data-key="['username', 'nickname', 'avatar', 'count']"
          :is-user="true"
          :style="{marginTop: '16px'}"
          @clickMenuItem="rankCardClickMenuItem"
        />
      </div>
    </div>
  </base-view>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import BaseRankCard from '@/components/common/baseRankCard/BaseRankCard.vue';
import GroupSolicitationPopover from '@/views/group/childComps/pages/groupDetail/childComps/GroupSolicitationPopover.vue';
import GroupDetailInfo from '@/views/group/childComps/pages/groupDetail/childComps/GroupDetailInfo.vue';
import router from '@/router';

/**
 * @description: 学习小组详情页
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'groupDetail',
  components: {
    BaseView,
    BaseRankCard,
    GroupSolicitationPopover,
    GroupDetailInfo,
  },
  setup() {
    const activeIndex = ref(0); // 当前菜单激活索引

    const menuList = [
      // 菜单列表
      {
        icon: 'blog-wenzhang2',
        name: '文章',
        routerName: 'groupDetailArticle',
      },
      {
        icon: 'blog-wenda',
        name: '问答',
        routerName: 'groupDetailQuestion',
      },
      {
        icon: 'blog-wodeziyuan',
        name: '资源',
        routerName: 'groupDetailResource',
      },
      {
        icon: 'blog-shixishengzhaomu',
        name: '征集令',
        routerName: 'groupDetailSolicitation',
      },
      {
        icon: 'blog-ren',
        name: '用户',
        routerName: 'groupDetailUser',
      },
    ];

    /**
     * @description: 点击菜单切换
     * @param {number} index 点击菜单列表索引 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function clickMenuItem(index) {
      activeIndex.value = index;
      router.push({ name: menuList[index].routerName });
    }

    const showSolicitation = ref(false); // 是否显示发布征集令弹框

    /**
     * @description: 点击弹出发布征集令的弹框
     * @return {void}
     * @author: dreamy-xay
     */
    function releaseSolicitation() {
      showSolicitation.value = true;
    }

    // 用户活跃排名列表
    const userRankingList = reactive([
      {
        username: 'dreamy',
        nickname: '启航~ o(*￣▽￣*)o',
        avatar: 'https://dummyimage.com/150x150/234567/FFFFFF.png?text=dreamy',
        count: 1354,
      },
      {
        username: 'us1',
        nickname: '幻墨如烟',
        avatar: 'https://dummyimage.com/150x150/234567/FFFFFF.png?text=us1',
        count: 1210,
      },
      {
        username: 'us2',
        nickname: '红梅千雪',
        avatar: 'https://dummyimage.com/150x150/234567/FFFFFF.png?text=us2',
        count: 982,
      },
      {
        username: 'us3',
        nickname: 'ζ街挽',
        avatar: 'https://dummyimage.com/150x150/234567/FFFFFF.png?text=us3',
        count: 570,
      },
      {
        username: 'us4',
        nickname: '浊酒倾觞',
        avatar: 'https://dummyimage.com/150x150/234567/FFFFFF.png?text=us4',
        count: 113,
      },
      {
        username: 'us5',
        nickname: '宅男费纸',
        avatar: 'https://dummyimage.com/150x150/234567/FFFFFF.png?text=us5',
        count: 101,
      },
      {
        username: 'us6',
        nickname: '清幽兰',
        avatar: 'https://dummyimage.com/150x150/234567/FFFFFF.png?text=us6',
        count: 92,
      },
      {
        username: 'us7',
        nickname: '┉深jìē酒肆┈',
        avatar: 'https://dummyimage.com/150x150/234567/FFFFFF.png?text=us7',
        count: 38,
      },
      {
        username: 'us8',
        nickname: '茄子是我打紫哒！',
        avatar: 'https://dummyimage.com/150x150/234567/FFFFFF.png?text=us8',
        count: 9,
      },
    ]);

    /**
     * @description: 选择不同类型的用户排名
     * @param {number} index 选择菜单索引 `必传参数`
     * @param {string} item 选择菜单名 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function rankCardClickMenuItem(index, item) {
      // pass
    }

    return {
      activeIndex,
      menuList,
      clickMenuItem,
      showSolicitation,
      releaseSolicitation,
      userRankingList,
      rankCardClickMenuItem,
    };
  },
});
</script>

<style lang="scss" scoped>
.group-detail-top-bar {
  width: 100%;
  height: 44px;
  background-color: $grey-0;
  border-top: 1px solid $grey-3;
  box-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.08);
  @include flex(center, center);

  .inner {
    width: 1000px;
    height: 100%;
    @include flex(center);

    .item {
      margin-right: 30px;
      @include flex(center, center);
      height: 100%;
      font-size: 15px;
      color: $grey-9;
      transition: 0.25s;

      &.item-active,
      &:hover {
        color: $green-1;
      }

      .icon {
        width: 16px;
        height: 16px;
        @include flex(center, center);
        margin-right: 6px;

        .iconfont {
          font-size: 16px;
        }
      }
    }
  }
}

.group-detail {
  .group-detail-body {
    width: 100%;
    margin-top: 16px;
    @include flex(initial, space-between);
    margin-bottom: 6px;

    .left {
      width: 700px;
    }

    .right {
      width: 284px;
      @include flex(center, center, column);

      .create-solicitation {
        width: 284px;
        height: 72px;
        background-color: $grey-0;
        border-radius: $border-radius-0;
        box-shadow: $shadow-0;
        @include flex(center, center);

        .create-solicitation-inner {
          width: 252px;
          height: 40px;
          box-sizing: border-box;
          border: 1px solid $green-1;
          @include flex(center, center);
          border-radius: $border-radius-1;
          color: $green-1;
          transition: 0.25s;
          background-color: $grey-0;
          font-size: 14px;
          font-weight: 700;

          &:hover {
            background-color: $green-1;
            color: $grey-0;
          }

          .icon {
            width: 16px;
            height: 16px;
            margin-right: 8px;
            @include flex(center, center);

            .iconfont {
              font-size: 17px;
              font-weight: normal;
            }
          }
        }
      }
    }
  }
}
</style>
