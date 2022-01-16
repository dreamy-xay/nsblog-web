<!--
 * @Description:文章分类雷达图组件
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-13 14:38:10
 * @LastEditors: clq
 * @LastEditTime: 2022-01-14 14:43:26
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
import { computed, defineComponent } from 'vue';

/**
 * @description:
 * @author: clq
 */

export default defineComponent({
  name: 'blogCategoriesChart',
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    //计算图标选项
    const option = computed(() => {
      return {
        radar: {
          // shape: 'circle',
          indicator: props.chartData.indicator,
        },
        series: [
          {
            type: 'radar',
            data: props.chartData.data,
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
.blog-categories-chart {
  .chart {
    width: 400px;
    height: 400px;
  }
}
</style>
