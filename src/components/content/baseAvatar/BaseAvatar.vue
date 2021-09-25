<!--
 * @Description: 基础头像
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-19 11:26:49
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-25 18:48:58
-->
<template>
  <div
    class="base-avatar"
    :style="avatarStyle"
    @click.stop="click"
  >
    <slot v-if="slot"></slot>
    <img
      :src="src"
      :alt="alt"
      @load="load"
      @error="error"
      v-else
    />
  </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import styles from '@/assets/style/define.scss';

/**
 * @description: 基础头像
 * @param {String} src 图片头像的资源地址 `必传参数`
 * @param {String} alt 描述图像的替换文本 `默认为null`
 * @param {String} fit 当展示类型为图片的时候，设置图片如何适应容器框 [contain / cover / none] `默认为 'cover'`
 * @param {String} shape 设置头像的形状 [circle / square] `默认为'circle'`
 * @param {String} href 点击后跳转的链接，同a标签 `默认为null，不跳转`
 * @param {String} target 跳转连接时目标，同a标签 `默认为_blank`
 * @param {Number | String} size 设置头像的大小，类型为Number时单位为px `默认为50`
 * @param {Boolean} slot 是否启用内置插槽，将不再显示图片 `默认为false`
 * @param {Object} style 头像风格样式 `默认为null`
 * @param {String} loadingImg 加载过程中显示图片 `默认为 '/home/avatarLoading.gif'`
 * @param {String} loadErrorImg 加载失败显示图片 `默认为 '/home/avatarLoadError.png'`
 * @event load 图片加载完成触发 (e) => {}
 * @event error 图片加载失败触发 (e) => {}
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseAvatar',
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: null,
    },
    fit: {
      type: String,
      default: 'cover',
    },
    shape: {
      type: String,
      default: 'circle',
    },
    href: {
      type: String,
      default: null,
    },
    target: {
      type: String,
      default: '_blank',
    },
    size: {
      type: [Number, String],
      default: 50,
    },
    slot: {
      type: Boolean,
      default: false,
    },
    style: {
      type: Object,
      defalut: null,
    },
    loadingImg: {
      type: String,
      default: '/home/avatarLoading.gif',
    },
    loadErrorImg: {
      type: String,
      default: '/home/avatarLoadError.png',
    },
  },
  setup(props, context) {
    const avatar = ref(props.slot ? 'none' : props.loadingImg); // 真正显示头像路径
    // 计算样式
    const avatarStyle = computed(() => {
      const size = typeof props.size === 'number' ? props.size + 'px' : props.size;
      return {
        width: size,
        height: size,
        borderRadius: props.shape === 'circle' ? '50%' : styles.borderRadius0,
        backgroundImage: `url(${avatar.value})`,
        backgroundSize: props.fit,
        cursor: props.href ? 'pointer' : 'inherit',
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
      avatar.value = props.src;
      context.emit('load', e);
    }

    /**
     * @description: 图片加载失败
     * @param {any} e window事件 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function error(e) {
      avatar.value = props.loadErrorImg;
      context.emit('error', e);
    }

    /**
     * @description: 点击跳转路由
     * @return {void}
     * @author: dreamy-xay
     */
    function click() {
      if (props.href) window.open(props.href, props.target);
    }

    return {
      avatarStyle,
      load,
      error,
      click,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-avatar {
  overflow: hidden;
  user-select: none;

  img {
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>
