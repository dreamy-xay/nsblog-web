<!--
 * @Description: 文章管理
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-12 23:58:01
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-19 13:40:04
-->

<template>
  <admin-window
    bind-class="article-manage"
    title="文章"
    ref="adminWindow"
  >
    <!-- 文章数据表单
    <div class="article-manage-table">
      <el-table
        class="el-table-article"
        :data="articles"
        :cell-style="cellStyle(row,column,rowIndex,columnIndex)"
        :header-cell-style="{background:'#313348',color:'#606266'}"
      >
        <el-table-column
          prop="title"
          label="文章标题"
        >
        </el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">
            <el-tag
              type="success"
              size="small"
            >{{scope.row.type}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="publishTime"
          label="发布时间"
        >
        </el-table-column>
        <el-table-column
          prop="pageView"
          label="浏览量"
        >
        </el-table-column>
        <el-table-column
          prop="tag"
          label="标签"
        >
          <template slot-scope="scope1">
            <el-tag
              v-for="item in scope1.row.tag"
              :key="item"
              size="small"
              style="marginRight:6px"
            >{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="category"
          label="所属分类"
        >
          <template slot-scope="scope1">
            <el-tag
              v-for="item in scope1.row.category"
              :key="item"
              size="small"
              style="marginRight:6px"
            >{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="publishStatus"
          label="发布状态"
        >
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作"
          width="280px"
        >
          <template slot-scope="scope">
            <el-row :gutter="40">
              <el-col :span="6">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="articleEdit(scope.$id)"
                >编辑</el-button>
              </el-col>
              <el-col :span="6">
                <el-popconfirm
                  title="这是一段内容确定删除吗？"
                  @confirm="articleDelete(scope.$id)"
                >
                  <el-button
                    slot="reference"
                    icon="el-icon-delete"
                    type="danger"
                    size="mini"
                  >删除</el-button>
                </el-popconfirm>
              </el-col>
              <el-col :span="6">
                <el-button
                  size="mini"
                  type="warning"
                  icon="el-icon-view"
                  @click="articlePreview(scope.$id)"
                >预览</el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="article-manage-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="marginTop:12px"
      >
      </el-pagination>
    </div> -->
  </admin-window>
</template>

<script lang='ts'>
import Vue from 'vue';
import AdminWindow from '@/components/common/AdminWindow.vue';

/**
 * @description: 文章管理
 * @author: dreamy-xay
 */
export default Vue.extend({
  name: 'articleManage',
  data() {
    return {
      articles: [
        {
          id: 1,
          title: '文章1',
          type: '博文',
          publishTime: '2020-2-3',
          pageView: 12,
          tag: ['标签1', '标签2'],
          category: ['分类1', '分类2'],
          publishStatus: '已发布',
        },
        {
          id: 2,
          title: '文章2',
          type: '博文',
          publishTime: '2020-2-3',
          pageView: 12,
          tag: ['标签1', '标签2'],
          category: ['分类1', '分类2'],
          publishStatus: '已发布',
        },
      ],
      // 当前所在页
      currentPage: 3,
      // 分页规格
      pageSizes: [1, 2, 3, 4],
      // 当前分页规格
      pageSize: 2,
      // 总记录条数
      total: 4,
    };
  },
  methods: {
    // 编辑文章
    articleEdit(aid: number) {},
    // 删除文章
    articleDelete(aid: number) {},
    // 预览文章
    articlePreview(aid: number) {},
    // 分页规格改变
    handleSizeChange(val: number) {
      console.log(`每页 ${val} 条`);
    },
    // 当前所在页改变
    handleCurrentChange(val: number) {
      console.log(`当前页: ${val}`);
    },
    // 改变表格体样式
    cellStyle(row: any, column: any, rowIndex: any, columnIndex: any): string {
      return 'background:#313348;color:white;';
    },
    // 改变表格头样式
    // headerCellStyle(row: any, column: any, rowIndex: any, columnIndex: any): string {
    //   return 'background:#313348;color:white';
    // },
  },
  mounted() {
    (this.$refs.adminWindow as any).push('管理');
  },
  components: {
    AdminWindow,
  },
});
</script>

<style lang="scss" scoped>
.atricle-manage {
  .atricle-manage-table {
    width: 100%;
    overflow: hidden;
  }

  .atricle-manage-pagination {
    width: 100%;
    overflow: hidden;
  }
}
</style>

<style lang="scss">
.article-manage {
  .el-table__header-wrapper > table {
    background-color: #313348 !important;
  }
}
</style>
