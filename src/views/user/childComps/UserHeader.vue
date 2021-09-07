<!--
 * @Description: 用户中心头部
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 18:05:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-07 20:29:44
-->
<template>
  <div class="user-header">
    <div class="user-header-left">
      <base-avatar
        :src="data.avatar"
        :alt="data.username"
        shape="square"
        :size="80"
      />
      <div class="info">

      </div>
    </div>
    <div class="user-header-right">

    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';

/**
 * @description: 用户中心头部
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userHeader',
  components: {
    BaseAvatar,
  },
  props: {
    data: {
      type: Object,
      default() {
        return {
          avatar: 'https://dummyimage.com/150x150/234567/FFFFFF.png?text=dreamy',
          username: 'dreamy',
          nickname: '破釜沉舟',
        };
      },
    },
  },
});
</script>

<style lang="scss" scoped>
.user-header {
  width: calc(100% - 16px);
  height: 80px;
  padding: 8px;
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;
  background-color: $grey-0;
  @include flex(center, space-between);

  .user-header-left {
    height: 100%;

    .info {
      margin-left: 24px;
    }
  }

  .user-header-right {
    height: 100%;
  }
}
</style>
