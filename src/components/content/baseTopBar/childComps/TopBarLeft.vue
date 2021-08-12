<!--
 * @Description: 首页顶部之左边部分组件
 * @Version:
 * @Autor: Ban
 * @Date: 2021-07-29 16:37:09
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-12 16:58:15
-->
<template>
  <div class="top-bar-left">
    <div class="top-bar-left-logo">
      <a href="/">
        <img
          src="/logo.png"
          alt="logo"
        >
      </a>
    </div>
    <div class="top-bar-left-menu">
      <a
        v-for="(item, index) in menu"
        :href="item.url"
        :key="index"
        :class="{active: activeIndex === index}"
      >
        <div
          class="text"
          role="button"
        >
          {{ item.name }}
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { verifyToken } from '@/network/token';
import { useRoute } from 'vue-router';

/**
 * @description: 首页顶部之左边部分组件
 * @author: Ban
 */

export default defineComponent({
  name: 'topBarLeft',
  setup() {
    const token = verifyToken(); // 拿到token验证信息
    // 左侧菜单按钮
    const menu = [
      {
        name: '首页',
        url: '/',
      },
      {
        name: '博客',
        url: token.status ? '/' + token.username : '/login',
      },
      {
        name: '问答',
        url: '/question',
      },
      {
        name: '资源',
        url: '/resource',
      },
      {
        name: '学习小组',
        url: '/group',
      },
    ];

    const route = useRoute().path.split('/')[1]; // 当前路由

    let activeIndex = -1; // 激活索引
    // 更新激活索引
    for (let i = 0; i < menu.length; ++i)
      if (menu[i].url.split('/')[1] === route) {
        activeIndex = i;
        break;
      }

    return {
      menu,
      activeIndex,
    };
  },
});
</script>

<style lang="scss" scoped>
$topBarHeight: 56px;
$a-black: $grey-11;
$green0: $green-0;

.top-bar-left {
  height: 100%;
  display: flex;

  .top-bar-left-logo {
    position: relative;
    display: inline-block;
    height: 100%;

    img {
      width: 182px;
      height: 52px;
    }
  }

  .top-bar-left-menu {
    letter-spacing: 1px;
    height: 100%;
    overflow: hidden;
    font-size: 16px;
    margin: 0 13px;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      display: flex;
      height: 100%;
      overflow: hidden;
      transition: 0.25s;
      align-items: center;
      box-sizing: border-box;
      cursor: default;

      &.active {
        border-top: 3px solid $green0;

        .text {
          top: -1.5px;
        }
      }

      .text {
        height: 30px;
        position: relative;
        display: flex;
        align-items: center;
        margin: 0 13px;
        color: $a-black;
        transition: 0.25s;

        &:hover {
          color: $green0;
        }
      }
    }
  }
}
</style>
