<!--
 * @Description: 学习小组详情页面-文章
 * @Version:
 * @Autor: Ban
 * @Date: 2022-02-19 13:40:17
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-20 16:31:12
-->
<template>
  <div class="groud-detail-article">
    <div class="groud-detail-article-content">
      <base-select-head
        :selectTag="selectTag"
        :selectTime="selectTime"
        @changeTag="changeTag"
        @changeSelect="changeTime"
      >
      </base-select-head>
      <div
        class="groud-detail-article-content-list"
        v-for="item, index in results"
        :key="index"
      >
        <div class="list">
          <div class="title">
            <div
              class="title-text"
              @click="changePages('/article/' + item.id)"
              role="button"
            >{{ item.title }}</div>
          </div>
          <div class="content">{{ item.content }}</div>
          <div class="bottom">
            <div class="left">
              <div
                class="count"
                role="button"
              >
                <span class="iconfont blog-yulan"></span>
                {{ item.browsing_count }}
              </div>
              <div
                class="count"
                :class="item.recommend ? 'recommend' : ''"
                @click="changeLike(index)"
                role="button"
              >
                <span
                  class="iconfont"
                  :class="item.recommend ? 'blog-dianzan' : 'blog-dianzan1'"
                ></span>{{ item.recommend_count > 0 ? item.recommend_count : "点赞" }}
              </div>
              <div
                class="count"
                @click="changePages('/article/' + item.id + '#comment')"
                role="button"
              >
                <span class="iconfont blog-c-comment"></span>{{ item.reply_count > 0 ? item.reply_count : "评论" }}
              </div>
            </div>
            <div class="right">
              <div
                class="name"
                @click="changePages('/user/' + item.nickname)"
                role="button"
              >{{ item.nickname }}</div>
              <div class="time">{{ item.release_time }}</div>
            </div>
          </div>
        </div>
      </div>
      <base-content-loading
        :style="{padding: '16px 0',width:'calc(100% - 40px)',margin:'0 20px', borderTop: results.length ? `1px solid ${styles.grey4}` : 0}"
        v-show="dataState"
      ></base-content-loading>
    </div>
    <search-page-to-load-more
      @onButtonClick="getData"
      v-show="!dataState && showButton"
    ></search-page-to-load-more>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, reactive, watch } from 'vue';
import BaseSelectHead from '@/components/common/baseSelectHead/BaseSelectHead.vue';
import SearchPageToLoadMore from '@/views/search/childComps/SearchPageToLoadMore.vue';
import { getGroupArticles } from '@/network/api/groups';
import { useRoute } from 'vue-router';
import { mapGetters } from '@/utils/store';
import BaseContentLoading from '@/components/content/baseContentLoading/BaseContentLoading.vue';
import { modifyArticleRecommendEvaluation } from '@/network/api/articles';
import { useMessage } from 'naive-ui';
import styles from '@/assets/style/define.scss';

/**
 * @description: 搜索页面-文章
 * @author: Ban
 */

export default defineComponent({
  name: 'searchPageArticle',
  components: {
    BaseSelectHead,
    SearchPageToLoadMore,
    BaseContentLoading,
  },
  setup(props, context) {
    const selectTag = ref(0); //选择 0:'综合', 1:'最新', 2:'热门'
    const selectTime = ref(0); //选择 0:'时间不限', 1:'最近一天', 2:'最近一周', 3:'最近三月'时间筛选
    const results = reactive([]); // 数据列表
    const route = useRoute(); // route
    const dataState = ref(false); //是否在获取数据
    const msg = useMessage();
    const showButton = ref(false); // 是否显示加载更多按钮
    const limit = 10; // 获取数据长度
    const { isLogin } = mapGetters('global', ['isLogin']); // 是否登录

    /**
     * @description: 获取数据
     * @author: Ban
     */
    function getData() {
      dataState.value = true;
      getGroupArticles(route.path.split('/')[2], selectTag.value, selectTime.value, limit, results.length)
        .then((data) => {
          showButton.value = data.articles.length === limit;
          data.articles.forEach((item) => {
            results.push(item);
          });
          dataState.value = false;
        })
        .catch((error) => {
          console.log(error);
          msg.error('数据获取失败');
        });
    }

    onMounted(() => {
      getData();
    });

    /**
     * @description: 改变选中标签
     * @param {Object} index 索引
     * @author: Ban
     */
    function changeTag(index) {
      selectTag.value = index.index;
    }

    /**
     * @description: 改变选中时间
     * @param {Object} index 索引
     * @author: Ban
     */
    function changeTime(index) {
      selectTime.value = index.index;
    }

    /**
     * @description: 监听路由query
     * @author: Ban
     */

    watch(
      () => [route.path.split('/')[2], selectTag.value, selectTime.value],
      () => {
        results.splice(0, results.length); // 清空数组
        getData(); // 重新获取数据
      }
    );

    /**
     * @description: 跳转页面
     * @param {string} path
     * @author: Ban
     */

    function changePages(path) {
      window.open(path, path);
    }

    /**
     * @description: 修改文章评价
     * @param {number} index 文章索引
     * @author: Ban
     */

    function changeLike(index) {
      if (isLogin.value) {
        // 修改文章评价类型
        let like = results[index].recommend ? 0 : 1;
        modifyArticleRecommendEvaluation(results[index].id, like)
          .then(() => {
            results[index].recommend = like;
            if (like) results[index].recommend_count++;
            else results[index].recommend_count--;
          })
          .catch((error) => {
            console.log(error);
            msg.error('操作失败');
          });
      }
    }

    return {
      selectTag,
      selectTime,
      changeTag,
      changeTime,
      results,
      changePages,
      getData,
      changeLike,
      dataState,
      styles,
      showButton,
    };
  },
});
</script>

<style lang="scss" scoped>
.groud-detail-article {
  @include flex(center, initial, column);

  .groud-detail-article-content {
    box-shadow: $shadow-0;
    background: $grey-0;
    border-radius: $border-radius-0;
    overflow: hidden;
    margin-bottom: 10px;
    width: 700px;

    .groud-detail-article-content-list {
      height: 107px;
      transition: 0.2s;

      &:nth-child(2) {
        .list {
          border-top: none;
        }
      }

      .list {
        box-sizing: border-box;
        padding: 14px 0;
        margin: 0 20px;
        height: 100%;
        @include flex(initial, space-between, column);
        border-top: 1px solid $grey-4;

        .title {
          font-weight: 700;
          font-size: 16px;
          color: $grey-10;

          .title-text {
            @include ellipsis(1);

            &:hover {
              color: $grey-8;
            }
          }
        }

        .content {
          @include ellipsis(1);
          color: $grey-7;
          font-size: 13px;
        }

        .bottom {
          @include flex(center, space-between);
          font-size: 13px;
          color: $grey-7;

          .left {
            @include flex();

            .count {
              @include flex(center, center);
              margin-right: 20px;
              transition: 0.2s;

              &:not(:first-child) {
                &:hover {
                  color: $green-1;
                }
              }

              .iconfont {
                margin-right: 4px;
              }
            }

            .recommend {
              color: $green-1;
            }
          }

          .right {
            @include flex();

            .name {
              margin-right: 20px;
              transition: 0.2s;

              &:hover {
                color: $green-1;
              }
            }
          }
        }
      }
    }
  }
}
</style>
