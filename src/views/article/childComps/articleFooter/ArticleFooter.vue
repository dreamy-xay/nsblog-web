<!--
 * @Description: 文章页面底部评论区
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-20 17:53:48
 * @LastEditors: clq
 * @LastEditTime: 2021-09-20 18:05:16
-->
<template>
  <div class="article-footer">
    <div class="article-footer-title">
      发表评论
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description:
 * @author: clq
 */

export default defineComponent({
  name: 'articleFooter',
});
</script>

<style lang="scss" scoped>
.article-footer {
  box-sizing: border-box;
  margin: 18px auto;
  width: 888px;
  height: 100px;
  padding: 14px 16px;
  background-color: $grey-0;
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;
  overflow: hidden;
  margin-top: 16px;

  .article-footer-title {
    margin-bottom: 16px;
    font-family: Arial;
    font-size: 20px;
    color: #000;
  }
}
</style>
