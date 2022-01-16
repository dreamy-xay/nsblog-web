<!--
 * @Description: 搜索主页-用户
 * @Version:
 * @Autor: Ban
 * @Date: 2022-01-15 17:32:07
 * @LastEditors: Ban
 * @LastEditTime: 2022-01-16 15:33:35
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
          <base-avatar
            :src="item.avata"
            :size="46"
            alt="data.username"
          />
        </div>
        <div class="center">
          <div class="username">{{ item.name }}</div>
          <div class="sign">
            {{ item.sign }}</div>
        </div>
        <div
          :class="item.isFocus ? 'cancel' : 'focus'"
          role="button"
        >{{item.isFocus ? "取消关注" : "关注"}}</div>
      </div>
    </div>
    <search-page-to-load-more></search-page-to-load-more>
  </div>
</template>

<script>
import { defineComponent, reactive, computed } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import SearchPageToLoadMore from '@/views/search/childComps/SearchPageToLoadMore.vue';
/**
 * @description: 搜索主页-用户
 * @author: Ban
 */
export default defineComponent({
  name: 'SearchPageTag',
  components: {
    BaseAvatar,
    SearchPageToLoadMore,
  },
  setup() {
    const data = reactive([
      {
        avatar: '',
        name: 'Java',
        sign: '是倒过来看的是非观是东方六国就的空间零零阿萨的浪费空间撒旦浪费空间爱上了手动阀',
        isFocus: false,
      },
      {
        avatar: '',
        name: 'Java',
        sign: '是倒过来看的是非观是东方六国i就',
        isFocus: false,
      },
      {
        avatar: '',
        name: 'Java',
        sign: '是倒过来看的是非观是东方六国i就',
        isFocus: false,
      },
      {
        avatar: '',
        name: 'Java',
        sign: '是倒过来看的是非观是东方六国i就',
        isFocus: true,
      },
      {
        avatar: '',
        name: 'Java',
        sign: '是倒过来看的是非观是东方六国i就',
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
  // height: 2000px;
  @include flex(center, initial, column);

  .search-page-tag-list {
    box-shadow: $shadow-0;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 10px;
    width: 100%;

    .search-page-tag-list-content {
      height: 93px;
      background: $grey-0;
      @include flex(center, space-between);
      box-sizing: content-box;
      padding: 0 24px;
      border-bottom: 1px solid $grey-4;

      .center {
        width: 484px;
        height: 100%;
        color: $grey-8;
        margin-right: 12px;
        box-sizing: border-box;
        padding: 24px 0;
        @include flex(initial, space-around, column);

        .username {
          color: $grey-11;
          font-size: 16px;
          font-weight: 700;
        }

        .sign {
          color: $grey-7;
          @include ellipsis(1);
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
