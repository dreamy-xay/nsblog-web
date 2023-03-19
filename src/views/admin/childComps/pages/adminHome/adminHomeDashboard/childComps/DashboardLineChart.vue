<!--
 * @Description: 仪表盘第一个大分析图表块（浏览趋势和访问量）
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2023-03-12 17:34:03
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-19 17:46:37
-->
<template>
  <div class="dashboard-line-chart">
    <el-tabs
      v-model="activeName"
      class="line-chart-tabs"
    >
      <el-tab-pane
        v-for="item in lineChartList"
        :key="item.name"
        :name="item.name"
      >
        <template #label>
          <div class="label">
            <div class="icon">
              <i
                class="iconfont"
                :class="item.icon"
              ></i>
            </div>
            {{item.title}}
          </div>
        </template>
        <div class="line-chart-inner">
          <v-chart
            v-if="activeName === item.name"
            :class="`chart_${item.name}`"
            :option="item.option"
            autoresize
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { graphic } from 'echarts';

/**
 * @description: 仪表盘第一个大分析图表块（浏览趋势和访问量）
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'dashboardLineChart',
  setup() {
    const activeName = ref('traffic_trend'); // 激活第一个

    // 计算tab菜单
    const lineChartList = reactive([
      {
        title: '流量趋势',
        name: 'traffic_trend',
        icon: 'blog-tongji',
        option: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                width: 1,
                color: '#019680',
              },
            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [...new Array(18)].map((_item, index) => `${index + 6}:00`),
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                type: 'solid',
                color: 'rgba(226,226,226,0.5)',
              },
            },
            axisTick: {
              show: false,
            },
          },
          yAxis: [
            {
              type: 'value',
              max: 80000,
              splitNumber: 4,
              axisTick: {
                show: false,
              },
              splitArea: {
                show: true,
                areaStyle: {
                  color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
                },
              },
            },
          ],
          grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
          series: [
            {
              smooth: true,
              data: [...new Array(20)].map(() => Math.floor(Math.random() * 70000)),
              type: 'line',
              areaStyle: {},
              itemStyle: {
                color: '#1890ff',
              },
            },
            {
              smooth: true,
              data: [...new Array(20)].map(() => Math.floor(Math.random() * 70000)),
              type: 'line',
              areaStyle: {},
              itemStyle: {
                color: '#3cd9e3',
              },
            },
          ],
        },
      },
      {
        title: '访问量',
        name: 'visits',
        icon: 'blog-tongjitu',
        option: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                width: 1,
                color: '#019680',
              },
            },
          },
          grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
          xAxis: {
            type: 'category',
            data: [...new Array(12)].map((_, index) => `${index + 1}月`),
          },
          yAxis: {
            type: 'value',
            max: 8000,
            splitNumber: 4,
          },
          series: [
            {
              data: [...new Array(12)].map(() => Math.floor(Math.random() * 10000)),
              type: 'bar',
              barMaxWidth: 80,
              itemStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#83bff6' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '#188df0' },
                ]),
              },
              emphasis: {
                itemStyle: {
                  color: new graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#2378f7' },
                    { offset: 0.7, color: '#2378f7' },
                    { offset: 1, color: '#83bff6' },
                  ]),
                },
              },
            },
          ],
        },
      },
    ]);

    return {
      activeName,
      lineChartList,
    };
  },
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

  .line-chart-tabs {
    width: 100%;
    height: 100%;
    @include flex(initial, center, column);

    .line-chart-inner {
      width: 100%;
      height: 340px;
      padding: 24px;
      box-sizing: border-box;
    }

    :deep(.el-tabs__header) {
      border: none;
      margin-bottom: 0;
      height: 58px;
      margin: 0;
      width: 100%;
      box-sizing: border-box;

      .el-tabs__nav-wrap {
        padding: 0 24px 0 12px;

        &::after {
          height: 1px;
          color: $grey-4;
        }
      }

      .el-tabs__nav {
        height: 58px;

        .el-tabs__active-bar {
          transition: 0.25s;
        }

        .el-tabs__item {
          padding: 0 12px;
        }
      }
    }

    .label {
      height: 58px;
      @include flex(center);
      font-size: 16px;
      transition: 0.25s;

      .icon {
        margin-right: 6px;
        width: 16px;
        height: 16px;
        @include flex(center, center);

        .iconfont {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
