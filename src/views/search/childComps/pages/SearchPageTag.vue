<!--
 * @Description: 搜索主页-标签
 * @Version:
 * @Autor: Ban
 * @Date: 2022-01-15 17:32:07
 * @LastEditors: Ban
 * @LastEditTime: 2022-01-20 13:10:39
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
            <div class="tag">
              {{ item.topic_name }}
            </div>
            <div class="center">
              {{ item.fans_count }}关注
              <div class="point"> · </div>
              {{ item.article_count }}文章
            </div>
          </div>
          <div class="left-bottom">
            {{ item.remark }}
          </div>
        </div>

        <div
          :class="item.isFocus ? 'cancel' : 'focus'"
          @click="item.isFocus ? cancel(index) : focus(index)"
          role="button"
        >{{item.isFocus ? "取消关注" : "关注"}}</div>
      </div>
    </div>
    <search-page-to-load-more @click="getTag">
    </search-page-to-load-more>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, nextTick } from 'vue';
import SearchPageToLoadMore from '@/views/search/childComps/SearchPageToLoadMore.vue';
import { searchTag } from '@/network/api/search';
import { useRoute } from 'vue-router';

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
    const tagData = reactive([]);
    const route = useRoute();

    /**
     * @description:关注事件
     * @param {number} 索引 `必传参数`
     * @return {*}
     * @author: Ban
     */
    function focus(index) {
      tagData[index].isFocus = true;
    }

    /**
     * @description:取消关注事件
     * @param {number} 索引 `必传参数`
     * @return {*}
     * @author: Ban
     */
    function cancel(index) {
      tagData[index].isFocus = false;
    }

    /**
     * @description: 获取标签搜索结果
     * @author: Ban
     */
    function getTag() {
      searchTag(route.query.value)
        .then((data) => {
          if (tagData.length == 0) {
            context.emit('changeLoadingState', 5);
            context.emit('changeAcitiveIndex', 5);
          }
          data.searchTag.forEach((item) => {
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
