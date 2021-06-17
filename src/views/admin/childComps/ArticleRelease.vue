<!--
 * @Description: 文章编辑发布页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-12 16:03:06
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-15 18:03:06
-->

<template>
  <admin-window
    title="文章"
    bind-class="article-release"
    ref="adminWindow"
  >
    <vue-tinymce
      class="tinymce"
      v-model="content"
      :setting="setting"
    />
  </admin-window>
</template>

<script lang="ts">
import AdminWindow from '@/components/common/AdminWindow.vue';

/**
 * @description: 文章编辑发布页面
 * @author: dreamy-xay
 */

export default {
  name: 'articleRelease',
  data() {
    return {
      content: (this as any).$store.state.articleReleaseContentCache,
      setting: {
        menubar: false,
        toolbar:
          'undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |',
        toolbar_drawer: 'sliding',
        quickbars_selection_toolbar:
          'removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor',
        plugins: 'link image media table lists fullscreen quickbars',
        language: 'zh_CN', // 本地化设置
        height: 350,
      },
    };
  },
  methods: {
    exitWarn(next?: () => void) {
      (this as any)
        .$confirm('您编辑的内容尚未保存，是否需要保存修改？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(() => {
          (this as any).$message({
            type: 'success',
            message: '保存成功!',
          });
          if (typeof next === 'function') next();
        })
        .catch(() => {
          if (typeof next === 'function') next();
        });
    },
  },
  created() {
    (this as any).$store.commit('setArticleReleaseDestory', (this as any).exitWarn);
    window.onbeforeunload = (this as any).exitWarn;
  },
  mounted() {
    (this as any).$refs.adminWindow.push('发布');
  },
  beforeDestroy() {
    (this as any).$store.commit('setArticleReleaseContentCache', (this as any).content);
  },
  components: { AdminWindow },
};
</script>

<style lang="scss" scoped>
.article-release {
  .tinymce {
    height: 500px;
  }
}
</style>
