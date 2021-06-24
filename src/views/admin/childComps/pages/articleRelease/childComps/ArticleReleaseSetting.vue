<!--
 * @Description: 文章设置
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-20 21:24:58
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-24 11:02:18
-->

<template>
  <div class="article-release-setting">
    <el-dialog
      title="文章设置"
      :visible.sync="dialogVisible"
      custom-class="article-release-setting-setting"
      width="30%"
    >
      <el-form :model="setting">
        <el-form-item
          label="访问权限"
          label-width="70px"
        >
          <el-radio-group
            v-model="setting.accessPermission"
            size="small"
            fill="#6F6486"
          >
            <el-radio-button label="公开"></el-radio-button>
            <el-radio-button label="仅登录用户"></el-radio-button>
            <el-radio-button label="只有我"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="优先等级"
          label-width="70px"
        >
          <el-input-number
            v-model="setting.priority"
            size="small"
            :min="1"
            :max="99999"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          :label="reviewPermissionLabel"
          label-width="70px"
        >
          <el-switch
            v-model="setting.reviewPermission"
            active-color="#6F6486"
          ></el-switch>
        </el-form-item>
        <el-form-item
          label="共享协议"
          label-width="70px"
        >
          <el-input
            v-model="setting.sharingAgreement"
            placeholder="Sharing agreement..."
            size="small"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码保护"
          label-width="70px"
        >
          <el-input
            v-model="setting.passwordProtection"
            placeholder="Password..."
            size="small"
            clearable
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-drawer
      title="云端历史"
      :visible.sync="drawerVisible"
      direction="rtl"
    >
      <div style="display:flex; width: 100%; justify-content: center;">
        <div style="color: #7F8587; ">暂无历史记录</div>
      </div>
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
      setting: this.$store.state.articleReleaseSettingCache,
      /*       {
        reviewPermission: true,
        priority: 100,
        accessPermission: '公开',
        sharingAgreement: '',
        passwordProtection: '',
        friendChain: [],
      }, */
    };
  },
  watch: {
    setting: {
      handler() {
        this.$store.commit('setArticleReleaseIsSave', false);
      },
      deep: true,
    },
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
      const setting: any = JSON.parse(JSON.stringify(this.setting));
      const accessPermission: any = { 公开: 1, 仅登录用户: 2, 只有我: 3 };
      setting.accessPermission = accessPermission[setting.accessPermission];
      if (setting.sharingAgreement === '') setting.sharingAgreement = null;
      if (setting.passwordProtection === '') setting.passwordProtection = null;
      return setting;
    },
  },
  beforeDestroy() {
    this.$store.commit('articleReleaseSettingCache', this.setting);
  },
  computed: {
    reviewPermissionLabel() {
      return (this as any).setting.reviewPermission ? '允许评论' : '禁止评论';
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

<style lang="scss">
.article-release-setting-setting {
  .el-radio-button__inner:hover {
    color: $admin-article-release-setting-form-all-color;
  }

  .el-input-number {
    span {
      background-color: $admin-article-release-setting-form-all-color;
      color: white;
    }

    input {
      outline: none;
      &:focus {
        border-color: $admin-article-release-setting-form-all-color;
      }
    }
  }

  .el-input {
    input:focus {
      border-color: $admin-article-release-setting-form-all-color;
    }
  }
}
</style>
