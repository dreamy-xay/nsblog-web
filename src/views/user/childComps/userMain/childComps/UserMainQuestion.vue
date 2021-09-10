<!--
 * @Description: 用户中心问答信息
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-09 10:57:00
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-10 21:17:11
-->
<template>
  <div class="user-main-question">
    <div class="user-main-question-top">
      <div class="title">
        <div class="text">疑问解答</div>
        <div class="num">{{data.FAQ_count}}</div>
      </div>
      <div class="chart">
        <div class="chart-inner">
          <v-chart
            class="chart"
            :option="option"
          />
        </div>
      </div>
    </div>
    <div class="user-main-question-bottom">
      <div
        class="info"
        v-for="(item, index) in questionInfo"
        :key="index"
      >
        <div class="name">
          {{item.name}}
        </div>
        <div class="count">
          {{item.count}}
        </div>
      </div>
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
  name: 'userMainQuestion',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // 计算图标配置项
    const option = computed(() => {
      return {
        tooltip: {
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          backgroundColor: styles.grey0,
          borderWidth: 0,
          textStyle: { fontSize: 13, color: styles.grey8, fontFamily: 'Arial' },
          padding: 4,
        },
        title: {
          text: '回答采纳率',
          left: 'center',
          top: '55%',
          textStyle: {
            color: styles.grey6,
            fontFamily: 'Arial',
            fontSize: 12,
            fontWeight: 'normal',
            align: 'center',
          },
        },
        series: [
          {
            name: '回答采纳率',
            type: 'pie',
            radius: ['82%', '90%'],
            data: [
              {
                value: props.data.reply_adoption,
                name: '已采纳',
                itemStyle: { color: styles.green1 },
                label: { show: true },
                emphasis: { itemStyle: { color: styles.green1 } },
              },
              {
                value: props.data.reply_count - props.data.reply_adoption,
                name: '未采纳',
                itemStyle: { color: styles.grey5 },
                label: { show: false },
                emphasis: { itemStyle: { color: styles.grey5 } },
              },
            ],
            itemStyle: {
              borderRadius: '50%',
            },
            label: {
              formatter(data) {
                return data.percent.toFixed(1) + '%';
              },
              fontWeight: 'bold',
              fontFamily: 'Arial',
              fontSize: 20,
              position: 'center',
            },
            labelLine: {
              show: false,
            },
            emphasis: {
              scaleSize: 3,
              itemStyle: {
                shadowBlur: 0,
                borderRadius: '50%',
              },
            },
          },
        ],
      };
    });

    // 计算信息
    const questionInfo = computed(() => {
      return [
        {
          name: '总提问',
          count: props.data.question_count,
        },
        {
          name: '总回答',
          count: props.data.reply_count,
        },
        {
          name: '总采纳',
          count: props.data.reply_adoption,
        },
      ];
    });

    return {
      option,
      questionInfo,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-main-question {
  height: calc(100% - 32px);
  width: 254px;
  padding: 16px;
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;
  background-color: $grey-0;
  margin-left: 16px;
  user-select: none;

  .user-main-question-top {
    height: 134px;
    width: 100%;
    @include flex(center, space-between);

    .title {
      height: 100%;
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
      height: 100%;

      .chart-inner {
        width: 100px;
        height: 100px;
        margin-right: 10px;
        margin-top: 10px;
      }
    }
  }

  .user-main-question-bottom {
    height: 32px;
    width: 100%;
    @include flex(center, center);

    .info {
      width: 74px;
      height: 100%;
      margin-right: 16px;
      @include flex(center, center, column);

      .name {
        font-size: 12px;
        height: 16px;
        line-height: 16px;
        font-weight: 300;
      }

      .count {
        font-size: 14px;
        height: 16px;
        line-height: 16px;
        color: $grey-10;
        font-weight: 700;
      }

      &:first-child .name {
        color: $red-2;
      }

      &:nth-child(2) .name {
        color: $grey-7;
      }

      &:last-child {
        margin-right: 0;

        .name {
          color: $green-1;
        }
      }
    }
  }
}
</style>
