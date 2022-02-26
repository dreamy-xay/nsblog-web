<!--
 * @Description: 管理员页面子菜单
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-26 22:42:44
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-26 23:40:54
-->
<template>
  <div
    class="admin-sub-menu"
    v-if="menuData.children.length"
  >
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
        :class="{'menu-item-active': activeIndex === index}"
        :key="index"
        role="button"
        @click="goto(item.name)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';

/**
 * @description: 管理员页面子菜单
 * @param {Boolean} 是否超级管理员 `必传参数`
 * @param {Array} menuList 子菜单列表 `默认为 []`
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'admiSubMenu',
  props: {
    super: {
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

    const activeIndex = ref(-1); // 激活菜单

    // 计算显示的菜单列表
    const menuList = computed(() => {
      return props.isSuper ? props.menuData.children : props.menuData.children.filter((route) => !route.super);
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
     * @param {string} routeName 路由名称
     * @return {void}
     * @author: dreamy-xay
     */
    function goto(routeName) {
      router.push({ name: routeName });
    }

    return {
      menuList,
      activeIndex,
      goto,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-sub-menu {
  width: 202px;
  height: 100%;
  overflow-y: hidden;
  overflow-x: auto;
  background-color: $grey-0;

  &::-webkit-scrollbar {
    width: 0;
    opacity: 0;
  }

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
      transition: 0.25s;
      margin-bottom: 5px;

      &:last-child {
        margin-bottom: 0;
      }

      &.menu-item-active {
        background-color: rgba($blue-1, 0.14);
      }
    }
  }
}
</style>
