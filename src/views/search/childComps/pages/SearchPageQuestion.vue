<!--
 * @Description: 搜索页面-综合
 * @Version:
 * @Autor: Ban
 * @Date: 2022-01-25 14:25:23
 * @LastEditors: Ban
 * @LastEditTime: 2022-01-27 19:10:13
-->
<template>
  <div class="search-page-question">
    <div class="search-page-question-content">
      <base-select-head
        :selectTag="selectTag"
        :selectTime="selectTime"
        @changeTag="changeTag"
        @changeSelect="changeTime"
      >
      </base-select-head>
      <div
        class="search-page-question-content-list"
        v-for="item, index in results"
        :key="index"
        role="button"
        @click="changePages('/article/' + item.id)"
      >
        <div class="list">
          <div class="title">
            <div
              class="iconfont blog-wenti1"
              v-if="item.type == 1"
            ></div>{{ item.title }}
          </div>
          <div class="content">{{ item.content }}</div>
          <div class="bottom">
            <div class="left">
              <div class="count">
                <span class="iconfont blog-yulan"></span>
                {{ item.browsing_count }}
              </div>
              <div
                class="count"
                :class="item.like ? 'like' : ''"
              >
                <span class="iconfont blog-dianzan1"></span>{{ item.like_count > 0 ? item.like_count : "点赞"}}
              </div>
              <div class="count">
                <span class="iconfont blog-c-comment"></span>{{ item.reply_count > 0 ? item.reply_count : "评论"}}
              </div>
            </div>
            <div class="right">
              <div
                class="name"
                @click="changePages('/user/' + item.nickname)"
              >{{ item.nickname }}</div>
              <div class="time">{{ item.release_time }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <search-page-to-load-more @onButtonClick="getData"></search-page-to-load-more>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, reactive, watch } from 'vue';
import BaseSelectHead from '@/components/common/baseSelectHead/BaseSelectHead.vue';
import SearchPageToLoadMore from '@/views/search/childComps/SearchPageToLoadMore.vue';
import { search } from '@/network/api/search';
import { useRoute } from 'vue-router';

/**
 * @description: 搜索页面-综合
 * @author: Ban
 */

export default defineComponent({
  name: 'searchPageQuestion',
  components: {
    BaseSelectHead,
    SearchPageToLoadMore,
  },
  setup(props, context) {
    const selectTag = ref(0); //选择 0:'综合', 1:'最新', 2:'热门'标签
    const selectTime = ref(0); //选择 0:'时间不限', 1:'最近一天', 2:'最近一周', 3:'最近三月'时间筛选
    const results = reactive([]); // 数据列表
    const route = useRoute(); // route

    /**
     * @description: 获取数据
     * @author: Ban
     */
    function getData() {
      search(route.query.keyword, 2, selectTag.value, selectTime.value)
        .then((data) => {
          data.questions.forEach((item) => {
            results.push(item);
            context.emit('changeLoadingState', 2, true);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    onMounted(() => {
      context.emit('changeActiveIndex', 2);
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
      () => [route.query.keyword, selectTag.value, selectTime.value],
      () => {
        context.emit('changeLoadingState', 2, false); // 改变数据加载状态
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

    return {
      selectTag,
      selectTime,
      changeTag,
      changeTime,
      results,
      changePages,
      getData,
    };
  },
});
</script>

<style lang="scss" scoped>
.search-page-question {
  @include flex(center, initial, column);

  .search-page-question-content {
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    overflow: hidden;
    margin-bottom: 10px;
    width: 700px;

    .search-page-question-content-list {
      height: 107px;
      background: $grey-0;
      transition: 0.2s;

      &:hover {
        background: $grey-1;
      }

      &:last-child {
        .list {
          border-bottom: 0;
        }
      }

      .list {
        box-sizing: border-box;
        padding: 14px 0;
        margin: 0 20px;
        height: 100%;
        @include flex(initial, space-between, column);
        border-bottom: 1px solid $grey-4;

        .title {
          @include ellipsis(1);
          font-weight: 700;
          font-size: 16px;
          color: $grey-10;

          .blog-wenti1 {
            display: inline-block;
            height: 14px;
            width: 14px;
            margin-right: 8px;
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

            .like {
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
