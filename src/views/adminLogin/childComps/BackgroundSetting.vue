<!--
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-10 21:55:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-19 13:33:17
-->
<template>
  <div class="background-setting">
    <base-popup
      :show="popShow"
      @close="close"
      title="背景图像偏好"
    >
    </base-popup>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
/**
 * @description:
 * @param {Boolean} show 背景设置弹出框是否显示 `必传参数`
 * @author: dreamy-xay
 */

import basePopup from '@/components/content/BasePopup.vue';
export default Vue.extend({
  name: 'backgroundSetting',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    show(isShow: boolean) {
      if (isShow) this.popShow = true;
    },
  },
  data() {
    return {
      popShow: this.show,
    };
  },
  methods: {
    close() {
      this.popShow = false;
    },
  },
  components: {
    basePopup,
  },
});
</script>

<style lang="scss" scoped>
</style>
