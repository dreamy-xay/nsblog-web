<!--
 * @Description: 文章详情
 * @Version:
 * @Autor: clqf
 * @Date: 2021-09-14 17:32:49
 * @LastEditors: clq
 * @LastEditTime: 2021-09-25 12:46:08
-->
<template>
  <div class="user-article-item">
    <div class="user-article-item-body">
      <div
        class="header"
        role="button"
        @click="toArticlePage"
      >{{articleInfo.title}}</div>
      <div class="body">{{articleInfo.content}}</div>
      <div class="footer">
        <div class="left">
          <base-tag
            :size="21"
            :color="style.orange0"
            :hollow="true"
            :hoverColor="style.orange1"
            :text="articleInfo.topic_tag"
            @click="toTopicTag"
          />
          <div class="page-view">
            <div><i class="iconfont blog-eye"></i></div>
            {{articleInfo.page_view}} 浏览
          </div>
          <div class="comment">
            <div><i class="iconfont blog-comment"></i></div>
            {{articleInfo.comment_count}} 评论
          </div>
          <div class="recommend">
            <div><span class="iconfont blog-tubiao73"></span></div>
            {{articleInfo.recommend_count}} 推荐
          </div>
        </div>
        <div class="right">
          <div><i class="iconfont blog-lishijilu-copy"></i></div>
          发布于{{articleInfo.release_time}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseTag from '@/components/content/baseTag/BaseTag.vue';
import style from '@/assets/style/define.scss';

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
    /**
     * @description: 跳转至文章页面
     * @return {void}
     * @author: clq
     */
    function toArticlePage() {
      window.open(`/article/${props.articleInfo.id}`, `/article/${props.articleInfo.id}`);
    }

    /**
     * @description: 跳转至主题页面
     * @return {void}
     * @author: clq
     */
    function toTopicTag() {
      console.log(`跳转至 ${props.articleInfo.topic_tag} 主题页面...`);
    }

    return {
      style,
      toArticlePage,
      toTopicTag,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-article-item {
  box-sizing: border-box;
  width: 890px;
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
      transition: all 0.25s;
      @include ellipsis(1);

      &:hover {
        color: $green-0;
      }
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
        height: 21px;
        @include flex(center, space-between, row);

        .page-view,
        .comment,
        .recommend {
          margin-left: 24px;
          height: 100%;
          @include flex(center);

          div {
            height: 18px;
            width: 18px;
            margin-right: 6px;
            @include flex(center, center);

            .iconfont {
              font-size: 18px;
              color: $grey-7;
            }
          }
        }

        .comment div {
          transform: scale(0.9);
        }

        .page-view div .iconfont {
          transform: scaleX(0.9);
        }
      }

      .right {
        height: 100%;
        @include flex(center);

        div {
          height: 18px;
          width: 18px;
          margin-right: 6px;
          @include flex(center, center);

          .iconfont {
            font-size: 18px;
            color: $grey-7;
          }
        }
      }
    }
  }
}
</style>
