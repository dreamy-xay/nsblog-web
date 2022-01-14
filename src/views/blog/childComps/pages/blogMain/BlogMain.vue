<!--
 * @Description: 博客展示文章信息
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-29 16:58:46
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-14 17:15:52
-->
<template>
  <div class="blog-main">
    <blog-main-article
      :data="articleData"
      :title="'22'"
      :type="false"
    />
    <blog-pagination
      :page="page"
      :pageCount="pageCount"
      @changePage="changePage"
    />
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';
import BlogMainArticle from '@/views/blog/childComps/pages/blogMain/childComps/BlogMainArticle.vue';
import BlogPagination from '@/views/blog/childComps/pages/blogMain/childComps/BlogPagination.vue';
import { useRoute, useRouter } from 'vue-router';

/**
 * @description: 博客展示文章信息
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'blogMain',
  components: {
    BlogMainArticle,
    BlogPagination,
  },
  setup(props) {
    const route = useRoute(); //路由
    const router = useRouter();
    const username = route.params.username; // 获取用户名
    const page = ref(1); // 当前页面页数
    const pageCount = 5; // 总页数
    const messageCount = 49; // 信息总条数
    const limit = 10;

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

    if (route.query.offest != null) page.value = parseInt(route.query.offest) / 10 + 1;
    console.log(parseInt(route.query.offest) / 10 + 1);

    console.log(route.path);
    /**
     * @description: 页面改变后响应函数
     * @param {Number} p 页面页数改变页数
     * @return {void}
     * @author: Z_Y_C
     */

    function changePage(p) {
      page.value = p.page;
      router.push(
        route.path +
          '?' +
          (route.query.category ? 'category=' + route.query.category + '&' : '') +
          (route.query.tag ? 'tag=' + route.query.tag + '&' : '') +
          ('limit=' +
            (limit < messageCount - (page.value - 1) * 10 ? limit : messageCount - (page.value - 1) * 10) +
            '&') +
          ('offest=' + (page.value - 1) * 10)
      );

      articleData.splice(0, articleData.length);
      for (let i = 0; i < 10; ++i) {
        articleData.splice(articleData.length, 0, data[i]);
      }
    }

    return {
      articleData,
      page,
      pageCount,
      changePage,
    };
  },
});
</script>


<style lang="scss" scoped>
$green1: $green-1;

.blog-main {
  margin: auto;
  width: 800px;
}
</style>
