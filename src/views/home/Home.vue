<!--
 * @Description: 博客主页
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-24 16:25:50
-->

<template>
  <div class="home">
    <base-top-bar />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseTopBar from '@/components/content/baseTopBar/BaseTopBar';
import { getUserInfo } from '@/network/api/user';

/**
 * @description: 博客主页
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'Home',
  components: {
    BaseTopBar,
  },
  mounted() {
    getUserInfo('dreamy')
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
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
