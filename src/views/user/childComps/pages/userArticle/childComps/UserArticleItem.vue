<!--
 * @Description: 文章详情
 * @Version:
 * @Autor: clqf
 * @Date: 2021-09-14 17:32:49
 * @LastEditors: clq
 * @LastEditTime: 2021-09-16 19:44:17
-->
<template>
  <div
    class="user-article-item"
    role="button"
    @click="toArticlePage"
  >
    <div class="user-article-item-body">
      <div class="header">{{articleInfo.title}}</div>
      <div class="body">{{articleInfo.content}}</div>
      <div class="footer">
        <div class="left">
          <div class="special-column">{{articleInfo.specialColumn}}</div>
          <div class="page-view">
            <span class="iconfont blog-eye"></span>
            <span class="info">{{articleInfo.viewCount}} 浏览</span>
          </div>
          <div class="comment">
            <span class="iconfont blog-liaotian"></span>
            <span class="info">{{articleInfo.commentCount}} 评论</span>
          </div>
          <div class="recommend">
            <span class="iconfont blog-tubiao73"></span>
            <span class="info">{{articleInfo.recommendCount}} 推荐</span>
          </div>
        </div>
        <div class="right">
          <span class="iconfont blog-lishijilu-copy"></span>
          <span class="release-time">发布于{{articleInfo.releaseTime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 文章详情组件
 * @param {Object} articleInfo 文章详细信息
 * @author: clq
 */
export default defineComponent({
  name: 'UserArticleItem',
  props: {
    articleInfo: {
      type: Object,
      default: null,
    },
  },
  setup(props, context) {
    function toArticlePage() {
      console.log('toArticlePage:' + props.articleInfo.url);
    }
    return {
      toArticlePage,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-article-item {
  box-sizing: border-box;
  width: 890px;
  height: 129px;
  padding: 10px 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: $shadow-0;

  .user-article-item-body {
    .header {
      height: 21px;
      font-size: 16px;
      color: #262626;
    }

    .body {
      width: 858px;
      margin: 10px 0;
      font-family: Arial;
      font-size: 14px;
      text-align: left;
      color: #262626;
      @include word-break;
      @include ellipsis(2);
    }

    .footer {
      @include flex(center, space-between, row);
      .left {
        width: 364px;
        @include flex(center, space-between, row);
        .special-column {
          width: 56px;
          height: 21px;
          margin-right: 24px;
          padding: 2.5px 4px;
          border-radius: 5px;
          border: solid 1px #ffb792;
          font-family: Arial;
          font-size: 12px;
          line-height: 21px;
          text-align: center;
          color: #ffb792;
        }

        div {
          .iconfont {
            // width: 21px;
            // height: 21px;
            font-size: 14px;
            color: #8c8c8c;
          }

          .info {
            margin-left: 4px;
            margin-right: 24px;
            font-family: Arial;
            font-size: 14px;
            line-height: 21px;
            text-align: left;
            color: #262626;
          }
        }
      }

      .right {
        .iconfont {
          width: 18px;
          height: 18px;
          color: #8c8c8c;
        }

        .release-time {
          height: 21px;
          margin-left: 4px;
          font-family: Arial;
          font-size: 14px;
          line-height: 21px;
          text-align: right;
          color: #262626;
        }
      }
    }
  }
}
</style>
