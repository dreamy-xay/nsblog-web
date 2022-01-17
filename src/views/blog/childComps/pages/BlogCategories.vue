<!--
 * @Description: 博客全部分类页面
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-24 18:26:04
 * @LastEditors: clq
 * @LastEditTime: 2022-01-17 17:32:25
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

    // 雷达图数据
    // const radarData = computed(() => {
    //   return {
    //     indicator: [
    //       { name: 'class1', max: 6500 },
    //       { name: 'class2', max: 16000 },
    //       { name: 'class3', max: 30000 },
    //       { name: 'class4', max: 38000 },
    //       { name: 'class5', max: 52000 },
    //       { name: 'class6', max: 25000 },
    //     ],
    //     data: [
    //       {
    //         value: [4200, 3000, 20000, 35000, 50000, 18000],
    //         name: 'Allocated Budget',
    //       },
    //     ],
    //   };
    // });

    getCategories(username)
      .then((data) => {
        for (let category of data.categories) {
          const color = randomColor();
          category.color = color[0];
          category.hoverColor = color[1];
          category.url = `/blog/${username}?category=${category.id}`;
          delete category['id'];
          // categories.splice(0, 0, category);
          categoryCount.splice(0, 0, category.count);
        }
        // console.log(data.categories);
        // console.log(categoryCount);
        maxCount = Math.max(...categoryCount);
        // console.log(maxCount);
        for (let category of data.categories) {
          indicator.splice(0, 0, { name: category.name, max: maxCount });
        }
        // console.log(indicator);
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
    // @include flex(flex-start);
    // align-content: flex-start;
    // flex-wrap: wrap;
    margin-top: 16px;
    margin-bottom: 100px;
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
