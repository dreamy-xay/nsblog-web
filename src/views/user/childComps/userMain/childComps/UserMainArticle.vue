<!--
 * @Description: 用户中心文章信息
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-09 10:57:00
 * @LastEditors: clq
 * @LastEditTime: 2021-09-26 18:31:36
-->
<template>
  <div
    class="user-main-article"
    :class="{'user-main-article-extend': isExtend}"
  >
    <div class="user-main-article-top">
      <div class="title">
        <div class="title-left">
          <div class="main-info">
            <div class="text">发布文章</div>
            <div class="num">{{getSplitNum(data.article_count)}}</div>
          </div>
          <div
            class="detail"
            :class="{'detail-show': isExtend}"
          >
            <div class="icon">
              <i class="iconfont blog-jiangbei"></i>
            </div>
            <div
              class="info"
              v-for="(item, index) in articleInfo.slice(0, 2)"
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
        <div
          class="title-right"
          role="button"
          @click="extend"
        >
          <i class="iconfont blog-arrow-right"></i>
        </div>
      </div>
      <div class="chart">
        <v-chart
          class="chart"
          :option="option"
          ref="echartsRef"
        />
      </div>
    </div>
    <div
      class="user-main-article-bottom"
      :class="{'user-main-article-bottom-show': bottomDetailShow}"
    >
      <div
        v-show="bottomDetailShow"
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
import { defineComponent, computed, ref } from 'vue';
import { getSplitNum } from '@/utils/utils';
import styles from '@/assets/style/define.scss';
import { dateFormat } from '@/utils/date';
import events from '@/events';

/**
 * @description: 用户中心文章信息
 * @param {Object} data 文章数据信息 `必传参数 `
 * @emits UserMainArticle-extend 拓展组件宽度
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
          axisPointer: {
            lineStyle: {
              color: styles.orange1,
              width: 1,
              type: 'solid',
              cap: 'round',
            },
          },
          animation: false,
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
          bottom: 4,
          top: 4,
        },
        series: [
          {
            data,
            smooth: true,
            name: '已发布',
            symbol: 'circle',
            showSymbol: false,
            symbolSize: 8,
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
          name: '周排行',
          count: props.data.rank_week,
        },
        {
          name: '最近发布',
          count: props.data.release_recently,
        },
      ];
    });

    const isExtend = ref(false); // 是否拓展组件宽度
    const bottomDetailShow = ref(true); // 是否显示底部详情
    /**
     * @description: 拓展按钮点击
     * @return {void}
     * @author: dreamy-xay
     */
    function extend() {
      isExtend.value = !isExtend.value;
      events.emit('UserMainArticle-extend', isExtend.value); // 发出事件
      if (isExtend.value) bottomDetailShow.value = false;
      setTimeout(() => {
        echartsRef.value.resize({
          animation: {
            duration: 400,
          },
        });
        if (!isExtend.value)
          setTimeout(() => {
            bottomDetailShow.value = true;
          }, 400);
      }, 500);
    }

    const echartsRef = ref(null);

    return {
      getSplitNum,
      option,
      articleInfo,
      isExtend,
      extend,
      echartsRef,
      bottomDetailShow,
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
  overflow: hidden;
  transition: 0.5s ease;

  &.user-main-article-extend {
    width: 858px;

    .user-main-article-top {
      height: 100%;

      .title {
        .title-right {
          transform: rotate(180deg);
        }
      }

      .chart {
        margin-left: -6px;
        height: 114px;
        width: 882px;
      }
    }
  }

  .user-main-article-top {
    height: 128px;
    width: 100%;
    @include flex(initial, initial, column);

    .title {
      height: 40px;
      width: 100%;
      margin-bottom: 12px;
      @include flex(initial, space-between);

      .title-left {
        height: 40px;
        @include flex(center);

        .main-info {
          height: 100%;
          margin-right: 16px;
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

        .detail {
          height: 100%;
          @include flex(center);
          opacity: 0;
          transition: 0.5s;

          &.detail-show {
            opacity: 1;
          }

          .icon {
            height: 40px;
            width: 40px;
            text-align: center;
            line-height: 40px;
            margin-right: 10px;

            .iconfont {
              font-size: 42px;
              color: $orange-1;
            }
          }

          .info {
            margin-left: 12px;
            height: 100%;
            @include flex(center, center, column);

            .name {
              font-size: 12px;
              height: 16px;
              line-height: 16px;
              font-weight: 300;
              color: $grey-9;
              margin-bottom: 4px;
            }

            .count {
              font-size: 14px;
              height: 16px;
              line-height: 16px;
              color: $grey-8;
            }
          }
        }
      }

      .title-right {
        height: 24px;
        width: 24px;
        text-align: center;
        line-height: 24px;
        margin-right: 1px;
        margin-top: 1px;

        &:hover .iconfont {
          color: $grey-7;
        }

        .iconfont {
          font-size: 26px;
          color: $grey-6;
          transition: 0.25s;
        }
      }
    }

    .chart {
      margin-left: -6px;
      height: 76px;
      width: 278px;
    }
  }

  .user-main-article-bottom {
    width: 100%;
    height: 32px;
    @include flex(center, center);
    margin-top: 6px;
    transition: 0.4s;
    opacity: 0;

    &.user-main-article-bottom-show {
      opacity: 1;
    }

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
