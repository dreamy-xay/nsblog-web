<!--
 * @Description: 文章页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-16 16:32:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-16 22:09:37
-->
<template>
  <div class="article">
    <base-background :mask="false" />
    <article-head />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseBackground from '@/components/content/baseBackground/BaseBackground.vue';
import ArticleHead from '@/views/article/childComps/articleHead/ArticleHead.vue';

/**
 * @description:
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'article1',
  components: {
    BaseBackground,
    ArticleHead,
  },
});
</script>

<style lang="scss" scoped>
.article {
  width: 100%;
  overflow-x: hidden;
  letter-spacing: 0.75px;
  font-family: 'Open Sans', sans-serif;
  // max-width: 100vw;
}
</style>
