<template>
  <div class="admin-menu">
    <el-menu
      class="admin-menu-el"
      :collapse="isCollapse"
      background-color="#252636"
      text-color="#d1d5db"
      active-text-color="#ffffff"
      :router="true"
    >
      <template v-for="(item,index) in menuList">
        <el-submenu
          v-if="item.child.length > 0"
          :index="item.url"
          :key="index"
        >
          <template #title>
            <i
              :class="'iconfont ' + item.icon"
              v-if="item.icon !== ''"
            ></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <el-menu-item
            v-for="(subitem, subindex) in item.child"
            :index="subitem.url"
            :key="subindex"
          >
            <i :class="'iconfont ' + subitem.icon"></i>
            <span slot="title">{{subitem.title}}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          v-if="item.child.length === 0"
          :index="item.url"
          :key="index"
        >
          <i
            :class="'iconfont ' + item.icon"
            v-if="item.icon !== ''"
          ></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
export default {
  name: 'adminMenu',
  props: {
    isCollapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
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
  methods: {},
};
</script>

<style lang="scss" scoped>
.admin-menu {
  width: 100%;
  height: 100%;
  background-color: #252636;

  .admin-menu-el:not(.el-menu--collapse) {
    width: 210px;
  }

  .iconfont {
    font-size: 20px;
    margin-right: 10px;
  }
}
</style>
