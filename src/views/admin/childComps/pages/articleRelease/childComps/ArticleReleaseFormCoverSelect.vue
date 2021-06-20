<!--
 * @Description: 文章发布表单选择封面图片
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-20 17:30:09
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-20 17:42:13
-->
<template>
  <div class="article-release-form-cover-select">
    <el-dialog
      title="封面图片选择"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="dialogBeforeClose"
    >
      <div></div>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ArticleReleaseFormCoverSelect',
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    open() {
      this.dialogVisible = true;
    },
    close() {
      this.dialogVisible = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.article-release-form-cover-select {
}
</style>
