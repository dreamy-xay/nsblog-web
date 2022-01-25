<!--
 * @Description:问答页面
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-25 11:07:59
 * @LastEditors: clq
 * @LastEditTime: 2022-01-25 11:17:59
-->
<template>
  <div class="question">
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description:
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
