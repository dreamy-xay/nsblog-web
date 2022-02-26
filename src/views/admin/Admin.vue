<!--
 * @Description: 后台管理页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-21 20:02:51
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-26 21:52:45
-->
<template>
  <div class="admin">
    <div :style="{width:openMenu ? '700px' : '1000px',transition:'.25s'}">
      <admin-head @change-menu="changeMenu" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import AdminHead from '@/views/admin/childComps/adminHead/AdminHead.vue';

/**
 * @description: 后台管理页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'admin',
  components: { AdminHead },
  setup() {
    const openMenu = ref(false);

    function changeMenu() {
      openMenu.value = !openMenu.value;
    }
    return { changeMenu, openMenu };
  },
});
</script>

<style lang="scss" scoped>
.admin {
}
</style>
