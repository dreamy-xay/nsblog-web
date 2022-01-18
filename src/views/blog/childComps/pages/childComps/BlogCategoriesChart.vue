<!--
 * @Description:文章分类雷达图组件
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-13 14:38:10
 * @LastEditors: clq
 * @LastEditTime: 2022-01-18 13:36:05
-->
<template>
  <div class="blog-categories-chart">
    <v-chart
      class="chart"
      :option="option"
      ref="echartsRef"
    />
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, watch } from 'vue';
import styles from '@/assets/style/define.scss';
/**
 * @description:
 * @author: clq
 */

export default defineComponent({
  name: 'blogCategoriesChart',
  props: {
    indicator: {
      type: Array,
      required: true,
      default: () => [],
    },
    chartData: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  setup(props) {
    //计算图标选项
    const option = computed(() => {
      return {
        radar: {
          indicator: props.indicator,
        },
        series: [
          {
            type: 'radar',
            color: styles.grey7,
            data: [
              {
                value: props.chartData,
              },
            ],
          },
        ],
      };
    });

    return {
      option,
      styles,
    };
  },
});
</script>

<style lang="scss" scoped>
.blog-categories-chart {
  .chart {
    width: 400px;
    height: 400px;
  }
}
</style>
