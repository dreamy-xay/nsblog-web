<!--
 * @Description: 首页饼图组件
 * @Author: ZY
 * @Date: 2021-01-18 11:08:53
 * @LastEditors: clq
 * @LastEditTime: 2022-04-06 15:51:58
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
          data: ['计算数学', '架构', '自然科学', 'IOS', '散文'],
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
              { value: 320, name: '计算数学' },
              { value: 240, name: '架构' },
              { value: 149, name: '自然科学' },
              { value: 100, name: 'IOS' },
              { value: 59, name: '散文' },
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
