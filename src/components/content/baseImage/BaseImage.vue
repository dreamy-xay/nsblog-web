<!--
 * @Description: 基本图片组件
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-27 11:55:25
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-27 18:09:44
-->
<template>
  <div
    class="base-image"
    :style="imageStyle"
  >
    <img
      :src="src"
      :alt="alt"
      @load="load"
      @error="error"
    >
    <div
      class="base-image-loading"
      v-if="!imageSrc"
    >
      <component :is="`BaseImageLoading${loading}`" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import BaseImageLoading0 from '@/components/content/baseImage/childComps/BaseImageLoading0.vue';
import BaseImageLoading1 from '@/components/content/baseImage/childComps/BaseImageLoading1.vue';

/**
 * @description: 基本图片组件
 * @param {String} src 图片头像的资源地址 `必传参数`
 * @param {String} alt 描述图像的替换文本 `默认为null`
 * @param {Object} style 头像风格样式 `默认为null`
 * @param {Number | String} loading 加载过程中显示图片或者动画，动画请看子组件下loading编号 `默认为 0`
 * @param {String} loadError 加载失败显示图片 `默认为 null`
 * @event load 图片加载完成触发 (e) => {}
 * @event error 图片加载失败触发 (e) => {}
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseImage',
  components: {
    BaseImageLoading0,
    BaseImageLoading1,
  },
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: null,
    },
    style: {
      type: Object,
      defalut: null,
    },
    loading: {
      type: [Number, String],
      default: 0,
    },
    loadError: {
      type: String,
      default: null,
    },
  },
  setup(props, context) {
    const imageSrc = ref(typeof props.loading === 'number' ? null : props.loading); // 是否显示图片

    // 计算样式
    const imageStyle = computed(() => {
      const customStyle = imageSrc.value ? { backgroundImage: `url(${imageSrc.value})` } : {};
      return {
        ...customStyle,
        ...props.style,
      };
    });

    /**
     * @description: 图片加载完成
     * @param {any} e window事件 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function load(e) {
      imageSrc.value = props.src;
      context.emit('load', e);
    }

    /**
     * @description: 图片加载失败
     * @param {any} e window事件 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function error(e) {
      imageSrc.value = props.loadError;
      context.emit('error', e);
    }

    return {
      imageSrc,
      imageStyle,
      load,
      error,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-image {
  overflow: hidden;
  user-select: none;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: transparent;

  img {
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .base-image-loading {
    position: absolute;
    background-color: transparent;
    left: 0;
    top: 0;
    z-index: 1;
    @include flex(center, center);
    width: 100%;
    height: 100%;
  }
}
</style>
