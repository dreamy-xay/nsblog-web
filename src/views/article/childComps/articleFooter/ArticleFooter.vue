<!--
 * @Description: 文章页面底部评论区
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-20 17:53:48
 * @LastEditors: clq
 * @LastEditTime: 2021-09-24 10:27:30
-->
<template>
  <div class="article-footer">
    <div class="article-footer-title">
      发表评论
    </div>
    <article-footer-edit />
    <article-footer-comment />
    <article-footer-comment />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ArticleFooterEdit from '@/views/article/childComps/articleFooter/childComps/ArticleFooterEdit.vue';
import ArticleFooterComment from '@/views/article/childComps/articleFooter/childComps/ArticleFooterComment.vue';
/**
 * @description:
 * @author: clq
 */

export default defineComponent({
  components: { ArticleFooterEdit, ArticleFooterComment },
  name: 'articleFooter',
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.article-footer {
  box-sizing: border-box;
  margin: 18px auto;
  width: 888px;
  padding: 14px 16px;
  background-color: $grey-0;
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;
  overflow: hidden;

  .article-footer-title {
    margin-bottom: 16px;
    font-family: Arial;
    font-size: 20px;
    color: #000;
  }
}
</style>
