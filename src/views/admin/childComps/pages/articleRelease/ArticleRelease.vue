<!--
 * @Description: 文章编辑发布页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-12 16:03:06
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-17 15:24:23
-->

<template>
  <admin-window
    title="文章"
    bind-class="article-release"
    ref="adminWindow"
  >
    <article-release-edit></article-release-edit>
  </admin-window>
</template>

<script lang="ts">
import AdminWindow from '@/components/common/AdminWindow.vue';
import ArticleReleaseEdit from '@/views/admin/childComps/pages/articleRelease/childComps/ArticleReleaseEdit.vue';

/**
 * @description: 文章编辑发布页面
 * @author: dreamy-xay
 */

export default {
  name: 'articleRelease',
  mounted() {
    (this as any).$refs.adminWindow.push('发布');
  },
  components: {
    AdminWindow,
    ArticleReleaseEdit,
  },
};
</script>

<style lang="scss" scoped>
.article-release {
  background-color: transparent;
}
</style>
