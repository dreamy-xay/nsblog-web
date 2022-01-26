<!--
 * @Description: 评论编辑组件
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-23 17:11:47
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-26 17:56:01
-->
<template>
  <div
    class="article-footer-edit"
    :class="{'article-footer-edit-shadow': shadow}"
  >
    <v-md-editor
      v-model="text"
      mode="edit"
      left-toolbar="undo redo clear| bold link code quote"
      :height="height"
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
import { defineComponent, nextTick, ref } from 'vue';

/**
 * @description: 评论编辑组件
 * @param {Boolean} shadow 是否显示绿色阴影 `默认显示`
 * @author: clq
 */

export default defineComponent({
  name: 'articleFooterEdit',
  props: {
    shadow: {
      type: Boolean,
      default: true,
    },
    height: {
      type: String,
      default: '240px',
    },
  },
  setup(_, context) {
    const text = ref('');

    function commit() {
      // console.log('articleFooterEdit: ' + text.value);
      context.emit('commit', text.value);
      nextTick(() => {
        text.value = '';
      });
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
  }

  &.article-footer-edit-shadow :deep(.v-md-editor) {
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
    box-shadow: $shadow-0;
    background-color: $green-0;
    color: $grey-0;
    line-height: 32px;
    text-align: center;
    transition: all 0.25s;

    &:hover {
      background-color: $green-1;
    }
  }
}
</style>
