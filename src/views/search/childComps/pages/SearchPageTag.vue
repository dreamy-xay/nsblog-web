<!--
 * @Description: 搜索主页-标签
 * @Version:
 * @Autor: Ban
 * @Date: 2022-01-15 17:32:07
 * @LastEditors: Ban
 * @LastEditTime: 2022-01-22 14:02:39
-->
<template>
  <div class="search-page-tag">
    <div class="search-page-tag-list">
      <div
        class="search-page-tag-list-content"
        v-for="item, index in tagData"
        :key="index"
      >
        <div class="left">
          <div class="left-top">
            <div
              class="tag"
              role="button"
            >
              {{ item.name }}
            </div>
            <div class="center">
              {{ item.attention_count }}关注
              <div class="point"> · </div>
              {{ item.article_count }}文章
            </div>
          </div>
          <div class="left-bottom">
            {{ item.remark }}
          </div>
        </div>

        <div
          :class="item.attention == 1 ? 'cancel' : 'focus'"
          @click="item.attention == 1 ? cancel(index) : focus(index)"
          role="button"
        >{{item.attention == 1 ? "取消关注" : "关注"}}</div>
      </div>
    </div>
    <search-page-to-load-more @click="getTag">
    </search-page-to-load-more>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, watch } from 'vue';
import SearchPageToLoadMore from '@/views/search/childComps/SearchPageToLoadMore.vue';
import { search } from '@/network/api/search';
import { useRoute } from 'vue-router';
import router from '@/router';

/**
 * @description: 搜索主页-标签
 * @author: Ban
 */

export default defineComponent({
  name: 'searchPageTag',
  components: {
    SearchPageToLoadMore,
  },
  setup(props, context) {
    const tagData = reactive([]); // 数据
    const route = useRoute(); // 路由

    /**
     * @description:关注事件
     * @param {number} 索引 `必传参数`
     * @return {*}
     * @author: Ban
     */
    function focus(index) {
      tagData[index].attention = 1;
    }

    /**
     * @description:取消关注事件
     * @param {number} 索引 `必传参数`
     * @return {*}
     * @author: Ban
     */
    function cancel(index) {
      tagData[index].attention = 0;
    }

    /**
     * @description: 获取标签搜索结果
     * @author: Ban
     */
    function getTag() {
      search(route.query.keyword, 5)
        .then((data) => {
          if (tagData.length == 0) {
            context.emit('changeLoadingState', 5, true);
            context.emit('changeAcitiveIndex', 5);
          }
          data.tags.forEach((item) => {
            tagData.push(item);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // 请求搜索结果
    onMounted(() => {
      getTag();
    });

    watch(
      () => route.query.keyword,
      () => {
        context.emit('changeLoadingState', 5, false); // 改变数据加载状态
        tagData.splice(0, tagData.length); // 清空数组
        getTag(); // 重新获取数据
      }
    );

    return {
      tagData,
      focus,
      cancel,
      getTag,
    };
  },
});
</script>

<style lang="scss" scoped>
.search-page-tag {
  width: 700px;
  @include flex(center, initial, column);

  .search-page-tag-list {
    box-shadow: $shadow-0;
    border-radius: 8px;
    overflow: hidden;
    width: 700px;
    margin-bottom: 10px;

    .search-page-tag-list-content {
      height: 83px;
      background: $grey-0;
      @include flex(center, space-between);
      box-sizing: border-box;
      padding: 0 24px;
      border-bottom: 1px solid $grey-4;

      .left {
        width: 546px;
        height: 100%;
        @include flex(initial, space-between, column);
        box-sizing: border-box;
        padding: 16px 0;

        .left-top {
          @include flex();
          position: relative;

          .tag {
            height: 28px;
            box-sizing: border-box;
            padding: 5px 10px;
            background: rgba($green-0, 0.3);
            color: $green-1;
            border-radius: 4px;
            transition: 0.2s;
            font-size: 16px;
          }

          .center {
            color: $grey-8;
            @include flex(center);
            line-height: 28px;
            position: absolute;
            left: 220px;

            .point {
              font-size: 36px;
              color: $grey-11;
              margin: 0 16px;
            }
          }
        }

        .left-bottom {
          color: $grey-8;
          @include ellipsis(1);
        }
      }

      .focus {
        height: 28px;
        width: 82px;
        @include flex(center, center);
        background: $grey-0;
        box-shadow: $shadow-0;
        color: $grey-8;
        border-radius: 14px;
        transition: 0.25s;

        &:hover {
          box-shadow: $shadow-2;
          color: $green-0;
          transition: 0.25s;
        }
      }

      .cancel {
        height: 28px;
        width: 82px;
        @include flex(center, center);
        background: $green-0;
        box-shadow: $shadow-0;
        color: $grey-0;
        border-radius: 14px;
        transition: 0.25s;

        &:hover {
          background: $green-1;
          transition: 0.25s;
        }
      }
    }
  }
}
</style>
