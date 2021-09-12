<!--
 * @Description: 用户中心文章信息
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-09 10:57:00
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-12 23:04:57
-->
<template>
  <div class="user-main-article">
    <div class="user-main-article-top">
      <div class="title">
        <div class="text">发布文章</div>
        <div class="num">{{getSplitNum(data.article_count)}}</div>
      </div>
      <div class="chart">
        <v-chart
          class="chart"
          :option="option"
        />
      </div>
    </div>
    <div class="user-main-article-bottom">
      <div
        class="info"
        v-for="(item, index) in articleInfo"
        :key="index"
      >
        <div class="name">
          {{item.name}}
        </div>
        <div class="count">
          {{getSplitNum(item.count)}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { getSplitNum } from '@/util/util';
import styles from '@/assets/style/define.scss';
import { dateFormat } from '@/util/date';

/**
 * @description: 用户中心文章信息
 * @param {Object} data 文章数据信息 `必传参数 `
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userMainArticle',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // 计算图表选项
    const option = computed(() => {
      const xAxisData = [];
      const data = [];
      for (const item of props.data.data) {
        xAxisData.push(dateFormat('YY年m月d日', new Date(item.time)));
        data.push(item.count);
      }

      return {
        tooltip: {
          trigger: 'axis',
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
            name: '已发布',
            showSymbol: false,
            type: 'line',
            itemStyle: { color: styles.orange1 },
            emphasis: {
              showSymbol: true,
            },
          },
        ],
      };
    });

    // 计算信息
    const articleInfo = computed(() => {
      return [
        {
          name: '总排行',
          count: props.data.rank_total,
        },
        {
          name: '总周排行',
          count: props.data.rank_week,
        },
        {
          name: '总最近发布',
          count: props.data.release_recently,
        },
      ];
    });

    return {
      getSplitNum,
      option,
      articleInfo,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-main-article {
  height: calc(100% - 32px);
  width: 254px;
  padding: 16px;
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;
  background-color: $grey-0;
  user-select: none;

  .user-main-article-top {
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
      width: 278px;
      margin-left: -6px;
    }
  }

  .user-main-article-bottom {
    width: 100%;
    height: 32px;
    margin-top: 12px;
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
        color: $grey-9;
      }

      .count {
        font-size: 14px;
        height: 16px;
        line-height: 16px;
        color: $grey-8;
        font-weight: 700;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
