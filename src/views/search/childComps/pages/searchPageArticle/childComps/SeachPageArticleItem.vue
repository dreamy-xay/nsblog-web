<!--
 * @Description: 搜索页面-文章
 * @Version:
 * @Autor: Ban
 * @Date: 2022-01-25 14:25:23
 * @LastEditors: Ban
 * @LastEditTime: 2022-02-15 14:37:48
-->
<template>
  <div class="search-page-article-item">
    <div class="search-page-article-item-content">
      <div
        class="search-page-article-item-content-list"
        v-for="item, index in results"
        :key="index"
        role="button"
        @click="changePages('/article/' + item.id)"
      >
        <div class="list">
          <div class="title">{{ item.title }}</div>
          <div class="content">{{ item.content }}</div>
          <div class="bottom">
            <div class="left">
              <div class="count">
                <span class="iconfont blog-yulan"></span>
                {{ item.browsing_count }}
              </div>
              <div
                class="count"
                :class="item.recommend ? 'recommend' : ''"
              >
                <span class="iconfont blog-dianzan1"></span>
                {{ item.recommend_count > 0 ? item.recommend_count : "点赞" }}
              </div>
              <div class="count">
                <span class="iconfont blog-c-comment"></span>
                {{ item.reply_count > 0 ? item.reply_count : "评论" }}
              </div>
            </div>
            <div class="right">
              <div
                class="name"
                @click="changePages('/user/' + item.nickname)"
              >
                {{ item.nickname }}
              </div>
              <div class="time">
                {{ item.release_time }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, reactive, watch } from 'vue';
import { search } from '@/network/api/search';
import { useRoute } from 'vue-router';

/**
 * @description: 搜索页面-文章
 * @author: Ban
 */

export default defineComponent({
  name: 'searchPageArticle',
  props: {
    results: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    const route = useRoute(); // route

    /**
     * @description: 跳转页面
     * @param {string} path
     * @author: Ban
     */

    function changePages(path) {
      window.open(path, path);
    }
    return {
      changePages,
    };
  },
});
</script>

<style lang="scss" scoped>
.search-page-article-item {
  @include flex(center, initial, column);

  .search-page-article-item-content {
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    overflow: hidden;
    margin-bottom: 10px;
    width: 700px;

    .search-page-article-item-content-list {
      height: 107px;
      background: $grey-0;
      transition: 0.2s;

      &:hover {
        background: $grey-1;
      }

      &:last-child {
        .list {
          border-bottom: 0;
        }
      }

      .list {
        box-sizing: border-box;
        padding: 14px 0;
        margin: 0 20px;
        height: 100%;
        @include flex(initial, space-between, column);
        border-bottom: 1px solid $grey-4;

        .title {
          @include ellipsis(1);
          font-weight: 700;
          font-size: 16px;
          color: $grey-10;
        }

        .content {
          @include ellipsis(1);
          color: $grey-7;
          font-size: 13px;
        }

        .bottom {
          @include flex(center, space-between);
          font-size: 13px;
          color: $grey-7;

          .left {
            @include flex();

            .count {
              @include flex(center, center);
              margin-right: 20px;
              transition: 0.2s;

              &:not(:first-child) {
                &:hover {
                  color: $green-1;
                }
              }

              .iconfont {
                margin-right: 4px;
              }
            }

            .recommend {
              color: $green-1;
            }
          }

          .right {
            @include flex();

            .name {
              margin-right: 20px;
              transition: 0.2s;

              &:hover {
                color: $green-1;
              }
            }
          }
        }
      }
    }
  }
}
</style>
