<!--
 * @Description: 工作台页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-26 19:56:18
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-12 17:24:41
-->
<template>
  <admin-view class="admin-home-workbench">

  </admin-view>
</template>

<script>
import { defineComponent, ref } from 'vue';
import AdminView from '@/views/admin/childComps/AdminView.vue';

/**
 * @description: 工作台页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminHomeWorkbench',
  components: {
    AdminView,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.admin-home-workbench {
  height: 1000px;
}
</style>
