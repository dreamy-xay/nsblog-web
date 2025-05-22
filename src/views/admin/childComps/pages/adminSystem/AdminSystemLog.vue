<!--
 * @Description: 系统日志
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-04-06 14:57:24
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-07-01 21:06:44
-->
<template>
  <admin-view class="admin-system-log">
    <img v-prefix
      src="/admin/pages/adminSystemLog.png"
      alt=""
    >
  </admin-view>
</template>

<script>
import { defineComponent } from 'vue';
import AdminView from '@/views/admin/childComps/AdminView.vue';

/**
 * @description: 系统日志
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminSystemLog',
  components: {
    AdminView,
  },
});
</script>

<style lang="scss" scoped>
.admin-system-log {
  user-select: none;
  -webkit-user-drag: none;

  img {
    width: 100%;
  }
}
</style>
