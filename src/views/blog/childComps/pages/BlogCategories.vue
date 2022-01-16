<!--
 * @Description: 博客全部分类页面
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-24 18:26:04
 * @LastEditors: clq
 * @LastEditTime: 2022-01-16 18:44:35
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
      <div
        v-for="(item, index) in categories"
        :key="index"
        :class="['category-item',{purple: index%3==0},{orange: index%3==1},{red: index%3==2}]"
        role="button"
        @click="toCategory(item.url)"
      >
        {{item.name}}
      </div>
    </div>

    <div class="blog-categories-chart">
      <div class="title">
        文章分类雷达图
      </div>
      <div class="chart">
        <blog-categories-chart :chartData="radarData" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, ref } from 'vue';
import BlogCategoriesChart from '@/views/blog/childComps/pages/childComps/BlogCategoriesChart.vue';
/**
 * @description: 博客全部分类页面
 * @author: clq
 */

export default defineComponent({
  name: 'blogCategories',
  components: {
    BlogCategoriesChart,
  },
  props: {},
  setup(props, context) {
    // 文章分类信息
    const categories = reactive([
      {
        name: 'class1',
        url: '/class1',
      },
      {
        name: 'class2',
        url: '/class2',
      },
      {
        name: 'class3',
        url: '/class3',
      },
      {
        name: 'class4',
        url: '/class4',
      },
      {
        name: 'class5',
        url: '/class5',
      },
    ]);

    // 雷达图数据
    const radarData = computed(() => {
      return {
        indicator: [
          { name: 'class1', max: 6500 },
          { name: 'class2', max: 16000 },
          { name: 'class3', max: 30000 },
          { name: 'class4', max: 38000 },
          { name: 'class5', max: 52000 },
          { name: 'class6', max: 25000 },
        ],
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: 'Allocated Budget',
          },
        ],
      };
    });

    /**
     * @description: 跳转至分类页面
     * @param url:地址
     * @return {void}
     * @author: clq
     */
    function toCategory(url) {
      console.log(url);
    }

    return {
      categories,
      radarData,
      toCategory,
    };
  },
});
</script>

<style lang="scss" scoped>
.blog-categories {
  @include flex(center, _, column);
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
    @include flex(_, center);
    flex-wrap: wrap;
    padding: 24px;
    padding-bottom: 0;

    .category-item {
      box-sizing: border-box;
      height: 38px;
      padding: 11px 12px;
      margin: 0 20px 20px 0;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 400;
      color: $grey-10;
      box-shadow: $shadow-0;
    }

    .purple {
      background-color: $purple-0;
      transition: 0.25s;

      &:hover {
        background-color: $purple-1;
      }
    }

    .orange {
      background-color: $orange-0;
      transition: 0.25s;

      &:hover {
        background-color: $orange-1;
      }
    }

    .red {
      background-color: $red-0;
      transition: 0.25s;

      &:hover {
        background-color: $red-1;
      }
    }
  }

  .blog-categories-chart {
    @include flex(center, _, column);

    .title {
      margin: 12px 0 0;
      font-size: 26px;
      font-weight: 400;
      color: $grey-8;
    }
  }
}
</style>
