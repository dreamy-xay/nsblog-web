<!--
 * @Description: 用户评论子组件
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-23 19:22:16
 * @LastEditors: clq
 * @LastEditTime: 2021-09-27 19:35:29
-->
<template>
  <div class="article-footer-comment-item">
    <div class="article-footer-comment-item-content">
      <div class="left">
        <base-avatar
          :size="32"
          :src="comment.avatar"
        />
      </div>
      <div class="right">
        <div class="top">
          <span class="username">{{comment.username}} <span
              v-if="replyUsername"
              class="reply"
            >回复</span> {{replyUsername}}</span>
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
            class="bottom-button support"
            @click="supportComment"
          >
            <div>
              <i class="iconfont blog-tubiao73"></i>
            </div>
            支持({{comment.support_count}})
          </div>

          <div
            role="button"
            class="bottom-button oppose"
            @click="opposeComment"
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
import ArticleFooterEdit from '@/views/article/childComps/articleFooter/childComps/ArticleFooterEdit.vue';
import { useMessage } from 'naive-ui';
import { mapGetters } from '@/util/store';

/**
 * @description: 用户评论子组件
 * @param {Object} comment 用户评论
 * @param {String} replyUsername 被回复用户名
 * @author: clq
 */

export default defineComponent({
  name: 'articleFooterCommentItem',
  components: { BaseAvatar, ArticleFooterEdit },
  props: {
    comment: {
      type: Object,
      default: null,
    },
    replyUsername: {
      type: String,
      default: null,
    },
  },
  setup() {
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
        msg.error('登录后才可以回复', { duration: 2000, closable: true });
        return;
      }
      showEdit.value = !showEdit.value;
    }

    /**
     * @description: 支持评论
     * @return {void}
     * @author: clq
     */
    function supportComment() {
      console.log('supportComment');
    }

    /**
     * @description: 反对评论
     * @return {void}
     * @author: clq
     */
    function opposeComment() {
      console.log('opposeComment');
    }

    /**
     * @description: 提交评论
     * @param {String} comment 评论
     * @return {void}
     * @author: clq
     */
    function commitComment(comment) {
      console.log('ArticleFooterCommentItem: ' + comment);
      showEdit.value = false;
    }

    return {
      showEdit,
      isShowEdit,
      supportComment,
      opposeComment,
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
  border-bottom: 1px solid #ccc;

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
          color: #8c8c8c;

          .reply {
            font-size: 12px;
            line-height: 19px;
            color: #bfbfbf;
          }
        }
      }

      .middle {
        height: 14px;
        line-height: 14px;
        font-size: 12px;
        color: #bfbfbf;

        .time {
          margin-right: 20px;
        }

        .reply-btn {
          .iconfont {
            font-size: 12px;
            margin-right: 6px;
          }

          &:hover {
            color: #85e8c7;
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

        .bottom-button {
          margin-right: 47px;
          height: 100%;
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

        .support:hover {
          color: #85e8c7;
        }

        .oppose:hover {
          color: #ffb792;
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
