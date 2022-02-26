<!--
 * @Description: 博客展示文章信息
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-29 16:58:46
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-26 21:58:18
-->
<template>
  <div class="blog-main">
    <blog-main-text
      :title="text"
      :type="type"
    />
    <blog-main-article :data="articleData" />
    <blog-pagination
      v-model:page="page"
      :pageCount="pageCount"
      @changePage="changePage"
    />
  </div>
</template>
<script>
import { defineComponent, reactive, ref, onMounted } from 'vue';
import BlogMainArticle from '@/views/blog/childComps/pages/blogMain/childComps/BlogMainArticle.vue';
import BlogPagination from '@/views/blog/childComps/pages/blogMain/childComps/BlogPagination.vue';
import BlogMainText from '@/views/blog/childComps/pages/blogMain/childComps/BlogMainText.vue';
import { useRoute, useRouter } from 'vue-router';
import { getBlogArticles } from '@/network/api/articles';
import { useMessage } from 'naive-ui';

/**
 * @description: 博客展示文章信息
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'blogMain',
  components: {
    BlogMainText,
    BlogMainArticle,
    BlogPagination,
  },
  setup() {
    const msg = useMessage(); // naive-ui mssage
    const route = useRoute(); //路由
    const router = useRouter();
    const page = ref(1); // 当前页面页数
    const pageCount = ref(1); // 总页数
    const text = ref(null); // 标签或分类Id
    const type = ref(true); // 判断是标签还是分类
    const articleData = reactive([]);
    let blogPage = null; // 博客页面

    onMounted(() => {
      blogPage = document.getElementsByClassName('blog')[0];
    });

    // 获取的文章数据
    if (route.query.category != null) {
      text.value = route.query.category;
      type.value = false;
    }
    if (route.query.tag != null) text.value = route.query.tag;
    if (route.query.page != null) page.value = route.query.page;

    /**
     * @description: 获取基本信息
     * @return {Void}
     * @author: Z_Y_C
     */
    function getMeaaage() {
      getBlogArticles(type.value == true ? text.value : null, type.value == false ? text.value : null, page.value)
        .then((data) => {
          // console.log(data);
          if (route.query.page != null) {
            if (parseInt(data.page_count) >= route.query.page) {
              if (route.query.page > 0) {
                page.value = parseInt(route.query.page);
              } else {
                page.value = 1;
                changePage({ page: page.value });
              }
            } else {
              page.value = parseInt(data.page_count);
              changePage({ page: page.value });
            }
          }
          pageCount.value = parseInt(data.page_count);
          if (text.value != null)
            if (type.value == true) text.value = data.tag_name;
            else text.value = data.category_name;
          articleData.splice(0, articleData.length);
          articleData.splice(0, 0, ...data.articles);
        })
        .catch((error) => {
          console.log(error);
          msg.error('获取文章信息失败，请重试');
        });
    }

    // 获取基本数据信息
    getMeaaage();

    /**
     * @description: 页面改变后响应函数
     * @param {Number} p 页面页数改变页数
     * @return {void}
     * @author: Z_Y_C
     */

    function changePage(p) {
      page.value = p.page;

      getBlogArticles(type.value == true ? text.value : null, type.value == false ? text.value : null, page.value)
        .then((data) => {
          articleData.splice(0, articleData.length);
          articleData.splice(articleData.length, 0, ...data.articles);
        })
        .catch((error) => {
          console.log(error);
          msg.error('获取文章信息失败，请重试');
        });

      router.push(
        route.path +
          '?' +
          (route.query.category ? 'category=' + route.query.category + '&' : '') +
          (route.query.tag ? 'tag=' + route.query.tag + '&' : '') +
          ('page=' + page.value)
      );

      blogPage.scrollTo({ top: document.body.offsetHeight - 54 });
    }

    return {
      articleData,
      page,
      pageCount,
      text,
      type,
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
