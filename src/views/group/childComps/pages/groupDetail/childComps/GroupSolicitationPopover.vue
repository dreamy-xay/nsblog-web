<!--
 * @Description: 创建学习小组
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-29 16:58:20
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-29 17:11:29
-->
<template>
  <n-modal
    display-directive="show"
    :show="modelValue"
  >
    <div class="group-solicitation-popover">

    </div>
  </n-modal>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description:
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'groupSolicitationPopover',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.group-solicitation-popover {
  width: 500px;
  height: 557px;
  background-color: $grey-0;
}
</style>
