<!--
 * @Description: 管理员管理界面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-19 13:44:53
-->

<template>
  <div class="admin">
    <div
      class="admin-left"
      :style="{width: menuWidth + 'px'}"
    >
      <admin-avatar
        :is-collapse="menuCollapse"
        :avatar="adminInfo.avatar"
        :signature="adminInfo.signature"
        :nickname="adminInfo.nickname"
      ></admin-avatar>
      <admin-menu
        :is-collapse="menuCollapse"
        :menu-list="menuList"
      ></admin-menu>
    </div>
    <div
      class="admin-right"
      :style="{width: 'calc(100% - ' + menuWidth + 'px)'}"
    >
      <admin-top-bar
        :notice-sum="noticeSum"
        @mainMenuClick="topBarMenuClick"
        @noticeClick="topBarNoticeClick"
        @searchClick="topBarSearchClick"
        @logoutClick="topBarLogoutClick"
      ></admin-top-bar>
      <div class="right-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { verifyToken, clearToken } from '@/network/token';
import { getAdminInfo } from '@/network/admin/api';
import { Loading } from 'element-ui';
import AdminTopBar from '@/views/admin/childComps/AdminTopBar.vue';
import AdminMenu from '@/views/admin/childComps/AdminMenu.vue';
import AdminAvatar from '@/views/admin/childComps/AdminAvatar.vue';

/**
 * @description: 管理员管理界面
 * @author: dreamy-xay
 */

export default Vue.extend({
  name: 'Admin',
  data() {
    return {
      menuCollapse: false,
      menuWidth: 210,
      noticeSum: 30,
      adminInfo: this.$route.params,
      menuList: [
        { title: '仪表盘', icon: 'blog-data', url: '/admin/dataAnalyze' },
        {
          title: '文章',
          icon: 'blog-arcitle',
          url: 'article',
          child: [
            {
              title: '发布',
              icon: 'blog-edit-blog',
              url: '/admin/article/release',
              destory: (this as any).articleReleaseDestory,
            },
            { title: '管理', icon: 'blog-ma', url: '/admin/article/manage' },
          ],
        },
        { title: '评论', icon: 'blog-commit', url: '/admin/comment' },
        { title: '分类/标签', icon: 'blog-tag', url: '/admin/categoryLabel' },
        { title: '文件', icon: 'blog-file', url: '/admin/file' },
        { title: '友链', icon: 'blog-link', url: '/admin/friendChain' },
        { title: '访客', icon: 'blog-visitor', url: '/admin/visitor' },
        {
          title: '系统设置',
          icon: 'blog-setting',
          url: 'setting',
          child: [
            { title: '基本功能', icon: 'blog-feature', url: '/admin/setting/feature' },
            { title: '个人信息', icon: 'blog-geren', url: '/admin/article/personInfo' },
          ],
        },
      ],
    };
  },
  watch: {
    menuCollapse(isCollapse: boolean) {
      this.menuWidth = isCollapse ? 64 : 210;
    },
  },
  methods: {
    // 顶部栏菜单按钮点击
    topBarMenuClick() {
      this.menuCollapse = !this.menuCollapse;
    },
    // 顶部栏通知按钮点击
    topBarNoticeClick() {
      console.log('notice');
    },
    // 顶部栏搜索按钮点击
    topBarSearchClick(searchValue: string) {
      console.log('searchValue:' + searchValue);
    },
    // 顶部栏登出按钮点击
    topBarLogoutClick() {
      this.$router.replace('/admin/login');
      clearToken();
    },
    /* 页面前置菜单销毁 */
    articleReleaseDestory(next: () => void): void {
      this.$store.state.articleReleaseDestory(next);
    },
    /* 页面事件 */
    // 页面事件初始化
    pageEventInit() {},
  },
  mounted() {
    // return;
    // 验证token
    if (!verifyToken().status) this.$router.replace({ path: '/admin/login' });
    else {
      // 如果当前路由状态有误则重定向
      if (this.$route.path === '/admin' || this.$route.path === '/admin/')
        this.$router.replace({ path: '/admin/dataAnalyze' });

      // 获取管理员信息，同时加载loading组件
      let loadingInstance: any;
      getAdminInfo({
        beforeRequest() {
          loadingInstance = Loading.service({ fullscreen: true });
        },
        afterResopnse() {
          loadingInstance.close();
        },
      })
        .then((res) => {
          this.adminInfo = res;
        })
        .catch((err) => {
          clearToken();
          this.$router.replace({ path: '/admin/login' });
          console.log(err);
        });
    }

    // 激活页面事件
    this.pageEventInit();
  },
  components: {
    AdminMenu,
    AdminTopBar,
    AdminAvatar,
  },
});
</script>

<style lang="scss" scoped>
.admin {
  width: 100%;
  height: 100%;
  background-color: $admin-background-color;
  overflow: hidden;

  .admin-left {
    height: 100%;
    float: left;
    transition: all 0.3s ease-in-out;
  }

  .admin-right {
    width: calc(100% - 210px);
    height: 100%;
    float: right;
    transition: all 0.3s ease-in-out;

    .right-content {
      width: 100%;
    }
  }

  .admin-left,
  .admin-right {
    overflow: scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0;
      opacity: 0;
    }
  }
}
</style>
