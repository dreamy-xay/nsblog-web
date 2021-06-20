<!--
 * @Description: 写文章信息表单
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-19 15:43:33
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-20 21:13:46
-->

<template>
  <div class="article-release-from">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      label-position="top"
    >
      <el-form-item
        label="封面图片"
        class="release-from-cover"
      >
        <div
          class="cover-select"
          @click="coverSelectClick"
          ref="articleReleaseFormCoverImage"
        >
          <img
            class="cover"
            v-show="coverImageShow && form.coverImage !== ''"
            :src="form.coverImage"
            @error="coverImageLoadingError"
            @load="coverImageLoadingSuccess"
          >
          <i
            v-show="!coverImageShow || form.coverImage === ''"
            class="el-icon-plus cover-select-icon"
          ></i>
        </div>
      </el-form-item>
      <el-row
        type="flex"
        justify="space-between"
      >
        <el-col :span="11">
          <el-form-item label="标题">
            <el-input
              v-model="form.title"
              placeholder="请输入文章标题"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="类型">
            <el-select
              v-model="form.type"
              class="type-select"
              placeholder="请选择文章类型"
            >
              <el-option
                v-for="(item, index) in types"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        type="flex"
        justify="space-between"
      >
        <el-col :span="11">
          <el-form-item label="标签">
            <base-tag-input
              :tags="form.tags"
              placeholder="请输入文章标签"
              @tagRepeat="tagHandleRepeat"
              @tagClose="tagHandleClose($event, true)"
              @tagInputConfirm="tagHandleInputConfirm"
            />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="分类">
            <base-tag-input-select
              :search-list="categories"
              :tags="form.categories"
              @tagClose="tagHandleClose($event, false)"
              @tagInputSelect="tagHandleInputSelect"
              @tagInputChange="tagHandleInputChange"
              placeholder="请选择文章分类"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="摘要">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4 }"
          placeholder="请输入封面摘要信息"
          v-model="form.summary"
        ></el-input>
      </el-form-item>
      <slot></slot>
    </el-form>
    <article-release-form-cover-select
      ref="articleReleaseFormCoverSelect"
      :file-image-list="fileImageList"
      @submit="coverSelect"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Loading } from 'element-ui';
import BaseTagInput from '@/components/content/BaseTagInput.vue';
import BaseTagInputSelect from '@/components/content/BaseTagInputSelect.vue';
import ArticleReleaseFormCoverSelect from '@/views/admin/childComps/pages/articleRelease/childComps/ArticleReleaseFormCoverSelect.vue';

/**
 * @description: 写文章信息表单
 * @param {Array} categories 文章分类类型  `必传参数`
 * @param {Array} types 文章类型列表 `必传参数`
 * @param {Array} fileImageList 文章封面可选文件图片 `默认为空`
 * @method getForm 获取表单信息
 * @slot 在表单之下的插槽
 * @author: dreamy-xay
 */

let $watchThis: any;
export default Vue.extend({
  name: 'ArticleReleaseForm',
  props: {
    categories: {
      type: Array,
      required: true,
    },
    types: {
      type: Array,
      required: true,
    },
    fileImageList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      form: this.$store.state.articleReleaseFormCache,
      /*    {
        coverImage: '',
        title: '',
        name: '',
        type: 0,
        categories: [],
        summary: '',
        tags: []
      } */
      coverImageShow: false, // 封面图片显示
    };
  },
  watch: {
    form: {
      handler: () => {
        $watchThis.$store.commit('setArticleReleaseIsSave', false);
      },
      deep: true,
    },
  },
  methods: {
    // 获取表单信息
    getForm() {
      return this.form;
    },
    // 封面图片点击
    coverSelectClick() {
      (this.$refs.articleReleaseFormCoverSelect as any).open();
    },
    // 标签分类重复
    tagHandleRepeat() {
      this.$message({
        showClose: true,
        message: '标签已经存在',
        type: 'warning',
        duration: 1000,
      });
    },
    // 标签分类删除标签
    tagHandleClose(index: number, isTag: boolean) {
      isTag ? this.form.tags.splice(index, 1) : this.form.categories.splice(index, 1);
    },
    // 添加标签
    tagHandleInputConfirm(name: string, type: string) {
      (this.form.tags as any).splice(this.form.tags.length, 0, { name, type });
    },
    // 添加分类
    tagHandleInputSelect(name: string, type: string, item: any) {
      (this.form.categories as any).splice(this.form.categories.length, 0, { name, type });
    },
    // 输入改变
    tagHandleInputChange(value: string) {},
    // 选择图片链接
    coverSelect(link: string) {
      this.form.coverImage = link;
      if (link !== '')
        (this as any).loadingInstance = Loading.service({
          target: this.$refs.articleReleaseFormCoverImage as HTMLElement,
          customClass: 'admin-release-form-cover-loading',
        });
    },
    // 封面图片加载失败
    coverImageLoadingError() {
      // 为空加载失败不报错
      if (this.form.coverImage === '') return;
      this.$message({
        showClose: true,
        message: '封面图片加载失败',
        type: 'warning',
        duration: 1000,
      });
      this.form.coverImage = '';
      this.coverImageShow = false;
      (this as any).loadingInstance.close();
    },
    // 封面图片加载成功
    coverImageLoadingSuccess() {
      this.coverImageShow = true;
      (this as any).loadingInstance.close();
    },
  },
  mounted() {
    $watchThis = this;
  },
  beforeDestroy() {
    // 更新文章表单缓存
    this.$store.commit('setArticleReleaseFormCache', this.form);
    // 下次不更新不用提示
    this.$store.commit('setArticleReleaseIsSave', true);
  },
  components: {
    BaseTagInputSelect,
    BaseTagInput,
    ArticleReleaseFormCoverSelect,
  },
});
</script>

<style lang="scss" scoped>
.article-release-from {
  width: 100%;
  overflow: hidden;

  /deep/ .el-form-item label {
    color: $admin-article-release-form-title-color;
    font-size: 17px;
  }

  .cover-select {
    width: calc(100% - 10px);
    border: 1px dashed $admin-article-release-form-cover-upload-border-color;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
    background-color: $admin-article-release-form-cover-upload-background-color;

    &:hover {
      border-color: $admin-article-release-form-cover-upload-hover-border-color;
    }

    .cover {
      width: 100%;
      height: 100%;
      display: block;
    }

    .cover-select-icon {
      font-size: 28px;
      color: $admin-article-release-form-cover-upload-border-color;
      width: 100%;
      height: 178px;
      line-height: 178px;
      text-align: center;
      transition: all 0.3s;

      &:hover {
        color: $admin-article-release-form-cover-upload-hover-border-color;
      }
    }
  }

  .type-select {
    width: 100%;
    height: 100%;
  }
}
</style>


<style lang="scss">
.admin-release-form-cover-loading {
  background-color: $admin-loading-background-color !important;

  .el-loading-spinner .path {
    stroke: $admin-loading-stroke;
  }
}
</style>
