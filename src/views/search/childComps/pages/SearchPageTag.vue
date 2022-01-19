<!--
 * @Description: 搜索主页-标签
 * @Version:
 * @Autor: Ban
 * @Date: 2022-01-15 17:32:07
 * @LastEditors: Ban
 * @LastEditTime: 2022-01-18 20:09:55
-->
<template>
  <div class="search-page-tag">
    <div class="search-page-tag-list">
      <div
        class="search-page-tag-list-content"
        v-for="item, index in data"
        :key="index"
      >
        <div class="left">
          <div class="left-top">
            <div class="tag">
              {{ item.name }}
            </div>
            <div class="center">
              {{ item.focus }}关注
              <div class="point"> · </div>
              {{ item.article }}文章
            </div>
          </div>
          <div class="left-bottom">
            {{ item.introduce }}
          </div>
        </div>

        <div
          :class="item.isFocus ? 'cancel' : 'focus'"
          @click="item.isFocus ? cancel(index) : focus(index)"
          role="button"
        >{{item.isFocus ? "取消关注" : "关注"}}</div>
      </div>
    </div>
    <search-page-to-load-more>
    </search-page-to-load-more>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import SearchPageToLoadMore from '@/views/search/childComps/SearchPageToLoadMore.vue';
/**
 * @description: 搜索主页-标签
 * @author: Ban
 */
export default defineComponent({
  name: 'SearchPageTag',
  components: {
    SearchPageToLoadMore,
  },
  setup() {
    const data = reactive([
      {
        name: 'Java',
        focus: '1000',
        article: '999',
        introduce: 'Java是一门强大的编程语言，Java是一门强大的编程语言，Java是一门强大的编程语言。。...',
        isFocus: false,
      },
      {
        name: 'Java',
        focus: '1000',
        article: '999',
        introduce: 'Java是一门强大的编程语言，Java是一门强大的编程语言，Java是一门强大的编程语言。。...',
        isFocus: false,
      },
      {
        name: 'Java',
        focus: '1000',
        article: '999',
        introduce: 'Java是一门强大的编程语言，Java是一门强大的编程语言，Java是一门强大的编程语言。。...',
        isFocus: true,
      },
      {
        name: 'Java',
        focus: '1000',
        article: '999',
        introduce: 'Java是一门强大的编程语言，Java是一门强大的编程语言，Java是一门强大的编程语言。。...',
        isFocus: true,
      },
      {
        name: 'Java',
        focus: '1000',
        article: '999',
        introduce: 'Java是一门强大的编程语言，Java是一门强大的编程语言，Java是一门强大的编程语言。。...',
        isFocus: true,
      },
    ]);

    /**
     * @description:关注事件
     * @param {number} 索引 `必传参数`
     * @return {*}
     * @author: Ban
     */
    function focus(index) {
      data[index].isFocus = true;
    }

    /**
     * @description:取消关注事件
     * @param {number} 索引 `必传参数`
     * @return {*}
     * @author: Ban
     */
    function cancel(index) {
      data[index].isFocus = false;
    }
    return {
      data,
      focus,
      cancel,
    };
  },
});
</script>

<style lang="scss" scoped>
.search-page-tag {
  width: 700px;
  @include flex(center, initial, column);

  .search-page-tag-list {
    box-shadow: $shadow-0;
    border-radius: 8px;
    overflow: hidden;
    width: 700px;
    margin-bottom: 10px;

    .search-page-tag-list-content {
      height: 83px;
      background: $grey-0;
      @include flex(center, space-between);
      box-sizing: border-box;
      padding: 0 24px;
      border-bottom: 1px solid $grey-4;

      .left {
        width: 546px;
        height: 100%;
        @include flex(initial, space-between, column);
        box-sizing: border-box;
        padding: 16px 0;

        .left-top {
          @include flex();
          .tag {
            height: 28px;
            box-sizing: border-box;
            padding: 5px 10px;
            background: rgba($green-0, 0.3);
            color: $green-1;
            border-radius: 4px;
            transition: 0.2s;
            font-size: 16px;
          }

          .center {
            font-size: 14px;
            color: $grey-8;
            @include flex(center);
            line-height: 28px;
            margin: 0 165px;

            .point {
              font-size: 36px;
              color: $grey-11;
              margin: 0 16px;
            }
          }
        }

        .left-bottom {
          color: $grey-8;
          @include ellipsis(1);
        }
      }

      .focus {
        height: 28px;
        width: 82px;
        @include flex(center, center);
        background: $grey-0;
        box-shadow: $shadow-0;
        color: $grey-8;
        border-radius: 14px;
        transition: 0.25s;

        &:hover {
          box-shadow: $shadow-2;
          color: $green-0;
          transition: 0.25s;
        }
      }

      .cancel {
        height: 28px;
        width: 82px;
        @include flex(center, center);
        background: $green-0;
        box-shadow: $shadow-0;
        color: $grey-0;
        border-radius: 14px;
        transition: 0.25s;

        &:hover {
          background: $green-1;
          transition: 0.25s;
        }
      }
    }
  }
}
</style>
