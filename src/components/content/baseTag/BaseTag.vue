<!--
 * @Description: 基本标签样式
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-06 11:24:26
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-18 14:16:30
-->

<template>
  <div
    class="base-tag"
    :style="tagStyle"
    @mouseenter="hover(true)"
    @mouseleave="hover(false)"
  >
    {{text}}
    <slot></slot>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';

/**
 * @description: 基本标签样式
 * @param {Number} size 标签大小 `默认为22`
 * @param {String} color 标签颜色 `默认为null`
 * @param {Boolean} hollow 标签是否镂空 `默认为false`
 * @param {String} text 标签内容 `默认为''`
 * @param {Object} style 标签重写样式 `默认为null`
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
  },
  setup(props, context) {
    // 计算 tagStyle
    const tagStyle = computed(() => {
      return {
        height: props.size + 'px',
        fontSize: props.size * 0.55 + 'px',
        lineHeight: props.size - 2 + 'px',
        padding: '0 ' + props.size * 0.23 + 'px',
        color: props.hollow ? props.color : '#ffffff',
        border: '1px solid ' + props.color,
        backgroundColor: props.hollow ? 'transparent' : props.color,
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
      context.emit('hover', isEnter);
    }

    return {
      tagStyle,
      hover,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-tag {
  display: inline-block;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 5px;
  user-select: none;
}
</style>
