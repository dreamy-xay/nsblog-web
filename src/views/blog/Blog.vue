<!--
 * @Description: 博客主页
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-24 18:20:47
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-17 15:52:07
-->
<template>
  <div
    class="blog"
    ref="blogPage"
  >
    <base-background :mask="false" />
    <base-loading-bar inject-name="blogPage" />
    <blog-menu :username="username" />
    <blog-head :blog-data="blogData" />
    <router-view></router-view>
    <base-loading-page :show="showLoadingPage" />
    <base-footer :show-all="false" />
  </div>
</template>

<script>
import { defineComponent, ref, provide, reactive } from 'vue';
import BaseBackground from '@/components/content/baseBackground/BaseBackground.vue';
import BaseLoadingPage from '@/components/common/baseLoadingPage/BaseLoadingPage.vue';
import BaseLoadingBar from '@/components/common/baseLoadingBar/BaseLoadingBar.vue';
import BlogHead from '@/views/blog/childComps/BlogHead.vue';
import BlogMenu from '@/views/blog/childComps/BlogMenu.vue';
import BaseFooter from '@/components/content/baseFooter/BaseFooter.vue';
import { useRoute } from 'vue-router';
import { getBlogInfo } from '@/network/api/articles';

/**
 * @description: 博客主页
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'blog',
  components: {
    BaseBackground,
    BaseLoadingPage,
    BaseLoadingBar,
    BlogHead,
    BlogMenu,
    BaseFooter,
  },
  setup() {
    const route = useRoute(); // route
    const username = route.params.username; // 获取用户名
    const blogPage = ref(null); // article page ref
    const showLoadingPage = ref(true); // 显示加载页面

    // 向子组件传递
    provide('blogPage', blogPage);

    // blog 数据
    const blogData = reactive({
      nickname: '',
      signature: '',
      blog_home_image: null,
    });

    // 获取博客数据
    getBlogInfo(username)
      .then((data) => {
        blogData.nickname = data.nickname;
        blogData.signature = data.signature;
        blogData.blog_home_image = data.blog_home_image;
        showLoadingPage.value = false;
      })
      .catch((error) => {
        console.log(error);
      });

    return {
      username,
      blogPage,
      showLoadingPage,
      blogData,
    };
  },
});
</script>

<style lang="scss" scoped>
.blog {
  width: 100%;
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
