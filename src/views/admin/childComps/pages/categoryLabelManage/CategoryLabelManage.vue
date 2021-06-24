<!--
 * @Description: 分类标签
 * @Version:
 * @Autor: clq
 * @Date: 2021-06-11 10:09:23
 * @LastEditors: clq
 * @LastEditTime: 2021-06-24 09:16:23
-->
<template>
  <admin-window title="分类/标签管理">
    <div class="category-label">
      <!-- 分类卡片 -->
      <el-card class="category-card">
        <div slot="header">
          <span>分类列表</span>
          <el-button
            class="add-button"
            type="primary"
            @click="addCategory()"
          >新增</el-button>
        </div>
        <span
          v-for="category in categories"
          :key="category.id"
        >
          <el-popconfirm
            icon="el-icon-info"
            icon-color="red"
            title="确定要删除该分类吗?"
            confirm-button-tet='确定'
            cancel-button-text='取消'
            @confirm="deleteCategory(category.id)"
          >
            <el-button
              type="primary"
              slot="reference"
              style="margin-right:20px;margin-bottom:20px"
            >{{category.value}} ({{category.articleNum}})</el-button>
          </el-popconfirm>
        </span>
      </el-card>
      <!-- 标签卡片 -->
      <el-card class="label-card">
        <div slot="header">
          <span>标签列表</span>
        </div>
        <span
          v-for="label in labels"
          :key="label.id"
        >
          <el-popconfirm
            icon="el-icon-info"
            icon-color="red"
            title="确定要删除该分类吗?"
            confirm-button-tet='确定'
            cancel-button-text='取消'
            @confirm="deleteTag(label.id)"
          >
            <el-button
              type="primary"
              slot="reference"
              style="margin-right:20px;margin-bottom:20px;"
            >{{label.value}} ({{label.articleNum}})</el-button>
          </el-popconfirm>
        </span>
      </el-card>
      <!-- 新增分类对话框 -->
      <el-dialog
        title="新增分类"
        :visible.sync='addCategoryDialogVisible'
        width="30%"
      >
        <el-input
          placeholder="请输入新类名"
          v-model="newCategoryName"
          clearable
        >
        </el-input>
        <span slot="footer">
          <el-button
            type="text"
            @click="cancel()"
          >取消</el-button>
          <el-button
            type="primary"
            @click="confirm()"
          >确定</el-button>
        </span>
      </el-dialog>
    </div>
  </admin-window>
</template>

<script lang="ts">
import Vue from 'vue';
import AdminWindow from '@/components/common/AdminWindow.vue';
import {
  getArticleCategories,
  getArticleTag,
  addArticleCategory,
  deleteArticleCategory,
  deleteArticleTag,
} from '@/network/admin/api';

/**
 * @description: 分类标签
 * @author: dreamy-xay
 */

export default Vue.extend({
  name: 'categoryLabelManage',
  props: {},
  data() {
    return {
      // 增加分类对话框显示控制
      addCategoryDialogVisible: false,
      // 新增分类名
      newCategoryName: '',
      categories: [
        // {
        //   id: 1,
        //   value: '分类1',
        //   articleNum: 1,
        // },
      ],
      labels: [
        // {
        //   id: 1,
        //   value: '标签1',
        //   articleNum: 1,
        // },
      ],
    };
  },
  created() {
    // 创建组件时从后台获取数据
    // 获取文章分类
    getArticleCategories()
      .then((res) => {
        console.log('获取文章分类成功');
        console.log(res);
        this.categories = res;
      })
      .catch((err) => {
        this.$message({
          showClose: true,
          message: '获取文章分类失败',
          type: 'error',
          duration: 1000,
        });
        console.log('获取文章分类失败');
        console.log(err);
      });
    // 获取文章标签
    getArticleTag()
      .then((res) => {
        console.log('获取文章标签成功');
        console.log(res);
        this.labels = res;
      })
      .catch((err) => {
        this.$message({
          showClose: true,
          message: '获取文章标签失败',
          type: 'error',
          duration: 1000,
        });
        console.log('获取文章标签失败');
        console.log(err);
      });
  },
  methods: {
    // 新增分类
    addCategory() {
      this.addCategoryDialogVisible = true;
    },
    // 取消增加分类
    cancel() {
      this.addCategoryDialogVisible = false;
    },
    // 确定增加分类
    confirm() {
      console.log('确认按钮被点击');
      let repeat: boolean = false;
      for (const elem of this.categories) if ((elem as any).value === this.newCategoryName) repeat = true;
      // 类名重复
      if (repeat === true) {
        this.$message({
          showClose: true,
          message: '类名重复',
          type: 'error',
          duration: 1000,
        });
      } else {
        // 向后台发请求增加分类
        addArticleCategory(this.newCategoryName)
          .then((res) => {
            this.$message({
              showClose: true,
              message: '新增类名成功',
              type: 'success',
              duration: 1000,
            });
            // 添加成功后重新从后台获取数据
            this.categories = [];
            getArticleCategories()
              .then((res1) => {
                console.log('获取文章分类成功');
                console.log(res1);
                this.categories = res1;
              })
              .catch((err) => {
                this.$message({
                  showClose: true,
                  message: '获取文章分类失败',
                  type: 'error',
                  duration: 1000,
                });
                console.log('获取文章分类失败');
                console.log(err);
              });
          })
          .catch((err) => {
            this.$message({
              showClose: true,
              message: '类名重复',
              type: 'error',
              duration: 1000,
            });
            console.log(err);
          });
        this.addCategoryDialogVisible = false;
      }
    },
    // 删除分类
    deleteCategory(id: number) {
      deleteArticleCategory(id)
        .then((res) => {
          console.log(res);
          // 获取文章分类
          getArticleCategories()
            .then((res1) => {
              console.log('获取文章分类成功');
              console.log(res1);
              this.categories = res1;
            })
            .catch((err) => {
              this.$message({
                showClose: true,
                message: '获取文章分类失败',
                type: 'error',
                duration: 1000,
              });
              console.log('获取文章分类失败');
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 删除标签
    deleteTag(id: number) {
      deleteArticleTag(id)
        .then((res) => {
          console.log(res);
          // 获取文章标签
          getArticleTag()
            .then((res1) => {
              console.log('获取文章标签成功');
              console.log(res1);
              this.labels = res1;
            })
            .catch((err) => {
              this.$message({
                showClose: true,
                message: '获取文章标签失败',
                type: 'error',
                duration: 1000,
              });
              console.log('获取文章标签失败');
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    AdminWindow,
  },
});
</script>

<style lang="scss" scoped>
.category-label {
  .category-card {
    margin-bottom: 20px;
    background: #313348;
    color: #fff;
    border-color: #2a2b3d;
    .add-button {
      position: relative;
      top: -8px;
      float: right;
    }
  }

  .label-card {
    background: #313348;
    color: #fff;
    border-color: #2a2b3d;
  }
}
</style>
