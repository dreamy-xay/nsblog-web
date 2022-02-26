<!--
 * @Description: 加载更多
 * @Version:
 * @Autor: Ban
 * @Date: 2022-01-16 12:55:29
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-21 20:15:10
-->
<template>
  <div
    :class="bindClass === null ? 'search-page-to-load-more' : bindClass"
    v-show="show"
    role="button"
    @click="onButtonClick"
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
 * @param {String} title 标题 `默认为 '加载更多...'`
 * @event onButtonClick 按钮被点击
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
    title: {
      type: String,
      default: '加载更多...',
    },
  },
  setup(_, context) {
    /**
     * @description: 按钮被点击
     * @return {void}
     * @author: clq
     */
    function onButtonClick() {
      console.log('onButtonClick');
      context.emit('onButtonClick');
    }
    return { onButtonClick };
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
    color: $grey-10;
  }
}
</style>
