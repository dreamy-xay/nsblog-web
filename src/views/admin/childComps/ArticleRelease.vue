<!--
 * @Description: 文章编辑发布页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-12 16:03:06
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-12 22:38:37
-->

<template>
  <admin-window
    title="文章"
    bind-class="article-release"
    ref="adminWindow"
  >
    7777
  </admin-window>
</template>

<script lang="ts">
import AdminWindow from '@/components/common/AdminWindow.vue';

/**
 * @description: 文章编辑发布页面
 * @author: dreamy-xay
 */

export default {
  name: 'articleRelease',
  mounted() {
    (this as any).$refs.adminWindow.push('发布');
  },
  components: { AdminWindow },
};
</script>

<style lang="scss" scoped>
.article-release {
  font-size: 100px;
}
</style>
