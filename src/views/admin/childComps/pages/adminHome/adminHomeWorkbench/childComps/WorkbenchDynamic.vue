<!--
 * @Description: 工作台草稿台
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2023-03-21 18:37:33
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-21 18:37:33
-->
<template>
  <div class="workbench-draft">

  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 工作台草稿台
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'workbenchDraft',
});
</script>

<style lang="scss" scoped>
.workbench-draft {
  margin-top: 16px;
  height: 354px;
  width: 100%;
  border-radius: $border-radius-1;
  background-color: $grey-0;
}
</style>
