<!--
 * @Description: 基础路由视图组件
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2023-03-16 14:02:28
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-18 20:35:53
-->

<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="cachedRouteNameList">
      <component
        v-if="cachedRouteNames[route.name]"
        :is="route.meta['iframe'] ? 'BaseRouterViewEmpty' : Component"
        :key="route.name"
      />
    </keep-alive>
  </router-view>
  <template v-if="iframe">
    <template
      v-for="iframeRoute in iframeRoutes"
      :key="iframeRoute.name"
    >
      <component
        v-if="cachedRouteNames[iframeRoute.name]"
        v-show="$route.name === iframeRoute.name"
        :is="iframeRoute.name"
        :key="iframeRoute.name"
      />
    </template>
  </template>
</template>

<script>
import { defineComponent, computed, getCurrentInstance, defineAsyncComponent, watch, onBeforeMount } from 'vue';
import BaseRouterViewEmpty from '@/components/content/baseRouterView/childComps/BaseRouterViewEmpty.vue';
import { useRoute } from 'vue-router';

/**
 * @description: 基础路由视图组件
 * @param {Boolean} iframe 是否启用 iframe 模式（在keepAlive下iframe也能正常缓存） `默认为 true`
 * @param {Array} routes 计算 iframe 模式所映射的路由 `必传参数`
 * @param {Object} cachedRouteNames 所有缓存的路由的名字 `必传参数`
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseRouterView',
  // inheritAttrs: false, // 取消内联属性
  props: {
    iframe: {
      type: Boolean,
      default: true,
    },
    routes: {
      type: Array,
      required: true,
    },
    cachedRouteNames: {
      type: Object,
      required: true,
    },
  },
  components: {
    BaseRouterViewEmpty,
  },
  setup(props) {
    const route = useRoute(); // 获取当前路由
    const componentInstance = getCurrentInstance(); // 当前组件接口ss

    /**
     * @description: 平铺路由
     * @param {RouteInfo[]} routes 路由列表 `必传参数`
     * @return {RouteInfo[]} 返回平铺路由
     * @author: dreamy-xay
     */
    function tileRoute(routes) {
      const routeList = [];
      for (const route of routes) {
        routeList.push(route);
        routeList.push(...tileRoute(route.children));
      }
      return routeList;
    }

    /**
     * @description: 平铺并获取所有缓存的菜单对应的页面组件名字列表
     * @param {RouteInfo[]} routes 路由列表 `必传参数`
     * @return {string[]} 返回平铺路由名称
     * @author: dreamy-xay
     */
    function getNames(routes) {
      const nameList = [];
      for (const route of routes) {
        if (route.children.length) nameList.push(...getNames(route.children));
        else if (!route.noCache) nameList.push(route.name);
      }
      return nameList;
    }

    // 计算所有缓存的路由
    const cachedRouteNameList = computed(() => {
      return getNames(props.routes).filter((routeName) => props.cachedRouteNames[routeName]);
    });

    // 计算 iframe的组件路由
    const iframeRoutes = computed(() => {
      if (props.iframe) return tileRoute(props.routes).filter((route) => route.meta['iframe']);
      else return [];
    });

    /**
     * @description: 动态注册未注册的页面组件
     * @param {string} routeName 路由名称
     * @return {void}
     * @author: dreamy-xay
     */
    function registerIframeComponent(routeName) {
      // 如果该组件未祖注册过
      if (!componentInstance.components[routeName]) {
        const routeIndex = iframeRoutes.value.findIndex((route) => route.name === routeName);
        // 如果是iframe组件，并且没有组册则注册
        if (routeIndex !== -1)
          componentInstance.components[routeName] = defineAsyncComponent(
            iframeRoutes.value[routeIndex].route.component
          );
      }
    }

    // 初始化注册
    onBeforeMount(() => registerIframeComponent(route.name));

    // 监听动态更新
    watch(() => route.name, registerIframeComponent);

    return {
      cachedRouteNameList,
      iframeRoutes,
    };
  },
});
</script>
