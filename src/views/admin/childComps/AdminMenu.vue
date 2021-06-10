<!--
 * @Description: 管理员界面右侧栏菜单
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 12:02:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-10 09:54:19
-->

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
            <span slot="title">{{(item.icon !== '' && isCollapse ? '　' : '') + subitem.title}}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          v-if="item.child.length === 0"
          :index="item.url"
          :key="index"
        >
          <i
            :class="'iconfont ' + item.icon"
            style="margin-right: 15px;"
            v-if="item.icon !== ''"
          ></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
/**
 * @description: 管理员界面右侧栏菜单
 * @param {Boolean} isCollapse 菜单是否折叠 `必传参数`
 * @param {Array} menuList 自定义菜单列表，默认格式 [{title,icon,url,child:[{title,icon,url},...]},...] `必传参数`
 * @param {Boolean} activeFirst 是否首次激活第一项菜单 `默认true`
 * @author: dreamy-xay
 */

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
