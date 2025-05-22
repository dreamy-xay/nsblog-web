<!--
 * @Description: app
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-06 12:02:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2025-05-22 15:50:59
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
import { defineComponent, provide } from 'vue';
import { zhCN, dateZhCN } from 'naive-ui';

/**
 * @description: app
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'app',
  setup() {
    const WindowOpenUrl = window.open;
    const hashPrefix = process.env.VUE_APP_ROUTER_MODE === "false" ? "/#" : "";
    const basePrefix = process.env.VUE_APP_BASE_PREFIX || '';

    provide("prefix", {
      "url": basePrefix + hashPrefix,
      "resource": basePrefix,
    });

    function resolve(url) {
      if (url.startsWith('/'))
        return `${basePrefix}${hashPrefix}${url}`;
      return url;
    }

    function open(url, target=null) {
      if (target)
        WindowOpenUrl(resolve(url), resolve(target));
      else
        WindowOpenUrl(resolve(url));
    }

    window.open = open

    return {
      zhCN,
      dateZhCN,
    };
  },
});
</script>

<style lang="scss">
@import 'assets/style/normalize';
@import 'assets/font/iconfont';
@import 'assets/style/base';

#app {
  width: 100%;
  height: 100%;
  min-width: 1440px;
}
</style>
