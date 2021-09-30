<!--
 * @Description: 博客展示文章信息
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-29 16:58:46
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-29 20:52:02
-->
<template>
  <div class="blog-main-article">
    <blog-main-article-item :data="articleData" />
  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue';
import BlogMainArticleItem from '@/views/blog/childComps/blogMain/BlogMainArticleItem.vue';

/**
 * @description: 博客展示文章信息
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'blogMainArticle',
  components: {
    BlogMainArticleItem,
  },
  setup() {
    const articleData = reactive([
      {
        title: '1234',
        name: 'dreamy',
      },
      {
        title: '1234',
        name: 'dreamy',
      },
      {
        title: '1234',
        name: 'dreamy',
      },
      {
        title: '1234',
        name: 'dreamy',
      },
    ]);

    return {
      articleData,
    };
  },
});
</script>

<style lang="scss" scoped>
.blog-main-article {
  margin: auto;
  width: 800px;
}
</style>
