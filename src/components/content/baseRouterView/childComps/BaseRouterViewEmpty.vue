<!--
 * @Description: 基础路由空视图组件
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2023-03-16 14:31:34
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-16 14:35:22
-->

<template>
  <div class="base-router-view-empty">
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 基础路由空视图组件
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'base-router-view-empty',
});
</script>

<style lang="scss" scoped>
.base-router-view-empty {
  display: none;
}
</style>
