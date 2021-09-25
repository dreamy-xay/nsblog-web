<!--
 * @Description: 文章页面底部评论区
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-20 17:53:48
 * @LastEditors: clq
 * @LastEditTime: 2021-09-25 16:15:49
-->
<template>
  <div class="article-footer">
    <div class="article-footer-title">
      发表评论
    </div>
    <article-footer-edit />
    <!-- <article-footer-comment
      v-for="(item,index) in comments"
      :key="index"
    /> -->
    <article-footer-comment />
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import ArticleFooterEdit from '@/views/article/childComps/articleFooter/childComps/ArticleFooterEdit.vue';
import ArticleFooterComment from '@/views/article/childComps/articleFooter/childComps/ArticleFooterComment.vue';
/**
 * @description: 文章底部评论区
 * @author: clq
 */

export default defineComponent({
  components: { ArticleFooterEdit, ArticleFooterComment },
  name: 'articleFooter',
  setup() {
    let comments = reactive([
      {
        comment_id: 123,
        username: 'test',
        avatar: 'https://ccc',
        time: '',
        content: '真不戳！',
        support_count: 12,
        oppose_count: 54,
        evaluation: 0,
        child_comments: [
          {
            comment_id: 123,
            username: 'test',
            avatar: 'https://ccc',
            time: '',
            content: '真不戳！',
            support_count: 12,
            oppose_count: 54,
            evaluation: 0,
            child_comments: [
              {
                comment_id: 123,
                username: 'test',
                avatar: 'https://ccc',
                time: '',
                content: '真不戳！',
                support_count: 12,
                oppose_count: 54,
                evaluation: 0,
              },
            ],
          },
        ],
      },
      {
        comment_id: 123,
        username: 'test',
        avatar: 'https://ccc',
        time: '',
        content: '真不戳！',
        support_count: 12,
        oppose_count: 54,
        evaluation: 0,
        child_comments: [
          {
            comment_id: 123,
            username: 'test',
            avatar: 'https://ccc',
            time: '',
            content: '真不戳！',
            support_count: 12,
            oppose_count: 54,
            evaluation: 0,
            child_comments: [],
          },
        ],
      },
    ]);
    return {
      comments,
    };
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
