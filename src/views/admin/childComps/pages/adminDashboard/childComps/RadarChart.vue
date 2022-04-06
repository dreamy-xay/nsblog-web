<!--
 * @Description: 首页雷达图
 * @Author: ZY
 * @Date: 2021-01-18 11:23:22
 * @LastEditors: clq
 * @LastEditTime: 2022-03-25 19:33:47
-->
<template>
  <div
    id="homeRadarCharts"
    :class="className"
    :style="{height, width}"
  />
</template>
<script lang="ts">
import { defineComponent, onActivated, onBeforeUnmount, onDeactivated, onMounted, nextTick } from 'vue';
import resize from './resize';
import { init } from 'echarts';

const animationDuration = 3000;
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
      const radarChart = init(document.getElementById('homeRadarCharts') as HTMLDivElement, 'macarons');
      radarChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        radar: {
          radius: '66%',
          center: ['50%', '42%'],
          splitNumber: 8,

          splitArea: {
            areaStyle: {
              color: '#C5CEE6',
              opacity: 1,
              shadowBlur: 45,
              shadowColor: 'rgba(0,0,0,.1)',
              shadowOffsetX: 0,
              shadowOffsetY: 15,
            },
          },
          indicator: [
            { name: '后端', max: 10000 },
            { name: '前端', max: 20000 },
            { name: '移动开发', max: 20000 },
            { name: '人工智能', max: 20000 },
            { name: '大数据', max: 20000 },
            { name: '区块链', max: 20000 },
          ],
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['文章类别分布'],
        },
        series: [
          {
            color: ['#5DDAB4', '#57CAEB'],
            type: 'radar',
            symbolSize: 0,
            areaStyle: {
              shadowBlur: 13,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1,
            },
            data: [
              // {
              //   value: [5000, 7000, 12000, 11000, 15000, 14000],
              //   name: 'Allocated Budget',
              // },
              // {
              //   value: [4000, 9000, 15000, 15000, 13000, 11000],
              //   name: 'Expected Spending',
              // },
              {
                value: [5500, 11000, 12000, 15000, 12000, 12000],
                name: '文章类别分布',
              },
            ],
            animationDuration: animationDuration,
          },
        ],
      } as any);
      chart.value = radarChart;
    };

    onMounted(() => {
      mounted();
      nextTick(() => {
        initChart();
      });
    });

    onBeforeUnmount(() => {
      beforeDestroy();
      if (!chart.value) {
        return;
      }
      chart.value.dispose();
      chart.value = null;
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
