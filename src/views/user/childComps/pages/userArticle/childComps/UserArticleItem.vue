<!--
 * @Description: 文章详情
 * @Version:
 * @Autor: clqf
 * @Date: 2021-09-14 17:32:49
 * @LastEditors: clq
 * @LastEditTime: 2021-09-24 20:44:33
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
          <div>
            <base-tag
              :size="21"
              color="#ffb792"
              :hollow="true"
              :text="articleInfo.topic_tag"
            />
          </div>
          <div class="page-view">
            <span class="iconfont blog-eye"></span>
            <span class="info">{{articleInfo.page_view}} 浏览</span>
          </div>
          <div class="comment">
            <span class="iconfont blog-comment"></span>
            <span class="info">{{articleInfo.comment_count}} 评论</span>
          </div>
          <div class="recommend">
            <span class="iconfont blog-tubiao73"></span>
            <span class="info">{{articleInfo.recommend_count}} 推荐</span>
          </div>
        </div>
        <div class="right">
          <span class="iconfont blog-lishijilu-copy"></span>
          <span class="release-time">发布于{{articleInfo.release_time}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseTag from '@/components/content/baseTag/BaseTag.vue';

/**
 * @description: 文章详情组件
 * @param {Object} articleInfo 文章详细信息
 * @author: clq
 */
export default defineComponent({
  name: 'UserArticleItem',
  components: { BaseTag },
  props: {
    articleInfo: {
      type: Object,
      default: null,
    },
  },
  setup(props, context) {
    function toArticlePage() {
      console.log('toArticlePage:' + props.articleInfo.id);
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
  border-radius: $border-radius-0;
  background-color: $grey-0;
  box-shadow: $shadow-0;

  .user-article-item-body {
    .header {
      height: 21px;
      width: 100%;
      font-size: 16px;
      color: $grey-10;
      @include ellipsis(1);
    }

    .body {
      width: 858px;
      margin: 10px 0;
      font-family: Arial;
      font-size: 14px;
      text-align: left;
      color: $grey-10;
      @include word-break;
      @include ellipsis(2);
    }

    .footer {
      @include flex(center, space-between, row);
      .left {
        width: 334px;
        @include flex(center, space-between, row);

        div {
          .iconfont {
            font-size: 14px;
            color: $grey-7;
          }

          .info {
            margin-left: 4px;
            font-family: Arial;
            font-size: 14px;
            line-height: 21px;
            text-align: left;
            color: $grey-10;
          }
        }
      }

      .right {
        .iconfont {
          width: 18px;
          height: 18px;
          color: $grey-7;
        }

        .release-time {
          height: 21px;
          margin-left: 4px;
          font-family: Arial;
          font-size: 14px;
          line-height: 21px;
          text-align: right;
          color: $grey-10;
        }
      }
    }
  }
}
</style>
