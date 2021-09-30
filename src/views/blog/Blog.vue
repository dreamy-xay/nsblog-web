<!--
 * @Description: 博客主页
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-24 18:20:47
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-29 20:20:14
-->
<template>
  <div class="blog">
    <base-background :mask="false" />
    <div>
      <blog-main-article />
    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BlogMainArticle from '@/views/blog/childComps/blogMain/BlogMainArticle.vue';
import BaseBackground from '@/components/content/baseBackground/BaseBackground.vue';

/**
 * @description:
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'blog',
  components: {
    BaseBackground,
    BlogMainArticle,
  },
});
</script>

<style lang="scss" scoped>
.blog {
  width: 100%;
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
