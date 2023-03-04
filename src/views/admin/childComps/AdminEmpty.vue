<!--
 * @Description: 空路由组件
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-26 20:55:54
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-04 15:51:31
-->
<template>
  <router-view v-slot="{ Component }">
    <!-- 将页面数据缓存 -->
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
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
