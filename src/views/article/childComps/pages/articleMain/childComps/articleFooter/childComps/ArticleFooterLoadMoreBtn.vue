<!--
 * @Description: 加载更多评论按钮
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-28 16:08:43
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-04-10 14:42:45
-->
<template>
  <div class="article-footer-load-more-btn">
    <div
      class="btn"
      role="button"
      @click="loadMore"
    >
      加载更多
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 加载更多评论按钮
 * @author: clq
 */

export default defineComponent({
  name: 'articleFooterLoadMoreBtn',
  setup(_, context) {
    /**
     * @description: 加载更多
     * @return {void}
     * @author: clq
     */
    function loadMore() {
      context.emit('loadMore');
    }
    return { loadMore };
  },
});
</script>

<style lang="scss" scoped>
.article-footer-load-more-btn {
  box-sizing: border-box;
  width: 100%;
  padding-bottom: 0.1px;

  .btn {
    width: 300px;
    height: 32px;
    margin: auto;
    opacity: 1;
    border-radius: 8px;
    line-height: 32px;
    text-align: center;
    color: $grey-9;
    transition: 0.25s;
    box-shadow: $shadow-0;
    background-color: $grey-0;

    &:hover {
      background-color: $grey-1;
    }
  }
}
</style>
