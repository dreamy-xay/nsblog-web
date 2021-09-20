<!--
 * @Description: 文章页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-16 16:32:13
 * @LastEditors: clq
 * @LastEditTime: 2021-09-20 21:01:45
-->

<template>
  <div
    class="article"
    ref="articlePage"
  >
    <base-background :mask="false" />
    <base-blog-menu />
    <article-loading-bar />
    <article-head />
    <article-body />
    <article-footer />
  </div>
</template>

<script>
import { defineComponent, provide, ref } from 'vue';
import BaseBackground from '@/components/content/baseBackground/BaseBackground.vue';
import BaseBlogMenu from '@/components/content/baseBlogMenu/BaseBlogMenu.vue';
import ArticleLoadingBar from '@/views/article/childComps/ArticleLoadingBar.vue';
import ArticleHead from '@/views/article/childComps/articleHead/ArticleHead.vue';
import ArticleBody from '@/views/article/childComps/articleBody/ArticleBody.vue';
import ArticleFooter from './childComps/articleFooter/ArticleFooter.vue';

/**
 * @description:
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'Article',
  components: {
    BaseBackground,
    BaseBlogMenu,
    ArticleLoadingBar,
    ArticleHead,
    ArticleBody,
    ArticleFooter,
  },
  setup() {
    const articlePage = ref(null); // article page ref

    // 向子组件传递
    provide('articlePage', articlePage);

    return {
      articlePage,
    };
  },
});
</script>

<style lang="scss" scoped>
.article {
  width: 100%;
  letter-spacing: 0.75px;
  font-family: 'Open Sans', sans-serif;
  height: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    background: $green-0;

    &:hover {
      background-color: $green-1;
    }
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 0;
    background: $grey-0;
  }
}
</style>
