<!--
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-26 19:56:18
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-27 23:31:39
-->
<template>
  <div class="admin-dashboard">

  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useLoadingBar } from 'naive-ui';

/**
 * @description:
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminDashboard',
  setup() {
    const loadingBar = useLoadingBar(); // naive-ui loadingBar
    loadingBar.start();
    window.onload = () => {
      loadingBar.finish();
    };

    return {};
  },
});
</script>

<style lang="scss" scoped>
.admin-dashboard {
  // width: 100%;
  // height: 500px;
  // background-color: red;
}
</style>
