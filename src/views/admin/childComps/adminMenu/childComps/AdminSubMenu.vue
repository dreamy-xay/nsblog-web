<!--
 * @Description: 管理员页面子菜单
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-26 22:42:44
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-27 22:04:46
-->
<template>
  <div
    class="admin-sub-menu"
    :style="{width: menuData.children.length && showSubMenu ? '202px' : 0}"
  >
    <div class="admin-sub-menu-container">
      <div class="admin-sub-menu-head">
        <div class="logo">
          NSBlog Admin
        </div>
        <div class="title">
          <n-divider>
            {{ menuData.title }}
          </n-divider>
        </div>
      </div>
      <div class="admin-sub-menu-inner">
        <div
          class="menu-item"
          v-for="(item, index) in menuList"
          :class="{'menu-item-active': activeRouteName === item.name}"
          :key="index"
          role="button"
          @click="goto(item.name)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import events from '@/events';

/**
 * @description: 管理员页面子菜单
 * @param {Boolean} isSuper 是否超级管理员 `必传参数`
 * @param {Array} menuList 子菜单列表 `默认为 []`
 * @method setSubMenuStatus 设置子菜单显示状态 (isShow: boolean = null) => void
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'admiSubMenu',
  props: {
    isSuper: {
      type: Boolean,
      required: true,
    },
    menuData: {
      type: Object,
      default: () => ({ children: [] }),
    },
  },
  setup(props) {
    const route = useRoute(); // route
    const showSubMenu = ref(true); // 显示子菜单
    const activeRouteName = ref(route.name); // 激活菜单名

    // 计算显示的菜单列表
    const menuList = computed(() => {
      if (!props.menuData.children.length) {
        events.emit('AdminNavigation-changeMenu');
        console.log(123);
      }
      return props.isSuper ? props.menuData.children : props.menuData.children.filter((route) => !route.super);
    });

    // 监听路由
    watch(
      () => route.name,
      (name) => {
        activeRouteName.value = name;
      }
    );

    /**
     * @description: 前往路由
     * @param {string} routeName 路由名称 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function goto(routeName) {
      router.push({ name: routeName });
    }

    /**
     * @description: 设置子菜单显示状态
     * @param {boolean} isShow 是否显示，为null时为当前显示状态取反 `默认为 null`
     * @return {void}
     * @author: dreamy-xay
     */
    function setSubMenuStatus(isShow = null) {
      showSubMenu.value = isShow === null ? !showSubMenu.value : isShow;
    }

    // 监听全局修改事件
    events.on('AdminNavigation-changeMenu', setSubMenuStatus);

    return {
      showSubMenu,
      menuList,
      activeRouteName,
      goto,
      setSubMenuStatus,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-sub-menu {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  transition: 0.25s ease-out;
  background-color: $grey-0;

  &::-webkit-scrollbar {
    width: 0;
    opacity: 0;
  }

  .admin-sub-menu-container {
    width: 202px;
    overflow: hidden;

    .admin-sub-menu-head {
      height: 60px;
      width: 100%;
      position: relative;

      .logo {
        height: 100%;
        width: 100%;
        @include flex(center, center);
        font-size: 20px;
        color: $grey-9;
        font-weight: 300;
      }

      .title {
        position: absolute;
        width: calc(100% - 20px);
        padding: 0 10px;
        height: 20px;
        left: 0;
        bottom: -10px;
        @include flex(center);

        :deep(.n-divider__title) {
          color: $grey-8;
          font-size: 14px;
        }

        :deep(.n-divider__line) {
          background-color: $grey-5;
          height: 0.5px;
        }
      }
    }

    .admin-sub-menu-inner {
      padding: 20px 10px;
      width: calc(100% - 20px);
      @include flex(center, center, column);

      .menu-item {
        height: 50px;
        width: 100%;
        border-radius: $border-radius-1;
        transition: background-color 0.25s, color 0.25s;
        background-color: $grey-0;
        margin-bottom: 5px;
        color: $grey-8;

        &:last-child {
          margin-bottom: 0;
        }

        &.menu-item-active {
          color: $blue-2;
          background-color: rgba($blue-1, 0.14);
        }
      }
    }
  }
}
</style>
