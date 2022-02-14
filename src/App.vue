<!--
 * @Description: app
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-06 12:02:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-14 20:34:01
-->
<template>
  <n-config-provider
    :abstract="true"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <n-message-provider
      :closable="true"
      :duration="2000"
    >
      <n-dialog-provider>
        <router-view />
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script>
import { defineComponent } from 'vue';
import { zhCN, dateZhCN } from 'naive-ui';

/**
 * @description: app
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'app',
  setup() {
    return {
      zhCN,
      dateZhCN,
    };
  },
});
</script>

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
