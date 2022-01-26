<!--
 * @Description: 文章模块
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-16 16:32:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-26 17:58:04
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-10-02 10:14:24
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
 * @description: 文章模块
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'article',
});
</script>

<style lang="scss" scoped>
</style>
