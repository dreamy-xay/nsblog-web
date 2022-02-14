<!--
 * @Description: app
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-06 12:02:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-14 15:53:45
-->
<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <n-message-provider>
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
