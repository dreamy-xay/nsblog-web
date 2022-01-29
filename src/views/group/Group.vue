<!--
 * @Description: 学习小组模块
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-22 15:58:15
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-29 14:40:39
-->
<template>
  <div class="group">
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 学习小组模块
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'group',
});
</script>

<style lang="scss" scoped>
.group {
  width: 100%;
}
</style>
