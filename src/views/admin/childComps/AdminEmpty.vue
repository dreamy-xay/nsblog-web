<!--
 * @Description: 空路由组件
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-26 20:55:54
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-04-10 14:35:28
-->
<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue';
import { useLoadingBar } from 'naive-ui';
import { waitImageLoaded } from '@/util/dom';

/**
 * @description: 空路由组件
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminEmpty',
  setup() {
    const loadingBar = useLoadingBar(); // naive-ui loadingBar
    loadingBar.start(); // 开始加载

    // 等待页面全部资源加载完毕
    window.onload = () =>
      waitImageLoaded()
        .then(() => setTimeout(() => loadingBar.finish(), 0))
        .catch(() => setTimeout(() => loadingBar.error(), 0));

    return {};
  },
});
</script>
