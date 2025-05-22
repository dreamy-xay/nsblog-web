<!--
 * @Description: 征集令接令用户组件
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-15 16:26:52
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-15 19:11:50
-->
<template>
  <div class="solicitation-user">
    <div
      class="solicitation-user-head"
      :style="{border: users.length ? null : 0}"
    >
      {{ users.length }} 人接令
    </div>
    <div class="solicitation-user-body">
      <a v-prefix
        v-for="(user, index) in users"
        :key="index"
        :href="`/user/${user.username}`"
        :target="`/user/${user.username}`"
        role="button"
        class="user"
        :class="{'user-select': user.status}"
      >
        <base-avatar
          :alt="user.username"
          :href="`/user/${user.username}`"
          :target="`/user/${user.username}`"
          :src="user.avatar"
          :size="45"
        />
        <div class="nickname">
          {{ user.nickname }}
        </div>
        <div
          class="icon"
          v-if="user.status"
        >
          <i class="iconfont blog-right"></i>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';

/**
 * @description: 征集令接令用户组件
 * @param {Array} users 接取征集令用户列表 `必传参数`
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'solicitationUser',
  components: {
    BaseAvatar,
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.solicitation-user {
  width: 700px;
  @include flex(center, center, column);
  background-color: $grey-0;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;
  margin-bottom: 6px;

  .solicitation-user-head {
    height: 54px;
    width: 700px;
    padding: 12px 20px;
    box-sizing: border-box;
    border-bottom: 1px solid $grey-3;
    @include flex(center);
    font-size: 16px;
    color: $grey-10;
    font-weight: 700;
  }

  .solicitation-user-body {
    width: 664px;
    padding: 0 13px 20px 23px;
    @include flex();
    flex-wrap: wrap;

    .user {
      width: 73px;
      height: 73px;
      margin-right: 10px;
      margin-top: 20px;
      @include flex(center, center, column);
      position: relative;

      &:hover {
        .nickname {
          color: $grey-10;
        }

        .icon {
          color: $green-2;
        }
      }

      .nickname {
        width: 100%;
        height: 20px;
        margin-top: 8px;
        font-size: 14px;
        color: $grey-7;
        line-height: 20px;
        text-align: center;
        transition: 0.25s;
        @include ellipsis(1);
      }

      &.user-select {
        &:hover .nickname {
          color: $green-2;
        }

        .nickname {
          color: $green-1;
        }
      }

      .icon {
        position: absolute;
        top: 0;
        right: 0;
        width: 12px;
        height: 12px;
        color: $green-1;
        transition: 0.25s;

        .iconfont {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
