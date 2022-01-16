<!--
 * @Description:  友链组件
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-25 18:30:32
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-14 16:56:04
-->
<template>
  <div class="article-menu-friend">
    <div class="article-menu-friend-top">
      <div class="article-menu-friend-top-icon"><i class="iconfont blog-youlianguanli"></i></div>
      <div class="article-menu-friend-top-text">友链</div>
    </div>

    <div
      class="article-menu-friend-context"
      v-for="(item, index) in data"
      :key="index"
      role="button"
      @click="clickLink(item.link)"
    >
      <div class="text">{{item.title}}</div>
    </div>
    <div
      v-if="!data.length"
      class="article-menu-friend-null"
    >暂无友链~</div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

/**
 * @description: 友链组件
 * @param {Array} data 传入的友链数据 `必传参数`
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'articleMenuFriend',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  setup() {
    /**
     * @description: 点击友链跳转路径
     * @param {String} path 要跳转的路径
     * @author: Z_Y_C
     */
    function clickLink(path) {
      window.open(path, path);
    }
    return {
      clickLink,
    };
  },
});
</script>

<style lang="scss" scoped>
.article-menu-friend {
  @include flex(initial, center, column);
  padding: 20px 0 0 0;

  .article-menu-friend-top {
    @include flex(center);
    margin-bottom: 10px;

    .article-menu-friend-top-icon {
      margin-right: 8px;
      height: 18px;
      line-height: 18px;
      color: $grey-9;

      .iconfont {
        font-size: 14px;
      }
    }

    .article-menu-friend-top-text {
      color: $grey-9;
      font-size: 14px;
      font-weight: 700;
      height: 19px;
      line-height: 19px;
    }
  }

  .article-menu-friend-context {
    height: 30px;
    line-height: 21px;
    font-size: 16px;
    padding-left: 20px;
    transition: 0.25s;
    @include flex(center);

    .text {
      @include ellipsis(1);
    }

    &:hover {
      color: $green-0;
      background-color: $grey-2;
      border-radius: 4px;
    }
  }

  .article-menu-friend-null {
    @include flex(center, center);
    color: $green-0;
  }
}
</style>
