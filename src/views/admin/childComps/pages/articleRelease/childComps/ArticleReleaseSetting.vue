<!--
 * @Description: 文章设置
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-20 21:24:58
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-20 23:48:24
-->

<template>
  <div class="article-release-setting">
    <div class="article-release-setting-inner">
      <el-button
        type="danger"
        icon="el-icon-setting"
        circle
      ></el-button>
    </div>
    <div class="article-release-setting-submit">
      <el-button
        type="warning"
        size="small"
        plain
        class="submit-button"
        @click="$emit('save')"
      >存为草稿</el-button>
      <el-button
        type="success"
        size="small"
        plain
        class="submit-button"
        @click="$emit('release')"
      >发布</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * @description: 文章设置
 * @param {*}
 * @author: dreamy-xay
 */

export default Vue.extend({
  name: 'ArticleReleaseSetting',
  data() {
    return {};
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.article-release-setting {
  width: 100%;
  padding: 50px 0;
  overflow: hidden;

  .article-release-setting-inner {
    width: 100%;
    overflow: hidden;
  }

  .article-release-setting-submit {
    width: 100%;
    overflow: hidden;

    .setting-button {
      float: left;
      margin-left: 30px;
    }

    .submit-button {
      float: right;
      margin-left: 10px;

      &:first-child {
        margin-right: 30px;
      }
    }
  }
}
</style>
