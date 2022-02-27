<!--
 * @Description: admin头部
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-02-22 10:20:59
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-27 18:43:50
-->
<template>
  <div class="admin-head">
    <admin-navigation />
    <admin-tab />
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import AdminNavigation from '@/views/admin/childComps/adminHead/childComps/AdminNavigation.vue';
import AdminTab from '@/views/admin/childComps/adminHead/childComps/AdminTab.vue';

/**
 * @description:头部
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'adminHead',
  components: { AdminNavigation, AdminTab },
  setup(_, content) {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.admin-head {
  // width: 600px;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  // width: calc(100% - 266px);
}
</style>
