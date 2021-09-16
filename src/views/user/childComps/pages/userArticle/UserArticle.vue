<!--
 * @Description: 用户主页发布文章记录
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:24:57
<<<<<<< HEAD
 * @LastEditors: clq
 * @LastEditTime: 2021-09-16 17:20:49
=======
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-16 17:50:43
>>>>>>> 61d8b7aaacac2c8263bc71aedafa182df8099c3d
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
            <n-button
              class="btn"
              text
            >{{categoryBtnInfo}}</n-button>
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
            class="user-article-dropdown"
          >
            <n-button
              class="btn"
              text
            >{{LabelBtnInfo}}</n-button>
          </n-dropdown>
        </div>
      </div>

      <div class="right">
        <!-- <div class="publishTime"> -->
        <div class="label">发布时间</div>
        <div class="btnContainer">
          <div
            class="iconfont blog-up"
            role="button"
          ></div>
          <div
            class="iconfont blog-down"
            role="button"
          ></div>
        </div>
        <!-- </div> -->

        <!-- <div class="visitCount"> -->
        <div class="label">访问量</div>
        <div class="btnContainer">
          <div
            class="iconfont blog-up"
            role="button"
          ></div>
          <div
            class="iconfont blog-down"
            role="button"
          ></div>
        </div>
        <!-- </div> -->
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
import { useMessage } from 'naive-ui';
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
        key: 'the beverly, los angeles',
      },
      {
        label: '比佛利山庄酒店，洛杉矶',
        key: 'the beverly hills hotel, los angeles',
      },
      {
        label: '比佛利山庄酒店，洛杉矶',
        key: 'the beverly hills angeles',
      },
      {
        label: '比佛利山庄酒店，洛杉矶',
        key: 'the bever',
      },
      {
        label: '比佛利山庄酒店，洛杉矶',
        key: 'the beverly hills hos angeles',
      },
      {
        label: '比佛利山庄酒店，洛杉矶',
        key: 'the beverly lls hotel, los angeles',
      },
      {
        label: '比佛利山庄酒店，洛杉矶',
        key: 'the beverly hills hotel, os angeles',
      },
    ]);
    //文章标签
    const labelOptions = reactive([
      {
        label: '滨海湾金沙，新加坡',
        key: 'marina bay sands',
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

      :deep(.btn span) {
        // box-sizing: border-box;
        display: block;
        width: 80px;
        // background-color: #f4f4f4;
        text-align: left;
        color: #8c8c8c;
        @include ellipsis(1);

        &:hover {
          color: #85e8c7;
        }
      }
    }

    .right {
      @include flex(center, flex-start);
      .label {
        margin-right: 4px;
        margin-left: 8px;
        color: #8c8c8c;
      }

      .btnContainer {
        height: 19.2px;
        margin-right: 8px;
        @include flex(center, space-around, column);
        .iconfont {
          height: 9.6px;
          font-size: 1px;
          color: #bfbfbf;

          &:hover {
            color: $grey-7;
          }
        }
      }
    }
  }

  .user-article-body {
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
  // height: 154px !important;

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
