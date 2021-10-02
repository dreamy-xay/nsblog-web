<!--
 * @Description: 博客或文章 页面加载条
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-20 16:56:09
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-10-02 10:19:24
-->
<template>
  <div
    class="base-loading-bar"
    :style="{width}"
  >
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, inject } from 'vue';

/**
 * @description: 博客或文章 页面加载条
 * @param {String} injectName 绑定上层 privode 的名字， privode上层滚动容器监听滚动状态 `必传参数`
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseLoadingBar',
  props: {
    injectName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const width = ref('0%'); // 加载条宽度
    const page = inject(props.injectName); // 获取主页面 ref (dom)

    // dom渲染完成
    onMounted(() => {
      // 初始化加载条
      width.value = (page.value.scrollTop / (page.value.scrollHeight - page.value.offsetHeight)) * 100 + '%';

      // 更新加载条
      page.value.addEventListener('scroll', (e) => {
        width.value = (e.target.scrollTop / (e.target.scrollHeight - e.target.offsetHeight)) * 100 + '%';
      });
    });

    return {
      width,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-loading-bar {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2000;
  background-color: $green-1;
  height: 2.5px;
  transition: 0.4s ease;
}
</style>
