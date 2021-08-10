<!--
 * @Description:Message的子组件MessageTop
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-07-30 00:58:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-08-09 16:35:51
-->
<template >
  <div class="message-top">
    <span class="message-top-title">
      {{messagetag}}
    </span>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
/**
 * @description: Message的子组件MessageTop
 * @param {*}
 * @return {*}
 * @author: Z_Y_C
 */
export default defineComponent({
  name: 'messageTop',
  props: {
    messagetag: String, //父组件传递的页面名称数据
  },
  setup(props, context) {
    return {};
  },
});
</script>

<style lang="scss" spoced>
$border-radius0: $border-radius-0;
$shadow0: $shadow-0;
$grey0: $grey-0;
$grey7: $grey-7;

.message-top {
  width: 960px;
  height: 42px;
  background-color: $grey0;
  border-radius: $border-radius0;
  box-shadow: $shadow0;
  padding: 0 16px;
  margin: 10px 10px 0 10px;
  display: flex;

  .message-top-title {
    line-height: 42px;
    font-size: 17px;
    color: $grey7;
  }
}
</style>
