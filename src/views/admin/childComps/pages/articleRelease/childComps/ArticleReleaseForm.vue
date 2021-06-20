<!--
 * @Description: 写文章信息表单
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-19 15:43:33
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-20 16:20:00
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
        >
          <img
            class="cover"
            v-if="form.coverImage"
            :src="form.coverImage"
          >
          <i
            v-else
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
              @tagRepeat="tagHandleRepeat(true)"
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
              @tagRepeat="tagHandleRepeat(false)"
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseTagInput from '@/components/content/BaseTagInput.vue';
import BaseTagInputSelect from '@/components/content/BaseTagInputSelect.vue';

/**
 * @description: 写文章信息表单
 * @param {Array} 文章分类类型  `必传参数`
 * @param {Array} 文章类型列表 `必传参数`
 * @slot 在表单之下的插槽
 * @author: dreamy-xay
 */

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
  },
  data() {
    return {
      form: {
        coverImage: '',
        title: '',
        name: '',
        type: 0,
        categories: [],
        summary: '',
        tags: [],
      },
    };
  },
  methods: {
    // 获取表单信息
    getForm() {
      return this.form;
    },
    // 封面图片点击
    coverSelectClick() {},
    // 标签分类重复
    tagHandleRepeat(isTag: boolean) {
      this.$message({
        showClose: true,
        message: (isTag ? '标签' : '分类') + '已经存在',
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
  },
  components: {
    BaseTagInputSelect,
    BaseTagInput,
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
