<!--
 * @Description:
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-10 09:23:58
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-10 10:06:34
-->
<template>
  <div class="user-info-information">
    <div class="user-info-achievement-title"> 基本信息</div>

    <div></div>

  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'userInfoInformation',
  props: {
    data: {
      type: Object,
      required: true,
    },
    self: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, context) {
    const menusData = [];
    return {};
  },
});
</script>

<style lang="scss" scoped>
.user-info-information {
  width: 100%;
  @include flex(initial, center, column);

  .user-info-achievement-title {
    margin-left: 16px;
    font-size: 16px;
    font-weight: 700;
    color: $grey-11;
    line-height: 21px;
  }
}
</style>
