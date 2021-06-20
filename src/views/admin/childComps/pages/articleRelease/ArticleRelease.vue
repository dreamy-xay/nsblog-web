<!--
 * @Description: 文章编辑发布页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-12 16:03:06
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-19 23:53:56
-->

<template>
  <admin-window
    title="文章"
    bind-class="article-release"
    ref="adminWindow"
  >
    <article-release-form
      :types="types"
      :categories="categories"
    />
    <article-release-edit icons="default" />
  </admin-window>
</template>

<script lang="ts">
import Vue from 'vue';
import AdminWindow from '@/components/common/AdminWindow.vue';
import ArticleReleaseForm from '@/views/admin/childComps/pages/articleRelease/childComps/ArticleReleaseForm.vue';
import ArticleReleaseEdit from '@/views/admin/childComps/pages/articleRelease/childComps/ArticleReleaseEdit.vue';

/**
 * @description: 文章编辑发布页面
 * @author: dreamy-xay
 */

export default Vue.extend({
  name: 'articleRelease',
  data() {
    return {
      types: [
        { value: 0, label: '博文' },
        { value: 1, label: '随笔' },
        { value: 2, label: '日记' },
        { value: 3, label: '作品' },
      ],
      categories: [
        { value: 0, label: 'C++' },
        { value: 1, label: 'Java' },
      ],
    };
  },
  mounted() {
    (this.$refs.adminWindow as any).push('发布');
  },
  components: {
    AdminWindow,
    ArticleReleaseForm,
    ArticleReleaseEdit,
  },
});
</script>

<style lang="scss" scoped>
.article-release {
  background-color: transparent;
}
</style>
