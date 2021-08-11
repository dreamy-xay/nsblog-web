<!--
 * @Description: 博客主页
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-11 19:03:08
-->

<template>
  <div class="home">
    <base-top-bar />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseTopBar from '@/components/content/baseTopBar/BaseTopBar';
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
    const { online, receiveMessage } = mapActions('message', ['receiveMessage', 'online']);

    // 用户上线了
    setTimeout(() => {
      online('dreamy');
    }, 3000);

    // 收到消息
    // 类型1
    receiveMessage({
      type: 1,
      callback(data) {
        console.log('message type: 1');
        console.log(data);
      },
    });
    // 类型1
    receiveMessage({
      type: 2,
      callback(data) {
        console.log('message type: 2');
        console.log(data);
      },
    });
    // 类型1
    receiveMessage({
      type: 3,
      callback(data) {
        console.log('message type: 3');
        console.log(data);
      },
    });
    // 类型1
    receiveMessage({
      type: 4,
      callback(data) {
        console.log('message type: 4');
        console.log(data);
      },
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
