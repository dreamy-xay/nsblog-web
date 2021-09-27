<!--
 * @Description: 评论编辑组件
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-23 17:11:47
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-26 16:11:31
-->
<template>
  <div class="article-footer-edit">
    <v-md-editor
      v-model="text"
      mode="edit"
      left-toolbar="undo redo clear| bold link code quote"
      height="200px"
    />

    <div
      class="article-footer-commit-btn"
      role="button"
      @click="commit"
    >
      提交评论
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

/**
 * @description: 评论编辑组件
 * @author: clq
 */

export default defineComponent({
  name: 'articleFooterEdit',
  setup(props, context) {
    const text = ref('');

    function commit() {
      context.emit('close', true);
    }

    return { text, commit };
  },
});
</script>

<style lang="scss" scoped>
.article-footer-edit {
  :deep(.v-md-editor) {
    width: 100%;
    z-index: 9999999999;
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    transition: 0.25s;
    overflow: hidden;

    &:focus-within {
      box-shadow: $shadow-2;
    }

    &:hover {
      box-shadow: $shadow-2;
    }
  }

  .article-footer-commit-btn {
    width: 80px;
    height: 32px;
    position: relative;
    right: 0px;
    margin-top: 10px;
    margin-bottom: 12px;
    border-radius: 4px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #85e8c7;
    color: #fff;
    line-height: 32px;
    text-align: center;
  }
}
</style>
