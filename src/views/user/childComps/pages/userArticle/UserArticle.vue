<!--
 * @Description: 用户主页发布文章记录
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:24:57
 * @LastEditors: clq
 * @LastEditTime: 2021-09-16 20:03:33
-->
<template>
  <div class="user-article">
    <div class="user-article-header">
      <div class="left">
        <!-- <div
          class="iconfont blog-fenlei category-icon"
          role="button"
        ></div> -->
        <!-- <div class="category">
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
        </div> -->
        <div>
          <user-article-select
            :sdata="[1,2,3,4,5,6,7,8,9]"
            :category="true"
          ></user-article-select>
        </div>
        <div>
          <user-article-select
            :sdata="[1,2,3,4]"
            :category="false"
          ></user-article-select>
        </div>

        <!-- <div
          class="iconfont blog-label label-icon"
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
        </div> -->
      </div>

      <div class="right">
        <div class="label">发布时间</div>
        <div class="btnContainer">
          <div
            :class="{'active': sortFlag === 1}"
            class="iconfont blog-up"
            role="button"
            @click="timeIncrease"
          ></div>
          <div
            :class="{'active': sortFlag === 2}"
            class="iconfont blog-down"
            role="button"
            @click="timeDecrease"
          ></div>
        </div>

        <div class="label">访问量</div>
        <div class="btnContainer">
          <div
            :class="{'active': sortFlag === 3}"
            class="iconfont blog-up"
            role="button"
            @click="viewIncrease"
          ></div>
          <div
            :class="{'active': sortFlag === 4}"
            class="iconfont blog-down"
            role="button"
            @click="viewDecrease"
          ></div>
        </div>
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
import { useMessage } from 'naive-ui';
/**
 * @description: 用户主页发布文章记录
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userArticle',
  components: { UserArticleItem, UserArticleSelect },
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
        content:
          '内容11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
        specialColumn: '专栏',
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
    const sortFlag = ref(1); //排序标志 1: 时间升序 2:时间降序 3:访问量升序 4:访问量降序

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
     * @description: 按发布时间升序排序
     * @return {void}
     * @author: clq
     */
    function timeIncrease() {
      sortFlag.value = 1;
      console.log('timeIncrease');
    }

    /**
     * @description: 按发布时间降序排序
     * @return {void}
     * @author: clq
     */
    function timeDecrease() {
      sortFlag.value = 2;
      console.log('timeDecrease');
    }

    /**
     * @description: 按访问量升序排序
     * @return {void}
     * @author: clq
     */
    function viewIncrease() {
      sortFlag.value = 3;
      console.log('viewIncrease');
    }

    /**
     * @description: 按访问量降序排序
     * @return {void}
     * @author: clq
     */
    function viewDecrease() {
      sortFlag.value = 4;
      console.log('viewDecrease');
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
      sortFlag,
      categoryHandleSelect,
      labelHandleSelect,
      loadMore,
      timeIncrease,
      timeDecrease,
      viewIncrease,
      viewDecrease,
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
        box-sizing: border-box;
        height: 19.2px;
        margin-right: 8px;
        // padding: 10px 0;
        @include flex(center, space-around, column);

        .iconfont {
          // height: 9px;
          font-size: 0.5px;
          color: #bfbfbf;
          transition: all 0.25s;

          &:hover {
            color: $grey-7;
          }
        }

        .active {
          color: $grey-7;
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
