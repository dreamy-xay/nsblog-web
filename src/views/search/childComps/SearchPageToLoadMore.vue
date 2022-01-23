<!--
 * @Description: 加载更多
 * @Version:
 * @Autor: Ban
 * @Date: 2022-01-16 12:55:29
 * @LastEditors: Ban
 * @LastEditTime: 2022-01-22 11:56:51
-->
<template>
  <div
    :class="bindClass === null ? 'search-page-to-load-more' : bindClass"
    v-show="show"
    role="button"
  >
    <slot>{{ title }}</slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 加载更多
 * @param {Boolean} show 是否展示 `默认为true`
 * @param {String} bindClass 绑定类
 * @param {String} onClick 点击后的回调 `默认无`
 * @param {String} title 标题 `默认为加载更多...`
 * @slot 全局内容插槽
 * @author: Ban
 */

export default defineComponent({
  name: 'searchPageToLoadMore',
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    bindClass: {
      type: String,
      default: null,
    },
    // onClick: {
    //   type: String,
    //   default: null,
    // },
    title: {
      type: String,
      default: '加载更多...',
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang='scss' scoped>
.search-page-to-load-more {
  @include flex(center, center);
  width: 300px;
  height: 32px;
  background: $grey-0;
  border-radius: 8px;
  box-shadow: $shadow-0;
  color: $grey-9;
  margin-bottom: 3px;
  transition: 0.25s;

  &:hover {
    background: $grey-1;
  }
}
</style>
