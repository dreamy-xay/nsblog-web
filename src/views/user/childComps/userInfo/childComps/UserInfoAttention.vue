<!--
 * @Description: 用户中心左侧关注信息
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-07 20:15:50
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-07 20:18:00
-->
<template>
  <div class="user-info-attention">
    <div class="user-info-attention-ok">关注了</div>
    <div class="user-info-attention-be">关注者</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'useerInfoAttention',
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.user-info-attention {
  @include flex();
  margin: 16px 0;

  .user-info-attention-ok {
  }
}
</style>
