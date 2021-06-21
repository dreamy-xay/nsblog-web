<!--
 * @Description: 文章设置
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-20 21:24:58
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-21 16:48:55
-->

<template>
  <div class="article-release-setting">
    <el-dialog
      title="文章设置"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form :model="setting">

      </el-form>
    </el-dialog>
    <el-drawer
      title="云端历史"
      :visible.sync="drawerVisible"
      direction="rtl"
    >
    </el-drawer>

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
    return {
      dialogVisible: false,
      drawerVisible: false,
      setting: {
        reviewPermission: true,
        priority: 100,
        accessPermission: 0,
        sharingAgreement: null,
        passwordProtection: null,
        friendChain: [],
      },
    };
  },
  methods: {
    openSetting() {
      this.dialogVisible = true;
    },
    closeSetting() {
      this.dialogVisible = false;
    },
    openHistory() {
      this.drawerVisible = true;
    },
    closeHistory() {
      this.drawerVisible = false;
    },
    getSetting() {
      return JSON.parse(JSON.stringify(this.setting));
    },
  },
});
</script>

<style lang="scss" scoped>
.article-release-setting {
  width: 100%;
  overflow: hidden;

  .article-release-setting-inner {
    width: 100%;
    overflow: hidden;
  }
}
</style>
