<!--
 * @Description: 背景墙组件
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-04 18:57:55
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-04 19:04:10
-->
<template>
  <div class="base-background">
    <div class="base-background-mask"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 背景墙组件
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseBackground',
});
</script>

<style lang="scss" scoped>
.base-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/background.png');
  z-index: -99999;

  .base-background-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.01);
  }
}
</style>
