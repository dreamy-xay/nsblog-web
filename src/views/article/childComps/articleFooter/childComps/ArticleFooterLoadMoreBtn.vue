<!--
 * @Description: 加载更多评论按钮
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-28 16:08:43
 * @LastEditors: clq
 * @LastEditTime: 2021-09-28 18:03:51
-->
<template>
  <div class="article-footer-load-more-btn">
    <div
      class="btn"
      :style="btnStyle"
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
  props: {
    btnStyle: {
      type: String,
      default: '',
    },
  },
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
    background: $grey-4;
    border-radius: 8px;
    line-height: 32px;
    text-align: center;
    color: $grey-9;
    transition: 0.25s;

    &:hover {
      background-color: $grey-5;
    }
  }
}
</style>
