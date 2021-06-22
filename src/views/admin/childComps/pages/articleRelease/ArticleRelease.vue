<!--
 * @Description: 文章编辑发布页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-12 16:03:06
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-22 14:27:59
-->

<template>
  <admin-window
    title="文章"
    bind-class="article-release"
    ref="adminWindow"
  >
    <article-release-form
      ref="articleReleaseForm"
      :types="types"
      :categories="categories"
      :file-image-list="fileImageList"
    />
    <div class="article-release-editor">
      <div class="article-release-editor-head">
        <span>编辑文章</span>
        <el-tooltip
          content="设置"
          placement="top"
        >
          <i
            class="iconfont blog-article-setting"
            role="button"
            @click="settingsClick"
          ></i>
        </el-tooltip>
        <el-tooltip
          content="云端历史"
          placement="left"
        >
          <i
            class="iconfont blog-yun-lishi"
            role="button"
            @click="historyClick"
          ></i>
        </el-tooltip>
      </div>
      <article-release-edit
        icons="default"
        ref="articleReleaseEdit"
      />
    </div>
    <article-release-setting ref="articleReleaseSetting" />
    <div class="article-release-submit">
      <el-button
        type="warning"
        size="small"
        plain
        class="submit-button"
        @click="releaseArticleClick(false)"
      >存为草稿</el-button>
      <el-button
        type="success"
        size="small"
        plain
        class="submit-button"
        @click="releaseArticleClick(true)"
      >发布</el-button>
    </div>
  </admin-window>
</template>

<script lang="ts">
import Vue from 'vue';
import AdminWindow from '@/components/common/AdminWindow.vue';
import ArticleReleaseForm from '@/views/admin/childComps/pages/articleRelease/childComps/ArticleReleaseForm.vue';
import ArticleReleaseEdit from '@/views/admin/childComps/pages/articleRelease/childComps/ArticleReleaseEdit.vue';
import ArticleReleaseSetting from '@/views/admin/childComps/pages/articleRelease/childComps/ArticleReleaseSetting.vue';
import { getArticleCategories, getCoverImageList, releaseArticle } from '@/network/admin/api';

/**
 * @description: 文章编辑发布页面
 * @author: dreamy-xay
 */

export default Vue.extend({
  name: 'articleRelease',
  data() {
    return {
      articleId: null,
      types: [
        { value: 0, label: '博文' },
        { value: 1, label: '随笔' },
        { value: 2, label: '日记' },
        { value: 3, label: '作品' },
      ],
      categories: [
        { id: 0, value: 'C++' },
        { id: 1, value: 'Java' },
        { id: 2, value: '数据结构' },
        { id: 3, value: '算法' },
        { id: 4, value: 'C语言' },
        { id: 5, value: 'Python' },
        { id: 6, value: 'nodejs' },
      ],
      fileImageList: [
        { label: '晚霞', link: '/adminLogin/background.png' },
        { label: '动漫', link: 'https://i.loli.net/2021/06/14/Hy3aqAOpWUwc2Eh.jpg' },
      ],
    };
  },
  methods: {
    // 文章编辑页面退出警告
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
          this.releaseArticleClick(false, next);
        })
        .catch(() => {
          next();
        });
    },
    // 获取文章所有信息
    getArticleAllInfo(callback: any, status: boolean) {
      (this.$refs.articleReleaseForm as any)
        .getForm()
        .then((data: any) => {
          callback({
            ...data,
            ...(this.$refs.articleReleaseSetting as any).getSetting(),
            content: (this.$refs.articleReleaseEdit as any).getContent(),
            status,
            articleId: this.articleId,
          });
        })
        .catch((err: any) => {
          console.log(err);
          this.$message({
            message: '文章信息填写不符合规范，请检查',
            duration: 1000,
            showClose: true,
            type: 'error',
          });
        });
    },
    // 发布文章或者存为草稿
    releaseArticleClick(status: boolean, success?: any) {
      const name = status ? '发布' : '存为草稿';
      this.getArticleAllInfo((data: any) => {
        // console.log(data);
        releaseArticle(data)
          .then((res: any) => {
            // 更新文章的 id
            this.articleId = res.articleId;
            // 提示信息
            this.$message({
              message: '文章' + name + '成功',
              duration: 1000,
              showClose: true,
              type: 'success',
            });
            if (success) success();
            this.$store.commit('setArticleReleaseIsSave', true);
          })
          .catch((err: any) => {
            console.log(err);
            // 提示信息
            this.$message({
              message: '文章' + name + '失败，网络异常',
              duration: 1000,
              showClose: true,
              type: 'error',
            });
          });
      }, status);
    },
    // 云端历史
    historyClick() {
      (this.$refs.articleReleaseSetting as any).openHistory();
    },
    // 文章设置
    settingsClick() {
      (this.$refs.articleReleaseSetting as any).openSetting();
    },
  },
  created() {
    // 检测销毁
    this.$store.commit('setArticleReleaseDestory', this.exitWarn);
    // 请求数据
    // 请求所有分类
    getArticleCategories()
      .then((data: any) => {
        // console.log(data);
        this.categories = data ? data : [];
      })
      .catch((err: any) => {
        console.log(err);
      });
    // 请求所有封面图片
    getCoverImageList()
      .then((data: any) => {
        // console.log(data);
        this.fileImageList = data ? data : [];
      })
      .catch((err: any) => {
        console.log(err);
      });
  },
  mounted() {
    (this.$refs.adminWindow as any).push('发布');
  },
  components: {
    AdminWindow,
    ArticleReleaseForm,
    ArticleReleaseEdit,
    ArticleReleaseSetting,
  },
});
</script>

<style lang="scss" scoped>
.article-release {
  margin-bottom: 50px;
  overflow: hidden;

  .article-release-editor {
    width: 100%;
    overflow: hidden;

    .article-release-editor-head {
      width: 100%;
      height: 40px;
      margin-bottom: 10px;
      overflow: hidden;
      color: $admin-article-release-form-title-color;
      user-select: none;

      span {
        float: left;
        line-height: 40px;
        cursor: default;
      }

      .iconfont {
        line-height: 40px;
        float: right;
        font-size: 19px;
        margin-right: 20px;
        transition: all 0.3s;
        background: none;

        &.blog-article-setting:hover {
          transform: rotate(120deg);
        }

        &.blog-yun-lishi:hover {
          transform: rotateY(180deg);
        }

        &:hover {
          color: #ffffff;
        }
      }
    }
  }

  .article-release-submit {
    width: 100%;
    overflow: hidden;
    padding: 50px 0;

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
