<!--
 * @Description: 搜索主页-标签
 * @Version:
 * @Autor: Ban
 * @Date: 2022-01-15 17:32:07
 * @LastEditors: Ban
 * @LastEditTime: 2022-01-16 15:35:50
-->
<template>
  <div class="search-page-tag">
    <div class="search-page-tag-list">
      <div
        class="search-page-tag-list-content"
        v-for="item, index in data"
        :key="index"
      >
        <div class="left">{{ item.name }}</div>
        <div class="center">
          {{ item.focus }}关注
          <div class="point"> · </div>
          {{ item.article }}文章
        </div>
        <div
          :class="item.isFocus ? 'cancel' : 'focus'"
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
        isFocus: false,
      },
      {
        name: 'Java',
        focus: '1000',
        article: '999',
        isFocus: false,
      },
      {
        name: 'Java',
        focus: '1000',
        article: '999',
        isFocus: true,
      },
      {
        name: 'Java',
        focus: '1000',
        article: '999',
        isFocus: true,
      },
      {
        name: 'Java',
        focus: '1000',
        article: '999',
        isFocus: true,
      },
    ]);
    return {
      data,
    };
  },
});
</script>

<style lang='scss' scoped>
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
      height: 75px;
      background: $grey-0;
      @include flex(center, space-between);
      box-sizing: content-box;
      padding: 0 24px;
      border-bottom: 1px solid $grey-4;

      .left {
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

        .point {
          font-size: 36px;
          color: $grey-11;
          margin: 0 16px;
        }
      }

      .focus {
        height: 28px;
        width: 82px;
        box-sizing: border-box;
        padding: 4px 27px;
        background: $grey-0;
        box-shadow: $shadow-0;
        color: $grey-8;
        border-radius: 14px;

        &:hover {
          box-shadow: $shadow-2;
          color: $green-0;
        }
      }

      .cancel {
        height: 28px;
        box-sizing: border-box;
        padding: 4px 13px;
        background: $green-0;
        box-shadow: $shadow-0;
        color: $grey-0;
        border-radius: 14px;

        &:hover {
          background: $green-1;
        }
      }
    }
  }
}
</style>
