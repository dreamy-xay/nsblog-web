<!--
 * @Description: 管理员界面右侧栏菜单
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 12:02:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-19 13:51:59
-->

<template>
  <div class="admin-menu">
    <el-menu
      class="admin-menu-el"
      :collapse="isCollapse"
      :background-color="styles.adminMenuBackgroundColor"
      :text-color="styles.adminMenuTextColor"
      :default-active="defaultActive"
      :active-text-color="styles.adminMenuActiveTextColor"
      ref="adminMenuEl"
    >
      <template v-for="(item,index) in menuList">
        <el-submenu
          v-if="item.child && item.child.length > 0"
          :index="item.url"
          :key="index"
          popper-class="admin-menu-el-popper"
        >
          <template #title>
            <i
              v-if="item.icon !== ''"
              :class="'iconfont ' + item.icon"
            ></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <el-menu-item
            v-for="(subitem, subindex) in item.child"
            :index="subitem.url"
            :key="subindex"
            @click="callback(index, subindex)"
          >
            <i :class="'iconfont ' + subitem.icon"></i>
            <span slot="title">{{subitem.title}}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          v-if="!item.child"
          :index="item.url"
          :key="index"
          @click="callback(index, -1)"
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
import Vue from 'vue';
import styles from '@/assets/style/define.scss';

/**
 * @description: 管理员界面右侧栏菜单
 * @param {Boolean} isCollapse 菜单是否折叠 `必传参数`
 * @param {Array} menuList 自定义菜单列表，默认格式 [{title,icon,url,child:[{title,icon,url},...]},destory,...] `必传参数`
 * @author: dreamy-xay
 */

export default Vue.extend({
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
  },
  data() {
    return {
      styles,
      preIndex: [0, -1],
    };
  },
  methods: {
    callback(index: number, subindex: number): void {
      const pre: number[] = this.preIndex;
      const menuList: any = this.menuList;
      const currentMenuItem = subindex < 0 ? menuList[index] : menuList[index].child[subindex];

      const preMenuItem = pre[1] < 0 ? menuList[pre[0]] : menuList[pre[0]].child[pre[1]];
      if (preMenuItem.destory) {
        (this.$refs.adminMenuEl as any).updateActiveIndex(preMenuItem.url);
        preMenuItem.destory(() => {
          if (this.$route.path !== currentMenuItem.url) {
            this.preIndex = [index, subindex];
            this.$router.push(currentMenuItem.url);
          }
        });
      } else if (this.$route.path !== currentMenuItem.url) {
        this.preIndex = [index, subindex];
        this.$router.push(currentMenuItem.url);
      }
    },
  },
  created() {
    // 查询preIndex
    let flag: boolean;
    const path: string = this.$route.path;
    const menuList: any = this.menuList;
    for (let i: number = 0; i < this.menuList.length; ++i) {
      if (menuList[i].url === path) {
        this.preIndex = [i, -1];
        break;
      } else if (menuList[i].child) {
        flag = false;
        for (let j: number = 0; j < menuList[i].child.length; ++j)
          if (menuList[i].child[j].url === path) {
            flag = true;
            this.preIndex = [i, j];
            break;
          }
        if (flag) break;
      }
    }
  },
  computed: {
    defaultActive() {
      return this.menuList.length ? this.$route.path : '';
    },
  },
});
</script>

<style lang="scss" scoped>
.admin-menu {
  width: 100%;
  height: 100%;
  background-color: $admin-menu-background-color;

  .admin-menu-el:not(.el-menu--collapse) {
    width: 210px;
  }

  .iconfont {
    font-size: 20px;
    margin-right: 15px;
  }
}
</style>

<style lang="scss">
.admin-menu-el-popper {
  .iconfont {
    margin-right: 15px;
  }
}
</style>
