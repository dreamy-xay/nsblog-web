<!--
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-12 16:03:06
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-12 21:41:56
-->

<template>
  <admin-window
    title="文章"
    bind-class="article-release"
    ref="adminWindow"
  >
    djsabdk
  </admin-window>
</template>

<script lang="ts">
import AdminWindow from '@/components/common/AdminWindow.vue';
export default {
  name: 'articleRelease',
  mounted() {
    (this as any).$refs.adminWindow.push('发布');
  },
  components: { AdminWindow },
};
</script>

<style lang="scss" scoped>
</style>
