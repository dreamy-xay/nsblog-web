<template>
  <div class="admin-menu">
    <el-menu
      class="admin-menu-el"
      :collapse="isCollapse"
      background-color="#252636"
      text-color="#d1d5db"
      :default-active="menuList.length && activeFirst ? menuList[0].url : ''"
      active-text-color="#ffffff"
      :router="true"
    >
      <template v-for="(item,index) in menuList">
        <el-submenu
          v-if="item.child.length > 0"
          :index="item.url"
          :key="index"
        >
          <template #title>
            <i
              :class="'iconfont ' + item.icon"
              v-if="item.icon !== ''"
            ></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <el-menu-item
            v-for="(subitem, subindex) in item.child"
            :index="subitem.url"
            :key="subindex"
          >
            <i :class="'iconfont ' + subitem.icon"></i>
            <span slot="title">{{subitem.title}}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          v-if="item.child.length === 0"
          :index="item.url"
          :key="index"
        >
          <i
            :class="'iconfont ' + item.icon"
            v-if="item.icon !== ''"
          ></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </template>
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
    menuList: {
      type: Array,
      required: true,
    },
    activeFirst: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-menu {
  width: 100%;
  height: 100%;
  background-color: #252636;

  .admin-menu-el:not(.el-menu--collapse) {
    width: 210px;
  }

  .iconfont {
    font-size: 20px;
    margin-right: 15px;
  }
}
</style>
