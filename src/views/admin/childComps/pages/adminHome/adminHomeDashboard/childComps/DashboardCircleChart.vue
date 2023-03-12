<!--
 * @Description: 仪表盘第二个大分析图表快（浏览趋势和访问量）
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2023-03-12 17:34:03
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-12 17:53:00
-->
<template>
  <div class="dashboard-circle-chart">
    <div class="chart-expertise-area">

    </div>
    <div class="chart-access-source">

    </div>
    <div class="chart-like-ratio">

    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 仪表盘第二个大分析图表快（浏览趋势和访问量）
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'dashboardCircleChart',
});
</script>

<style lang="scss" scoped>
.dashboard-circle-chart {
  width: 100%;
  height: 406px;
  @include flex(center, center);
  overflow: hidden;

  & > div {
    width: calc(33.33333334% - 10.66666666px);
    height: 100%;
    background-color: $grey-0;
    // box-shadow: $shadow-0;
    border-radius: $border-radius-1;
    @include flex(center, center, column);
    overflow: hidden;
    margin-right: 16px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
