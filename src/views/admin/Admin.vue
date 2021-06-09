<template>
  <div class="admin">
    <div
      class="admin-left"
      :style="{width: menuWidth + 'px'}"
    >
      <admin-avatar
        :is-collapse="menuCollapse"
        :avatar="adminInfo.avatar"
        :profile="adminInfo.profile"
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { verifyToken, clearToken } from '@/network/token';
import adminTopBar from '@/views/admin/childComs/AdminTopBar.vue';
import adminMenu from '@/views/admin/childComs/AdminMenu.vue';
import AdminAvatar from '@/views/admin/childComs/AdminAvatar.vue';

export default {
  name: 'Admin',
  data() {
    return {
      menuCollapse: false,
      menuWidth: 210,
      noticeSum: 30,
      adminInfo: (this as any).$route.params,
      menuList: [
        { title: '仪表盘', icon: 'blog-data', url: '/admin/dataAnalyze', child: [] },
        {
          title: '文章',
          icon: 'blog-arcitle',
          url: 'article',
          child: [
            { title: '发布', icon: 'blog-edit-blog', url: '/admin/article/release' },
            { title: '管理', icon: 'blog-ma', url: '/admin/article/manage' },
          ],
        },
        { title: '评论', icon: 'blog-commit', url: '/admin/comment', child: [] },
        { title: '分类/标签', icon: 'blog-tag', url: '/admin/categoryLabel', child: [] },
        { title: '文件', icon: 'blog-file', url: '/admin/file', child: [] },
        { title: '友链', icon: 'blog-link', url: '/admin/friendChain', child: [] },
        { title: '访客', icon: 'blog-visitor', url: '/admin/visitor', child: [] },
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
      (this as any).menuWidth = isCollapse ? 64 : 210;
    },
  },
  methods: {
    topBarMenuClick() {
      (this as any).menuCollapse = !(this as any).menuCollapse;
    },
    topBarNoticeClick() {
      console.log('notice');
    },
    topBarSearchClick(searchValue: string) {
      console.log('searchValue:' + searchValue);
    },
    topBarLogoutClick() {
      (this as any).$router.replace('/admin/login');
      clearToken();
    },
  },
  beforeCreate() {
    return;
    if (!verifyToken().status) (this as any).$router.replace({ path: '/admin/login' });
  },
  components: {
    adminMenu,
    adminTopBar,
    AdminAvatar,
  },
};
</script>

<style lang="scss" scoped>
.admin {
  width: 100%;
  height: 100%;
  background-color: #2a2b3d;
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
