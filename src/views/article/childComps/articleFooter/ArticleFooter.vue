<!--
 * @Description: 文章页面底部评论区
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-20 17:53:48
 * @LastEditors: clq
 * @LastEditTime: 2021-09-27 20:03:52
-->
<template>
  <div class="article-footer">
    <div class="article-footer-title">
      发表评论
    </div>
    <article-footer-edit @commit="commitComment" />
    <article-footer-comment
      v-for="(item,index) in comments"
      :key="index"
      :comments="item"
      :data="data"
    />
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue';
import ArticleFooterEdit from '@/views/article/childComps/articleFooter/childComps/ArticleFooterEdit.vue';
import ArticleFooterComment from '@/views/article/childComps/articleFooter/childComps/ArticleFooterComment.vue';
import { getArticleComments, postArticleComments } from '@/network/api/articles';
import { useMessage } from 'naive-ui';

/**
 * @description: 文章底部评论区
 * @param {Object} data 文章相关数据
 * @author: clq
 */

export default defineComponent({
  components: { ArticleFooterEdit, ArticleFooterComment },
  name: 'articleFooter',
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const msg = useMessage(); //naive-ui message
    let comments = reactive([]);

    onMounted(() => {
      getComments(props.data.article_id);
    });

    /**
     * @description: 获取文章评论
     * @param {*} arricleId 文章id
     * @param {*} commentId 评论id
     * @param {*} offset 起始位置
     * @param {*} limit 数量限制
     * @return {void}
     * @author: clq
     */
    function getComments(arricleId, commentId = '', offset = 0, limit = 5) {
      getArticleComments(arricleId, commentId, offset, limit)
        .then((res) => {
          console.log('articleFooter');
          console.log(res);
          comments.splice(0, comments.length, ...res.comments);
        })
        .catch((err) => {
          console.log(err);
          msg.error('获取评论失败', { duration: 2000, closable: true });
        });
    }

    /**
     * @description: 提交评论
     * @param {String} comment 评论
     * @return {void}
     * @author: clq
     */
    function commitComment(comment) {
      console.log('ArticleFooter: ' + comment);
      postArticleComments(props.data.article_id, comment)
        .then((res) => {
          msg.success('成功发表评论', { duration: 2000, closable: true });
        })
        .catch((err) => {
          msg.error('发表评论失败', { duration: 2000, closable: true });
        });
    }

    return {
      comments,
      commitComment,
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
