<!--
 * @Author: Ban
 * @Date: 2021-07-19 12:47:11
 * @LastEditTime: 2021-08-04 14:21:40
 * @LastEditors: dreamy-xay
 * @Description: In User Settings Edit
 * @FilePath:
-->
<template>
  <div class="base-top-bar-to-center">
    <header class="base-top-bar">
      <top-bar-head-left />
      <top-bar-head-center />
      <top-bar-head-right />
    </header>
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

.base-top-bar-to-center {
  position: fixed;
  background: $background-0;
  width: 100%;
  box-shadow: $shadow;
}

.base-top-bar {
  display: flex;
  margin: auto;
  width: 1440px;
  box-sizing: border-box;
  height: $topBarHeight;
  background: $background-0;
  padding-left: 8px;
  padding-right: 24px;
}
</style>
