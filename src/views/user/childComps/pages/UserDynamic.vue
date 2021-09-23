<!--
 * @Description: 用户主页动态记录
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:24:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-17 20:40:55
-->
<template>
  <div
    class="user-dynamic"
    v-if="(privacySetting.view_dynamic || isSelf) && data.length  "
  >
    <div
      v-for="(item , index) in data"
      :key="index"
      class="user-dynamic-context"
    >123</div>

    <div
      role="button"
      class="user-dynamic-button"
      @click="add"
    >加载更多...</div>
  </div>
  <user-null
    v-else
    :select="isSelf ? true : Boolean(privacySetting.view_dynamic)"
  />

</template>

<script>
import { defineComponent, reactive } from 'vue';
import { mapState } from '@/util/store';
import UserNull from '@/views/user/childComps/UserNull.vue';
import { useRoute } from 'vue-router';
import { getDynamic } from '@/network/api/dynamic';

/**
 * @description: 用户主页动态记录
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userDynamic',
  components: {
    UserNull,
  },
  setup() {
    const data = reactive([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    const route = useRoute();
    const username = route.params.username;
    const { tokenInfo } = mapState('global', ['tokenInfo']);
    const isSelf = username === tokenInfo.value.username;
    const limit = 10;

    getDynamic(username, 0, limit).then((data) => {
      console.log(data);
    });

    function add() {
      data.push(1);
      data.push(1);
      data.push(1);
      data.push(1);
      data.push(1);
      data.push(1);
      data.push(1);
      data.push(1);
    }
    return { data, ...mapState('user', ['privacySetting']), add, isSelf };
  },
});
</script>

<style lang="scss" scoped>
.user-dynamic {
  width: 100%;
  @include flex(center, center, column);
  .user-dynamic-context {
    width: 858px;
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    background-color: $grey-0;
    margin-bottom: 16px;
    padding: 16px;
  }

  .user-dynamic-button {
    @include flex(center, center, column);
    width: 300px;
    height: 30px;
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    background-color: $grey-0;
    font-size: 14px;
    color: $grey-9;

    &:hover {
      color: $grey-10;
      background-color: $grey-1;
    }
  }
}
</style>
