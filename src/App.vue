<!--
 * @Description: app
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-06 12:02:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-05 19:53:37
-->
<template>
  <n-message-provider>
    <router-view />
  </n-message-provider>
</template>

<style lang="scss">
@import 'assets/style/normalize';
@import 'assets/front/iconfont';
@import 'assets/style/base';

#app {
  width: 100%;
  height: 100%;
  min-width: 1142px;
}
</style>
