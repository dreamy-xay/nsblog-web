<!--
 * @Description: 用户主页发布文章记录
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:24:57
 * @LastEditors: clq
 * @LastEditTime: 2021-09-17 20:31:42
-->
<template>
  <div class="user-article">
    <div class="user-article-header">
      <div class="left">
        <div>
          <user-article-select
            :sdata="categoryOptions"
            :category="true"
            @changeItem="categoryHandleSelect"
          ></user-article-select>
        </div>
        <div>
          <user-article-select
            :sdata="labelOptions"
            :category="false"
            @changeItem="labelHandleSelect"
          ></user-article-select>
        </div>
      </div>

      <div class="right">
        <user-sort @changeSort="changeSortHandle" />
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
        class="btn"
        role="button"
        @click="loadMore"
      >加载更多...</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import UserArticleItem from '@/views/user/childComps/pages/userArticle/childComps/UserArticleItem.vue';
import UserArticleSelect from '@/views/user/childComps/pages/userArticle/childComps/UserArticleSelect.vue';
import UserSort from '@/views/user/childComps/UserSort.vue';
import { useMessage } from 'naive-ui';
/**
 * @description: 用户主页发布文章记录
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userArticle',
  components: { UserArticleItem, UserArticleSelect, UserSort },
  setup() {
    //文章分类
    const categoryOptions = reactive(['分类1', '分类2', '分类3', '分类4', '分类5', '分类6', '分类7', '分类8']);
    //文章标签
    const labelOptions = reactive(['标签1', '标签2', '标签3', '标签4', '标签5', '标签6', '标签7', '标签8']);
    //文章详情
    const articles = reactive([
      {
        title: '标题',
        url: '文章链接',
        content:
          '内容11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
        topic_tag: '专栏',
        viewCount: 2, //浏览量
        commentCount: 6, //评论数
        recommendCount: 8, //推荐数
        releaseTime: '2021-4-21 15:20',
      },
      {
        title: '标题2',
        url: '文章链接2',
        content:
          '内容22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222',
        topic_tag: '专栏2',
        viewCount: 2, //浏览量
        commentCount: 6, //评论数
        recommendCount: 8, //推荐数
        releaseTime: '2021-4-21 15:20',
      },
    ]);
    const message = useMessage(); //navi-ui message
    const categoryBtnInfo = ref('选择分类'); //分类按钮信息
    const LabelBtnInfo = ref('选择标签'); //标签按钮信息

    /**
     * @description: 选择分类
     * @param {String} key 分类key值
     * @return {void}
     * @author: clq
     */
    function categoryHandleSelect(key) {
      for (const elem of categoryOptions) {
        if (elem.key === key) {
          categoryBtnInfo.value = elem.label;
          LabelBtnInfo.value = '选择标签';
          break;
        }
      }
      message.info(key);
    }

    /**
     * @description: 选择标签
     * @param {String} key 标签key值
     * @return {void}
     * @author: clq
     */
    function labelHandleSelect(key) {
      for (const elem of labelOptions) {
        if (elem.key === key) {
          LabelBtnInfo.value = elem.label;
          categoryBtnInfo.value = '选择分类';
          break;
        }
      }
      message.info(key);
    }

    function changeSortHandle(key) {
      if (key === 1) {
        console.log('发布时间升序');
      } else if (key === 2) {
        console.log('发布时间降序');
      } else if (key === 3) {
        console.log('访问量升序');
      } else {
        console.log('访问量降序');
      }
    }

    /**
     * @description: 加载更多文章记录
     * @return {void}
     * @author: clq
     */
    function loadMore() {
      console.log('loadMore');
    }

    return {
      categoryOptions,
      labelOptions,
      articles,
      categoryBtnInfo,
      LabelBtnInfo,
      categoryHandleSelect,
      labelHandleSelect,
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
    background-color: #fff;
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
      border-radius: 8px;
      box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
      background-color: #fff;

      font-family: Arial;
      font-size: 14px;
      line-height: 32px;
      text-align: center;
      color: #595959;
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
      color: #8c8c8c;
      @include ellipsis(1);
      transition: all 0.25s;

      &:hover {
        background-color: #f4f4f4;
        color: #85e8c7;
      }
    }
  }
}
</style>
