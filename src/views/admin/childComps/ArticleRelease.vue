<!--
 * @Description: 文章编辑发布页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-12 16:03:06
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-17 12:03:58
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
      contentCache: (this as any).$store.state.articleReleaseContentCache,
      content: (this as any).$store.state.articleReleaseContentCache,
      setting: {
        menubar: false,
        language: 'zh_CN',
        plugins:
          'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave kityformula-editor bdmap indent2em autoresize axupimgs',
        toolbar:
          'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
    styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
    table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | kityformula-editor bdmap indent2em lineheight axupimgs',
        height: 650, // 编辑器高度
        min_height: 400,
        /*content_css: [ // 可设置编辑区内容展示的css，谨慎使用
        '/static/reset.css',
        '/static/ax.css',
        '/static/css.css',
        ],*/
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
        font_formats:
          '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
        link_list: [
          { title: '预置链接1', value: 'http://www.tinymce.com' },
          { title: '预置链接2', value: 'http://tinymce.ax-z.cn' },
        ],
        image_list: [
          { title: '预置图片1', value: 'https://www.tiny.cloud/images/glyph-tinymce@2x.png' },
          { title: '预置图片2', value: 'https://www.baidu.com/img/bd_logo1.png' },
        ],
        image_class_list: [
          { title: 'None', value: '' },
          { title: 'Some class', value: 'class-name' },
        ],
        importcss_append: true,
        // 自定义文件选择器的回调内容
        file_picker_callback: (callback: any, value: any, meta: any) => {
          if (meta.filetype === 'file') {
            callback('https://www.baidu.com/img/bd_logo1.png', { text: 'My text' });
          }
          if (meta.filetype === 'image') {
            callback('https://www.baidu.com/img/bd_logo1.png', { alt: 'My alt text' });
          }
          if (meta.filetype === 'media') {
            callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.baidu.com/img/bd_logo1.png' });
          }
        },
        toolbar_sticky: true,
        autosave_ask_before_unload: false,
      },
    };
  },
  watch: {
    content(val: string) {
      if ((this as any).content !== (this as any).contentCache)
        (this as any).$store.commit('setArticleReleaseIsSave', false);
      else (this as any).$store.commit('setArticleReleaseIsSave', true);
    },
  },
  methods: {
    exitWarn(next: () => void): void {
      if ((this as any).$store.state.articleReleaseIsSave) {
        next();
        return;
      }

      (this as any)
        .$confirm('您编辑的内容尚未保存，是否需要保存修改？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(() => {
          (this as any).$message({
            type: 'success',
            showClose: true,
            duration: 1000,
            message: '保存成功!',
          });

          // 设置已保存
          (this as any).$store.commit('setArticleReleaseIsSave', true);
          next();
        })
        .catch(() => {
          next();
        });
    },
  },
  created() {
    (this as any).$store.commit('setArticleReleaseDestory', (this as any).exitWarn);
    // 退出监听
    window.onbeforeunload = () => {
      return true;
    };
  },
  mounted() {
    (this as any).$refs.adminWindow.push('发布');
  },
  beforeDestroy() {
    // 更新文章缓存
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
