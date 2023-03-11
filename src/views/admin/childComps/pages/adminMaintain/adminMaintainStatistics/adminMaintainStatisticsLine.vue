<!--
 * @Description: 数据统计
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-04-06 11:27:34
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-08 15:47:54
-->
<template>
  <admin-view
    class="admin-maintain-statistics-line"
    :style="{width: viewWidth}"
  >
    <v-chart
      class="chart"
      :option="option"
      autoresize
    />
  </admin-view>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import AdminView from '@/views/admin/childComps/AdminView.vue';
import { graphic } from 'echarts';
import events from '@/events';

/**
 * @description: 数据统计
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminMaintainStatisticsLine',
  components: {
    AdminView,
  },
  setup() {
    const category = [];
    let dottedBase = +new Date();
    const lineData = [];
    const barData = [];

    for (let i = 0; i < 20; i++) {
      const date = new Date((dottedBase += 1000 * 3600 * 24));
      category.push([date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-'));
      const b = Math.random() * 200;
      const d = Math.random() * 200;
      barData.push(b);
      lineData.push(d + b);
    }

    // 计算图表选项
    const option = computed(() => {
      return {
        backgroundColor: '#0f375f',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true,
              backgroundColor: '#333',
            },
          },
        },
        legend: {
          data: ['line', 'bar'],
          textStyle: {
            color: '#ccc',
          },
        },
        xAxis: {
          data: category,
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
        },
        series: [
          {
            name: 'line',
            type: 'line',
            smooth: true,
            showAllSymbol: 'auto',
            symbol: 'emptyCircle',
            symbolSize: 15,
            data: lineData,
          },
          {
            name: 'bar',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              borderRadius: 5,
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#14c8d4' },
                { offset: 1, color: '#43eec6' },
              ]),
            },
            data: barData,
          },
          {
            name: 'line',
            type: 'bar',
            barGap: '-100%',
            barWidth: 10,
            itemStyle: {
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(20,200,212,0.5)' },
                { offset: 0.2, color: 'rgba(20,200,212,0.2)' },
                { offset: 1, color: 'rgba(20,200,212,0)' },
              ]),
            },
            z: -12,
            data: lineData,
          },
          {
            name: 'dotted',
            type: 'pictorialBar',
            symbol: 'rect',
            itemStyle: {
              color: '#0f375f',
            },
            symbolRepeat: true,
            symbolSize: [12, 4],
            symbolMargin: 1,
            z: -10,
            data: lineData,
          },
        ],
      };
    });

    const viewWidth = ref('calc(100vw - 298px)');
    // 监听子菜单显示状态
    events.on('AdmiSubMenu-subMenuChange', (showLength, show) => {
      viewWidth.value = show && showLength ? 'calc(100vw - 298px)' : 'calc(100vw - 96px)';
    });

    return {
      option,
      viewWidth,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-maintain-statistics-line {
  height: calc(100vh - 142px);
}
</style>
