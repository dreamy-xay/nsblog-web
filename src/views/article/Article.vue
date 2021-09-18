<!--
 * @Description: 文章页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-16 16:32:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-18 17:23:05
-->
<template>
  <div class="article">
    <base-background :mask="false" />
    <article-head />
    <article-body />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseBackground from '@/components/content/baseBackground/BaseBackground.vue';
import ArticleHead from '@/views/article/childComps/articleHead/ArticleHead.vue';
import ArticleBody from '@/views/article/childComps/articleBody/ArticleBody.vue';

/**
 * @description:
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'Article',
  components: {
    BaseBackground,
    ArticleHead,
    ArticleBody,
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
    background: rgba($green-4, 0.7);

    &:hover {
      background-color: $green-4;
    }
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 0;
    background: $grey-0;
  }
}
</style>
