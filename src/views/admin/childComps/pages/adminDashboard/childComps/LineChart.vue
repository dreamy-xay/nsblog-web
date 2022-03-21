<!--
 * @Description: 首页折现图组件
 * @Author: ZY
 * @Date: 2021-01-18 09:31:32
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-03-21 18:00:44
-->
<template>
  <div
    id="homeLineCharts"
    :class="className"
    :style="{height, width}"
  />
</template>

<script lang="ts">
import {
  nextTick,
  defineComponent,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  PropType,
  watchEffect,
} from 'vue';
import resize from './resize';
import { init, EChartsOption } from 'echarts';

export interface LineChartData {
  expectedData: number[];
  actualData: number[];
}

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
      default: '350px',
    },
    chartData: {
      type: Object as PropType<LineChartData>,
      required: true,
    },
  },
  setup(props) {
    const { mounted, chart, beforeDestroy, activated, deactivated } = resize();

    const setOptions = (chartData: LineChartData) => {
      if (chart.value) {
        chart.value.setOption({
          xAxis: {
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            boundaryGap: false,
            axisTick: {
              show: false,
            },
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true,
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
            },
            padding: 8,
          },
          yAxis: {
            axisTick: {
              show: false,
            },
          },
          legend: {
            data: ['预期', '实际'],
          },
          series: [
            {
              name: '预期',
              itemStyle: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2,
                },
              },
              smooth: true,
              type: 'line',
              data: chartData.expectedData,
              animationDuration: 2800,
              animationEasing: 'cubicInOut',
            },
            {
              name: '实际',
              smooth: true,
              type: 'line',
              itemStyle: {
                color: '#3888fa',
                lineStyle: {
                  color: '#3888fa',
                  width: 2,
                },
                areaStyle: {
                  color: '#f3f8ff',
                },
              },
              data: chartData.actualData,
              animationDuration: 2800,
              animationEasing: 'quadraticOut',
            },
          ],
        } as EChartsOption);
      }
    };

    watchEffect(() => {
      if (props.chartData) {
        setOptions(props.chartData);
      }
    });

    const initChart = () => {
      const lineChart = init(document.getElementById('homeLineCharts') as HTMLDivElement, 'macarons');
      setOptions(props.chartData);
      chart.value = lineChart;
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
