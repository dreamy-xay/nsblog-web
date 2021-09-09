<!--
 * @Description: 用户中心右侧主要内容展示
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 18:12:24
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-09 12:23:10
-->
<template>
  <div class="user-main">
    <div class="user-main-info">
      <user-main-article />
      <user-main-question />
      <user-main-resource />
    </div>
    <div class="user-main-menu">
      <div
        v-for="(item, index) in menu"
        :key="index"
        class="button"
        :class="{'button-active': compareRoute(item.url)}"
        role="button"
        @click="changePage(item.url)"
      >
        <div>
          <i
            class="iconfont"
            :class="item.icon"
          ></i>
        </div>
        {{item.name}}
      </div>
    </div>
    <div class="user-main-detail">
      <router-view v-slot="{ Component }">
        <!-- 将页面数据缓存 -->
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import UserMainArticle from '@/views/user/childComps/userMain/childComps/UserMainArticle.vue';
import UserMainQuestion from '@/views/user/childComps/userMain/childComps/UserMainQuestion.vue';
import UserMainResource from '@/views/user/childComps/userMain/childComps/UserMainResource.vue';
import router from '@/router';
import { useRoute } from 'vue-router';

/**
 * @description: 用户中心右侧主要内容展示
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userMain',
  components: {
    UserMainArticle,
    UserMainQuestion,
    UserMainResource,
  },
  setup() {
    const route = useRoute(); // route
    const username = route.params.username; // 访问页面的用户名

    // tab 菜单
    const menu = [
      {
        icon: 'blog-fabu',
        name: '文章发布',
        url: `/user/${username}/article`,
      },
      {
        icon: 'blog-dongtai',
        name: '我的动态',
        url: `/user/${username}/dynamic`,
      },
      {
        icon: 'blog-wenda',
        name: '提问回答',
        url: `/user/${username}/question`,
      },
      {
        icon: 'blog-shoucang1',
        name: '我的收藏',
        url: `/user/${username}/collection`,
      },
      {
        icon: 'blog-fenxiang',
        name: '资源共享',
        url: `/user/${username}/resource`,
      },
      {
        icon: 'blog-xiaozu1',
        name: '学习小组',
        url: `/user/${username}/group`,
      },
      {
        icon: 'blog-icon-test',
        name: '',
        url: `/user/${username}/profile`,
      },
    ];

    /**
     * @description: 切换页面
     * @param {string} path 跳转的页面路径
     * @return {void}
     * @author: dreamy-xay
     */
    function changePage(path) {
      router.push({ path });
    }

    /**
     * @description: 匹配激活路径
     * @param {string} url 当前路径
     * @return {boolean} 返回是否匹配成功
     * @author: dreamy-xay
     */
    function compareRoute(url) {
      return new RegExp(url + '(/|$|\\?)').test(route.path);
    }

    return {
      menu,
      changePage,
      compareRoute,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-main {
  width: 890px;
  @include flex(center, initial, column);

  & > div {
    margin-top: 16px;
  }

  .user-main-info {
    width: 100%;
    height: 198px;
    @include flex(center, center);
    margin-top: 0;
  }

  .user-main-menu {
    height: 36px;
    width: 100%;
    @include flex(center);

    .button {
      width: 120px;
      height: 100%;
      margin-right: 16px;
      box-shadow: $shadow-0;
      border-radius: $border-radius-0;
      background-color: $grey-0;
      color: $grey-7;
      font-size: 14px;
      @include flex(center, center);
      transition: 0.4s;
      letter-spacing: 0.5px;

      &:last-child {
        width: 74px;
        margin-right: 0;
      }

      div {
        height: 20px;
        width: 20px;
        text-align: center;
        line-height: 20px;
        margin-right: 10px;

        .iconfont {
          color: $grey-7;
          transition: 0.4s;
          font-size: 20px;
          text-align: center;
        }
      }

      &:hover {
        color: $grey-10;
        background-color: $grey-2;

        .iconfont {
          color: $grey-10;
        }
      }

      &.button-active {
        color: $green-1;
        box-shadow: $shadow-2;
        background-color: $grey-0;

        .iconfont {
          color: $green-1;
        }
      }
    }
  }

  .user-main-detail {
    width: 100%;
    @include flex();
  }
}
</style>
