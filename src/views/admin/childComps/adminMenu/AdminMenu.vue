<!--
 * @Description: 管理员页面菜单
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-26 19:06:03
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-14 21:07:16
-->
<template>
  <div class="admin-menu">
    <div class="admin-menu-main">
      <a
        class="main-icon"
        href="/"
        target="_self"
      >
        <img
          src="/favicon.ico"
          alt="nsblog icon"
        >
      </a>
      <div class="main-inner">
        <div
          class="menu-item"
          v-for="(item, index) in menuList"
          :class="{'menu-item-active': activeIndex === index}"
          :key="index"
          role="button"
          @click="goto(item)"
        >
          <div class="icon">
            <i
              class="iconfont"
              :class="item.icon"
            ></i>
          </div>
          {{ item.title }}
        </div>
      </div>
    </div>
    <div class="admin-menu-sub">
      <admin-sub-menu
        ref="subMenuRef"
        :is-super="isSuper"
        :menu-data="activeIndex !== -1 ? menuList[activeIndex] : {children: []}"
        :admin-routes="adminRoutes"
      />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref, watch } from 'vue';
import AdminSubMenu from '@/views/admin/childComps/adminMenu/childComps/AdminSubMenu.vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import { mapState } from '@/util/store';
import { searchMenuRoute } from '@/util/router';

/**
 * @description: 管理员页面菜单
 * @param {Boolean} isSuper 是否超级管理员 `默认为 false`
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminMenu',
  components: {
    AdminSubMenu,
  },
  props: {
    isSuper: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute(); // route
    const subMenuRef = ref(null); // 子菜单ref
    const activeIndex = ref(-1); // 激活菜单

    const { adminRoutes } = mapState('global', ['adminRoutes']); // 获取adminRoutes
    // 计算显示的菜单列表
    const menuList = computed(() => {
      return props.isSuper ? adminRoutes.value : adminRoutes.value.filter((route) => !route.super);
    });

    /**
     * @description: 获取更新激活菜单索引
     * @param {string} name 当前路由名称 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function updateActiveIndex(name) {
      // 获取菜单子列表项路由名称
      function get(routes) {
        const nameList = [];
        for (const route of routes) {
          nameList.push(route.name);
          nameList.push(...get(route.children));
        }
        return nameList;
      }

      const list = menuList.value; // 当前菜单
      let ok = false; // 是否激活

      for (let i = 0; i < list.length; ++i)
        if (list[i].name === name || get(list[i].children).includes(name)) {
          activeIndex.value = i;
          ok = true;
          break;
        }
      if (!ok) activeIndex.value = -1;
    }
    // 初始化激活
    updateActiveIndex(route.name);

    // 监听路由
    watch(() => route.name, updateActiveIndex);

    /**
     * @description: 前往路由
     * @param {RouteInfo} currentRoute 路由数据 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function goto(currentRoute) {
      // 查找上一个路由
      const preRoute = searchMenuRoute((r) => r.name === route.name, menuList.value);
      // 下一步执行函数
      const next = () => {
        router.push({ name: currentRoute.name }).then(() => {
          if (subMenuRef.value) {
            // 更新子菜单
            subMenuRef.value.setSubMenuStatus(true);
            // subMenuRef.value.resetSubMenuItemStatus(); // watch route 中已经实现
          }
        });
      };
      if (preRoute['beforeToggle']) preRoute.beforeToggle(next);
      else next();
    }

    return {
      subMenuRef,
      menuList,
      activeIndex,
      adminRoutes,
      goto,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-menu {
  height: 100%;
  display: inline-flex;
  box-shadow: $shadow-0;

  .admin-menu-main {
    height: 100%;
    width: 64px;
    overflow: hidden;

    .main-icon {
      height: 60px;
      width: 100%;
      @include flex(center, center);
      background-color: #034291;
      user-select: none;

      img {
        width: 32px;
        height: 32px;
      }
    }

    .main-inner {
      height: calc(100% - 60px);
      width: 100%;
      background: url('/admin/menu-background.png') no-repeat;
      background-size: auto 100%;
      overflow-y: auto;
      overflow-x: hidden;
      transition: 0.25s;

      &::-webkit-scrollbar {
        width: 0;
        opacity: 0;
      }

      .menu-item {
        margin: 10px 5px;
        width: 54px;
        height: 54px;
        border-radius: $border-radius-1;
        @include flex(center, center, column);
        color: $grey-0;
        font-size: 14px;
        transition: 0.25s;

        &:first-child {
          margin-top: 5px;
        }

        &:last-child {
          margin-bottom: 5px;
        }

        &.menu-item-active {
          background-color: rgba($grey-11, 0.3);
        }

        .icon {
          height: 20px;
          @include flex(center);
          margin-bottom: 2px;

          .iconfont {
            font-size: 18px;
          }
        }
      }
    }
  }

  .admin-menu-sub {
    height: 100%;
    overflow: hidden;
  }
}
</style>
