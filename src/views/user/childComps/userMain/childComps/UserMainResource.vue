<!--
 * @Description: 用户中心资源分享
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-09 10:57:00
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-09 22:48:46
-->
<template>
  <div class="user-main-resource">
    <div class="user-main-resource-top">
      <div class="title">
        <div class="text">资源分享</div>
        <div class="num">{{data.resource_count}}</div>
      </div>
      <div class="chart">
        <v-chart
          class="chart"
          :option="option"
        />
      </div>
    </div>
    <div class="user-main-resource-bottom">
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
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
    const option = computed(() => {
      return {
        xAxis: {
          type: 'category',
          show: false,
        },
        yAxis: {
          type: 'value',
          show: false,
        },
        series: [
          {
            data: props.data.data,
            type: 'bar',
          },
        ],
      };
    });

    return {
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
}
</style>
