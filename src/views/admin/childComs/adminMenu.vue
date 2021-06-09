<template>
  <div class="admin-menu">
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
    >
      <el-submenu
        index="1"
        :show-timeout="2000"
        :hide-timeout="2000"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item
        index="2"
        :show-timeout="2000"
        :hide-timeout="2000"
      >
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item
        index="3"
        :show-timeout="2000"
        :hide-timeout="2000"
      >
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item
        index="4"
        :show-timeout="2000"
        :hide-timeout="2000"
      >
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
export default {
  name: 'adminMenu',
  props: {
    isCollapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.admin-menu {
  width: 100%;
  height: 100%;

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 210px;
  }
}
</style>
