<!--
 * @Description: 管理员页面子菜单
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-26 22:42:44
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-03-21 17:36:48
-->
<template>
  <div
    class="admin-sub-menu"
    :style="{width: widthShow && showSubMenu ? '202px' : 0}"
  >
    <div class="admin-sub-menu-container">
      <div class="admin-sub-menu-head">
        <a
          class="logo"
          href="/admin"
          target="_self"
        >
          NSBlog Admin
        </a>
        <div class="title">
          <n-divider>
            {{ menuData.title }}
          </n-divider>
        </div>
      </div>
      <div class="admin-sub-menu-inner">
        <div
          class="menu-item"
          v-for="item in menuList"
          :key="item.name"
        >
          <admin-sub-menu-item
            :item="item"
            :active="activeRouteName === item.name"
            :rank="0"
            :expand="Boolean(!itemClose[item.name])"
            @itemClick="itemClick"
          />
          <div
            v-if="item.children.length"
            class="menu-item-sub"
            :class="{'menu-item-sub-close': Boolean(itemClose[item.name])}"
            :style="{height: item.children.length * 55 + 'px'}"
          >
            <admin-sub-menu-item
              v-for="subItem in item.children"
              :key="subItem.name"
              :item="subItem"
              :active="activeRouteName === subItem.name"
              :rank="1"
              @itemClick="itemClick"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, ref, watch } from 'vue';
import AdminSubMenuItem from '@/views/admin/childComps/adminMenu/childComps/AdminSubMenuItem.vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import events from '@/events';

/**
 * @description: 管理员页面子菜单
 * @param {Boolean} isSuper 是否超级管理员 `必传参数`
 * @param {Array} menuList 子菜单列表 `默认为 []`
 * @method setSubMenuStatus 设置子菜单显示状态 (isShow: boolean = null) => void
 * @method resetSubMenuItemStatus 重置子菜单项展开状态 () => void
 * @events AdmiSubMenu-subMenuChange 子菜单改变状态 (show: boolean) => void
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'admiSubMenu',
  components: {
    AdminSubMenuItem,
  },
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
    const itemClose = reactive({}); // 菜单是否关闭

    // 计算显示的菜单列表
    const menuList = computed(() => {
      return props.isSuper ? props.menuData.children : props.menuData.children.filter((route) => !route.super);
    });

    // 计算子菜单是否显示
    const widthShow = computed(() => {
      return props.menuData.children.length ? true : false;
    });

    // 监听
    events.emit('AdmiSubMenu-subMenuChange', widthShow.value, showSubMenu.value);
    watch(
      () => [widthShow.value, showSubMenu.value],
      () => {
        events.emit('AdmiSubMenu-subMenuChange', widthShow.value, showSubMenu.value);
      }
    );

    // 监听路由
    watch(
      () => route.name,
      (name) => {
        activeRouteName.value = name;
      }
    );

    /**
     * @description: item 点击触发
     * @param {object} route 路由数据 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function itemClick(route) {
      if (route.children.length) itemClose[route.name] = itemClose[route.name] ? !itemClose[route.name] : true;
      else if (route['beforeToggle'])
        route.beforeToggle(() => {
          router.push({ name: route.name });
        });
      else router.push({ name: route.name });
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

    /**
     * @description: 重置子菜单项展开状态
     * @return {void}
     * @author: dreamy-xay
     */
    function resetSubMenuItemStatus() {
      for (const key in itemClose) itemClose[key] = false;
    }

    // 监听全局修改事件
    events.on('AdminNavigation-changeMenu', setSubMenuStatus);

    return {
      widthShow,
      menuList,
      activeRouteName,
      itemClose,
      itemClick,
      resetSubMenuItemStatus,
      setSubMenuStatus,
      showSubMenu,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-sub-menu {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  transition: 0.25s;
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
      user-select: none;
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
          cursor: default;
        }

        :deep(.n-divider__line) {
          background-color: $grey-5;
          height: 0.5px;
        }
      }
    }

    .admin-sub-menu-inner {
      padding: 20px 10px;
      padding-bottom: 0;
      width: calc(100% - 20px);
      @include flex(center, center, column);

      .menu-item {
        width: 100%;
        @include flex(center, center, column);

        .menu-item-sub {
          width: 100%;
          overflow: hidden;
          transition: 0.25s ease-in-out;

          &.menu-item-sub-close {
            height: 0 !important;
          }
        }
      }
    }
  }
}
</style>
