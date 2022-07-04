<!--
 * @Description: 加载动画组件
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-26 20:55:54
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-07-04 15:41:42
-->
<template>
  <div
    class="admin-loading"
    ref="adminLoadingRef"
    :style="{height}"
  >
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue';
import { ElLoading } from 'element-plus';

/**
 * @description: 加载动画组件
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminLoading',
  setup() {
    const adminLoadingRef = ref(null);

    onMounted(() => {
      ElLoading.service({
        target: adminLoadingRef.value,
        text: 'Loading...',
      });
    });

    const height = computed(() => {
      return document.body.clientHeight - 142 + 'px';
    });

    return {
      adminLoadingRef,
      height,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-loading {
  width: 100%;
}
</style>
