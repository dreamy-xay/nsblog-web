<!--
 * @Description: 评论管理
 * @Version:
 * @Autor: clq
 * @Date: 2021-06-10 17:27:54
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-19 13:43:04
-->
<template>
  <admin-window title="评论">
    <div class="comment-manage">
      <!-- 文章折叠面板 -->
      <el-collapse
        class="el-collapse-comment"
        v-model="activeNames"
        @change="handleChange"
      >
        <div
          v-for="article in articles"
          :key="article.articleId"
        >
          <el-collapse-item>
            <template slot="title">{{article.articleTitle}}</template>
            <el-table
              :data="commentDate"
              row-key="id"
              border
              default-expand-all
              :tree-props="{children: 'children'}"
            >
              <el-table-column
                prop="content"
                label="内容"
              >
              </el-table-column>
              <el-table-column
                prop="date"
                label="日期"
                width="180"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="评论人"
                width="180"
              >
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-popconfirm
                    title="确定要删除该评论吗?"
                    @confirm="commentDelete(scope.row.id)"
                  >
                    <el-button
                      type="danger"
                      slot="reference"
                    >
                      删除
                    </el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </div>
      </el-collapse>
    </div>
  </admin-window>

</template>

<script lang='ts'>
import Vue from 'vue';
import AdminWindow from '@/components/common/AdminWindow.vue';

/**
 * @description: 评论管理
 * @author: dreamy-xay
 */

export default Vue.extend({
  name: 'commentManage',
  props: {},
  data() {
    return {
      // 被激活展开的面板
      activeNames: [],
      // 文章数据
      articles: [
        {
          articleId: 111,
          articleTitle: '文章1标题',
        },
        {
          articleId: 222,
          articleTitle: '文章2标题',
        },
      ],
      commentDate: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          content: '评论1 一级',
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          content: '评论2 一级',
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          content: '评论3 一级',
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              content: '评论4 二级',
            },
            {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              content: '评论5 二级',
            },
          ],
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          content: '评论6 一级',
        },
      ],
    };
  },
  methods: {
    // 删除评论
    commentDelete(id: number) {
      console.log(id);
    },
    // 折叠面板状态改变时触发
    // 展开新的折叠面板时,向后台发送请求获取该文章所有评论
    handleChange(val: number) {
      console.log(val);
      console.log('handleChange');
    },
    // 改变表格体样式
    // cellStyle(row: any, column: any, rowIndex: any, columnIndex: any): String {
    //   return 'background:#6F6486;color:white';
    // },
    // 改变表格头样式
    // headerCellStyle(row: any, column: any, rowIndex: any, columnIndex: any): String {
    //   return 'background:#6F6486;color:white';
    // },
  },
  components: {
    AdminWindow,
  },
});
</script>

<style lang='scss' scoped>
.comment-manage {
  width: 100%;
  height: 100%;
  overflow: hidden;

  ::v-deep {
    // 修改折叠面板样式
    .el-collapse {
      box-sizing: border-box;
      padding-left: 25px;
      border: none;
      // 面板头部样式
      .el-collapse-item__header {
        border-top: 1px solid #ccc;
        padding-left: 25px;
        background-color: #313348;
        color: white;
        font-size: 16px;
      }
      // 折叠体样式
      .el-collapse-item__wrap {
        background-color: #313348;
        border: none;
        // 折叠体内容样式
        .el-collapse-item__content {
          background-color: #313348;
          padding: 0;
        }
      }
    }
    .el-table {
      width: 97%;
      margin-left: 20px;
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }
}
</style>

