<!--
 * @Description: 流程图
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-04-06 14:57:24
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-07-01 21:04:35
-->
<template>
  <div class="admin-tools-flow-chart">
    <img
      src="/admin/pages/adminToolsFlowChart.png"
      alt=""
    >
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 流程图
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminToolsFlowChart',
});
</script>

<style lang="scss" scoped>
.admin-tools-flow-chart {
  width: 100%;
  user-select: none;
  -webkit-user-drag: none;

  img {
    width: 100%;
  }
}
</style>
