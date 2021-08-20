<!--
 * @Description: 博客主页
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-20 16:02:23
-->

<template>
  <div class="home">
    <base-top-bar />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseTopBar from '@/components/content/baseTopBar/BaseTopBar.vue';
import { mapActions } from '@/util/store';

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
    const { online, notice } = mapActions('message', ['notice', 'online']);

    // 用户上线了
    setTimeout(() => {
      online('dreamy');
    }, 3000);

    // 收到消息
    // 类型1
    notice((type) => {
      console.log(`message type: ${type}`);
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
