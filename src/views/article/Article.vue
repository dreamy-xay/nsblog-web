<!--
 * @Description: 文章页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-16 16:32:13
 * @LastEditors: clq
 * @LastEditTime: 2021-09-26 17:03:42
-->

<template>
  <div
    class="article"
    ref="articlePage"
  >
    <base-background :mask="false" />
    <article-menu :username="articleHeadData.username" />
    <article-loading-bar />
    <article-head :data="articleHeadData" />
    <article-body :data="articleBodyData" />
    <article-footer />
  </div>
</template>

<script>
import { computed, defineComponent, provide, reactive, ref } from 'vue';
import BaseBackground from '@/components/content/baseBackground/BaseBackground.vue';
import ArticleMenu from '@/views/article/childComps/articleMenu/ArticleMenu.vue';
import ArticleLoadingBar from '@/views/article/childComps/ArticleLoadingBar.vue';
import ArticleHead from '@/views/article/childComps/articleHead/ArticleHead.vue';
import ArticleBody from '@/views/article/childComps/articleBody/ArticleBody.vue';
import ArticleFooter from './childComps/articleFooter/ArticleFooter.vue';
import { getArticleInfo } from '@/network/api/articles';
import { useRoute } from 'vue-router';

/**
 * @description:
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'Article',
  components: {
    BaseBackground,
    ArticleMenu,
    ArticleLoadingBar,
    ArticleHead,
    ArticleBody,
    ArticleFooter,
  },
  setup() {
    const articlePage = ref(null); // article page ref

    // 向子组件传递
    provide('articlePage', articlePage);

    const route = useRoute(); // route
    const articleId = route.params.articleId; // 当前文章id
    const articleData = reactive({
      title: '',
      username: '',
      nickname: '',
      avatar: null,
      release_time: null,
      page_view: 0,
      comment_count: 0,
      topic: '',
      categories: [],
      tags: [],
      content: '',
      recommend_count: 0,
      evaluation: undefined,
      collection: undefined,
      attention: undefined,
      last_article: {
        article_id: null,
        title: '',
      },
      next_article: {
        article_id: null,
        title: '',
      },
      sponsors: {},
    });

    // 获取文章数据
    getArticleInfo(articleId)
      .then((data) => {
        console.log(data);
        articleData.title = data.title;
        articleData.username = data.username;
        articleData.nickname = data.nickname;
        articleData.avatar = data.avatar;
        articleData.release_time = data.release_time;
        articleData.page_view = data.page_view;
        articleData.comment_count = data.comment_count;
        articleData.topic = data.topic;
        articleData.categories = data.categories;
        articleData.tags = data.tags;
        articleData.content = data.content;
        articleData.recommend_count = data.recommend_count;
        articleData.evaluation = data.evaluation;
        articleData.collection = data.collection;
        articleData.attention = data.attention;
        articleData.last_article = data.last_article;
        articleData.next_article = data.next_article;
        articleData.sponsors = data.sponsors;
      })
      .catch((error) => {
        console.log(error);
      });

    // 计算head data
    const articleHeadData = computed(() => {
      return {
        title: articleData.title,
        username: articleData.username,
        nickname: articleData.nickname,
        page_view: articleData.page_view,
        recommend_count: articleData.recommend_count,
        comment_count: articleData.comment_count,
        topic: articleData.topic,
        release_time: articleData.release_time,
        categories: articleData.categories,
        length: articleData.content.length,
        tags: articleData.tags,
      };
    });

    // 计算body data
    const articleBodyData = computed(() => {
      return {
        article_id: articleId,
        username: articleData.username,
        nickname: articleData.nickname,
        avatar: articleData.avatar,
        category: articleData.category,
        content: articleData.content,
        categories: articleData.categories,
        tags: articleData.tags,
        last_article: articleData.last_article,
        next_article: articleData.next_article,
        attention: articleData.attention,
        collection: articleData.collection,
        evaluation: articleData.evaluation,
        sponsors: articleData.sponsors,
      };
    });

    return {
      articlePage,
      articleHeadData,
      articleBodyData,
    };
  },
});
</script>

<style lang="scss" scoped>
.article {
  width: 100%;
  letter-spacing: 0.75px;
  font-family: 'Open Sans', sans-serif;
  height: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    background: $green-0;

    &:hover {
      background-color: $green-1;
    }
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 0;
    background: $grey-0;
  }
}
</style>
