<!--
 * @Description: 文章详情
 * @Version:
 * @Autor: clqf
 * @Date: 2021-09-14 17:32:49
 * @LastEditors: clq
 * @LastEditTime: 2021-09-16 12:02:15
-->
<template>
  <div class="user-article-item">
    <div class="user-article-item-body">
      {{articleInfo.title}}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 文章详情组件
 * @param {Object} articleInfo 文章详细信息
 * @author: clq
 */
export default defineComponent({
  name: 'UserArticleItem',
  props: {
    articleInfo: {
      type: Object,
      default: null,
    },
  },
});
</script>

<style lang="scss" scoped>
.user-article-item {
  box-sizing: border-box;
  width: 890px;
  height: 145px;
  margin-bottom: 16px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: $shadow-0;
}
</style>
