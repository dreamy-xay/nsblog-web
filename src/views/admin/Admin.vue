<template>
  <div class="admin">
    <div
      class="admin-left"
      :style="{width: menuWidth + 'px'}"
    >
      <admin-menu :is-collapse="menuCollapse"></admin-menu>
    </div>
    <div
      class="admin-right"
      :style="{width: 'calc(100% - ' + menuWidth + 'px)'}"
    >
      <admin-top-bar @mainMenuClick="topBarMenuClick"></admin-top-bar>
      <div class="right-content">

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { verifyToken } from '@/network/token';
import adminMenu from '@/views/admin/childComs/adminMenu.vue';
import adminTopBar from '@/views/admin/childComs/adminTopBar.vue';

export default {
  name: 'Admin',
  data() {
    return {
      menuCollapse: false,
      menuWidth: 210,
    };
  },
  watch: {
    menuCollapse(isCollapse: boolean) {
      (this as any).menuWidth = isCollapse ? 64 : 210;
    },
  },
  methods: {
    topBarMenuClick() {
      (this as any).menuCollapse = !(this as any).menuCollapse;
    },
  },
  beforeCreate() {
    return;
    if (!verifyToken().status) (this as any).$router.replace({ path: '/admin/login' });
  },
  components: {
    adminMenu,
    adminTopBar,
  },
};
</script>

<style lang="scss" scoped>
.admin {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .admin-left {
    height: 100%;
    float: left;
    background-color: red;
    transition: all 0.3s ease-in-out;
  }

  .admin-right {
    width: calc(100% - 210px);
    height: 100%;
    float: right;
    transition: all 0.3s ease-in-out;

    .right-content {
      height: 1000px;
      width: 100%;
    }
  }
}
</style>
