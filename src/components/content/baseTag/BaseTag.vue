<!--
 * @Description: 基本标签样式
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-06 11:24:26
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-15 16:14:15
-->

<template>
  <div
    class="base-tag"
    :style="tagStyle"
    @mouseenter="hover(true)"
    @mouseleave="hover(false)"
    @click="tagClick"
    :role="href ? 'button' : null"
  >
    {{text}}
    <slot></slot>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';

/**
 * @description: 基本标签样式
 * @param {Number} size 标签大小 `默认为22`
 * @param {String} color 标签颜色 `默认为null`
 * @param {String} hoverColor 鼠标hover后标签颜色 `默认为null`
 * @param {Boolean} hollow 标签是否镂空 `默认为false`
 * @param {String} text 标签内容 `默认为''`
 * @param {Object} style 标签重写样式 `默认为null`
 * @param {String} href 点击标签跳转链接 `默认为null 不跳转`
 * @param {String} target 点击标签跳转目标 `默认为 _blank`
 * @event hover 标签hover事件，接收一个参数isEnter，isEnter为true事鼠标进入标签内
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseTag',
  props: {
    size: {
      type: Number,
      default: 22,
    },
    color: {
      type: String,
      default: null,
    },
    hoverColor: {
      type: String,
      default: null,
    },
    hollow: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    },
    style: {
      type: Object,
      default: null,
    },
    href: {
      type: String,
      default: null,
    },
    target: {
      type: String,
      default: null,
    },
  },
  setup(props, context) {
    const isHover = ref(false); // 鼠标是否hover

    // 计算 tagStyle
    const tagStyle = computed(() => {
      const color = isHover.value ? (props.hoverColor ? props.hoverColor : props.color) : props.color;
      return {
        height: props.size + 'px',
        fontSize: props.size * 0.55 + 'px',
        lineHeight: props.size - 2 + 'px',
        padding: '0 ' + props.size * 0.23 + 'px',
        color: props.hollow ? color : '#ffffff',
        border: '1px solid ' + color,
        backgroundColor: props.hollow ? 'transparent' : color,
        ...props.style,
      };
    });

    /**
     * @description: hover 事件
     * @param {boolean} isEnter 鼠标是否进入标签
     * @return {void}
     * @author: dreamy-xay
     */
    function hover(isEnter) {
      isHover.value = isEnter;
      context.emit('hover', isEnter);
    }

    /**
     * @description: 点击标签触发
     * @return {void}
     * @author: dreamy-xay
     */
    function tagClick() {
      if (props.href) window.open(props.href, props.target);
    }

    return {
      tagStyle,
      hover,
      tagClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-tag {
  display: inline-flex;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 5px;
  user-select: none;
  transition: 0.25s;
}
</style>
