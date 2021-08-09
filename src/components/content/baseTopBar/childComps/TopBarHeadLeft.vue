<!--
 * @Description: 首页顶部之左边部分组件
 * @Version:
 * @Autor: Ban
 * @Date: 2021-07-29 16:37:09
 * @LastEditors: Ban
 * @LastEditTime: 2021-08-06 13:35:02
-->
<template>
  <div class="top-bar-head-left">
    <div class="top-bar-head-left-logo">
      <img
        src="/logo.png"
        alt="logo"
        @click="routeToIndex"
        role="button"
      >
    </div>
    <div
      class="top-bar-head-left-menu"
      v-for="item in headerL"
      :key="item"
      role="button"
      @click="routeTo(item.url)"
    >
      {{ item.name }}
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

/**
 * @description: 首页顶部之左边部分组件
 * @author: Ban
 */

export default defineComponent({
  name: 'home',
  setup() {
    const headerL = [
      {
        name: '首页',
        url: '1',
      },
      {
        name: '博客',
        url: '2',
      },
      {
        name: '问答',
        url: '3',
      },
      {
        name: '学习小组',
        url: '4',
      },
      {
        name: '资源',
        url: '5',
      },
    ];
    const router = useRouter();
    function routeToIndex() {
      router.push('');
      console.log('router');
    }

    /**
     * @description: 改变路由
     * @param {*} path 路径
     * @author: Ban
     */
    function routeTo(path) {
      router.push(path);
      console.log(path);
    }
    return {
      headerL,
      routeToIndex,
      routeTo,
    };
  },
});
</script>

<style lang="scss" scoped>
$topBarHeight: 56px;
$a-black: $grey-11;
$green0: $green-0;

.top-bar-head-left {
  height: 100%;
  display: flex;

  .top-bar-head-left-logo {
    position: relative;
    display: inline-block;
    height: 100%;

    img {
      width: 182px;
      height: 52px;
    }
  }

  .top-bar-head-left-menu {
    letter-spacing: 1px;
    display: inline-block;
    height: 100%;
    font-size: 16px;
    line-height: $topBarHeight;
    padding-left: 13px;
    padding-right: 13px;
    color: $a-black;
    transition: all 0.1s linear;
    display: inline-block;
    height: 100%;

    &:hover {
      color: $green0;
    }
  }
}
</style>
