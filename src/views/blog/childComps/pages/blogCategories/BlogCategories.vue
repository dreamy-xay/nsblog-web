<!--
 * @Description: 博客全部分类页面
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-24 18:26:04
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-17 12:46:38
-->
<template>
  <div class="blog-categories">
    <div class="blog-categories-head">
      <div class="left-icon">
        <i class="iconfont blog-fenlei1"></i>
      </div>
      <div class="content">文章分类</div>
    </div>
    <div
      class="blog-categories-content"
      v-if="categories.length"
    >
      <base-tag
        :size="38"
        v-for="category in shuffle(categories)"
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
    </div>
    <div class="blog-categories-chart-container">
      <template v-if="categories.length">
        <div class="title">
          文章分类雷达图
        </div>
        <div class="chart">
          <blog-categories-chart :categories="chartCategories" />
        </div>
      </template>
      <template v-else>
        <base-svg
          style="width: 100%; height: 400px; display: flex; align-items: center; justify-content: center;"
          svg="data-empty"
          :color="styles.green1"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, ref } from 'vue';
import BaseTag from '@/components/content/baseTag/BaseTag.vue';
import BaseSvg from '@/components/content/baseSvg/BaseSvg.vue';
import BlogCategoriesChart from '@/views/blog/childComps/pages/blogCategories/childComps/BlogCategoriesChart.vue';
import { getCategories } from '@/network/api/articles';
import { useRoute } from 'vue-router';
import { useMessage } from 'naive-ui';
import { shuffle } from 'lodash';
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
  setup() {
    const msg = useMessage(); // naive-ui 消息组件
    const route = useRoute(); // route
    const username = route.params.username; // 获取博主用户名
    let chartDataMaxCount = 20; // 雷达图数据项限制

    const categories = reactive([]); // 文章分类信息
    const maxCount = ref(0); // 分类中count最大值

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

    // 计算表格分类信息
    const chartCategories = computed(() => {
      const newCategories = [...categories];
      newCategories.sort((a, b) => {
        return b.count - a.count;
      });
      return shuffle(newCategories.slice(0, Math.min(chartDataMaxCount, newCategories.length)));
    });

    // 初始化获取数据
    getCategories(username)
      .then((data) => {
        for (let category of data.categories) {
          const color = randomColor();
          category.color = color[0];
          category.hoverColor = color[1];
          category.url = `/blog/${username}?category=${category.id}`;
          delete category['id'];
          categories.splice(categories.length, 0, category);
        }

        maxCount.value = data.categories[0].count;
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取标签失败');
      });

    /**
     * @description: 跳转至分类页面
     * @param {number} id 分类id `必传参数`
     * @return {void}
     * @author: clq
     */
    function toCategory(id) {
      window.open(`/blog/${username}?category=${id}`);
    }

    return {
      styles,
      categories,
      chartCategories,
      maxCount,
      chartDataMaxCount,
      shuffle,
      toCategory,
    };
  },
});
</script>

<style lang="scss" scoped>
.blog-categories {
  @include flex(center, flex-start, column);
  width: 100%;

  & > div {
    border-radius: $border-radius-0;
    background-color: $grey-0;
    box-shadow: $shadow-0;
    width: 800px;
  }

  .blog-categories-head {
    margin-top: 31px;
    height: 80px;
    @include flex(center, center);

    .left-icon {
      height: 100%;
      margin-right: 16px;
      @include flex(center);

      .iconfont {
        font-size: 35px;
        color: $grey-8;
      }
    }

    .content {
      font-size: 32px;
      font-weight: bold;
      color: $grey-8;
    }
  }

  .blog-categories-content {
    @include flex(flex-start);
    align-content: flex-start;
    flex-wrap: wrap;
    margin-top: 16px;
    box-sizing: border-box;
    padding: 24px 4px 4px 24px;

    .categories-count {
      margin-left: 6px;
    }
  }

  .blog-categories-chart-container {
    @include flex(center, initial, column);
    margin: 16px 0 50px 0;

    .title {
      margin: 20px 0 0;
      font-size: 26px;
      font-weight: 400;
      color: $grey-8;
    }
  }
}
</style>
