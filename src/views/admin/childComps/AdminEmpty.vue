<!--
 * @Description: 空路由组件
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-26 20:55:54
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-13 18:06:36
-->
<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 空路由组件
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminEmpty',
});
</script>
