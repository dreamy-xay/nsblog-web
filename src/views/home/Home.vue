<!--
 * @Description: 博客主页
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: continue-hs
 * @LastEditTime: 2021-08-05 21:15:41
-->

<template>
  <div class="home">
    <base-top-bar />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseTopBar from '@/components/content/baseTopBar/BaseTopBar';

/**
 * @description: 博客主页
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'Home',
  components: {
    BaseTopBar,
  },
});
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
}
</style>
