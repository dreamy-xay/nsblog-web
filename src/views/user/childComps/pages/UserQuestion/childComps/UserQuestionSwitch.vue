<!--
 * @Description: 用户主页问答记录数据组件
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-17 19:34:19
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-17 20:14:59
-->

<template>
  <div
    class="user-question-switch"
    v-if="(privacy || isSelf) && data.length"
  >

  </div>

  <user-null
    v-else
    :select="self ? true : privacy"
  />

</template>
<script>
import { defineComponent } from 'vue';
import UserNull from '@/views/user/childComps/UserNull.vue';

/**
 * @description: 用户主页问答记录数据组件
 * @param {Array} data 数据 `默认为[]`
 * @param {Boolean} self 是否是自己登录 `默认为false`
 * @param {Boolean} privacy 是否为隐私设置 `默认为false`
 * @author: Z_Y_C
 */
export default defineComponent({
  name: 'userQuestionSwitch',
  components: {
    UserNull,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    self: {
      type: Boolean,
      default: false,
    },
    privacy: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.user-question-switch {
  width: 100%;
}
</style>
