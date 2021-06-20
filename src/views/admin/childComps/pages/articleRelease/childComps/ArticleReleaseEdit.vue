<!--
 * @Description: tinymce 编辑器
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-17 15:19:24
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-19 15:42:17
-->


<template>
  <div class="article-release-edit">
    <vue-tinymce
      class="tinymce"
      v-model="content"
      :setting="setting"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
/**
 * @description: tinymce 编辑器
 * @param {String} icons 编辑器图标主题 `默认为 christmas`
 * @param {String} skin 编辑器皮肤 `默认为 oxide-dark`
 * @event input 输入监听事件，监听输入值的变化，参数 content
 * @method getContent 获取输入框的内容
 * @author: dreamy-xay
 */

export default Vue.extend({
  name: 'ArticleReleaseEdit',
  props: {
    icons: {
      type: String,
      default: 'christmas',
    },
    skin: {
      type: String,
      default: 'oxide-dark',
    },
  },
  data() {
    return {
      contentCache: this.$store.state.articleReleaseContentCache,
      content: this.$store.state.articleReleaseContentCache,
      setting: {
        menubar: false,
        language: 'zh_CN',
        icons: this.icons,
        // theme: 'silver',
        skin: this.skin,
        plugins:
          'codesample print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave kityformula-editor bdmap indent2em axupimgs',
        toolbar:
          'code codesample | undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | fullscreen | \
        bullist numlist | blockquote subscript superscript removeformat | \
        styleselect formatselect fontselect fontsizeselect | \
        table image media charmap emoticons hr pagebreak insertdatetime print preview | kityformula-editor bdmap indent2em lineheight axupimgs',
        height: 500, // 编辑器高度
        min_height: 400,
        /*content_css: [ // 可设置编辑区内容展示的css，谨慎使用
        '/static/reset.css',
        '/static/ax.css',
        '/static/css.css',
        ],*/
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
        font_formats:
          '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
        // link_list: [
        //   { title: '预置链接1', value: 'http://www.tinymce.com' },
        //   { title: '预置链接2', value: 'http://tinymce.ax-z.cn' },
        // ],
        // image_list: [
        //   { title: '预置图片1', value: 'https://www.tiny.cloud/images/glyph-tinymce@2x.png' },
        //   { title: '预置图片2', value: 'https://www.baidu.com/img/bd_logo1.png' },
        // ],
        // image_class_list: [
        //   { title: 'None', value: '' },
        //   { title: 'Some class', value: 'class-name' },
        // ],
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
      this.$emit('input', val);
      if (this.content !== this.contentCache) this.$store.commit('setArticleReleaseIsSave', false);
      else this.$store.commit('setArticleReleaseIsSave', true);
    },
  },
  methods: {
    getContent(): string {
      return this.content;
    },
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
    this.$store.commit('setArticleReleaseDestory', this.exitWarn);
    window.onbeforeunload = () => {
      return true;
    };
  },
  beforeDestroy() {
    // 更新文章缓存
    this.$store.commit('setArticleReleaseContentCache', this.content);
    // 删除全局注册
    window.onbeforeunload = null;
  },
});
</script>

<style lang="scss" scoped>
.article-release-edit {
  width: 100%;
  overflow: hidden;
}
</style>
