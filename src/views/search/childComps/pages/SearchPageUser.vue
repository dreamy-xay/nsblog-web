<!--
 * @Description: 搜索主页-用户
 * @Version:
 * @Autor: Ban
 * @Date: 2022-01-15 17:32:07
 * @LastEditors: Ban
 * @LastEditTime: 2022-01-22 13:10:45
-->
<template>
  <div class="search-page-tag">
    <div class="search-page-tag-list">
      <div
        class="search-page-tag-list-content"
        v-for="item, index in userData"
        :key="index"
      >
        <div class="left">
          <base-avatar
            :src="item.avatar"
            :size="46"
            alt="data.username"
          />
        </div>
        <div class="center">
          <div class="username">
            <div
              class="username-content"
              role="button"
            >
              {{ item.nickname }}
            </div>
          </div>
          <div class="sign">
            {{ item.signature }}</div>
        </div>
        <div
          :class="item.attention == 1 ? 'cancel' : 'focus'"
          role="button"
          @click="item.attention == 1 ? cancel(index) : focus(index)"
        >{{item.attention == 1 ? "取消关注" : "关注"}}</div>
      </div>
    </div>
    <search-page-to-load-more @click="getUser"></search-page-to-load-more>
  </div>

</template>

<script>
import { defineComponent, reactive, ref, onMounted, watch } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import SearchPageToLoadMore from '@/views/search/childComps/SearchPageToLoadMore.vue';
import { useRoute } from 'vue-router';
import { search } from '@/network/api/search';

/**
 * @description: 搜索主页-用户
 * @author: Ban
 */

export default defineComponent({
  name: 'searchPageTag',
  components: {
    BaseAvatar,
    SearchPageToLoadMore,
  },
  setup(props, context) {
    // 用户搜索数据
    const userData = reactive([]);
    const route = useRoute();

    /**
     * @description:关注事件
     * @param {number} 索引 `必传参数`
     * @return {*}
     * @author: Ban
     */
    function focus(index) {
      userData[index].attention = 1;
    }

    /**
     * @description:取消关注事件
     * @param {number} 索引 `必传参数`
     * @return {*}
     * @author: Ban
     */
    function cancel(index) {
      userData[index].attention = 0;
    }

    /**
     * @description: 获取用户搜索结果
     * @author: Ban
     */

    function getUser() {
      search(route.query.keyword, 6)
        .then((data) => {
          if (userData.length == 0) {
            context.emit('changeLoadingState', 6, true);
            context.emit('changeAcitiveIndex', 6);
          }
          data.users.forEach((item) => {
            userData.push(item);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    onMounted(() => {
      getUser();
    });

    watch(
      () => route.query.keyword,
      () => {
        context.emit('changeLoadingState', 6, false); // 改变数据加载状态
        userData.splice(0, userData.length); // 清空数组
        getUser(); // 重新获取数据
      }
    );

    return {
      userData,
      focus,
      cancel,
      getUser,
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
    margin-bottom: 10px;
    width: 100%;

    .search-page-tag-list-content {
      height: 93px;
      background: $grey-0;
      @include flex(center, space-between);
      box-sizing: content-box;
      padding: 0 24px;
      border-bottom: 1px solid $grey-4;

      .center {
        width: 484px;
        height: 100%;
        color: $grey-8;
        margin-right: 12px;
        box-sizing: border-box;
        padding: 24px 0;
        @include flex(initial, space-around, column);

        .username {
          display: flex;

          .username-content {
            color: $grey-11;
            font-size: 16px;
            font-weight: 700;
          }
        }

        .sign {
          color: $grey-7;
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
