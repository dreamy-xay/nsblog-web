<!--
 * @Description: 用户评论组件
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-23 17:26:29
 * @LastEditors: clq
 * @LastEditTime: 2021-09-30 21:47:23
-->
<template>
  <div class="article-footer-comment">
    <!-- 第一级评论 -->
    <article-footer-comment-item
      :comment="comments"
      :parent-id="comments.comment_id"
      :first-index="firstIndex"
    />
    <!-- 子级评论 -->
    <div class="article-footer-comment-reply">
      <article-footer-comment-item
        v-for="(item,index) in comments.child_comments"
        :key="index"
        :comment="item"
        :parent-id="comments.comment_id"
        :first-index="firstIndex"
        :seccond-index="index"
      />
      <article-footer-load-more-btn
        v-if="comments.child_comments.length != 0 && showBtn"
        btnStyle=""
        @loadMore="loadMoreHandler"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ArticleFooterCommentItem from '@/views/article/childComps/articleFooter/childComps/ArticleFooterCommentItem.vue';
import ArticleFooterLoadMoreBtn from '@/views/article/childComps/articleFooter/childComps/ArticleFooterLoadMoreBtn.vue';
import events from '@/events';

/**
 * @description: 用户评论组件
 * @param {Object} data 文章信息
 * @param {Object} comments 用户评论
 * @param {Number} firstIndex 评论一级索引
 * @author: clq
 */

export default defineComponent({
  name: 'articleFooterComment',
  components: { ArticleFooterCommentItem, ArticleFooterLoadMoreBtn },
  props: {
    data: {
      type: Object,
      default: null,
    },
    comments: {
      type: Object,
      default: null,
    },
    firstIndex: {
      type: Number,
      default: -1,
    },
    index: {
      type: Number,
      default: -1,
    },
  },
  setup(props, context) {
    let showEdit = ref(false);
    let showBtn = ref(true);

    events.on('articleFooter-delBtn', (i) => {
      if (i === props.index) {
        showBtn.value = false;
      }
    });

    /**
     * @description: 控制编辑区显示
     * @return {void}
     * @author: clq
     */
    function isShowEdit() {
      showEdit.value = !showEdit.value;
    }

    /**
     * @description: 处理加载更多事件
     * @return {void}
     * @author: clq
     */
    function loadMoreHandler() {
      context.emit('loadMoreHandler', props.comments.comment_id);
    }

    return {
      showEdit,
      showBtn,
      isShowEdit,
      loadMoreHandler,
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
  box-shadow: $shadow-0;
  background-color: $grey-0;

  & > div:first-child {
    border-bottom: 0;
  }

  .article-footer-comment-reply {
    box-sizing: border-box;
    width: 100%;
    padding: 0 12px;
    border-radius: 8px;
    box-shadow: $shadow-0;
    background-color: $grey-2;

    & > div:last-child {
      border-bottom: 16px;
    }
  }

  :deep(.article-footer-load-more-btn .btn) {
    width: 100px;
    height: 28px;
    line-height: 28px;
    margin: 10px auto;
    background-color: $grey-3;

    &:hover {
      background-color: $grey-4;
    }
  }
}
</style>
