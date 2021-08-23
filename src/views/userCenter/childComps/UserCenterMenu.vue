<!--
 * @Description: 个人中心之左侧菜单
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-19 11:55:18
 * @LastEditors: Ban
 * @LastEditTime: 2021-08-23 13:31:48
-->
<template>
  <div class="user-center-menu">
    <div class="user-center-menu-head">
      <i class="iconfont blog-shujuan"></i>
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
            :class="item.iconfont"
            class="iconfont"
            :style="item.iconfont === 'blog-shoucang' ?{'font-size' : '12px'} : ''"
          ></i>
        </div>
        <div class="text">{{ item.title }} </div>
        <i
          class="iconfont blog-fenxiang1"
          v-if="item.url !== '/user/collection'"
        ></i>
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
            :class="item.iconfont"
            class="iconfont"
          ></i>
        </div>
        <div class="text">{{ item.title }} </div>
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
            :class="item.iconfont"
            class="iconfont"
            :style="item.iconfont === 'blog-shoucang' ?{'font-size' : '12px'} : ''"
          ></i>
        </div>
        <div class="text">{{ item.title }} </div>
        <i class="iconfont blog-fenxiang1"></i>
      </a>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

/**
 * @description: 个人中心之左侧菜单
 * @param {*}
 * @return {*}
 * @author: Ban
 */
export default defineComponent({
  name: 'userCenterMenu',
  setup() {
    const text1 = [
      {
        iconfont: 'blog-shoucang',
        title: '我的收藏',
        url: '/usercenter/collection',
      },
      {
        iconfont: 'blog-index-0-copy',
        title: '个人首页',
        url: '/user',
      },
      {
        iconfont: 'blog-lishijilu',
        title: '历史记录',
        url: '/history',
      },
    ];
    const text2 = [
      {
        iconfont: 'blog-gerenziliao',
        title: '个人资料',
        url: '/usercenter/profile',
      },
      {
        iconfont: 'blog-yinsishezhi',
        title: '隐私设置',
        url: '/usercenter/setting',
      },
      {
        iconfont: 'blog-zhanghaoanquan1',
        title: '帐号安全',
        url: '/usercenter/account',
      },
    ];
    const text3 = [
      {
        iconfont: 'blog-wenzhang',
        title: '博客主页',
        url: '',
      },
      {
        iconfont: 'blog-neirongguanli',
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
  margin-top: 16px;
  margin-bottom: 6px;
  background: $grey-0;
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;

  .user-center-menu-head {
    margin-bottom: 40px;
    div {
      font-weight: 700;
    }
  }
  .user-center-menu-text1 {
    border-bottom: 1px solid $grey-4;
  }

  .user-center-menu-text2 {
    border-bottom: 1px solid $grey-4;
  }

  .text-content {
    display: block;
    margin: 30px 0;
    color: $grey-7;
    transition: 0.25s;

    &:hover {
      color: $green-0;
    }
  }
  .text {
    display: inline-block;
    margin-left: 17px;
    margin-right: 5px;
  }

  .icon {
    display: inline-block;
    height: 16px;
    width: 16px;
  }

  .active {
    color: $green-0;
  }
}
</style>
