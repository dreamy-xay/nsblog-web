<!--
 * @Description: 文章发布表单选择封面图片
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-20 17:30:09
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-20 20:34:50
-->
<template>
  <div class="article-release-form-cover-select">
    <el-dialog
      title="封面图片选择"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form :model="form">
        <el-form-item
          label="图片链接"
          label-width="80px"
        >
          <el-input
            v-model="form.inputLink"
            @change="inputChange"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="本地图片"
          label-width="80px"
        >
          <el-select
            v-model.trim="form.selectLink"
            @change="selectChanage"
            filterable
            clearable
            default-first-option
          >
            <el-option
              v-for="(item, index) in fileImageList"
              :key="index"
              :label="item.label"
              :value="item.link"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancelClick">取 消</el-button>
        <el-button
          type="primary"
          @click="submitClick"
        >确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * @description: 文章发布表单选择封面图片
 * @param {Array} fileImageList 文章封面可选文件图片 `默认为空`
 * @event submit 点击确认按钮后触发事件
 * @method open 打开模态框
 * @method close 关闭模态框
 * @author: dreamy-xay
 */

export default Vue.extend({
  name: 'ArticleReleaseFormCoverSelect',
  props: {
    fileImageList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        inputLink: '',
        selectLink: '',
      },
    };
  },
  methods: {
    open() {
      this.dialogVisible = true;
    },
    close() {
      this.dialogVisible = false;
    },
    submitClick() {
      this.dialogVisible = false;
      this.$emit('submit', this.form.inputLink);
      this.form.selectLink = this.form.inputLink = '';
    },
    cancelClick() {
      this.dialogVisible = false;
      this.form.selectLink = this.form.inputLink = '';
    },
    selectChanage(value: string) {
      this.form.inputLink = value;
    },
    inputChange(value: string) {
      for (const item of this.fileImageList)
        if (value === (item as any).link) {
          this.form.selectLink = value;
          return;
        }
      this.form.selectLink = '';
    },
  },
});
</script>

<style lang="scss" scoped>
.article-release-form-cover-select {
  /deep/ .el-select {
    width: 100%;
  }
}
</style>
