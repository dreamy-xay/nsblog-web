<!--
 * @Description:首页顶部之左边部分组件
 * @Version:
 * @Autor: Ban
 * @Date: 2021-07-29 16:37:09
 * @LastEditors: Ban
 * @LastEditTime: 2021-08-02 13:19:12
-->
<template>
  <div class="base-top-bar-left">
    <div class="base-top-bar-logo">
      <a><img
          src="@/../public/logo.png"
          alt="logo"
        ></a>
    </div>
    <ul>
      <li
        class="base-top-bar-menu"
        v-for="item in headerL"
        :key="item"
      >
        <a v-bind:href="item.url"> {{ item.name }} </a>
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * @description:  The left of TopBar
 * @param {*}
 * @return {*}
 * @author: Ban
 */
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'home',
  setup() {
    const headerL = [
      {
        name: '首页',
        url: '',
      },
      {
        name: '博客',
        url: '',
      },
      {
        name: '问答',
        url: '',
      },
      {
        name: '学习小组',
        url: '',
      },
      {
        name: '资源',
        url: '',
      },
    ];
    return {
      headerL,
    };
  },
});
</script>

<style lang="scss" scoped>
$topBarHeight: 56px;
$a-black: $grey-11;
$green0: $green-0;

.base-top-bar-left {
  height: 100%;
  display: flex;

  .base-top-bar-logo {
    position: relative;
    display: inline-block;
    height: 100%;

    a img {
      width: 182px;
      height: 52px;
    }
  }

  ul {
    letter-spacing: 1px;
    display: inline-block;
    height: 100%;
    font-size: 16px;
    line-height: $topBarHeight;
    margin-left: 13px;
    margin-right: 13px;
  }

  .base-top-bar-menu {
    display: inline-block;
    height: 100%;

    a {
      color: $a-black;
      padding-left: 13px;
      padding-right: 13px;

      &:hover {
        color: $green0;
      }
    }
  }
}
</style>
