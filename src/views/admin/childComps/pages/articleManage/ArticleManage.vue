<!--
 * @Description: 文章管理
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-12 23:58:01
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-20 18:46:08
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
            @click="showAllArticle"
          >ALL</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="success"
            size="small"
            plain
            @click="showDraft"
          >草稿</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="success"
            size="small"
            plain
            @click="showReleased"
          >已发布</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="danger"
            size="small"
            plain
            @click="showGarbage"
          >垃圾箱</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="primary"
            size="small"
            plain
            @click="showRecommend"
          >推荐</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="primary"
            size="small"
            plain
            @click="showTop"
          >置顶</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-dropdown @command="showCheckedCategory">
            <el-button
              type="warning"
              size="small"
              plain
            >
              分类<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="category in categories"
                :key="category.id"
                :command="category.name"
              >{{category.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete-solid"
            @click="deleteAllChecked"
          >删除</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="goon"
            size="small"
            icon="el-icon-s-tools"
            color="#1AB394"
            @click="SetTopAllChecked"
          >设为置顶</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="success"
            size="small"
            icon="el-icon-s-tools"
            @click="recommendAllChecked"
          >设为推荐</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 文章数据表单 -->
    <div class="article-manage-table">
      <el-table
        ref="filterTable"
        :data="showArticles"
        :cell-style="{background:'#313348',color:'white'}"
        :header-cell-style="{background:'#313348',color:'#606266'}"
      >
        <!-- 表单复选框 -->
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <!-- 表单索引 -->
        <el-table-column
          type="index"
          label="序号"
        ></el-table-column>
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
              disable-transitions
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
          prop="setTop"
          label="置顶"
        >
          <template slot-scope="scope1">
            <el-tag
              v-if="scope1.row.setTop"
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
          prop="recommend"
          label="博主推荐"
          :filters="[{text: '是',value: true},{text: '否', value: false}]"
          :filter-method="filterRecommend"
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
              disable-transitions
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
              disable-transitions
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
                  @click="articleEdit(scope.row.id)"
                >编辑</el-button>
              </el-col>
              <el-col :span="6">
                <el-popconfirm
                  title="这是一段内容确定删除吗？"
                  @confirm="articleDelete(scope.row.id)"
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
                  @click="articlePreview(scope.row.id)"
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
      // 文章分类
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
      // 所有文章
      articles: [
        {
          id: 1,
          title: '文章1',
          type: '博文',
          publishTime: '2020-2-3',
          pageView: 12,
          setTop: true,
          recommend: true,
          tag: ['标签1', '标签2'],
          category: ['java', '数据库'],
          publishStatus: '已发布',
        },
        {
          id: 2,
          title: '文章2',
          type: '博文',
          publishTime: '2020-2-3',
          pageView: 12,
          setTop: true,
          recommend: false,
          tag: ['标签1', '标签2'],
          category: ['python', '分类2'],
          publishStatus: '已发布',
        },
        {
          id: 3,
          title: '文章3',
          type: '草稿',
          publishTime: '2020-2-3',
          pageView: 12,
          setTop: false,
          recommend: false,
          tag: ['标签1', '标签2'],
          category: ['vue', '分类2'],
          publishStatus: '未发布',
        },
      ],
      // 过滤后的文章
      filterArticles: [],
      // 要显示的文章
      showArticles: [],

      // 当前所在页,默认初始在第一页
      currentPage: 1,
      // 分页规格
      pageSizes: [1, 2, 3, 4],
      // 当前分页规格,默认2条每页
      pageSize: 2,
      // 总记录条数
      total: 0,
    };
  },
  methods: {
    // 根据分页信息将过滤数组中的数据传入显示数组中
    updateShowArticle(startIndex: number = 0) {
      // 先清空待显示的文章数组
      this.showArticles = [];
      console.log('strartIndex: ' + startIndex);
      // 更新显示数组
      for (let i = startIndex, count: number = 0; i < this.filterArticles.length && count < this.pageSize; i++, count++)
        (this as any).showArticles.push(this.filterArticles[i]);

      // console.log('显示数据更新');
      // console.log(this.showArticles);
    },
    // 显示所有文章
    showAllArticle() {
      // 清空过滤数组
      this.filterArticles = [];
      (this as any).filterArticles = this.articles;

      this.updateShowArticle();
      // console.log(this.showArticles);
    },
    // 显示草稿
    showDraft() {
      // console.log('草稿按钮被点击');

      // 清空过滤数组
      this.filterArticles = [];
      // 从所有文章中筛选草稿
      (this as any).filterArticles = this.articles.filter((elem) => {
        return elem.type === '草稿';
      });
      this.total = this.filterArticles.length;
      // console.log(this.filterArticles);

      this.updateShowArticle();
    },
    // 显示已发布文章
    showReleased() {
      console.log('已发布按钮被点击');
      // 清空过滤数组
      this.filterArticles = [];
      // 从所有文章中筛选草稿
      (this as any).filterArticles = this.articles.filter((elem) => {
        return elem.publishStatus === '已发布';
      });
      this.total = this.filterArticles.length;
      console.log(this.filterArticles);

      this.updateShowArticle();
    },
    // 显示垃圾箱中的文章
    showGarbage() {},
    // 显示推荐的文章
    showRecommend() {
      console.log('推荐按钮被点击');
      // 清空过滤数组
      this.filterArticles = [];
      // 从所有文章中筛选草稿
      (this as any).filterArticles = this.articles.filter((elem) => {
        return elem.recommend === true;
      });
      this.total = this.filterArticles.length;
      console.log(this.filterArticles);

      this.updateShowArticle();
    },
    // 显示置顶的文章
    showTop() {
      console.log('置顶按钮被点击');
      // 清空过滤数组
      this.filterArticles = [];
      // 从所有文章中筛选草稿
      (this as any).filterArticles = this.articles.filter((elem) => {
        return elem.setTop === true;
      });
      this.total = this.filterArticles.length;
      console.log(this.filterArticles);

      this.updateShowArticle();
    },
    // 显示指定分类的文章
    showCheckedCategory(command: string) {
      // console.log('选择了分类');
      // console.log(command);
      this.filterArticles = [];
      this.articles.every((val) => {
        val.category.some((val2) => {
          if (val2 === command) (this as any).filterArticles.push(val);
        });
        return true; // 返回true继续迭代,默认返回false终止迭代
      });
      this.updateShowArticle();
    },
    // 删除选中的所有文章
    deleteAllChecked() {
      // 获取选中行信息
      // const _selectData = this.$refs.filterTable.selection;
      // console.log(_selectData);
      // 删除选中的文章
    },
    // 置顶选中的所有文章
    SetTopAllChecked() {
      // 获取选中行信息
      // const _selectData = this.$refs.filterTable.selection;
      // console.log(_selectData);
      // 置顶选中的文章
    },
    // 推荐选中的所有文章
    recommendAllChecked() {
      // 获取选中行信息
      // const _selectData = this.$refs.filterTable.selection;
      // console.log(_selectData);
      // 推荐选中的文章
    },
    // 编辑文章
    articleEdit(aid: any) {
      console.log('待编辑文章Id:' + aid);
    },
    // 删除文章
    articleDelete(aid: number) {
      console.log('待删除文章Id:' + aid);
    },
    // 预览文章
    articlePreview(aid: number) {
      console.log('待预览文章Id:' + aid);
    },
    // 分页规格改变
    handleSizeChange(pageSize: number) {
      // console.log(`每页 ${pageSize} 条`);
      this.pageSize = pageSize;
      // console.log(`每页 ${this.pageSize} 条`);
      // 分页规则修改后默认显示第一页
      this.currentPage = 1;
      // console.log(`当前页: ${this.currentPage}`);
      this.updateShowArticle(this.pageSize * (this.currentPage - 1));
    },
    // 当前所在页改变
    handleCurrentChange(currentPage: number) {
      // console.log(`当前页: ${currentPage}`);
      // console.log(`每页 ${this.pageSize} 条`);
      this.currentPage = currentPage;
      this.updateShowArticle(this.pageSize * (this.currentPage - 1));
    },

    // 过滤规则
    // 过滤博主推荐
    filterRecommend(value: string, row: any) {
      console.log('value: ' + value);
      console.log('row.recommend: ' + row.recommend);
      return row.recommend === value;
    },

    // 改变表格体样式
    // cellStyle(row: any, column: any, rowIndex: any, columnIndex: any): string {
    //   return 'background:#313348;color:white;';
    // },
    // 改变表格头样式
    // headerCellStyle(row: any, column: any, rowIndex: any, columnIndex: any): string {
    //   return 'background:#313348;color:white';
    // },
  },
  // 最早只能在created()中操作data和methods
  created() {
    // 从后台获取文章

    // 给分页导航栏总页数赋值
    this.total = this.articles.length;

    // 初始时没有过滤规则,将所有文章数据放入过滤数组
    (this as any).filterArticles = this.articles;

    // 根据分页规格,将获取的文章存放到待显示文章数组
    for (let i = 0; i < this.pageSize; i++) (this as any).showArticles.push(this.filterArticles[i]);
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
