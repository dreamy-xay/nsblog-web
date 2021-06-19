<!--
 * @Description: 文章管理
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-12 23:58:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-19 20:22:04
-->

<template>
  <admin-window
    bind-class="article-manage"
    title="文章"
    ref="adminWindow"
  >
    <!-- 功能模块栏 -->
    <div class="article-manage-function-row">
      <el-row :gutter="6">
        <el-col :span="1.5">
          <el-button
            type="success"
            size="small"
            plain
            @click="showAllArticle()"
          >ALL</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="success"
            size="small"
            plain
            @click="showDraft()"
          >草稿</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="success"
            size="small"
            plain
            @click="showReleased()"
          >发布</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="danger"
            size="small"
            plain
            @click="showGarbage()"
          >垃圾箱</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="primary"
            size="small"
            plain
            @click="showRecommend()"
          >推荐</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="primary"
            size="small"
            plain
            @click="showRecommend()"
          >置顶</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-dropdown>
            <el-button
              type="warning"
              size="small"
              plain
            >
              分类<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu
              :categories="categories"
              @command="showCheckedCategory(item)"
            >
              <el-dropdown-item
                v-for="catagory in categories"
                :key="catagory.id"
              >{{catagory.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete-solid"
            @click="deleteAllChecked()"
          >删除</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="goon"
            size="small"
            icon="el-icon-s-tools"
            color="#1AB394"
            @click="SetTopAllChecked()"
          >设为置顶</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="success"
            size="small"
            icon="el-icon-s-tools"
            @click="recommendAllChecked()"
          >设为推荐</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 文章数据表单 -->
    <div class="article-manage-table">
      <el-table
        :data="articles"
        :cell-style="cellStyle(row,column,rowIndex,columnIndex)"
        :header-cell-style="{background:'#313348',color:'#606266'}"
      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column type="index"></el-table-column>
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
          prop="recommend"
          label="博主推荐"
        >
          <template slot-scope="scope1">
            <el-tag
              v-if="scope1.row.recommend"
              type="success"
              effect="dark"
              size="mini"
            >是</el-tag>
            <el-tag
              v-else
              type="info"
              size="mini"
              effect="dark"
            >否</el-tag>
          </template>
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
              style="margin-right: 6px; margin-bottom :4px"
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
              style="margin-right: 6px; margin-bottom :4px"
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
    <!-- 分页导航栏 -->
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
    </div>
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
      categories: [
        {
          id: 1,
          name: 'java',
        },
        {
          id: 2,
          name: 'python',
        },
        {
          id: 3,
          name: '数据库',
        },
        {
          id: 4,
          name: 'vue',
        },
      ],
      articles: [
        {
          id: 1,
          title: '文章1',
          type: '博文',
          publishTime: '2020-2-3',
          pageView: 12,
          recommend: true,
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
          recommend: false,
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
    // 显示所有文章
    showAllArticle() {},
    // 显示草稿
    showDraft() {},
    // 显示已发布文章
    showReleased() {},
    // 显示垃圾箱中的文章
    showGarbage() {},
    // 显示推荐的文章
    showRecommend() {},
    // 显示置顶的文章
    showTop() {},
    // 显示指定分类的文章
    showCheckedCategory(item: string) {},
    // 删除选中的所有文章
    deleteAllChecked() {},
    // 置顶选中的所有文章
    SetTopAllChecked() {},
    // 推荐选中的所有文章
    recommendAllChecked() {},
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
  .article-manage-function-row {
    width: 100%;
  }

  .atricle-manage-table {
    width: 100%;
    margin-top: 20px !important;
    overflow: hidden;
  }

  .atricle-manage-pagination {
    width: 100%;
    overflow: hidden;
  }
}
</style>

<style lang="scss">
// 解决表头右侧边界样式问题
.article-manage {
  .el-table__header-wrapper > table {
    background-color: #313348 !important;
  }
}

.el-button--goon,
.el-button--goon:hover,
.el-button--goon:focus {
  color: azure;
  background-color: #1ab394;
  border-color: #1ab394;
}
</style>
