<!--
 * @Description:
 * @Version:
 * @Autor: Ban
 * @Date: 2021-09-14 19:08:58
 * @LastEditors: Ban
 * @LastEditTime: 2021-09-16 20:34:58
-->
<template>
  <div>
    <div>邮箱</div>
    <user-center-input
      placeholder="邮箱"
      v-model="oldData"
      clearable
      class="input"
    >
    </user-center-input>
    <div>验证码</div>
    <user-center-input
      placeholder="验证码"
      v-model="newData1"
      :clearable="true"
      class="input"
      style="width: 200px; margin-right: 20px"
    >
    </user-center-input>
    <el-button>发送验证码</el-button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'UserCenterAccountEmail',
  setup() {
    return {};
  },
});
</script>

<style lang='scss' scoped>
</style>
