<!--
 * @Description: 颜色工具
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-06-28 19:45:49
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-04-02 17:16:40
-->
<template>
  <admin-view
    class="admin-tools-eye-dropper"
    :loading="loading"
    :style="{height: `calc(100vh - ${pageHeadHeight}px)`}"
  >
    <base-iframe
      name="adminToolsTyeDropper"
      src="https://palettemaker.com/app"
      @load="loading = false"
    />
  </admin-view>
</template>
<script>
import { defineComponent, ref, inject } from 'vue';
import AdminView from '@/views/admin/childComps/AdminView.vue';
import BaseIframe from '@/components/content/baseIframe/BaseIframe.vue';
import { useMessage } from 'naive-ui';

/**
 * @description: 颜色工具
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminToolsTyeDropper',
  components: {
    AdminView,
    BaseIframe,
  },
  setup() {
    const msg = useMessage(); // naive-ui message
    const pageHeadHeight = inject('pageHeadHeight'); // 子页面头部可视范围的高度
    const loading = ref(true); // 是否显示加载动画

    /**
     * @description: 取色按键事件函数
     * @param {KeyboardEvent} e 事件参数 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function coloring(e) {
      //事件对象兼容
      let event = e || window.event || arguments.callee.caller.arguments[0];
      if (event.shiftKey && event.keyCode === 81) {
        msg.destroyAll();
        msg.info('Shift + Q 全屏取色');
        if (window.EyeDropper)
          new window.EyeDropper().open().then((result) => {
            navigator.clipboard
              .writeText(result.sRGBHex)
              .then(() => {
                msg.success(`已复制颜色: ${result.sRGBHex}`);
              })
              .catch(() => {
                msg.error('复制颜色失败');
              });
          });
        else msg.error('该浏览器暂不支持取色');
      }
    }

    // 全局事件监听
    window.addEventListener('keydown', coloring);

    return {
      pageHeadHeight,
      loading,
      coloring,
    };
  },
  unmounted() {
    // 销毁事件
    window.removeEventListener('keydown', this.coloring);
  },
});
</script>

<style lang="scss" scoped>
.admin-tools-eye-dropper {
  overflow: hidden;
  width: 100%;
  background-color: $grey-0;
  margin: 0;
  position: relative;
}
</style>
