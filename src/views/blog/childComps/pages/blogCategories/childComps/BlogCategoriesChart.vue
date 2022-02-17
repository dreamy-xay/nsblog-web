<!--
 * @Description: 文章分类雷达图组件
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-13 14:38:10
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-17 12:31:25
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
import styles from '@/assets/style/define.scss';

/**
 * @description: 文章分类雷达图组件
 * @param {Array} categories 分类数据 `默认为 []`
 * @author: clq
 */

export default defineComponent({
  name: 'blogCategoriesChart',
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    //计算图标选项
    const option = computed(() => {
      let max = 0;
      for (const category of props.categories) max = Math.max(max, category.count);
      return {
        tooltip: {
          trigger: 'axis',
        },
        radar: {
          indicator: props.categories.map((category) => ({ name: category.name, max: max })),
        },
        series: [
          {
            type: 'radar',
            color: styles.green1,
            tooltip: {
              trigger: 'item',
            },
            areaStyle: {},
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: styles.green0,
                borderColor: styles.green1,
                borderWidth: 1,
              },
            },
            data: [
              {
                value: props.categories.map((category) => category.count),
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
  margin-bottom: 10px;

  .chart {
    width: 400px;
    height: 400px;
  }
}
</style>
