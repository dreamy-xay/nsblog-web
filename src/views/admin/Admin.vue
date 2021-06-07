<template>
  <div class="admin">

  </div>
</template>

<script lang="ts">
import { verifyToken } from '@/network/token';

export default {
  name: 'Admin',
  beforeCreate() {
    if (!verifyToken().status) (this as any).$router.replace({ path: '/admin/login' });
  },
};
</script>

<style lang="scss" scoped>
</style>
