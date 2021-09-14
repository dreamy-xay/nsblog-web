<!--
 * @Description: 用户主页收藏记录
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:24:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-14 12:04:42
-->
<template>
  <div class="user-collection">
    <div
      v-for="(item , index) in collectionData"
      :key=index
      class="usr-collection-context"
    >123</div>
  </div>
</template>

<script>
import { getFavorites } from '@/network/api/favorites';
import { defineComponent, reactive } from 'vue';
import { useRoute } from 'vue-router';

/**
 * @description: 用户主页收藏记录
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userCollection',
  setup() {
    const route = useRoute();
    const collectionData = reactive([]);
    const username = route.params.username; // 获取路由的username

    getFavorites(username, 5, 0).then((data) => {
      collectionData.splice(0, 0, ...data.favorites);
      console.log(collectionData);
    });
    return { collectionData };
  },
});
</script>

<style lang="scss" scoped>
.user-collection {
  width: 100%;
  @include flex(initial, center, column);
  .usr-collection-context {
    height: 56px;
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    background-color: $grey-0;
    margin-bottom: 16px;
    padding: 16px;
  }
}
</style>
