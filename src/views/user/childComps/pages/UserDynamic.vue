<!--
 * @Description: 用户主页动态记录
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:24:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-14 10:43:54
-->
<template>
  <div
    class="user-dynamic"
    v-if="privacySetting.view_dynamic"
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
  <div v-else>
    <user-empty />
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { mapState } from '@/util/store';
import UserEmpty from '@/views/user/childComps/UserEmpty.vue';

/**
 * @description: 用户主页动态记录
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userDynamic',
  components: {
    UserEmpty,
  },
  setup() {
    const data = reactive([0, 1, 2, 3, 4, 5, 6, 7, 8]);
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
    return { data, ...mapState('user', ['privacySetting']), add };
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
      background-color: $green-0;
      box-shadow: $shadow-2;
      color: $grey-0;
    }
  }
}
</style>
