<!--
 * @Description: 首页饼图组件
 * @Author: ZY
 * @Date: 2021-01-18 11:08:53
 * @LastEditors: clq
 * @LastEditTime: 2022-03-25 19:36:20
-->
<template>
  <div
    id="homePieCharts"
    :class="className"
    :style="{height, width}"
  />
</template>

<script lang="ts">
import { defineComponent, onActivated, onBeforeUnmount, onDeactivated, onMounted, nextTick } from 'vue';
import resize from './resize';
import { init, EChartsOption } from 'echarts';
export default defineComponent({
  props: {
    className: {
      type: String,
      default: 'chart',
    },
    width: {
      type: [String, Number],
      default: '100%',
    },
    height: {
      type: [String, Number],
      default: '300px',
    },
  },
  setup() {
    const { mounted, chart, beforeDestroy, activated, deactivated } = resize();

    const initChart = () => {
      const pieChart = init(document.getElementById('homePieCharts') as HTMLDivElement, 'macarons');
      pieChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['java', 'python', 'C#', 'NumPy', 'MySql'],
        },
        series: [
          {
            color: ['#435EBE', '#5DDAB4', '#9694FF', '#FF7976', '#57CAEB'],
            name: 'WEEKLY WRITE ARTICLES',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [
              { value: 320, name: 'java' },
              { value: 240, name: 'python' },
              { value: 149, name: 'C#' },
              { value: 100, name: 'NumPy' },
              { value: 59, name: 'MySql' },
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600,
          },
        ],
      } as EChartsOption);
      chart.value = pieChart;
    };

    onMounted(() => {
      mounted();
      nextTick(() => {
        initChart();
      });
    });

    onBeforeUnmount(() => {
      // if (!chart.value) {
      //   return
      // }
      // chart.value.dispose()
      // chart.value = null
      beforeDestroy();
    });

    onActivated(() => {
      activated();
    });

    onDeactivated(() => {
      deactivated();
    });

    return {};
  },
});
</script>
