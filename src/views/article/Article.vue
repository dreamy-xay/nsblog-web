<!--
 * @Description: 文章页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-16 16:32:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-29 21:53:28
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
    <article-footer :data="articleFooterData" />
    <article-loading-page :show="showLoadingPage" />
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
import ArticleLoadingPage from '@/views/article/childComps/ArticleLoadingPage.vue';
import { getArticleInfo } from '@/network/api/articles';
import { addAttentions, deleteAttentions, modifyArticleEvaluation } from '@/network/api/attentions';
import { useRoute } from 'vue-router';
import events from '@/events';
import { useMessage } from 'naive-ui';
import { appendHTML } from '@/util/dom';

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
    ArticleLoadingPage,
  },
  setup() {
    const msg = useMessage(); // naive-ui message
    const articlePage = ref(null); // article page ref
    const showLoadingPage = ref(true); // 显示加载页面

    // 向子组件传递
    provide('articlePage', articlePage);

    const route = useRoute(); // route
    const articleId = route.params.articleId; // 当前文章id
    const articleData = reactive({
      title: '',
      username: '',
      nickname: '',
      avatar: '',
      release_time: null,
      page_view: 0,
      comment_count: 0,
      topic: '',
      categories: [],
      tags: [],
      content: '',
      cover_image: null,
      license: null,
      recommend_count: 0,
      evaluation: undefined, //0:反对 1:推荐 2:不反对,不推荐
      collection: undefined, //0:未收藏 1:已收藏
      attention: undefined, //0:未关注 1:已关注
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
      .then(async (data) => {
        articleData.title = data.title;
        articleData.username = data.username;
        articleData.nickname = data.nickname;
        articleData.avatar = data.avatar;
        articleData.release_time = data.release_time;
        articleData.page_view = data.page_view;
        articleData.comment_count = data.comment_count;
        articleData.topic = data.topic;
        articleData.cover_image = data.cover_image;
        articleData.license = data.license;
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

        // 动态添加html
        await appendHTML(document.body, data.blog_article_html);

        // 取消显示加载页面
        showLoadingPage.value = false;
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
        cover_image: articleData.cover_image,
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
        license: articleData.license,
        last_article: articleData.last_article,
        next_article: articleData.next_article,
        attention: articleData.attention,
        collection: articleData.collection,
        evaluation: articleData.evaluation,
        sponsors: articleData.sponsors,
      };
    });

    // 计算 footer data
    const articleFooterData = computed(() => {
      return {
        article_id: articleId,
        username: articleData.username,
      };
    });

    //处理 ArticleBottomComp 发出的事件
    events
      .on('ArticleBottomComp-changeAttention', (newValue) => {
        console.log('newAttention:' + newValue);
        (newValue ? addAttentions : deleteAttentions)(articleData.username)
          .then(() => {
            articleData.attention = newValue;
          })
          .catch((err) => {
            console.log(err);
            msg.error(`${newValue ? '' : '取消'}关注失败`, { duration: 2000, closable: true });
          });
      })
      .on('ArticleBottomComp-changeCollection', (newValue) => {
        console.log('newCollection:' + newValue);
      })
      .on('ArticleBottomComp-changeEvaluation', (newValue) => {
        console.log('newEvaluation:' + newValue);
        modifyArticleEvaluation(articleId, newValue)
          .then(() => {
            articleData.evaluation = newValue;
          })
          .catch((err) => {
            console.log(err);
            msg.error('修改评价失败', { duration: 2000, closable: true });
          });
      });

    return {
      articlePage,
      showLoadingPage,
      articleData,
      articleHeadData,
      articleBodyData,
      articleFooterData,
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
