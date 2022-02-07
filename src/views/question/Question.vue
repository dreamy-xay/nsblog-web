<!--
 * @Description: 问答模块
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-25 11:07:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-29 15:42:22
-->
<template>
  <div class="question">
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 问答模块
 * @author: clq
 */

export default defineComponent({
  name: 'question',
});
</script>

<style lang="scss" scoped>
.question {
  width: 100%;
}
</style>
