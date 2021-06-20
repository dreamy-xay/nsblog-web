<!--
 * @Description: 文章编辑发布页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-12 16:03:06
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-20 21:02:50
-->

<template>
  <admin-window
    title="文章"
    bind-class="article-release"
    ref="adminWindow"
  >
    <article-release-form
      :types="types"
      :categories="categories"
      :file-image-list="fileImageList"
    />

    <div class="article-release-editor">
      <article-release-edit icons="default" />
    </div>
  </admin-window>
</template>

<script lang="ts">
import Vue from 'vue';
import AdminWindow from '@/components/common/AdminWindow.vue';
import ArticleReleaseForm from '@/views/admin/childComps/pages/articleRelease/childComps/ArticleReleaseForm.vue';
import ArticleReleaseEdit from '@/views/admin/childComps/pages/articleRelease/childComps/ArticleReleaseEdit.vue';

/**
 * @description: 文章编辑发布页面
 * @author: dreamy-xay
 */

export default Vue.extend({
  name: 'articleRelease',
  data() {
    return {
      types: [
        { value: 0, label: '博文' },
        { value: 1, label: '随笔' },
        { value: 2, label: '日记' },
        { value: 3, label: '作品' },
      ],
      categories: [
        { id: 0, value: 'C++' },
        { id: 1, value: 'Java' },
        { id: 2, value: '数据结构' },
        { id: 3, value: '算法' },
        { id: 4, value: 'C语言' },
        { id: 5, value: 'Python' },
        { id: 6, value: 'nodejs' },
      ],
      fileImageList: [
        { label: '晚霞', link: '/adminLogin/background.png' },
        { label: '动漫', link: 'https://i.loli.net/2021/06/14/Hy3aqAOpWUwc2Eh.jpg' },
      ],
    };
  },
  methods: {
    exitWarn(next: () => void): void {
      if (this.$store.state.articleReleaseIsSave) {
        next();
        return;
      }
      this.$confirm('您编辑的内容尚未保存，是否需要保存修改？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$message({
            type: 'success',
            showClose: true,
            duration: 1000,
            message: '保存成功!',
          });

          // 设置已保存
          this.$store.commit('setArticleReleaseIsSave', true);
          next();
        })
        .catch(() => {
          next();
        });
    },
  },
  created() {
    // 检测销毁
    this.$store.commit('setArticleReleaseDestory', this.exitWarn);
  },
  mounted() {
    (this.$refs.adminWindow as any).push('发布');
  },
  components: {
    AdminWindow,
    ArticleReleaseForm,
    ArticleReleaseEdit,
  },
});
</script>

<style lang="scss" scoped>
.article-release {
  margin-bottom: 50px;
  overflow: hidden;

  .article-release-editor {
    margin-top: 20px;
    width: 100%;
    overflow: hidden;
  }
}
</style>
