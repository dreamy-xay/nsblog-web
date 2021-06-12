<!--
 * @Description:
 * @Version:
 * @Autor: clq
 * @Date: 2021-06-11 10:09:23
 * @LastEditors: clq
 * @LastEditTime: 2021-06-12 16:29:15
-->
<template>
  <el-container>
    <el-header style="margin-top:20px">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator=">>">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>分类/标签管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main>
      <!-- 分类卡片 -->
      <el-card class="category">
        <div slot="header">
          <span>分类列表</span>
          <el-button
            type="primary"
            style="float:right"
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

        <!-- <el-popover
          v-for="category in categories"
          :key="category.categroyId"
          placement="top"
          width="160"
          v-model="visible"
        >
          <p>确定要删除该标签吗?</p>
          <div style="text-align:right">
            <el-button
              size="mini"
              type='text'
              @click="visible = false"
            >取消</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="visible = false"
            >确定</el-button>
          </div>
          <el-button
            type="primary"
            slot="reference"
          >{{category.name}}</el-button>
        </el-popover> -->

      </el-card>
      <!-- 标签卡片 -->
      <el-card class="label">
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
    </el-main>

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
  </el-container>
</template>

<script lang="ts">
export default {
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
      (this as any).addCategoryDialogVisible = true;
    },
    // 取消增加分类
    cancel() {
      (this as any).addCategoryDialogVisible = false;
    },
    // 确定增加分类
    confirm() {
      (this as any).addCategoryDialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
  margin-bottom: 20px;
}

.label {
  margin-bottom: 20px;
}
</style>
