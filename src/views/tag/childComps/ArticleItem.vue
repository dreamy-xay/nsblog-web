<!--
 * @Description: 文章列表单个文章框
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-23 15:06:03
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-13 22:41:16
-->
<template>
  <div class="article-item">
    <div
      class="article-item-body"
      v-for="(item , index) in articleItem"
      :key="index"
    >
      <div class="article-item-body-top">
        <div class="article-item-body-top-text">
          <div
            class="name"
            role="button"
            @click="toUserHome(item.username)"
          >{{item.nickname}}</div>
          <div class="article-item-body-top-line"></div>
          <div class="time">{{getDate(item.release_time)}}</div>
          <div class="article-item-body-top-line"></div>
          <div
            class="topic"
            @click="clickTopic(item.topic)"
            role="button"
          >{{item.topic}}</div>
          <div class="article-item-body-top-dot">•</div>
          <div
            class="tag"
            @click="clickTag(item.topic_tag)"
            role="button"
          >{{item.topic_tag}}</div>
        </div>
      </div>

      <div class="article-item-body-all">
        <div
          class="article-item-body-left"
          :class="item.cover_image ? 'width1' : 'width2'"
        >
          <div class="article-item-body-left-top">
            <div
              class="article-item-body-left-top-text"
              @click="toArticles(item.id)"
              role="button"
            >
              {{item.title}}
            </div>
          </div>
          <div class="article-item-body-left-middle">
            <div class="article-item-body-left-middle-text">
              {{item.content}}
            </div>
          </div>
          <div class="article-item-body-left-bottom">
            <div
              class="view"
              role="button"
            >
              <i class="iconfont blog-browse" />
              <div class="view-text">{{item.page_view}}</div>
            </div>
            <div
              class="support"
              role="button"
              @click="clickLike(index)"
              :class="item.recommend === 1 ? 'active' : ''"
            >

              <i
                class="iconfont blog-dianzan"
                v-if="item.recommend"
              />
              <i
                class="iconfont blog-dianzan1"
                v-else
              />
              <div
                class="support-text"
                v-if="item.recommend_count"
              >{{item.recommend_count}}</div>
              <div
                class="support-text"
                v-else
              >点赞</div>
            </div>

            <div
              class="comment"
              role="button"
              @click="toComment(item.id)"
            >
              <i class="iconfont blog-c-comment" />
              <div
                class="comment-text"
                v-if="item.comment_count"
              >{{item.comment_count}}</div>
              <div
                class="comment-text"
                v-else
              >评论</div>
            </div>
          </div>
        </div>

        <div
          class="article-item-body-right"
          v-if="item.cover_image"
        >
          <base-image :src="item.cover_image" />
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import router from '@/router';
import { defineComponent } from 'vue';
import BaseImage from '@/components/content/baseImage/BaseImage.vue';
import { dateGetText } from '@/util/date';

/**
 * @description:文章列表单个文章框
 * @param {Array} articleItem 框中内容 `默认 []`
 * @event change-like 点击点赞的事件 `使用参照 homeLeft`
 * @author: continue-hs
 */

export default defineComponent({
  name: 'ArticleItem',
  components: {
    BaseImage,
  },
  props: {
    articleItem: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    /**
     * @description: 跳转至标签详情页
     * @param {string} topic_tag 标签名
     * @return {void}
     * @author: continue-hs
     */
    function clickTag(topic_tag) {
      router.push({
        name: 'tag',
        params: {
          tagName: topic_tag,
        },
      });
    }

    /**
     * @description: 跳转至专题详情页
     * @param {string} topic 专题名
     * @return {void}
     * @author: Z_Y_C
     */
    function clickTopic(topic) {
      router.push({
        name: 'home',
        query: {
          topic: topic,
        },
      });
    }

    /**
     * @description: 前往指定文章详情页
     * @param {number} id 文章id
     * @return {void}
     * @author: continue-hs
     */
    function toArticles(id) {
      window.open(`/article/${id}`, `/article/${id}`);
    }

    /**
     * @description: 前往指定用户主页
     * @param {string} 用户名
     * @return {void}
     * @author: continue-hs
     */
    function toUserHome(username) {
      window.open(`/user/${username}`, `/user/${username}`);
    }

    /**
     * @description: 点赞
     * @param {number} index 数据下标
     * @return {void}
     * @author: Z_Y_C
     */
    function clickLike(index) {
      context.emit('changeLike', { index: index });
    }

    /**
     * @description: 改变日期格式
     * @param {String} date 日期
     * @return {String} 返回时间差状态文字描述
     * @author: Z_Y_C
     */

    function getDate(date) {
      date = new Date(date);
      return dateGetText(date, 3110400000, 'YY-mm-dd');
    }

    /**
     * @description: 跳转评论
     * @param {number} id 文章id
     * @return {void}
     * @author: Z_Y_C
     */
    function toComment(id) {
      window.open(`/article/${id}#comment`, `/article/${id}#comment`);
    }

    return {
      toArticles,
      toUserHome,
      clickLike,
      clickTag,
      getDate,
      clickTopic,
      toComment,
    };
  },
});
</script>
<style lang="scss" scoped>
.article-item {
  width: 100%;

  .article-item-body {
    padding: 12px 0;
    border-top: 1px solid $grey-4;

    &:nth-child(1) {
      border-top: none;
    }

    .article-item-body-top {
      height: 22px;
      margin-bottom: 10px;
      @include flex(center);

      .article-item-body-top-text {
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
          transition: 0.25s;
          &:hover {
            color: $green-1;
          }
        }

        .time {
          margin-right: 9px;
        }

        .tag {
          transition: 0.25s;
          &:hover {
            color: $green-1;
          }
        }

        .article-item-body-top-line {
          width: 1px;
          border-right: 1px solid $grey-4;
          height: 14px;
          color: $grey-4;
          margin-right: 9px;
        }

        .article-item-body-top-dot {
          width: 3px;
          height: 3px;
          font-size: 16px;
          font-weight: 700;
          padding: 0 8px;
          @include flex(center, center);
        }
      }
    }

    .article-item-body-all {
      @include flex(initial, space-between);
      .width1 {
        width: calc(100% - 144px);
      }

      .width2 {
        width: calc(100%);
      }

      .article-item-body-left {
        .article-item-body-left-top {
          height: 24px;
          @include flex(center);

          .article-item-body-left-top-text {
            @include ellipsis(1);
            height: 21px;
            font-size: 16px;
            font-weight: 700;
            text-align: left;
            color: $grey-10;
            transition: 0.25s;

            &:hover {
              color: $grey-8;
            }
          }
        }

        .article-item-body-left-middle {
          height: 22px;
          padding-top: 8px;
          @include flex(center);

          .article-item-body-left-middle-text {
            @include ellipsis(1);
            height: 17px;
            font-size: 13px;
            font-weight: 400;
            text-align: left;
            color: $grey-7;
          }
        }

        .article-item-body-left-bottom {
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

          .active {
            color: $green-1;
            i {
              color: $green-1;
            }
          }

          .support {
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

      .article-item-body-right {
        width: 120px;
        height: 80px;
      }
    }
  }
}
</style>
