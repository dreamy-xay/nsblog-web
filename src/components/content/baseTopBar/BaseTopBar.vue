<!--
 * @Author: Ban
 * @Date: 2021-07-19 12:47:11
 * @LastEditTime: 2021-09-07 11:42:11
 * @LastEditors: Z_Y_C
 * @Description: In User Settings Edit
 * @FilePath:
-->
<template>
  <div class="base-top-bar">
    <div class="base-top-bar-to-center">
      <top-bar-left />
      <top-bar-center />
      <top-bar-right />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import TopBarRight from '@/components/content/baseTopBar/childComps/TopBarRight.vue';
import TopBarCenter from '@/components/content/baseTopBar/childComps/TopBarCenter.vue';
import TopBarLeft from '@/components/content/baseTopBar/childComps/TopBarLeft.vue';

/**
 * @description:  首页顶部导航栏
 * @author: Ban
 */

export default defineComponent({
  name: 'baseTopBar',
  components: {
    TopBarLeft,
    TopBarRight,
    TopBarCenter,
  },
});
</script>

<style lang="scss" scoped>
$topBarHeight: 56px;
$background-0: $grey-0;
$shadow: $shadow-0;

.base-top-bar {
  background: $background-0;
  width: 100%;
  box-shadow: $shadow;
  z-index: 2000;
  position: fixed;

  .base-top-bar-to-center {
    display: flex;
    margin: 0 auto;
    width: 1440px;
    box-sizing: border-box;
    height: $topBarHeight;
    background: $background-0;
    padding-left: 8px;
    padding-right: 24px;
  }
}
</style>
