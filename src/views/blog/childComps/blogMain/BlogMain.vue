<!--
 * @Description: 博客展示文章信息
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-29 16:58:46
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-30 20:43:24
-->
<template>
  <div class="blog-main">
    <blog-main-article :data="articleData" />
  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue';
import BlogMainArticle from '@/views/blog/childComps/blogMain/childComps/BlogMainArticle.vue';

/**
 * @description: 博客展示文章信息
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'blogMain',
  components: {
    BlogMainArticle,
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
.blog-main {
  margin: auto;
  width: 800px;
}
</style>
