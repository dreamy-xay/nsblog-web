<!--
 * @Description: 登录日志界面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-24 18:17:15
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-24 19:24:18
-->
<template>
  <n-modal
    display-directive="show"
    :show="true"
  >

    <div class="user-center-login">
      <div class="user-center-login-title">

      </div>
    </div>
  </n-modal>
</template>
<script>
import { defineComponent } from 'vue';

/**
 * @description:登录日志界面
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'userCenterAccountLoginRecord',
  setup(props, context) {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.user-center-login {
  width: 597px;
  height: 493px;
  background-color: $grey-0;
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;
  padding: 24px;
}
</style>
