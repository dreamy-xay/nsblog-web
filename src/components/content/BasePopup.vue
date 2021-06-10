<!--
 * @Description: 基本弹出框
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-10 20:05:05
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-10 23:04:54
-->

<template>
  <div
    class="base-popup"
    :class="{'base-popup-show': show, 'base-popup-hover': isCloseHover && show}"
    :style="{background: background, 'z-index': zIndex >= 100 ? zIndex : 100, height: height + 'px', width: width + 'px', top: 'calc(50% - ' + height / 2 + 'px)', left: 'calc(50% - ' + width / 2 + 'px)'}"
  >
    <div class="base-popup-inner">
      <div
        class="base-popup-close close-hover"
        role="button"
        @mouseenter="closeHover(true)"
        @mouseleave="closeHover(false)"
        @click="$emit('close')"
      >
        <i
          class="iconfont blog-close"
          :style="{'color': isCloseHover ? closeActiveColor : closeColor}"
        ></i>
      </div>
      <div
        class="base-popup-title"
        :style="{color: titleTextColor}"
      >{{title}}</div>
      <div class="base-popup-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * @description: 基本弹出框
 * @param {String} title 弹出框标题 `必传参数`
 * @param {String} titleTextColor 弹出框标题颜色 `默认为#000000`
 * @param {String} background 弹出框背景 `默认为#ffffff`
 * @param {Boolean} show 弹出框是否显示 `默认为false`
 * @param {Number} zIndex 弹出框z-index `默认为100，必须大于100`
 * @param {Number} height 弹出框高度 `默认为600`
 * @param {Number} width  弹出框宽度 `默认为500`
 * @param {String} closeColor 弹出框关闭按钮颜色 `默认为#b4b4b4`
 * @param {String} closeActiveColor 弹出框关闭按钮激活时颜色 `默认为#302e2e`
 * @event close 点击关闭按钮时触发
 * @author: dreamy-xay
 */

export default {
  name: 'basePopup',
  props: {
    title: {
      type: String,
      required: true,
    },
    titleTextColor: {
      type: String,
      default: '#000000',
    },
    background: {
      type: String,
      default: '#ffffff',
    },
    show: {
      type: Boolean,
      default: true,
    },
    zIndex: {
      type: Number,
      default: 100,
    },
    height: {
      type: Number,
      default: 500,
    },
    width: {
      type: Number,
      default: 600,
    },
    closeColor: {
      type: String,
      default: '#b4b4b4',
    },
    closeActiveColor: {
      type: String,
      default: '#302e2e',
    },
  },
  data() {
    return {
      isCloseHover: false,
    };
  },
  methods: {
    closeHover(isHover: boolean) {
      (this as any).isCloseHover = isHover;
    },
  },
};
</script>

<style lang="scss" scoped>
.base-popup {
  position: fixed;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.2) 0 10px 20px;
  transform: rotate3d(1, 1, 0, 90deg);
  transition: all 0.4s;
  opacity: 0;
  display: none;

  &.base-popup-show {
    opacity: 1;
    animation: popupShow 0.4s;
    transform: none;
    display: block;

    @keyframes popupShow {
      0% {
        transform: rotate3d(1, 1, 0, 90deg);
      }
      70% {
        transform: rotate3d(1, 1, 0, -10deg);
      }
      100% {
        transform: none;
      }
    }
  }

  &.base-popup-hover {
    transform: rotate3d(1, 1, 0, 15deg);
  }

  .base-popup-inner {
    margin: 40px 70px;
    width: calc(100% - 140px);
    height: calc(100% - 80px);
    overflow: hidden;

    .base-popup-close {
      z-index: 99;
      position: absolute;
      top: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;

      .iconfont {
        font-size: 18px;
        transition: 0.25s;
      }
    }

    .base-popup-title {
      float: left;
      font-size: 25px;
      width: 100%;
      height: 25px;
      margin-bottom: 25px;
    }

    .base-popup-content {
      float: left;
      width: 100%;
      height: calc(100% - 50px);
      overflow-x: hidden;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        width: 0;
        opacity: 0;
      }
    }
  }
}
</style>
