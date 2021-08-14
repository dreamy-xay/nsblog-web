<!--
 * @Description:消息为空时显示的界面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-08-09 11:39:28
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-08-13 23:07:28
-->
<template>
  <div class="message-empty">
    <base-svg
      svg="message-empty"
      :color="styles.green1"
    ></base-svg>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseSvg from '@/components/content/baseSvg/BaseSvg.vue';
import styles from '@/assets/style/define.scss';

/**
 * @description: 消息为空时显示的界面
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'messageEmpty',
  components: {
    BaseSvg,
  },
  setup() {
    return {
      styles,
    };
  },
});
</script>

<style lang="scss" scoped>
$border-radius0: $border-radius-0;
$shadow0: $shadow-0;
$grey0: $grey-0;

.message-empty {
  width: 920px;
  height: 271px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  padding: 24px 36px;
  background-color: $grey0;
  border-radius: $border-radius0;
  box-shadow: $shadow0;
}
</style>
