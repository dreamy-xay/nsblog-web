<!--
 * @Description: 用户主页发布文章记录
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:24:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-16 17:50:43
-->
<template>
  <div class="user-article">
    <div class="user-article-header">
      <div class="left">
        <div
          class="iconfont blog-fenlei category-icon"
          role="button"
        ></div>
        <div class="category">
          <n-dropdown
            trigger="click"
            @select="categoryHandleSelect"
            :options="categoryOptions"
            :show-arrow="true"
            class="user-article-dropdown"
          >
            <n-button text>选择分类</n-button>
          </n-dropdown>
        </div>
        <div
          class="iconfont blog-leaf label-icon"
          role="button"
        ></div>
        <div class="label">
          <n-dropdown
            trigger="hover"
            @select="labelHandleSelect"
            :options="categoryOptions"
            :show-arrow="true"
          >
            <n-button text>选择标签</n-button>
          </n-dropdown>
        </div>
      </div>

      <div class="right">right</div>
    </div>

    <div class="user-article-body">
      <user-article-item
        v-for="article in articles"
        :key="article"
        :articleInfo="article"
      />
    </div>

    <div class="user-article-footer">footer</div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import UserArticleItem from '@/views/user/childComps/pages/userArticle/childComps/UserArticleItem.vue';
import message from '@/store/modules/message';

/**
 * @description: 用户主页发布文章记录
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userArticle',
  components: { UserArticleItem },
  setup() {
    //文章分类
    const categoryOptions = reactive([
      {
        label: '滨海湾金沙，新加坡',
        key: 'marina bay sands',
        disabled: true,
      },
      {
        label: '布朗酒店，伦敦',
        key: "brown's hotel, london",
      },
      {
        label: '亚特兰蒂斯巴哈马，拿骚',
        key: 'atlantis nahamas, nassau',
      },
      {
        label: '比佛利山庄酒店，洛杉矶',
        key: 'the beverly hills hotel, los angeles',
      },
    ]);
    //文章标签
    const labelOptions = reactive([
      {
        label: '滨海湾金沙，新加坡',
        key: 'marina bay sands',
        disabled: true,
      },
      {
        label: '布朗酒店，伦敦',
        key: "brown's hotel, london",
      },
      {
        label: '亚特兰蒂斯巴哈马，拿骚',
        key: 'atlantis nahamas, nassau',
      },
      {
        label: '比佛利山庄酒店，洛杉矶',
        key: 'the beverly hills hotel, los angeles',
      },
    ]);
    //文章详情
    const articles = reactive([
      {
        title: '标题',
        url: '文章链接',
        content: '内容',
        specialColumn: '专栏',
        viewCount: 2, //浏览量
        commentCount: 6, //评论数
        recommendCount: 8, //推荐数
        releaseTime: '2021-4-21 15:20',
      },
      {
        title: '标题2',
        url: '文章链接2',
        content: '内容2',
        specialColumn: '专栏2',
        viewCount: 2, //浏览量
        commentCount: 6, //评论数
        recommendCount: 8, //推荐数
        releaseTime: '2021-4-21 15:20',
      },
      {
        title: '标题',
        url: '文章链接',
        content: '内容',
        specialColumn: '专栏',
        viewCount: 2, //浏览量
        commentCount: 6, //评论数
        recommendCount: 8, //推荐数
        releaseTime: '2021-4-21 15:20',
      },
      {
        title: '标题2',
        url: '文章链接2',
        content: '内容2',
        specialColumn: '专栏2',
        viewCount: 2, //浏览量
        commentCount: 6, //评论数
        recommendCount: 8, //推荐数
        releaseTime: '2021-4-21 15:20',
      },
      {
        title: '标题',
        url: '文章链接',
        content: '内容',
        specialColumn: '专栏',
        viewCount: 2, //浏览量
        commentCount: 6, //评论数
        recommendCount: 8, //推荐数
        releaseTime: '2021-4-21 15:20',
      },
      {
        title: '标题2',
        url: '文章链接2',
        content: '内容2',
        specialColumn: '专栏2',
        viewCount: 2, //浏览量
        commentCount: 6, //评论数
        recommendCount: 8, //推荐数
        releaseTime: '2021-4-21 15:20',
      },
    ]);

    /**
     * @description: 选择分类
     * @param {String} key 分类key值
     * @return {void}
     * @author: clq
     */
    function categoryHandleSelect(key) {
      message.info(key);
    }

    /**
     * @description: 选择标签
     * @param {String} key 标签key值
     * @return {void}
     * @author: clq
     */
    function labelHandleSelect(key) {
      message.info(key);
    }

    return {
      categoryOptions,
      labelOptions,
      articles,
      categoryHandleSelect,
      labelHandleSelect,
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

      .category-icon {
        margin-right: 6px;
        font-size: 20px;
        color: #f98fa8;
      }

      .category {
        color: #8c8c8c;
        margin-right: 16px;
      }

      .label-icon {
        margin-right: 6px;
        font-size: 20px;
        color: #ffb792;
      }

      .label {
        color: #8c8c8c;
      }
    }

    .right {
      color: #8c8c8c;
    }
  }

  .user-article-body {
  }

  .user-article-footer {
  }
}
</style>

<style lang="scss">
.user-article-dropdown {
  // padding: 0 !important;
  .n-dropdown-option-body__prefix {
    width: 4px !important;
  }
  .n-dropdown-option-body__suffix {
    padding: 0px !important;
    min-width: 4px !important;
    width: 4px !important;
  }
}
</style>
