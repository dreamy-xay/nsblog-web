<!--
 * @Description: app
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-06 12:02:59
 * @LastEditors: Ban
 * @LastEditTime: 2022-01-13 16:40:34
-->
<template>
  <n-message-provider>
    <n-dialog-provider>
      <router-view />
    </n-dialog-provider>

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
