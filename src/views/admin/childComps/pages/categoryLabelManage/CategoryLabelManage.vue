<!--
 * @Description: 分类标签
 * @Version:
 * @Autor: clq
 * @Date: 2021-06-11 10:09:23
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-20 23:36:04
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
          :key="category.categroyId"
        >
          <el-popconfirm
            icon="el-icon-info"
            icon-color="red"
            title="确定要删除该分类吗?"
            confirm-button-tet='确定'
            cancel-button-text='取消'
          >
            <el-button
              type="primary"
              slot="reference"
              style="margin-right:20px"
            >{{category.name}} ({{category.articleNum}})</el-button>
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
          :key="label.labelId"
        >
          <el-popconfirm
            icon="el-icon-info"
            icon-color="red"
            title="确定要删除该分类吗?"
            confirm-button-tet='确定'
            cancel-button-text='取消'
          >
            <el-button
              type="primary"
              slot="reference"
              style="margin-right:20px"
            >{{label.name}} ({{label.articleNum}})</el-button>
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
        {
          categroyId: 1,
          name: '分类1',
          articleNum: 1,
        },
        {
          categroyId: 2,
          name: '分类2',
          articleNum: 2,
        },
        {
          categroyId: 3,
          name: '分类3',
          articleNum: 3,
        },
      ],
      labels: [
        {
          labelId: 1,
          name: '标签1',
          articleNum: 1,
        },
        {
          labelId: 2,
          name: '标签2',
          articleNum: 2,
        },
        {
          labelId: 3,
          name: '标签3',
          articleNum: 3,
        },
      ],
    };
  },
  created() {
    // 创建组件时从后台获取数据
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
      let repeat: boolean = false;
      for (const elem of this.categories) if (elem.name === this.newCategoryName) repeat = true;
      if (repeat === true) {
        this.$message({
          showClose: true,
          message: '类名重复',
          type: 'error',
          duration: 1000,
        });
      } else this.addCategoryDialogVisible = false;
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
