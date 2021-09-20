<!--
 * @Description: app
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-06 12:02:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-20 17:58:22
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
  min-width: 1440px;
}
</style>
