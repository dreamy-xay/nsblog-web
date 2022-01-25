<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-23 15:06:03
 * @LastEditors: continue-hs
 * @LastEditTime: 2022-01-25 15:19:39
-->
<template>
  <div
    class="home-item"
    :style="styleSelect1"
  >
    <div class="home-item-body">
      <div class="home-item-body-top">
        <div class="home-item-body-top-text">
          <div
            class="name"
            role="button"
            @click="toUserHome"
          >{{articleItem.nickname}}</div>
          <div class="home-item-body-top-line"></div>
          <div class="time">{{articleItem.release_time}}</div>
          <div class="home-item-body-top-line"></div>
          <div
            class="topic"
            @click="clickTopic"
            role="button"
          >{{articleItem.topic}}</div>
          <div class="home-item-body-top-dot"></div>
          <div
            class="tag"
            @click="clickTag(articleItem.topic_tag)"
            role="button"
          >{{articleItem.topic_tag}}</div>
        </div>
      </div>

      <div class="home-item-body-all">
        <div
          class="home-item-body-left"
          :style="articleItem.cover_image ? styleSelect2 : styleSelect1"
        >
          <div class="home-item-body-left-top">
            <div
              class="home-item-body-left-top-text"
              @click="toArticles"
              role="button"
            >
              {{articleItem.title}}
            </div>
          </div>
          <div class="home-item-body-left-middle">
            <div class="home-item-body-left-middle-text">
              {{articleItem.content}}
            </div>
          </div>
          <div class="home-item-body-left-bottom">
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
          class="home-item-body-right"
          v-if="articleItem.cover_image"
        >
          <base-image src="articleItem.cover_image" />
        </div>

      </div>
    </div>
    <div class="home-item-line"></div>
  </div>
</template>
<script>
import { computed, defineComponent, ref } from 'vue';
import BaseImage from '@/components/content/baseImage/BaseImage.vue';
import { useRoute, useRouter } from 'vue-router';
import router from '@/router';

export default defineComponent({
  name: 'homeItem',
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
  components: {
    BaseImage,
  },
  setup(props, context) {
    const route = useRouter();

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

    // function clickTopic(topic) {
    //   router.push({
    //     path: '/tag',
    //     query: {
    //       topic: topic,
    //     },
    //   });
    // }

    function clickTag(tagname) {
      // console.log(tag);
      router.push({
        name: 'tagMain',
        // params: {
        //   tag_name: tagname,
        // },
      });
    }

    function toArticles() {
      window.open(`/article/${props.articleItem.id}`, `/article/${props.articleItem.id}`);
    }

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
      // clickTopic,
      clickTag,
    };
  },
});
</script>
<style lang="scss" scoped>
.home-item {
  .home-item-body {
    height: 129px;

    .home-item-body-top {
      height: 22px;
      @include flex(center);

      .home-item-body-top-text {
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

        .home-item-body-top-line {
          width: 1px;
          height: 14px;
          border: 1px solid #e5e5e5;
          margin: 0 8px 0 8px;
        }

        .home-item-body-top-dot {
          width: 3px;
          height: 3px;
          background: #8c8c8c;
          border: 1px solid #707070;
          border-radius: 50%;
          margin: 0 8px 0 8px;
        }
      }
    }

    .home-item-body-all {
      @include flex();
      height: 84px;

      .home-item-body-left {
        .home-item-body-left-top {
          height: 24px;
          padding-top: 10px;
          @include flex(center);

          .home-item-body-left-top-text {
            @include ellipsis(1);
            height: 21px;
            font-size: 16px;
            font-weight: 700;
            text-align: left;
            color: #262626;
          }
        }

        .home-item-body-left-middle {
          height: 22px;
          padding-top: 8px;
          @include flex(center);

          .home-item-body-left-middle-text {
            @include ellipsis(1);
            height: 17px;
            font-size: 13px;
            font-weight: 400;
            text-align: left;
            color: #8c8c8c;
          }
        }

        .home-item-body-left-bottom {
          @include flex(center);
          height: 15px;
          font-size: 13px;
          font-weight: 400;
          text-align: left;
          color: #8c8c8c;
          padding-top: 10px;

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

            &.active {
              color: #4bd8aa;
              i {
                color: #4bd8aa;
              }
            }

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

      .home-item-body-right {
        width: 120px;
        height: 80px;
      }
    }
  }

  .home-item-line {
    width: 660px;
    height: 1px;
    border: 0.5px solid #e5e5e5;
    margin-bottom: 12px;
  }
}
</style>
