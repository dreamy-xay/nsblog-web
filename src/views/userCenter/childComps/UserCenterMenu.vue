<!--
 * @Description: 个人中心之左侧菜单
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-19 11:55:18
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-26 22:17:21
-->
<template>
  <div class="user-center-menu">
    <div class="user-center-menu-head">
      <div class="icon">
        <i class="iconfont blog-shujuan"></i>
      </div>
      <div class="text">个人中心</div>
    </div>
    <div class="user-center-menu-text1">
      <a
        class="text-content"
        v-for="item in text1"
        :key="item.title"
        :href="item.url"
        :class="{active : compareRoute(item.url)}"
      >
        <div class="icon">
          <i
            :class="item.icon"
            class="iconfont"
          ></i>
        </div>
        <div class="text">{{item.title}} </div>
        <div class="icon">
          <i
            class="iconfont blog-fenxiang1"
            v-if="item.url !== '/userCenter/collection'"
          ></i>
        </div>
      </a>
    </div>
    <div class="user-center-menu-text2">
      <a
        class="text-content"
        v-for="item in text2"
        :key="item.title"
        :href="item.url"
        :class="{active : compareRoute(item.url)}"
      >
        <div class="icon">
          <i
            :class="item.icon"
            class="iconfont"
          ></i>
        </div>
        <div class="text">{{item.title}} </div>
      </a>
    </div>
    <div class="user-center-menu-text3">
      <a
        class="text-content"
        v-for="item in text3"
        :key="item.title"
        :href="item.url"
      >
        <div class="icon">
          <i
            :class="item.icon"
            class="iconfont"
          ></i>
        </div>
        <div class="text">{{item.title}}</div>
        <div class="icon">
          <i class="iconfont blog-fenxiang1"></i>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

/**
 * @description: 个人中心之左侧菜单
 * @author: Ban
 */

export default defineComponent({
  name: 'userCenterMenu',
  setup() {
    // 菜单1
    const text1 = [
      {
        icon: 'blog-shoucang',
        title: '我的收藏',
        url: '/userCenter/collection',
      },
      {
        icon: 'blog-index-0-copy',
        title: '个人首页',
        url: '/user',
      },
      {
        icon: 'blog-lishijilu',
        title: '历史记录',
        url: '/history',
      },
    ];
    // 菜单2
    const text2 = [
      {
        icon: 'blog-gerenziliao',
        title: '个人资料',
        url: '/usercenter/profile',
      },
      {
        icon: 'blog-yinsishezhi',
        title: '隐私设置',
        url: '/usercenter/setting',
      },
      {
        icon: 'blog-zhanghaoanquan1',
        title: '帐号安全',
        url: '/usercenter/account',
      },
    ];
    // 菜单3
    const text3 = [
      {
        icon: 'blog-wenzhang',
        title: '博客主页',
        url: '',
      },
      {
        icon: 'blog-neirongguanli',
        title: '内容管理',
        url: '',
      },
    ];

    const route = useRoute().path.split('/'); //当前路径
    const routeLenght = route.length;
    //匹配路径
    function compareRoute(url) {
      if (url === `/${route[routeLenght - 2]}/${route[routeLenght - 1]}`) return true;
      else return false;
    }

    return {
      text1,
      text2,
      text3,
      compareRoute,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-center-menu {
  padding: 24px 35px;
  margin-bottom: 6px;
  background: $grey-0;
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;
  font-size: 16px;
  @include flex(initial, center, column);

  .icon {
    height: 100%;
    width: 18px;
    line-height: 21px;

    .iconfont {
      font-size: 18px;

      &.blog-shoucang {
        font-size: 14px;
      }
    }
  }

  .text {
    height: 100%;
    line-height: 21px;
    margin-left: 17px;
    margin-right: 5px;
    font-weight: 600;
    font-size: 16px;
  }

  .user-center-menu-head {
    height: 21px;
    width: 100%;
    padding-bottom: 10px;
    @include flex(center);
  }

  .user-center-menu-text1 {
    border-bottom: 1px solid $grey-4;
  }

  .user-center-menu-text2 {
    border-bottom: 1px solid $grey-4;
  }

  .user-center-menu-text1,
  .user-center-menu-text2,
  .user-center-menu-text3 {
    width: 100%;

    .text-content {
      width: 100%;
      margin: 30px 0;
      height: 21px;
      @include flex(center);
      color: $grey-7;
      transition: 0.25s;

      &:hover {
        color: $green-0;
      }

      &.active {
        color: $green-0;
      }
    }
  }
}
</style>
