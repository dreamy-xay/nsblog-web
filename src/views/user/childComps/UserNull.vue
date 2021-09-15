<!--
 * @Description: 内容为空显示
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-15 19:44:13
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-15 20:31:59
-->
<template>
  <div class="user-null">
    <div
      class="user-empty"
      v-if="select"
    >
      <base-svg
        svg="data-empty"
        :color="styles.green0"
        :style="{transform: 'scale(1.5)'}"
      />
      <div
        class="user-empty-text"
        :style="{color:styles.green0}"
      >{{message===null ? '内容为空哦~' : message}}</div>
    </div>

    <div
      class="user-prohibit-view"
      v-else
    >
      <base-svg
        svg="no-permission"
        :color="styles.green0"
      />
      <div
        :style="{color:styles.green0}"
        class="user-prohibit-view-text"
      >{{message===null ? '主人未开启权限哦~' : message}}</div>
    </div>
  </div>
</template>

<script >
import { defineComponent } from 'vue';
import BaseSvg from '@/components/content/baseSvg/BaseSvg.vue';
import styles from '@/assets/style/define.scss';

/**
 * @description: 内容为空显示
 * @param {Boolean} select 显示的页面 true 页面数据为空，false 未开启权限 `必传参数`
 * @param {String} message 显示为空页面需要显示的内容 `默认为 null`
 * @author: Z_Y_C
 */
export default defineComponent({
  name: 'userNull',
  components: { BaseSvg },
  props: {
    select: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      default: null,
    },
  },
  setup() {
    return { styles };
  },
});
</script>

<style lang="scss" scoped>
.user-null {
  .user-empty {
    width: 890px;
    height: 400px;
    @include flex(center, center, column);
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    background-color: $grey-0;

    .user-empty-text {
      margin-bottom: 24px;
      font-size: 20px;
    }
  }

  .user-prohibit-view {
    width: 890px;
    height: 500px;
    @include flex(center, center, column);
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    background-color: $grey-0;

    .user-prohibit-view-text {
      margin-bottom: 90px;
      font-size: 20px;
    }
  }
}
</style>
