<!--
 * @Description: 博客展示文章信息
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-29 16:58:46
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-09 23:21:48
-->
<template>
  <div class="blog-main">
    <blog-main-article :data="articleData" />
    <div class="blog-main-pagination">
      <n-pagination
        v-model:page="page"
        v-model:pageSize="pageSize"
        :page-count="100"
        show-size-picker
        :page-sizes="[5,10,15,20]"
        show-quick-jumper
        @update:page="changePage(page)"
        @update:pageSize="changePageSize(pageSize)"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';
import BlogMainArticle from '@/views/blog/childComps/blogMain/childComps/BlogMainArticle.vue';

/**
 * @description: 博客展示文章信息
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'blogMain',
  components: {
    BlogMainArticle,
  },
  setup() {
    const page = ref(2); // 当前页面页数
    const pageSize = ref(5); // 每页信息条数
    const data = [
      {
        title: '1234',
        name: 'dreamy',
      },
      {
        title: '1234',
        name: 'dreamy',
      },
      {
        title: '1234',
        name: 'dreamy',
      },
      {
        title: '1234',
        name: 'dreamy',
      },
      {
        title: '1234',
        name: 'dreamy',
      },
      {
        title: '1234',
        name: 'dreamy',
      },
      {
        title: '1234',
        name: 'dreamy',
      },
      {
        title: '1234',
        name: 'dreamy',
      },
      {
        title: '1234',
        name: 'dreamy',
      },
      {
        title: '1234',
        name: 'dreamy',
      },
      {
        title: '1234',
        name: 'dreamy',
      },
      {
        title: '1234',
        name: 'dreamy',
      },
      {
        title: '1234',
        name: 'dreamy',
      },
      {
        title: '1234',
        name: 'dreamy',
      },
      {
        title: '1234',
        name: 'dreamy',
      },
      {
        title: '1234',
        name: 'dreamy',
      },
      {
        title: '1234',
        name: 'dreamy',
      },
      {
        title: '1234',
        name: 'dreamy',
      },
      {
        title: '1234',
        name: 'dreamy',
      },
      {
        title: '1234',
        name: 'dreamy',
      },
    ];

    // 获取的文章数据
    const articleData = reactive([
      {
        title: '1234',
        name: 'dreamy',
      },
      {
        title: '1234',
        name: 'dreamy',
      },
      {
        title: '1234',
        name: 'dreamy',
      },
    ]);

    function changePage() {
      articleData.splice(0, articleData.length);

      for (let i = 0; i < pageSize.value; ++i) {
        articleData.splice(articleData.length, 0, data[i]);
      }
    }

    function changePageSize() {
      if (pageSize.value > articleData.length)
        for (let i = 0; i < pageSize.value - articleData.length; ++i) {
          articleData.splice(articleData.length, 0, data[i]);
        }
      else articleData.splice(pageSize.value, articleData.length - pageSize.value);
    }

    return {
      articleData,
      page,
      pageSize,
      changePage,
      changePageSize,
    };
  },
});
</script>


<style lang="scss" scoped>
$green1: $green-1;

.blog-main {
  margin: auto;
  width: 800px;

  .blog-main-pagination {
    @include flex(center, center);
    margin-bottom: 20px;
    :deep(.n-pagination) {
      .n-pagination-item--active {
        border-color: $green-1;
        color: $green-1;
        box-shadow: 0 0 6px $green-0;
      }

      .n-base-selection {
        --border: 1px solid rgb(224, 224, 230) !important;
        --border-active: 1px solid #4bd8aa !important;
        --border-focus: 1px solid #4bd8aa !important;
        --border-hover: 1px solid #4bd8aa !important;
        --box-shadow-active: 0 0 6px #85e8c7 !important;
        --box-shadow-focus: 0 0 6px #85e8c7 !important;
      }

      .n-input {
        --border-hover: 1px solid #4bd8aa !important;
        --border-focus: 1px solid #4bd8aa !important;
        --box-shadow-focus: 0 0 6px #85e8c7 !important;
        --caret-color: #4bd8aa !important;
      }
    }
  }
}
</style>
