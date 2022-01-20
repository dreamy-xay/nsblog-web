<!--
 * @Description: 搜索主页-用户
 * @Version:
 * @Autor: Ban
 * @Date: 2022-01-15 17:32:07
 * @LastEditors: Ban
 * @LastEditTime: 2022-01-20 13:11:13
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
          <div class="username">{{ item.nickname }}</div>
          <div class="sign">
            {{ item.signature }}</div>
        </div>
        <div
          :class="item.isFocus ? 'cancel' : 'focus'"
          role="button"
          @click="item.isFocus ? cancel(index) : focus(index)"
        >{{item.isFocus ? "取消关注" : "关注"}}</div>
      </div>
    </div>
    <search-page-to-load-more @click="getUser"></search-page-to-load-more>
  </div>

</template>

<script>
import { defineComponent, reactive, ref, onMounted } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import SearchPageToLoadMore from '@/views/search/childComps/SearchPageToLoadMore.vue';
import { useRoute } from 'vue-router';
import { searchUser } from '@/network/api/search';

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
      userData[index].isFocus = true;
    }

    /**
     * @description:取消关注事件
     * @param {number} 索引 `必传参数`
     * @return {*}
     * @author: Ban
     */
    function cancel(index) {
      userData[index].isFocus = false;
    }

    /**
     * @description: 获取用户搜索结果
     * @author: Ban
     */

    function getUser() {
      searchUser(route.query.value)
        .then((data) => {
          if (userData.length == 0) {
            context.emit('changeLoadingState', 6);
            context.emit('changeAcitiveIndex', 6);
          }
          data.searchTag.forEach((item) => {
            userData.push(item);
          });
          console.log(userData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    onMounted(() => {
      getUser();
    });

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
          color: $grey-11;
          font-size: 16px;
          font-weight: 700;
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
