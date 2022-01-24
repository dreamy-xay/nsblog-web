<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-23 15:06:03
 * @LastEditors: continue-hs
 * @LastEditTime: 2022-01-23 16:38:29
-->
<template>
  <div class="home-left-item">
    <div class="home-left-item-body">
      <div class="home-left-item-body-top">
        <div class="home-left-item-body-top-text">
          <div
            class="name"
            role="button"
            @click="toUserHome"
          >{{articleItem.nickname}}</div>
          <div class="home-left-item-body-top-line"></div>
          <div class="time">{{articleItem.release_time}}</div>
          <div class="home-left-item-body-top-line"></div>
          <div
            class="topic"
            @click="clickTopic"
            role="button"
          >{{articleItem.topic}}</div>
          <div class="home-left-item-body-top-dot"></div>
          <div
            class="tag"
            @click="clickTag"
            role="button"
          >{{articleItem.topic_tag}}</div>
        </div>
      </div>

      <div class="home-left-item-body-all">
        <div
          class="home-left-item-body-left"
          :style="articleItem.cover_image ? 'width:516px':'width:660px'"
        >
          <div class="home-left-item-body-left-top">
            <div
              class="home-left-item-body-left-top-text"
              @click="toArticles"
              role="button"
            >
              {{articleItem.title}}
            </div>
          </div>
          <div class="home-left-item-body-left-middle">
            <div class="home-left-item-body-left-middle-text">
              {{articleItem.content}}
            </div>
          </div>
          <div class="home-left-item-body-left-bottom">
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
            >
              <i class="iconfont blog-dianzan1" />
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
          class="home-left-item-body-right"
          v-if="articleItem.cover_image"
        >
          <base-image src="articleItem.cover_image" />
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import BaseImage from '@/components/content/baseImage/BaseImage.vue';
import router from '@/router';

export default defineComponent({
  name: 'homeLeftItem',
  props: {
    articleItem: {
      type: Object,
      default: null,
    },
  },
  components: {
    BaseImage,
  },
  setup(props) {
    function clickTopic(topic) {
      router.push({
        name: router.name,
        query: {
          topic: topic,
        },
      });
    }

    function clickTag(tag) {
      router.push({
        name: router.name,
        query: {
          tag: tag,
        },
      });
    }

    function toArticles() {
      window.open(`/article/${props.articleItem.id}`, `/article/${props.articleItem.id}`);
    }

    function toUserHome() {
      window.open(`/user/${props.articleItem.username}`, `/user/${props.articleItem.username}`);
    }
    return {
      toArticles,
      toUserHome,
    };
  },
});
</script>
    <style lang="scss" scoped>
.home-left-item {
  width: 660px;
  height: 129px;

  .home-left-item-body {
    height: 129px;

    .home-left-item-body-top {
      height: 22px;

      .home-left-item-body-top-text {
        @include flex(center);
        height: 17px;
        font-size: 13px;
        font-weight: 400;
        text-align: left;
        color: #8c8c8c;

        .name {
          color: #262626;
        }

        .topic {
          &:hover {
            color: #4bd8aa;
          }
        }

        .tag {
          &:hover {
            color: #4bd8aa;
          }
        }

        .home-left-item-body-top-line {
          width: 1px;
          height: 14px;
          border: 1px solid #e5e5e5;
          margin: 0 8px 0 8px;
        }

        .home-left-item-body-top-dot {
          width: 3px;
          height: 3px;
          background: #8c8c8c;
          border: 1px solid #707070;
          border-radius: 50%;
          margin: 0 8px 0 8px;
        }
      }
    }

    .home-left-item-body-all {
      @include flex(center);
      height: 84px;

      .home-left-item-body-left {
        .home-left-item-body-left-top {
          height: 24px;

          .home-left-item-body-left-top-text {
            @include ellipsis(1);
            height: 21px;
            font-size: 16px;
            font-weight: 700;
            text-align: left;
            color: #262626;
          }
        }

        .home-left-item-body-left-middle {
          height: 22px;

          .home-left-item-body-left-middle-text {
            @include ellipsis(1);
            height: 17px;
            font-size: 13px;
            font-weight: 400;
            text-align: left;
            color: #8c8c8c;
          }
        }

        .home-left-item-body-left-bottom {
          @include flex();
          height: 15px;
          font-size: 13px;
          font-weight: 400;
          text-align: left;
          color: #8c8c8c;

          i {
            color: #8c8c8c;
            margin-right: 4px;
          }

          .view {
            @include flex();
            margin-right: 20px;

            &:hover {
              color: #4bd8aa;
              i {
                color: #4bd8aa;
              }
            }
          }

          .support {
            @include flex();
            margin-right: 20px;

            &:hover {
              color: #4bd8aa;
              i {
                color: #4bd8aa;
              }
            }
          }

          .comment {
            @include flex();

            &:hover {
              color: #4bd8aa;
              i {
                color: #4bd8aa;
              }
            }
          }
        }
      }

      .home-left-item-body-right {
        width: 120px;
        height: 80px;
      }
    }
  }
}
</style>
