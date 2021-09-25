<!--
 * @Description: 用户评论组件
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-23 17:26:29
 * @LastEditors: clq
 * @LastEditTime: 2021-09-24 11:22:46
-->
<template>
  <div class="article-footer-comment">
    <div class="article-footer-comment-main">
      <!-- <article-footer-comment-comp /> -->
      <div class="left">
        <base-avatar
          :size="32"
          :src="123"
        />
      </div>
      <div class="right">
        <div class="top">
          <div class="username">海 :</div>
          <span class="comment">谢谢</span>
        </div>
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
          <div class="support">
            <span class="iconfont blog-tubiao73"></span>
            <span>支持(3)</span>
          </div>
          <div class="oppose">
            <span class="iconfont blog-oppose"></span>
            <span>反对(0)</span>
          </div>
        </div>
      </div>
    </div>
    <article-footer-edit
      v-if="showEdit"
      @close="showEdit = false"
    />
    <div class="article-footer-comment-reply">
      <article-footer-comment-comp />
      <article-footer-comment-comp />
      <article-footer-comment-comp />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import ArticleFooterEdit from '@/views/article/childComps/articleFooter/childComps/ArticleFooterEdit.vue';
import ArticleFooterCommentComp from '@/views/article/childComps/articleFooter/childComps/ArticleFooterCommentComp.vue';

/**
 * @description: 用户评论组件
 * @author: clq
 */

export default defineComponent({
  name: 'articleFooterComment',
  components: { BaseAvatar, ArticleFooterEdit, ArticleFooterCommentComp },
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
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #fff;

  .article-footer-comment-main {
    width: 100%;
    @include flex(flex-start, initial, row);

    .left {
      margin-right: 6px;
    }

    .right {
      width: 100%;
      @include flex(initial, initial, column);

      .top {
        height: 19px;
        margin-bottom: 8px;
        @include flex(initial, initial, row);
        .username {
          margin-right: 12px;
          color: #8c8c8c;
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
        margin-bottom: 12px;
        font-size: 14px;
        color: #bfbfbf;
        @include flex(center, flex-end, row);

        .iconfont {
          margin-right: 8px;
        }

        .support,
        .oppose {
          margin-right: 47px;

          &:hover {
            color: #85e8c7;
          }
        }
      }
    }
  }

  .article-footer-comment-reply {
    box-sizing: border-box;
    width: 100%;
    padding: 0 12px;
    border-radius: 8px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
    // background-color: #f4f4f4;

    & > div:last-child {
      border-bottom: 0;
    }
  }
}
</style>
