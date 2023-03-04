<!--
 * @Description: 用户评论子组件
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-23 19:22:16
 * @LastEditors: clq
 * @LastEditTime: 2022-01-27 18:41:35
-->
<template>
  <div class="article-footer-comment-item">
    <div class="article-footer-comment-item-content">
      <div class="left">
        <base-avatar
          :size="32"
          :src="comment.avatar"
          :href="`/blog/${comment.username}`"
          :target="`/blog/${comment.username}`"
        />
      </div>
      <div class="right">
        <div class="top">
          <span class="username">
            <article-link
              :href="`/blog/${comment.username}`"
              :target="`/blog/${comment.username}`"
            >{{comment.nickname}}
            </article-link>
            <span
              v-if="comment.reply_username"
              class="reply"
            > 回复 </span>
            <article-link
              :href="`/blog/${comment.reply_username}`"
              :target="`/blog/${comment.reply_username}`"
            >{{comment.reply_nickname}}
            </article-link>
          </span>
        </div>

        <v-md-preview
          :text="comment.content"
          class="comment"
        ></v-md-preview>

        <div class="middle">
          <span class="time">{{comment.time}}</span>
          <span
            class="reply-btn"
            role="button"
            @click="isShowEdit"
          >
            <span>
              <i class="iconfont blog-reply"></i>
            </span>
            <span class="reply">回复</span>
          </span>
        </div>

        <div class="bottom">
          <div
            role="button"
            :class="{support: comment.evaluation === 1}"
            class="bottom-button"
            @click="modifyEvaluation(1)"
          >
            <div>
              <i class="iconfont blog-tubiao73"></i>
            </div>
            支持({{comment.support_count}})
          </div>

          <div
            role="button"
            :class="{oppose: comment.evaluation === 2}"
            class="bottom-button"
            @click="modifyEvaluation(2)"
          >
            <div>
              <i class="iconfont blog-tubiao73"></i>
            </div>
            反对({{comment.oppose_count}})
          </div>
        </div>

      </div>
    </div>

    <div class="article-footer-comment-item-edit">
      <article-footer-edit
        :shadow="false"
        height="160px"
        v-if="showEdit"
        @commit="commitComment"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import ArticleFooterEdit from '@/views/article/childComps/pages/articleMain/childComps/articleFooter/childComps/ArticleFooterEdit.vue';
import ArticleLink from '@/views/article/childComps/ArticleLink.vue';
import { useMessage } from 'naive-ui';
import { mapGetters } from '@/util/store';
import events from '@/events';

/**
 * @description: 用户评论子组件
 * @param {Object} ArticleData 文章信息
 * @param {Object} comment 用户评论
 * @param {String} parentId 上层评论id
 * @param {Number} firstIndex 评论一级索引
 * @param {Number} seccondIndex 评论二级索引
 * @emits articleFooterCommentItem-comment 发表评论 (content: string,parent_id: string,reply_username: string) => void
 * @emits articleFooterCommentItem-modifyEvaluation 修改评论评价 (newValue: number,firstIndex: number,seccondIndex: number) => void
 * @author: clq
 */

export default defineComponent({
  name: 'articleFooterCommentItem',
  components: { BaseAvatar, ArticleFooterEdit, ArticleLink },
  props: {
    ArticleData: {
      type: Object,
      default: null,
    },
    comment: {
      type: Object,
      default: null,
    },
    parentId: {
      type: [String, Number],
      default: '',
    },
    firstIndex: {
      type: Number,
      default: -1,
    },
    seccondIndex: {
      type: Number,
      default: -1,
    },
  },
  setup(props) {
    const msg = useMessage(); // naive-ui mssage
    const { isLogin } = mapGetters('global', ['isLogin']);
    let showEdit = ref(false);

    /**
     * @description: 显示回复框
     * @return {void}
     * @author: clq
     */
    function isShowEdit() {
      if (!isLogin.value) {
        msg.error('登录后才可以回复');
        return;
      }
      showEdit.value = !showEdit.value;
    }

    /**
     * @description: 修改评论评价
     * @return {void}
     * @author: clq
     */
    function modifyEvaluation(type) {
      // console.log('modifyEvaluation');
      if (type === 1) {
        //已支持
        if (props.comment.evaluation === 1) {
          events.emit('articleFooterCommentItem-modifyEvaluation', 0, props.firstIndex, props.seccondIndex);
        } else {
          events.emit('articleFooterCommentItem-modifyEvaluation', 1, props.firstIndex, props.seccondIndex);
        }
      } else {
        //以反对
        if (props.comment.evaluation === 2) {
          events.emit('articleFooterCommentItem-modifyEvaluation', 0, props.firstIndex, props.seccondIndex);
        } else {
          events.emit('articleFooterCommentItem-modifyEvaluation', 2, props.firstIndex, props.seccondIndex);
        }
      }
    }

    /**
     * @description: 提交评论
     * @param {String} comment 评论
     * @return {void}
     * @author: clq
     */
    function commitComment(comment) {
      // console.log('ArticleFooterCommentItem: ' + comment);
      showEdit.value = false;
      // context.emit('postComment');
      events.emit('articleFooterCommentItem-comment', comment, props.parentId, props.comment.username);
    }

    return {
      showEdit,
      isShowEdit,
      modifyEvaluation,
      commitComment,
    };
  },
});
</script>

<style lang="scss" scoped>
.article-footer-comment-item {
  box-sizing: border-box;
  width: 100%;
  padding-top: 12px;
  border-bottom: 1px solid $grey-5;

  .article-footer-comment-item-content {
    @include flex(flex-start, initial, row);
    .left {
      margin-right: 6px;
    }

    .right {
      width: 100%;
      @include flex(initial, initial, column);

      .top {
        height: 19px;
        overflow: hidden;
        width: 100%;

        .username {
          line-height: 19px;
          color: $grey-7;

          .reply {
            font-size: 12px;
            line-height: 19px;
            color: $grey-6;
          }
        }
      }

      .middle {
        height: 14px;
        line-height: 14px;
        font-size: 12px;
        color: $grey-6;

        .time {
          margin-right: 20px;
        }

        .reply-btn {
          .iconfont {
            font-size: 12px;
            margin-right: 6px;
          }

          &:hover {
            color: $green-0;
          }
        }
      }

      .bottom {
        width: 100%;
        height: 19px;
        margin-bottom: 12px;
        font-size: 14px;
        color: #bfbfbf;
        @include flex(center, flex-end, row);

        & > div:first-child:hover {
          color: $green-1;
        }
        & > div:last-child:hover {
          color: $orange-1;
        }

        .support {
          color: $green-0;
        }

        .oppose {
          color: $orange-0;
        }

        .bottom-button {
          margin-right: 47px;
          height: 100%;
          transition: all 0.25s;
          @include flex(center);

          div {
            width: 16px;
            height: 100%;
            line-height: 19px;
            text-align: center;
            margin-right: 6px;

            .iconfont {
              font-size: 16px;
            }
          }

          &:last-child div {
            transform: rotateZ(180deg);
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.article-footer-comment-item {
  .right {
    .comment {
      color: #bfbfbf;
      .github-markdown-body {
        padding: 0px !important;

        & > p {
          margin-bottom: 0px !important;
        }
      }
    }
  }
}
</style>
