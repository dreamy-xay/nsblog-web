<!--
 * @Description: 文章编辑发布页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-12 16:03:06
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-13 23:03:31
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
      content: '<h1 style="text-align: center; color: pink">创新型笔记分享部落阁</h1>',
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
  mounted() {
    (this as any).$refs.adminWindow.push('发布');
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
