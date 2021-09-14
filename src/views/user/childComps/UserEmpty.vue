<!--
 * @Description:权限关闭显示
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-14 10:30:06
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-14 10:59:29
-->
<template>
  <div class="user-empty">
    <base-svg
      svg="no-permission"
      :color="styles.green0"
    />
    <div
      :style="{color:styles.green0}"
      class="user-empty-text"
    >主人未开启权限哦~</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseSvg from '@/components/content/baseSvg/BaseSvg.vue';
import styles from '@/assets/style/define.scss';

/**
 * @description: 权限关闭显示
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'userEmpty',
  components: {
    BaseSvg,
  },
  setup() {
    return { styles };
  },
});
</script>

<style lang="scss" scoped>
.user-empty {
  width: 890px;
  @include flex(center, center, column);
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;
  background-color: $grey-0;

  .user-empty-text {
    margin-bottom: 24px;
  }
}
</style>
