<!--
 * @Description: 仪表盘第二个大分析图表快（浏览趋势和访问量）
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2023-03-12 17:34:03
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-19 18:09:49
-->
<template>
  <div class="dashboard-circle-chart">
    <div
      class="circle-chart-item"
      v-for="item in circleChartList"
      :key="item.name"
    >
      <div class="chart-item-head">
        <div class="icon">
          <i
            class="iconfont"
            :class="item.icon"
          ></i>
        </div>
        {{item.title}}
      </div>
      <div class="chart-item-body">
        <v-chart
          :class="`chart_${item.name}`"
          :option="item.option"
          autoresize
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';

/**
 * @description: 仪表盘第二个大分析图表快（浏览趋势和访问量）
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'dashboardCircleChart',
  setup() {
    // 计算tab菜单
    const circleChartList = reactive([
      {
        title: '擅长领域',
        name: 'expertise_area',
        icon: 'blog-leidatu',
        option: {
          legend: {
            bottom: 0,
            data: ['文章', '问答'],
          },
          tooltip: {},
          radar: {
            radius: '60%',
            splitNumber: 8,
            indicator: [
              {
                name: '前端框架',
              },
              {
                name: '算法',
              },
              {
                name: '数据库',
              },
              {
                name: '架构',
              },
              {
                name: 'Swift',
              },
              {
                name: 'Xcode',
              },
            ],
          },
          series: [
            {
              type: 'radar',
              symbolSize: 0,
              areaStyle: {
                shadowBlur: 0,
                shadowColor: 'rgba(0,0,0,.2)',
                shadowOffsetX: 0,
                shadowOffsetY: 10,
                opacity: 1,
              },
              data: [
                {
                  value: [...new Array(6)].map(() =>
                    (Math.random() * 90) % 2 ? Math.floor(Math.random() * 10) : Math.floor(Math.random() * 90)
                  ),
                  name: '文章',
                  itemStyle: {
                    color: '#b6a2de',
                  },
                },
                {
                  value: [...new Array(6)].map(() =>
                    (Math.random() * 90) % 2 ? Math.floor(Math.random() * 10) : Math.floor(Math.random() * 90)
                  ),
                  name: '问答',
                  itemStyle: {
                    color: '#5ab1ef',
                  },
                },
              ],
            },
          ],
        },
      },
      {
        title: '访问来源',
        name: 'access_source',
        icon: 'blog-fsux_tubiao_bingtu',
        option: {
          tooltip: {
            trigger: 'item',
          },
          legend: {
            bottom: '1%',
            left: 'center',
          },
          series: [
            {
              color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9', '#4a9afd'],
              name: '访问来源',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
              },
              label: {
                show: false,
                position: 'center',
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '12',
                  fontWeight: 'bold',
                },
              },
              labelLine: {
                show: false,
              },
              data: ['文章', '博客', '资源', '征集令', '问答'].map((item) => ({
                value: Math.floor(Math.random() * 4000) + 1000,
                name: item,
              })),
              animationType: 'scale',
              animationEasing: 'exponentialInOut',
              animationDelay: function () {
                return Math.random() * 100;
              },
            },
          ],
        },
      },
      {
        title: '获赞占比',
        name: 'like_ratio',
        icon: 'blog-yonghutongji',
        option: {
          tooltip: {
            trigger: 'item',
          },
          series: [
            {
              name: '获赞占比',
              type: 'pie',
              radius: '70%',
              center: ['50%', '50%'],
              color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
              data: ['文章', '问答', '资源', '消息']
                .map((item) => ({
                  value: Math.floor(Math.random() * 1000) + 100,
                  name: item,
                }))
                .sort(function (a, b) {
                  return a.value - b.value;
                }),
              roseType: 'radius',
              animationType: 'scale',
              animationEasing: 'exponentialInOut',
              animationDelay: function () {
                return Math.random() * 400;
              },
            },
          ],
        },
      },
    ]);

    return {
      circleChartList,
    };
  },
});
</script>

<style lang="scss" scoped>
.dashboard-circle-chart {
  width: 100%;
  height: 406px;
  @include flex(center, center);
  overflow: hidden;

  .circle-chart-item {
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

    & > div {
      width: 100%;
      @include flex(center);
      box-sizing: border-box;
    }

    .chart-item-head {
      height: 58px;
      font-size: 16px;
      color: $grey-10;
      border-bottom: 1px solid $grey-4;
      padding: 0 24px;

      .icon {
        margin-right: 6px;
        width: 16px;
        height: 16px;
        @include flex(center, center);

        .iconfont {
          font-size: 18px;
        }
      }
    }

    .chart-item-body {
      height: 348px;
      padding: 24px;
    }
  }
}
</style>
