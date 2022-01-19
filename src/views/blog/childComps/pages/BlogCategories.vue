<!--
 * @Description: 博客全部分类页面
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-24 18:26:04
 * @LastEditors: clq
 * @LastEditTime: 2022-01-18 14:00:28
-->
<template>
  <div class="blog-categories">
    <div class="blog-categories-title">
      <div>
        <i class="iconfont blog-fenlei1"></i>
        文章分类
      </div>
    </div>

    <div class="blog-categories-content">
      <template v-if="categories.length">
        <base-tag
          :size="38"
          v-for="category in categories"
          :key="category.name"
          :text="category.name"
          :color="category.color"
          :hover-color="category.hoverColor"
          :style="{borderRadius: styles.borderRadius1, boxShadow: styles.shadow0, fontSize: '16px', marginRight: '20px', marginBottom: '20px'}"
          :href="category.url"
        >
          <template #text-after>
            <div class="categories-count">
              {{ category.count }}
            </div>
          </template>
        </base-tag>
      </template>
      <template v-else>
        <base-svg
          style="width:100%;height:200px;padding-left: 60px;"
          svg="data-empty"
          :color="svgColor"
        ></base-svg>
      </template>
    </div>

    <div
      v-if="categories.length"
      class="blog-categories-chart"
    >
      <div class="title">
        文章分类雷达图
      </div>
      <div class="chart">
        <blog-categories-chart
          :indicator="indicator"
          :chartData="categoryCount"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, ref } from 'vue';
import BaseTag from '@/components/content/baseTag/BaseTag.vue';
import BaseSvg from '@/components/content/baseSvg/BaseSvg.vue';
import BlogCategoriesChart from '@/views/blog/childComps/pages/childComps/BlogCategoriesChart.vue';
import { getCategories } from '@/network/api/articles';
import { useRoute } from 'vue-router';
import { useMessage } from 'naive-ui';
import styles from '@/assets/style/define.scss';
/**
 * @description: 博客全部分类页面
 * @author: clq
 */

export default defineComponent({
  name: 'blogCategories',
  components: {
    BlogCategoriesChart,
    BaseTag,
    BaseSvg,
  },
  props: {},
  setup(props, context) {
    const msg = useMessage(); // naive-ui 消息组件
    const route = useRoute(); //route
    const username = route.params.username; //获取博主用户名
    const svgColor = styles.green1; //svg图片颜色
    const chartDataCount = ref(20); //雷达图数据项限制

    let categories = reactive([]); // 文章分类信息
    let indicator = reactive([]);
    let categoryCount = reactive([]); // 各分类的文章数量
    let maxCount = ref(); // categoryCount中的最大值

    const colorList = [
      // 颜色列表
      [styles.purple0, styles.purple1],
      [styles.orange0, styles.orange1],
      [styles.red0, styles.pink0],
      [styles.yellow0, styles.yellow1],
      [styles.green0, styles.green1],
      [styles.blue0, styles.blue1],
    ];

    /**
     * @description: 随机获取颜色
     * @return {[string, string]} 返回颜色和hover色
     * @author: dreamy-xay
     */
    function randomColor() {
      return colorList[Math.floor(Math.random() * colorList.length)];
    }

    /**
     * @description: 文章分类数组按分类数降序排序
     * @param {*} a
     * @param {*} b
     * @return {*}
     * @author: clq
     */
    function sortCategoriesByCount(a, b) {
      return b.count - a.count;
    }

    getCategories(username)
      .then((data) => {
        data.categories.sort(sortCategoriesByCount);
        console.log('data.categories');
        console.log(data.categories);

        for (let category of data.categories) {
          const color = randomColor();
          category.color = color[0];
          category.hoverColor = color[1];
          category.url = `/blog/${username}?category=${category.id}`;
          delete category['id'];
          categories.splice(0, 0, category);
        }
        maxCount = data.categories[0].count;
        chartDataCount.value =
          chartDataCount.value > data.categories.length ? data.categories.length : chartDataCount.value;
        for (let i = 0; i < chartDataCount.value; i++) {
          indicator.splice(0, 0, { name: data.categories[i].name, max: maxCount });
          categoryCount.splice(0, 0, data.categories[i].count);
        }
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取标签失败', { duration: 2000, closable: true });
      });

    /**
     * @description: 跳转至分类页面
     * @param id:地址
     * @return {void}
     * @author: clq
     */
    function toCategory(id) {
      window.open(`/blog/${username}?category=${id}`);
    }

    return {
      styles,
      categories,
      indicator,
      categoryCount,
      svgColor,
      toCategory,
    };
  },
});
</script>

<style lang="scss" scoped>
.blog-categories {
  @include flex(center, initial, column);
  width: 100%;
  height: 100%;

  & > div {
    box-sizing: border-box;
    width: 800px;
    background-color: $grey-0;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: $shadow-0;
  }

  .blog-categories-title {
    @include flex(center, center);
    height: 80px;
    margin-top: 30px;
    font-size: 32px;
    font-weight: 700;
    color: $grey-8;

    .iconfont {
      color: $grey-9;
      font-size: 32px;
    }
  }

  .blog-categories-content {
    margin-top: 16px;
    margin-bottom: 50px;
    width: 800px;
    border-radius: $border-radius-0;
    box-shadow: $shadow-0; //阴影
    padding: 24px 4px 4px 24px;
    background-color: $grey-0;

    .categories-count {
      margin-left: 6px;
    }
  }

  .blog-categories-chart {
    @include flex(center, initial, column);

    .title {
      margin: 12px 0 0;
      font-size: 26px;
      font-weight: 400;
      color: $grey-8;
    }
  }
}
</style>
