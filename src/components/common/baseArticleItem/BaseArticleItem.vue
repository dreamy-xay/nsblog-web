<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-23 15:06:03
 * @LastEditors: continue-hs
 * @LastEditTime: 2022-01-27 17:35:13
-->
<template>
  <div
    class="base-article-item"
    :style="styleSelect1"
  >
    <div class="base-article-item-body">
      <div class="base-article-item-body-top">
        <div class="base-article-item-body-top-text">
          <div
            class="name"
            role="button"
            @click="toUserHome"
          >{{articleItem.nickname}}</div>
          <div class="base-article-item-body-top-line"></div>
          <div class="time">{{articleItem.release_time}}</div>
          <div class="base-article-item-body-top-line"></div>
          <div
            class="topic"
            @click="clickTopic"
            role="button"
          >{{articleItem.topic}}</div>
          <div class="base-article-item-body-top-dot"></div>
          <div
            class="tag"
            @click="clickTag"
            role="button"
          >{{articleItem.topic_tag}}</div>
        </div>
      </div>

      <div class="base-article-item-body-all">
        <div
          class="base-article-item-body-left"
          :style="articleItem.cover_image ? styleSelect2 : styleSelect1"
        >
          <div class="base-article-item-body-left-top">
            <div
              class="base-article-item-body-left-top-text"
              @click="toArticles"
              role="button"
            >
              {{articleItem.title}}
            </div>
          </div>
          <div class="base-article-item-body-left-middle">
            <div class="base-article-item-body-left-middle-text">
              {{articleItem.content}}
            </div>
          </div>
          <div class="base-article-item-body-left-bottom">
            <div
              class="view"
              role="button"
            >
              <i class="iconfont blog-browse" />
              <div class="view-text">{{articleItem.page_view}}</div>
            </div>
            <div
              class="support"
              role="button"
              @click="clickLike"
              :class="{active:articleItem.recommend === 1}"
            >
              <i
                class="iconfont blog-tubiao73"
                v-if="articleItem.recommend === 1"
              />
              <i
                class="iconfont blog-dianzan1"
                v-else
              />
              <div
                class="support-text"
                v-if="articleItem.recommend_count"
              >{{articleItem.recommend_count}}</div>
              <div
                class="support-text"
                v-else
              >点赞</div>
            </div>
            <div
              class="comment"
              role="button"
            >
              <i class="iconfont blog-c-comment" />
              <div
                class="comment-text"
                v-if="articleItem.comment_count"
              >{{articleItem.comment_count}}</div>
              <div
                class="comment-text"
                v-else
              >评论</div>
            </div>
          </div>
        </div>

        <div
          class="base-article-item-body-right"
          v-if="articleItem.cover_image"
        >
          <base-image src="articleItem.cover_image" />
        </div>

      </div>
    </div>
    <div class="base-article-item-line"></div>
  </div>
</template>

<script>
import router from '@/router';
import { computed, defineComponent } from 'vue';
import BaseImage from '@/components/content/baseImage/BaseImage.vue';

/**
 * @description:文章列表单个文章框
 * @param {Object} articleItem 框中内容 `默认null`
 * @param {Number} 框的宽度 `默认为660`
 * @event change-like 点击点赞的事件 `使用参照homeLeft`
 * @author: continue-hs
 */

export default defineComponent({
  name: 'baseArticleItem',
  components: {
    BaseImage,
  },
  props: {
    articleItem: {
      type: Object,
      default: null,
    },
    swidth: {
      type: Number,
      default: 660,
    },
  },
  setup(props, context) {
    const styleSelect1 = computed(() => {
      return {
        width: props.swidth + 'px',
      };
    });

    const styleSelect2 = computed(() => {
      return {
        width: props.swidth - 144 + 'px',
      };
    });

    /**
     * @description: 跳转至标签详情页
     * @return {void}
     * @author: continue-hs
     */
    function clickTag() {
      router.push({
        name: 'tag',
        params: {
          tagName: props.articleItem.topic_tag,
        },
      });
    }

    /**
     * @description: 前往指定文章详情页
     * @return {void}
     * @author: continue-hs
     */
    function toArticles() {
      window.open(`/article/${props.articleItem.id}`, `/article/${props.articleItem.id}`);
    }

    /**
     * @description: 前往指定用户主页
     * @return {void}
     * @author: continue-hs
     */
    function toUserHome() {
      window.open(`/user/${props.articleItem.username}`, `/user/${props.articleItem.username}`);
    }

    function clickLike() {
      context.emit('changeLike');
    }

    return {
      toArticles,
      toUserHome,
      clickLike,
      styleSelect1,
      styleSelect2,
      clickTag,
    };
  },
});
</script>
<style lang="scss" scoped>
.base-article-item {
  .base-article-item-body {
    height: 129px;

    .base-article-item-body-top {
      height: 22px;
      @include flex(center);

      .base-article-item-body-top-text {
        @include flex(center);
        height: 17px;
        font-size: 13px;
        font-weight: 400;
        text-align: left;
        color: $grey-7;

        .name {
          color: $grey-10;
          margin-right: 7px;
        }

        .topic {
          &:hover {
            transition: 0.25s;
            color: $green-1;
          }
        }

        .time {
          margin-right: 9px;
        }

        .tag {
          &:hover {
            transition: 0.25s;
            color: $green-1;
          }
        }

        .base-article-item-body-top-line {
          width: 1px;
          border-right: 1px solid $grey-4;
          height: 14px;
          color: $grey-4;
          margin-right: 9px;
        }

        .base-article-item-body-top-dot {
          width: 3px;
          height: 3px;
          background: $grey-7;
          border: 1px solid $grey-8;
          border-radius: 50%;
          margin: 0 8px 0 8px;
        }
      }
    }

    .base-article-item-body-all {
      @include flex();
      height: 84px;

      .base-article-item-body-left {
        .base-article-item-body-left-top {
          height: 24px;
          padding-top: 10px;
          @include flex(center);

          .base-article-item-body-left-top-text {
            @include ellipsis(1);
            height: 21px;
            font-size: 16px;
            font-weight: 700;
            text-align: left;
            color: $grey-10;
          }
        }

        .base-article-item-body-left-middle {
          height: 22px;
          padding-top: 8px;
          @include flex(center);

          .base-article-item-body-left-middle-text {
            @include ellipsis(1);
            height: 17px;
            font-size: 13px;
            font-weight: 400;
            text-align: left;
            color: $grey-7;
          }
        }

        .base-article-item-body-left-bottom {
          @include flex(center);
          height: 15px;
          font-size: 13px;
          font-weight: 400;
          text-align: left;
          color: $grey-7;
          padding-top: 10px;

          i {
            color: $grey-7;
            margin-right: 4px;
          }

          .view {
            @include flex();
            margin-right: 20px;

            &:hover {
              transition: 0.25s;
              color: $green-1;
              i {
                color: $green-1;
              }
            }
          }

          .support {
            @include flex();
            margin-right: 20px;

            &.active {
              color: $green-1;
              i {
                color: $green-1;
              }
            }

            &:hover {
              transition: 0.25s;
              color: $green-1;
              i {
                color: $green-1;
              }
            }
          }

          .comment {
            @include flex();

            &:hover {
              transition: 0.25s;
              color: $green-1;
              i {
                color: $green-1;
              }
            }
          }
        }
      }

      .base-article-item-body-right {
        width: 120px;
        height: 80px;
      }
    }
  }

  .base-article-item-line {
    height: 1px;
    margin-bottom: 12px;
    border-bottom: 0.5px solid $grey-4;
  }
}
</style>
