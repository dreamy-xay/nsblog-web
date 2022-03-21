<!--
 * @Description: 空路由组件
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-26 20:55:54
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-03-21 17:35:06
-->
<template>
  <router-view />
</template>

<script>
import { useLoadingBar } from 'naive-ui';
import { defineComponent, onMounted } from 'vue';

/**
 * @description: 空路由组件
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminEmpty',
  setup() {
    const loadingBar = useLoadingBar(); // naive-ui loadingBar
    loadingBar.start();

    onMounted(() => {
      loadingBar.finish();
    });

    return {};
  },
});
</script>
