<!--
 * @Description: 仪表盘第一个大分析图表块（浏览趋势和访问量）
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2023-03-12 17:34:03
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-12 17:38:24
-->
<template>
  <div class="dashboard-line-chart">

  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 仪表盘第一个大分析图表块（浏览趋势和访问量）
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'dashboardLineChart',
});
</script>

<style lang="scss" scoped>
.dashboard-line-chart {
  width: 100%;
  height: 398px;
  background-color: $grey-0;
  // box-shadow: $shadow-0;
  border-radius: $border-radius-1;
  @include flex(center, center, column);
  overflow: hidden;
  margin-bottom: 16px;
}
</style>
