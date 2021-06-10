<!--
 * @Description: 博客主页
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-10 19:56:00
-->

<template>
  <div class="home">
    <a
      role="button"
      href="/admin"
      style="display:flex;  text-align: center; justify-content: center; margin: 300px auto; width: 200px; height: 30px; background: #eeeeee; font-size: 20px"
    >
      前往后台管理页面
    </a>
  </div>
</template>

<script lang="ts">
/**
 * @description: 博客主页
 * @author: dreamy-xay
 */

export default {
  name: 'Home',
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
}
</style>
