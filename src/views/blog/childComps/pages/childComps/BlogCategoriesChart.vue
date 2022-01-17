<!--
 * @Description:文章分类雷达图组件
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-13 14:38:10
 * @LastEditors: clq
 * @LastEditTime: 2022-01-17 17:01:43
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
      default: () => [
        { name: 'Sales', max: 6500 },
        { name: 'Administration', max: 16000 },
        { name: 'Information Technology', max: 30000 },
        { name: 'Customer Support', max: 38000 },
        { name: 'Development', max: 52000 },
        { name: 'Marketing', max: 25000 },
      ],
    },
    chartData: {
      type: Array,
      required: true,
      default: () => [4200, 3000, 20000, 35000, 50000, 18000],
    },
  },
  setup(props) {
    let indicator = reactive([
      { name: 'Sales', max: 6500 },
      { name: 'Administration', max: 16000 },
      { name: 'Information Technology', max: 30000 },
      { name: 'Customer Support', max: 38000 },
      { name: 'Development', max: 52000 },
      { name: 'Marketing', max: 25000 },
    ]);

    let value = reactive([4200, 3000, 20000, 35000, 50000, 18000]);

    // indicator.slice(0, 0, ...props.indicator);
    // value.slice(0, 0, ...props.chartData);

    //计算图标选项
    const option = computed(() => {
      // let indicator1 = [];
      // let value1 = [];
      console.log('props.indicator');
      console.log(props.indicator);
      console.log('props.chartData');
      console.log(props.chartData);
      // indicator1.slice(0, 0, ...props.indicator);
      // value1.slice(0, 0, ...props.chartData);

      // for (const item of props.indicator) {
      //   indicator1.push(item);
      // }
      // for (const item of props.chartData) {
      //   value1.push(item);
      // }

      return {
        radar: {
          indicator,
          // indicator: indicator1,
          // indicator: props.indicator,
        },
        series: [
          {
            type: 'radar',
            data: [
              {
                value,
                // value: value1,
                // value: props.chartData,
              },
            ],
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
