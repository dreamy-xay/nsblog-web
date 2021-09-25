<!--
 * @Description: 文章页面链接组件
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-20 19:21:40
 * @LastEditors: clq
 * @LastEditTime: 2021-09-25 12:00:22
-->
<template>
  <a
    class="article-link"
    :href="href"
    :target="target"
  >
    <slot></slot>
  </a>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 文章页面链接组件
 * @author: clq
 */

export default defineComponent({
  name: 'articleLink',
  props: {
    href: {
      type: String,
      default: null,
    },
    target: {
      type: String,
      default: null,
    },
  },
});
</script>

<style lang="scss" scoped>
.article-link {
  position: relative;
  @include ellipsis(1);

  &:active,
  &:link,
  &:visited {
    color: $grey-7;
    text-decoration: none;
  }

  &:hover {
    color: $green-1;
    text-decoration: none;

    &:after {
      transform: scaleX(1);
      background-color: $green-1;
      transform-origin: bottom left;
    }
  }

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: -2px;
    left: 0px;
    background-color: $green-1;
    transform-origin: bottom right;
    transition: transform 0.25s;
  }
}
</style>
