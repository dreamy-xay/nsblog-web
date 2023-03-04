<!--
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-26 19:56:18
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-04 17:07:02
-->
<template>
  <admin-view class="admin-dashboard">
  </admin-view>
</template>

<script>
import { defineComponent } from 'vue';
import AdminView from '@/views/admin/childComps/AdminView.vue';

/**
 * @description: 仪表盘
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminDashboard',
  components: {
    AdminView,
  },
});
</script>

<style lang="scss" scoped>
.admin-dashboard {
  height: 100px;
}
</style>
