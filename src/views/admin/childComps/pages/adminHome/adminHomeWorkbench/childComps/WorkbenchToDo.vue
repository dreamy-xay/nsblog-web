<!--
 * @Description: 工作台待办事项
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2023-03-21 18:37:04
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-21 18:41:43
-->

<template>
  <div class="workbench-to-do">

  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 工作台待办事项
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'workbenchToDo',
});
</script>

<style lang="scss" scoped>
.workbench-to-do {
  margin-top: 16px;
  height: 318px;
  width: 100%;
  border-radius: $border-radius-1;
  background-color: $grey-0;
}
</style>
