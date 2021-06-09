<template>
  <div class="admin">
    <admin-top-bar></admin-top-bar>
    <admin-menu></admin-menu>
  </div>
</template>

<script lang="ts">
import { verifyToken } from '@/network/token';
import adminMenu from '@/views/admin/childComs/adminMenu.vue';
import adminTopBar from '@/views/admin/childComs/adminTopBar.vue';

export default {
  name: 'Admin',
  beforeCreate() {
    // return;
    if (!verifyToken().status) (this as any).$router.replace({ path: '/admin/login' });
  },
  components: {
    adminMenu,
    adminTopBar,
  },
};
</script>

<style lang="scss" scoped>
</style>
