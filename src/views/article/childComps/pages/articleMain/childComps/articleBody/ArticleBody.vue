<!--
 * @Description: 文章页面身体部分
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-17 15:05:14
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-26 17:53:13
-->
<template>
  <div class="article-body">
    <article-content
      :content="data.content"
      :username="data.username"
    />
    <article-bottom :data="data" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ArticleContent from '@/views/article/childComps/pages/articleMain/childComps/articleBody/childComps/ArticleContent.vue';
import ArticleBottom from '@/views/article/childComps/pages/articleMain/childComps/articleBody/childComps/ArticleBottom.vue';

/**
 * @description: 文章页面身体部分
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'articleBody',
  components: {
    ArticleContent,
    ArticleBottom,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.article-body {
  margin: 0 auto;
  width: 888px;
  background-color: $grey-0;
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;
  overflow: hidden;
  margin-top: 16px;
}
</style>
