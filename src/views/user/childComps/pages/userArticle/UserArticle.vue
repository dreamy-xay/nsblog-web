<!--
 * @Description: 用户主页发布文章记录
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:24:57
 * @LastEditors: clq
 * @LastEditTime: 2021-09-24 21:08:47
-->
<template>
  <div class="user-article">
    <div class="user-article-header">
      <div class="left">
        <div>
          <user-article-select
            :sdata="categoryOptions"
            :category="true"
            :isActive="categorySelector"
            @changeItem="handleSelector"
          ></user-article-select>
        </div>
        <div>
          <user-article-select
            :sdata="tagOptions"
            :category="false"
            :isActive="tagSelector"
            @changeItem="handleSelector"
          ></user-article-select>
        </div>
      </div>

      <div class="right">
        <user-sort
          :sortFlag="sortType"
          @changeSort="changeSortHandle"
        />
      </div>
    </div>

    <div class="user-article-body">
      <user-article-item
        v-for="article in articles"
        :key="article"
        :articleInfo="article"
      />
    </div>

    <div class="user-article-footer">
      <div
        v-show="isShowLoadMore"
        class="btn"
        role="button"
        @click="loadMore"
      >加载更多...</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, watch } from 'vue';
import UserArticleItem from '@/views/user/childComps/pages/userArticle/childComps/UserArticleItem.vue';
import UserArticleSelect from '@/views/user/childComps/pages/userArticle/childComps/UserArticleSelect.vue';
import UserSort from '@/views/user/childComps/UserSort.vue';
import { useMessage } from 'naive-ui';
import { useRoute } from 'vue-router';
import { getArticles, getCategories, getTags } from '@/network/api/articles';

/**
 * @description: 用户主页发布文章记录
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userArticle',
  components: { UserArticleItem, UserArticleSelect, UserSort },
  setup() {
    const categoryOptions = reactive([]); //文章分类
    const categorySelector = ref(false); //控制分类选择器是否有效
    const categoryId = ref(''); //当前选择的分类id
    const tagOptions = reactive([]); //文章标签
    const tagSelector = ref(false); //控制标签选择器是否有效
    const tagId = ref(''); //当前选择的标签id
    const articles = reactive([]); //文章详情
    const message = useMessage(); //navi-ui message
    const categoryBtnInfo = ref('选择分类'); //分类按钮信息
    const LabelBtnInfo = ref('选择标签'); //标签按钮信息
    const sortType = ref(1); //排序类型
    const releaseTimeSortType = ref(1); //发布时间排序规则
    const browsingCountSortType = ref(0); //访问量排序规则
    const offset = ref(0); //文章起始位置
    const limit = ref(10); //文章数量
    const route = useRoute(); //路由
    const username = route.params.username; //用户名
    const isShowLoadMore = ref(true); //是否显示`加载更多`按钮

    onMounted(() => {
      console.log('useName: ' + route.params.username);
      initCategories(username);
      initTags(username);
      initArticles(
        username,
        categoryId.value,
        tagId.value,
        offset.value,
        limit.value,
        releaseTimeSortType.value,
        browsingCountSortType.value
      );
    });

    watch(
      () => sortType.value,
      (newValue) => {
        limit.value = 10;
        if (newValue === 1) {
          console.log('发布时间升序');
          releaseTimeSortType.value = 1;
          browsingCountSortType.value = 0;
        } else if (newValue === 2) {
          console.log('发布时间降序');
          releaseTimeSortType.value = -1;
          browsingCountSortType.value = 0;
        } else if (newValue === 3) {
          console.log('访问量升序');
          releaseTimeSortType.value = 0;
          browsingCountSortType.value = 1;
        } else {
          console.log('访问量降序');
          releaseTimeSortType.value = 0;
          browsingCountSortType.value = -1;
        }
        //更新文章
        initArticles(
          username,
          categoryId.value,
          tagId.value,
          offset.value,
          limit.value,
          releaseTimeSortType.value,
          browsingCountSortType.value
        );
      }
    );

    /**
     * @description: 获取文章
     * @param {string} username
     * @return {void}
     * @author: clq
     */
    function initArticles(username, categoryId, tagId, offset, limit, release_time, browsing_count) {
      getArticles(username, categoryId, tagId, offset, limit, release_time, browsing_count)
        .then((res) => {
          if (res.length < limit.value) {
            isShowLoadMore.value = false;
          } else {
            isShowLoadMore.value = true;
          }
          articles.splice(0, articles.length, ...res.articles);
        })
        .catch((err) => {
          console.log('initArticlesError: ' + err);
        });
    }

    /**
     * @description: 获取文章分类
     * @param {string} username
     * @return {void}
     * @author: clq
     */
    function initCategories(username) {
      getCategories(username)
        .then((res) => {
          categoryOptions.splice(0, categoryOptions.length, ...res.categories);
        })
        .catch((err) => {
          console.log('initCategoriesError: ' + err);
        });
    }

    /**
     * @description: 获取文章标签
     * @param {string} username
     * @return {void}
     * @author: clq
     */
    function initTags(username) {
      getTags(username)
        .then((res) => {
          tagOptions.splice(0, tagOptions.length, ...res.tags);
        })
        .catch((err) => {
          console.log('initTagsError: ' + err);
        });
    }

    /**
     * @description: 选择分类或标签
     * @param {Boolean} type 选择器类型 true:分类 false:标签
     * @param {String} id 分类 id
     * @return {void}
     * @author: clq
     */
    function handleSelector(type, id) {
      // message.info(`type:${type},id:${id} `);
      limit.value = 10;
      let flag = true;
      // 判断选择器类型
      if (type) {
        // 分类选择器有效
        categorySelector.value = true;
        // 使标签选择器失效
        tagSelector.value = false;

        if (categoryId.value === id) {
          flag = false;
        } else {
          categoryId.value = id;
          tagId.value = null;
        }
      } else {
        // 使标签选择器有效
        tagSelector.value = true;
        // 分类选择器失效
        categorySelector.value = false;

        if (tagId.value === id) {
          flag = false;
        } else {
          tagId.value = id;
          categoryId.value = null;
        }
      }

      if (flag) {
        //更新文章
        initArticles(
          username,
          categoryId.value,
          tagId.value,
          offset.value,
          limit.value,
          releaseTimeSortType.value,
          browsingCountSortType.value
        );
      }
    }

    /**
     * @description: 改变排序规则
     * @param {number} type
     * @return {void}
     * @author: clq
     */
    function changeSortHandle(type) {
      sortType.value = type;
    }

    /**
     * @description: 加载更多文章记录
     * @return {void}
     * @author: clq
     */
    function loadMore() {
      console.log('loadMore');
      limit.value += 10;
      //更新文章
      initArticles(
        username,
        categoryId.value,
        tagId.value,
        offset.value,
        limit.value,
        releaseTimeSortType.value,
        browsingCountSortType.value
      );
    }

    return {
      categoryOptions,
      categorySelector,
      tagOptions,
      tagSelector,
      articles,
      categoryBtnInfo,
      LabelBtnInfo,
      sortType,
      isShowLoadMore,
      handleSelector,
      changeSortHandle,
      loadMore,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-article {
  width: 100%;

  .user-article-header {
    padding: 7.7px 16px 8px 16px;
    margin-bottom: 16px;
    border-radius: 8px;
    box-shadow: $shadow-0;
    background-color: $grey-0;
    @include flex(center, space-between, row);

    .left {
      @include flex(center, flex-start, row);
    }
  }

  .user-article-footer {
    @include flex(center, space-around);
    .btn {
      width: 300px;
      height: 32px;
      border-radius: $border-radius-0;
      box-shadow: $shadow-0;
      background-color: $grey-0;

      font-family: Arial;
      font-size: 14px;
      line-height: 32px;
      text-align: center;
      color: $grey-9;
    }
  }
}
</style>

<style lang="scss">
.user-article-dropdown {
  border-radius: 4px !important;

  .n-dropdown-option-body {
    height: 29px !important;

    .n-dropdown-option-body__prefix {
      width: 0px !important;
    }

    .n-dropdown-option-body__suffix {
      padding: 0px !important;
      min-width: 0px !important;
      width: 0px !important;
    }

    .n-dropdown-option-body__label {
      box-sizing: border-box;
      width: 92px;
      height: 29px;
      padding: 0 10px;
      line-height: 29px;
      color: $grey-7;
      @include ellipsis(1);
      transition: all 0.25s;

      &:hover {
        background-color: $grey-2;
        color: $green-0;
      }
    }
  }
}
</style>
