<!--
 * @Description:
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-06-28 19:45:49
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-07-01 21:03:17
-->
<template>
  <div class="admin-tools-eye-dropper">
    <div class="color-select">
      <n-color-picker
        :modes="[hex]"
        placement="bottom"
        :swatches="[
      '#000000',
      '#1890ff',
      '#4a9afd',
      '#4bd8aa',
      '#85e8c7',
      '#FFFFFF'
    ]"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

/**
 * @description:
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'adminToolsTyeDropper',
  setup() {
    const show = ref(false);

    return {
      show,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-tools-eye-dropper {
  width: 100%;
  @include flex(center, center);

  .color-select {
    width: 300px;
  }
}
</style>
