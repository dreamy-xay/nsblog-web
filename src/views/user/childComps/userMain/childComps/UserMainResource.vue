<!--
 * @Description: 用户中心资源分享
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-09 10:57:00
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-12 18:54:36
-->
<template>
  <div class="user-main-resource">
    <div class="user-main-resource-top">
      <div class="title">
        <div class="text">资源分享</div>
        <div class="num">{{getSplitNum(data.resource_count)}}</div>
      </div>
      <div class="chart">
        <v-chart
          class="chart"
          :option="option"
        />
      </div>
    </div>
    <div class="user-main-resource-bottom">
      <div class="text">
        最近分享
      </div>
      <div class="count">
        <div class="num">{{getSplitNum(data.release_recently)}}</div>
        个资源链接
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { getSplitNum } from '@/util/util';
import styles from '@/assets/style/define.scss';

/**
 * @description: 用户中心问答信息
 * @param {Object} data 问答数据信息 `必传参数 `
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userMainResource',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // 计算图表选项
    const option = computed(() => {
      const data = [];
      for (let value of props.data.data) {
        data.push({
          value,
          label: { show: value === 0 },
        });
      }
      const xAxisData = [
        'Jan.',
        'Feb.',
        'Mar.',
        'Apr.',
        'May.',
        'Jun.',
        'Jul.',
        'Aug.',
        'Sep.',
        'Oct.',
        'Nov.',
        'Dec.',
      ];
      const cutData = xAxisData.splice(0, new Date().getMonth() + 1);
      xAxisData.push(...cutData);

      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          padding: 4,
          textStyle: {
            color: styles.grey8,
            fontFamily: 'Arial',
            fontSize: 13,
          },
        },
        xAxis: {
          type: 'category',
          show: false,
          data: xAxisData,
        },
        yAxis: {
          type: 'value',
          show: false,
        },
        grid: {
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        },
        series: [
          {
            data,
            label: {
              width: 15,
              height: 180,
              backgroundColor: 'rgba(90, 200, 250, 0.08)',
              formatter: '',
            },
            name: '上传',
            type: 'bar',
            itemStyle: { color: styles.blue0 },
          },
        ],
      };
    });

    return {
      getSplitNum,
      option,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-main-resource {
  height: calc(100% - 32px);
  width: 254px;
  padding: 16px;
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;
  background-color: $grey-0;
  margin-left: 16px;
  user-select: none;

  .user-main-resource-top {
    height: 122px;
    width: 100%;

    .title {
      height: 40px;
      width: 100%;
      @include flex(initial, initial, column);

      .text {
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        color: $grey-7;
      }

      .num {
        height: 25px;
        line-height: 25px;
        font-weight: 700;
        font-size: 22px;
        color: $grey-10;
      }
    }

    .chart {
      height: 82px;
      width: 100%;
    }
  }

  .user-main-resource-bottom {
    width: 100%;
    height: 32px;
    margin-top: 12px;

    .text {
      height: 17px;
      font-size: 12px;
      line-height: 17px;
      font-weight: 300;
      color: $blue-1;
    }

    .count {
      height: 20px;
      font-size: 14px;
      color: $grey-9;

      .num {
        display: inline-block;
        height: 20px;
        line-height: 20px;
        font-weight: 700;
        margin-right: 2px;
        color: $grey-8;
      }
    }
  }
}
</style>
