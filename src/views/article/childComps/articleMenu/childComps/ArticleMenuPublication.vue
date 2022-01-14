<!--
 * @Description: 最近发布组件
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-25 16:15:14
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-14 18:26:21
-->

<template>
  <div class="article-menu-publication">
    <div class="article-menu-publication-top">
      <div class="article-menu-publication-top-icon"><i class="iconfont blog-zuijinxinxi"></i></div>
      <div class="article-menu-publication-top-text">最近发布</div>
    </div>

    <div
      class="article-menu-publication-context"
      v-for="(item, index) in data"
      :key="index"
      role="button"
      @click="clickArticle('/article/'+item.article_id)"
    >
      <div class="icon"><i class="iconfont blog-wenzhang1"></i></div>
      <div class="text">{{item.title}}</div>
    </div>
    <div
      v-if="!data.length"
      class="article-menu-publication-null"
    >暂无发布~</div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

/**
 * @description: 最近发布组件
 * @param {array} data 最近发布文章数据 `必传参数`
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'articleMenuPublication',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },

  setup(props, context) {
    /**
     * @description: 点击最近发布文章跳转路径
     * @param {String} path 要跳转的路径
     * @author: Z_Y_C
     */
    function clickArticle(path) {
      window.open(path, path);
    }
    return { clickArticle };
  },
});
</script>

<style lang="scss" scoped>
.article-menu-publication {
  @include flex(initial, center, column);
  padding: 20px 0 24px 0;
  border-bottom: 1px solid $grey-2;

  .article-menu-publication-top {
    @include flex(center);
    margin-bottom: 10px;

    .article-menu-publication-top-icon {
      margin-right: 8px;
      height: 18px;
      line-height: 18px;
      color: $grey-9;

      .iconfont {
        font-size: 14px;
      }
    }

    .article-menu-publication-top-text {
      color: $grey-9;
      font-size: 14px;
      font-weight: 700;
      height: 19px;
      line-height: 19px;
    }
  }

  .article-menu-publication-context {
    @include flex(center);
    margin-bottom: 4px;
    height: 30px;
    padding-left: 18px;
    color: $grey-9;
    border-left: 2px solid $grey-0;
    transition: 0.25s;

    .icon {
      height: 20px;
      line-height: 20px;
      margin-right: 10px;

      .iconfont {
        font-size: 20px;
      }
    }

    .text {
      @include ellipsis(1);
      font-size: 16px;
      line-height: 21px;
      height: 21px;
    }

    &:hover {
      color: $green-0;
      border-left: 2px solid $green-1;
      background-color: $grey-2;
    }
  }

  .article-menu-publication-null {
    @include flex(center, center);
    color: $green-0;
  }
}
</style>
