<!--
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-10 11:25:27
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-12 22:46:17
-->

<template>
  <admin-window
    bind-class="data-analyze"
    title="仪表盘"
  >
    仪表盘
  </admin-window>
</template>

<script lang="ts">
import AdminWindow from '@/components/common/AdminWindow.vue';

/**
 * @description: 数据统计
 * @author: dreamy-xay
 */

export default {
  name: 'dataAnalyze',
  components: {
    AdminWindow,
  },
};
</script>

<style lang="scss" scoped>
.data-analyze {
  font-size: 30px;
}
</style>
