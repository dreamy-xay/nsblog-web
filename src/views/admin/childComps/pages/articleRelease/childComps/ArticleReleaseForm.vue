<!--
 * @Description: 写文章信息表单
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-19 15:43:33
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-20 00:14:58
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
            <div
              class="tag-input"
              @click="showTagInput"
            >
              <div class="tag-input-empty" />
              <el-tag
                v-for="(tag,index) in form.tags"
                :key="index"
                :type="tag.type"
                closable
                :disable-transitions="false"
                @close="tagHandleClose(index)"
                @click.stop=""
                effect="dark"
              >
                {{tag.name}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="tagInputVisible"
                v-model="tagInputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="tagHandleInputConfirm"
                @blur="tagInputVisible = false"
              >
              </el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="分类">
            <article-release-form-category />
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
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ArticleReleaseFormCategory from '@/views/admin/childComps/pages/articleRelease/childComps/ArticleReleaseFormCategory.vue';

/**
 * @description: 写文章信息表单
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
        category: null,
        summary: '',
        tags: [],
      },
      tagInputVisible: false,
      tagInputValue: '',
    };
  },
  methods: {
    getForm() {
      return this.form;
    },
    coverSelectClick() {},
    tagHandleClose(index: number) {
      this.form.tags.splice(index, 1);
    },
    showTagInput() {
      this.tagInputVisible = true;
      this.$nextTick(() => {
        (this.$refs.saveTagInput as any).$refs.input.focus();
      });
    },
    tageInputValueEffective(value: string): boolean {
      if (value) {
        for (const item of this.form.tags)
          if (value === (item as any).name) {
            this.$message({
              showClose: true,
              message: '标签已经存在',
              type: 'warning',
              duration: 1000,
              customClass: 'admin-login-error',
            });
            return false;
          }
        return true;
      }
      return false;
    },
    tagHandleInputConfirm() {
      const tageInputValue = this.tagInputValue;
      const tagType: string[] = ['', 'success', 'info', 'danger', 'warning'];
      if (this.tageInputValueEffective(tageInputValue)) {
        (this.form.tags as any).splice(this.form.tags.length, 0, {
          name: tageInputValue,
          type: tagType[Math.floor(Math.random() * 5)],
        });
        this.tagInputValue = '';
      }
    },
  },
  components: {
    ArticleReleaseFormCategory,
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

  .tag-input {
    width: calc(100% - 10px);
    height: 100%;
    background-color: $admin-article-release-form-component-background-color;
    padding: 0 5px;
    border-radius: 4px;
    cursor: text;
    user-select: none;
    overflow: hidden;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
      opacity: 0;
    }

    .tag-input-empty {
      float: left;
      width: 0.0001px;
      height: 40px;
    }

    /deep/ {
      .el-tag {
        margin-right: 5px;
        cursor: default;
      }

      .el-input__inner {
        border: 0;
      }
    }

    .input-new-tag {
      width: 90px;
      vertical-align: bottom;
    }
  }
}
</style>
