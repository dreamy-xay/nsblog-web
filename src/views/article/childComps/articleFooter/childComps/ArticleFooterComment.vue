<!--
 * @Description: 用户评论组件
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-23 17:26:29
 * @LastEditors: clq
 * @LastEditTime: 2021-09-25 16:35:20
-->
<template>
  <div class="article-footer-comment">
    <article-footer-comment-comp />
    <div class="article-footer-comment-reply">
      <article-footer-comment-comp />
      <article-footer-comment-comp />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import ArticleFooterCommentComp from '@/views/article/childComps/articleFooter/childComps/ArticleFooterCommentComp.vue';

/**
 * @description: 用户评论组件
 * @param {Object} comments 用户评论
 * @author: clq
 */

export default defineComponent({
  name: 'articleFooterComment',
  components: { ArticleFooterCommentComp },
  props: {
    comments: {
      type: Object,
      default: null,
    },
  },
  setup() {
    let showEdit = ref(false);

    function isShowEdit() {
      showEdit.value = !showEdit.value;
    }
    return {
      showEdit,
      isShowEdit,
    };
  },
});
</script>

<style lang="scss" scoped>
.article-footer-comment {
  box-sizing: border-box;
  width: 100%;
  padding: 0 16px 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #fff;

  & > div:first-child {
    border-bottom: 0;
  }

  .article-footer-comment-reply {
    box-sizing: border-box;
    width: 100%;
    padding: 0 12px;
    border-radius: 8px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #f4f4f4;

    & > div:last-child {
      border-bottom: 0;
    }
  }
}
</style>
