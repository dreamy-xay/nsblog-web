<!--
 * @Description: 用户评论子组件
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-23 19:22:16
 * @LastEditors: clq
 * @LastEditTime: 2021-09-25 16:15:30
-->
<template>
  <div class="article-footer-comment-comp">
    <div class="article-footer-comment-comp-content">
      <div class="left">
        <base-avatar
          :size="32"
          :src="123"
        />
      </div>
      <div class="right">
        <div class="top">
          <span class="username">FLY <span class="reply">回复</span> 海</span>
        </div>
        <v-md-preview
          text="正如前面所说，大家最普遍的理解就是当我们遇到某个页面打开很慢的时候，会想到引入缓存，这样页面打开就快了。其实快和慢是相对的，从技术角度来说，缓存之所以快是因为缓存是基"
          class="comment"
        ></v-md-preview>
        <div class="middle">
          <span class="time">2021-7-27 10:45</span>
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
            class="bottom-button"
          >
            <div>
              <i class="iconfont blog-tubiao73"></i>
            </div>
            支持(3)
          </div>
          <div
            role="button"
            class="bottom-button"
          >
            <div>
              <i class="iconfont blog-tubiao73"></i>
            </div>
            反对(0)
          </div>
        </div>
      </div>
    </div>

    <div class="article-footer-comment-comp-edit">
      <article-footer-edit
        v-if="showEdit"
        @close="showEdit=false"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import ArticleFooterEdit from '@/views/article/childComps/articleFooter/childComps/ArticleFooterEdit.vue';

/**
 * @description: 用户评论子组件
 * @param {Object} comment 用户评论
 * @author: clq
 */

export default defineComponent({
  name: 'articleFooterCommentComp',
  components: { BaseAvatar, ArticleFooterEdit },
  props: {
    comment: {
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
.article-footer-comment-comp {
  box-sizing: border-box;
  width: 100%;
  padding-top: 12px;
  border-bottom: 1px solid #ccc;

  .article-footer-comment-comp-content {
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

          &:hover {
            color: #85e8c7;
          }

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
.article-footer-comment-comp {
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
