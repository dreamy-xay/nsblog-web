<!--
 * @Description: 文章页面底部评论区
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-20 17:53:48
 * @LastEditors: clq
 * @LastEditTime: 2021-09-28 18:03:10
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
      :first-index="index"
      :data="data"
      @loadMoreHandler="loadMoreComments"
    />
    <article-footer-load-more-btn
      v-if="isShowLoadMoreBtn"
      @loadMore="loadMoreComments"
    />
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue';
import ArticleFooterEdit from '@/views/article/childComps/articleFooter/childComps/ArticleFooterEdit.vue';
import ArticleFooterComment from '@/views/article/childComps/articleFooter/childComps/ArticleFooterComment.vue';
import ArticleFooterLoadMoreBtn from '@/views/article/childComps/articleFooter/childComps/ArticleFooterLoadMoreBtn.vue';
import { getArticleComments, postArticleComments, modifyArticleCommentEvaluation } from '@/network/api/articles';
import { useMessage } from 'naive-ui';
import events from '@/events';

/**
 * @description: 文章底部评论区
 * @param {Object} data 文章相关数据
 * @author: clq
 */

export default defineComponent({
  components: { ArticleFooterEdit, ArticleFooterComment, ArticleFooterLoadMoreBtn },
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
    let commentsOffset = ref(0); // 获取评论的偏移量
    let commentLimit = ref(5); // 单次获取评论数
    let isShowLoadMoreBtn = ref(true); // 底部加载更多按钮显示控制

    onMounted(() => {
      getComments(props.data.article_id, '', commentsOffset.value, commentLimit.value);
    });

    // 修改评论评价
    events.on('articleFooterCommentItem-modifyEvaluation', (newValue, firstIndex, seccondIndex) => {
      // console.log('evaluationNewValue: ' + newValue);
      if (seccondIndex === -1) {
        // 修改一级评论
        modifyArticleCommentEvaluation(comments[firstIndex].comment_id, newValue)
          .then(() => {
            if (comments[firstIndex].evaluation === 0) {
              if (newValue === 1) {
                comments[firstIndex].support_count += 1;
              } else {
                comments[firstIndex].oppose_count += 1;
              }
            } else if (comments[firstIndex].evaluation === 1) {
              if (newValue === 0) {
                comments[firstIndex].support_count -= 1;
              } else {
                comments[firstIndex].support_count -= 1;
                comments[firstIndex].oppose_count += 1;
              }
            } else {
              if (newValue === 0) {
                comments[firstIndex].oppose_count -= 1;
              } else {
                comments[firstIndex].support_count += 1;
                comments[firstIndex].oppose_count -= 1;
              }
            }
            comments[firstIndex].evaluation = newValue;
          })
          .catch((err) => {
            console.log(err);
            msg.error('修改评价失败', { duration: 2000, closable: true });
          });
      } else {
        // 修改二级评论
        modifyArticleCommentEvaluation(comments[firstIndex].child_comments[seccondIndex].comment_id, newValue)
          .then(() => {
            if (comments[firstIndex].child_comments[seccondIndex].evaluation === 0) {
              if (newValue === 1) {
                comments[firstIndex].child_comments[seccondIndex].support_count += 1;
              } else {
                comments[firstIndex].child_comments[seccondIndex].oppose_count += 1;
              }
            } else if (comments[firstIndex].child_comments[seccondIndex].evaluation === 1) {
              if (newValue === 0) {
                comments[firstIndex].child_comments[seccondIndex].support_count -= 1;
              } else {
                comments[firstIndex].child_comments[seccondIndex].support_count -= 1;
                comments[firstIndex].child_comments[seccondIndex].oppose_count += 1;
              }
            } else {
              if (newValue === 0) {
                comments[firstIndex].child_comments[seccondIndex].oppose_count -= 1;
              } else {
                comments[firstIndex].child_comments[seccondIndex].support_count += 1;
                comments[firstIndex].child_comments[seccondIndex].oppose_count -= 1;
              }
            }
            comments[firstIndex].child_comments[seccondIndex].evaluation = newValue;
          })
          .catch((err) => {
            console.log(err);
            msg.error('修改评价失败', { duration: 2000, closable: true });
          });
      }
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
    function getComments(arricleId, commentId, offset, limit) {
      getArticleComments(arricleId, commentId, offset, limit)
        .then((res) => {
          // console.log('articleFooterGetComments');
          // console.log(res);
          if (commentId === '') {
            if (res.comments.length < limit) isShowLoadMoreBtn.value = false;
            comments.splice(comments.length, 0, ...res.comments);
          } else {
            for (let i = 0; i < comments.length; i++) {
              if (comments[i].comment_id === commentId) {
                if (res.comments.length < limit) msg.warning('没有更多评论可加载', { duration: 2000, closable: true });
                comments[i].child_comments.splice(comments[i].child_comments.length, 0, ...res.comments);
                break;
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
          msg.error('获取评论失败', { duration: 2000, closable: true });
        });
    }

    /**
     * @description: 发表一级评论
     * @param {String} content 评论内容
     * @return {void}
     * @author: clq
     */
    function commitComment(content) {
      // console.log('ArticleFooter: ' + content);
      postComment(props.data.article_id, content);
    }

    // 处理 articleFooterCommentItem 组件提交的评论请求
    events.on('articleFooterCommentItem-comment', (content, parentId, replyUsername) => {
      postComment(props.data.article_id, content, parentId, replyUsername);
    });

    /**
     * @description: 发表评论
     * @param {string} articleId 文章id
     * @param {string} content 评论内容
     * @param {string} parentId 上级评论id
     * @param {string} replyUsername 回复用户名
     * @return {void}
     * @author: clq
     */
    function postComment(articleId, content, parentId = '', replyUsername = '') {
      // console.log(
      //   'articleId: ' + articleId,
      //   'content: ' + content,
      //   'parentId: ' + parentId,
      //   'replyUsername: ' + replyUsername
      // );
      postArticleComments(articleId, content, parentId, replyUsername)
        .then(() => {
          msg.success('成功发表评论', { duration: 2000, closable: true });
          addComment('testUser', content, parentId, replyUsername);
        })
        .catch((err) => {
          console.log(err);
          msg.error('发表评论失败', { duration: 2000, closable: true });
        });
    }

    /**
     * @description: 新增评论
     * @param {string} username 用户名
     * @param {string} content 评论内容
     * @param {string} parentId 上层评论id
     * @param {string} replyUsername 回复用户名
     * @return {void}
     * @author: clq
     */
    function addComment(username, content, parentId, replyUsername) {
      if (parentId === '') {
        // 发表一级评论
        let comment = {
          avatar: '',
          comment_id: '',
          content,
          evaluation: 0,
          support_count: 0,
          oppose_count: 0,
          time: '12:12:12',
          username,
          child_comments: [],
        };
        comments.splice(0, 0, comment);
        // console.log(comments);
      } else {
        // 发表二级评论
        let comment = {
          avatar: '',
          comment_id: '',
          content,
          reply_username: replyUsername,
          evaluation: 0,
          support_count: 0,
          oppose_count: 0,
          time: '12:12:12',
          username,
        };
        for (let i = 0; i < comments.length; i++) {
          if (comments[i].comment_id === parentId) {
            comments[i].child_comments.splice(0, 0, comment);
            break;
          }
        }
        // console.log(comments);
      }
    }

    /**
     * @description: 加载更多评论
     * @param {string} commentId 一级评论id
     * @return {void}
     * @author: clq
     */
    function loadMoreComments(commentId = '') {
      // console.log('loadMoreCommentsCommentId: ' + commentId);
      commentsOffset.value += commentLimit.value;
      getComments(props.data.article_id, commentId, commentsOffset.value, commentLimit.value);
    }

    return {
      comments,
      isShowLoadMoreBtn,
      commitComment,
      loadMoreComments,
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
    color: $grey-11;
  }
}
</style>
