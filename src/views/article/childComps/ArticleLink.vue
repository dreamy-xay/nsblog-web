<!--
 * @Description: 文章页面链接组件
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-20 19:21:40
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-28 11:59:15
-->
<template>
  <a
    class="article-link"
    :href="`${prefix.url}${href}`"
    :target="`${prefix.url}${target}`"
  >
    <slot></slot>
  </a>
</template>

<script>
import { defineComponent, inject } from 'vue';

/**
 * @description: 文章页面链接组件
 * @param {String} href 链接跳转 `默认为 null`
 * @param {String} target 链接跳转目标 `默认为 null`
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
  setup() {
    const prefix = inject("prefix");

    return {
      prefix
    }
  }
});
</script>

<style lang="scss" scoped>
.article-link {
  position: relative;
  @include ellipsis(1);
  text-decoration: none;
  transition: color 0.25s;

  &:active,
  &:link,
  &:visited {
    color: $grey-7;
  }

  &:hover {
    color: $green-1;

    &:after {
      transform: scale(1, 0.5);
      background-color: $green-1;
      transform-origin: bottom left;
    }
  }

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scale(0, 0.5);
    height: 4px;
    bottom: -3px;
    left: 0px;
    background-color: $green-1;
    overflow: hidden;
    transform-origin: bottom right;
    transition: transform 0.25s;
  }
}
</style>
