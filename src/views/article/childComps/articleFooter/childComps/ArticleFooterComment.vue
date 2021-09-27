<!--
 * @Description: 用户评论组件
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-23 17:26:29
 * @LastEditors: clq
 * @LastEditTime: 2021-09-27 20:22:28
-->
<template>
  <div class="article-footer-comment">
    <!-- 第一级评论 -->
    <article-footer-comment-item :comment="comments" />
    <!-- 子级评论 -->
    <div class="article-footer-comment-reply">
      <article-footer-comment-item
        v-for="(item,index) in comments.child_comments"
        :key="index"
        :comment="item"
        :replyCommentId="comments.comment_id"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import ArticleFooterCommentItem from '@/views/article/childComps/articleFooter/childComps/ArticleFooterCommentItem.vue';

/**
 * @description: 用户评论组件
 * @param {Object} data 文章信息
 * @param {Object} comments 用户评论
 * @author: clq
 */

export default defineComponent({
  name: 'articleFooterComment',
  components: { ArticleFooterCommentItem },
  props: {
    data: {
      type: Object,
      default: null,
    },
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
