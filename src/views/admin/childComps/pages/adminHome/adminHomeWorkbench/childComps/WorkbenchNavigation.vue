<!--
 * @Description: 工作台快捷导航栏
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2023-03-21 18:37:33
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-28 14:43:27
-->
<template>
  <div class="workbench-navigation">
    <div class="workbench-navigation-head">
      <div class="icon">
        <i class="iconfont blog-dianpudaohang"></i>
      </div>
      快捷导航
    </div>
    <div class="workbench-navigation-body">
      <div
        class="navigation-info"
        v-for="(item, index) in navigationList"
        :key="item.name"
        role="button"
        @click="goto(item.routeName)"
        @mouseenter="hoverIndex = index"
        @mouseleave="hoverIndex = -1"
      >
        <div class="icon">
          <i
            class="iconfont"
            :class="item.icon"
            :style="{color: item.color}"
          ></i>
        </div>
        <div
          class="title"
          :style="{color: hoverIndex === index ? item.color : null}"
        >
          {{item.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import styles from '@/assets/style/define.scss';
import router from '@/router';

/**
 * @description: 工作台快捷导航栏
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'workbenchNavigation',
  setup() {
    const hoverIndex = ref(-1); // hover 快捷导航在 navigationList 中的索引
    const navigationList = [
      {
        name: '首页',
        icon: 'blog-homepage',
        color: styles.green1,
        routeName: 'adminHome',
      },
      {
        name: '创作',
        icon: 'blog-chuangzuo',
        color: styles.red2,
        routeName: 'adminCreation',
      },
      {
        name: '问答',
        icon: 'blog-wenda',
        color: styles.blue1,
        routeName: 'adminCreationQuestion',
      },
      {
        name: '资源',
        icon: 'blog-fenxiang',
        color: styles.orange1,
        routeName: 'adminUploadResource',
      },
      {
        name: '博客',
        icon: 'blog-icon',
        color: styles.purple2,
        routeName: 'adminBlog',
      },
      {
        name: '评论',
        icon: 'blog-interactive',
        color: styles.pink0,
        routeName: 'adminComment',
      },
    ];

    //
    /**
     * @description: 前往导航路由
     * @param {string} routeName 路由名称 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function goto(routeName) {
      router.push({ name: routeName });
    }

    return {
      hoverIndex,
      navigationList,
      goto,
    };
  },
});
</script>

<style lang="scss" scoped>
.workbench-navigation {
  margin-top: 16px;
  height: 254px;
  width: 100%;
  border-radius: $border-radius-1;
  background-color: $grey-0;
  @include flex(center, center, column);
  overflow: hidden;

  & > div {
    width: 100%;
    box-sizing: border-box;
  }

  .workbench-navigation-head {
    height: 58px;
    font-size: 16px;
    color: $grey-10;
    border-bottom: 1px solid $grey-4;
    padding: 0 24px;
    @include flex(center);

    .icon {
      margin-right: 6px;
      width: 16px;
      height: 16px;
      @include flex(center, center);

      .iconfont {
        font-size: 18px;
        margin-bottom: 1px;
      }
    }
  }

  .workbench-navigation-body {
    @include flex(center, center);
    flex-wrap: wrap;
    height: 196px;

    .navigation-info {
      height: 98px;
      width: 33.333333333334%;
      box-sizing: border-box;
      background-color: $grey-0;
      transition: 0.25s;
      @include flex(center, center, column);

      &:hover {
        background-color: $grey-1;
      }

      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3) {
        border-bottom: 1px solid $grey-4;
      }

      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(4),
      &:nth-child(5) {
        border-right: 1px solid $grey-4;
      }

      .icon {
        margin-bottom: 8px;
        height: 20px;
        @include flex(center);

        .iconfont {
          font-size: 24px;
        }
      }

      .title {
        color: $grey-10;
        font-size: 14px;
        transition: 0.25s;
      }
    }
  }
}
</style>
