<!--
 * @Author: Ban
 * @Date: 2021-07-19 12:47:11
 * @LastEditTime: 2021-08-12 15:42:26
 * @LastEditors: dreamy-xay
 * @Description: In User Settings Edit
 * @FilePath:
-->
<template>
  <div class="base-top-bar">
    <div class="base-top-bar-to-center">
      <top-bar-head-left />
      <top-bar-head-center />
      <top-bar-head-right />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import TopBarHeadRight from './childComps/TopBarHeadRight.vue';
import TopBarHeadCenter from './childComps/TopBarHeadCenter.vue';
import TopBarHeadLeft from './childComps/TopBarHeadLeft.vue';

/**
 * @description:  首页顶部导航栏
 * @author: Ban
 */

export default defineComponent({
  name: 'baseTopBar',
  components: {
    TopBarHeadLeft,
    TopBarHeadRight,
    TopBarHeadCenter,
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
  position: sticky;

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
