<!--
 * @Description: 系统日志
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-04-06 14:57:24
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-07-01 21:06:44
-->
<template>
  <div class="admin-system-log">
    <img
      src="/admin/pages/adminSystemLog.png"
      alt=""
    >
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 系统日志
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminSystemLog',
});
</script>

<style lang="scss" scoped>
.admin-system-log {
  width: 100%;
  user-select: none;
  -webkit-user-drag: none;

  img {
    width: 100%;
  }
}
</style>
