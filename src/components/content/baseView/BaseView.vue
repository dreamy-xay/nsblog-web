<!--
 * @Description: 基本页面框架
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-05 11:51:03
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-27 12:54:34
-->
<template>
  <div
    class="base-view"
    :style="{height: height + 'px', width: width + 'px'}"
  >
    <el-scrollbar
      @scroll="scroll($event, true)"
      class="base-view-scrollbar"
    >
      <div class="base-view-container">
        <base-background v-if="background" />
        <base-top-bar
          v-if="topBar"
          ref="topBarRef"
        />
        <div
          class="base-view-inner"
          :style="{height: innerHeight + 'px'}"
        >
          <el-scrollbar
            @scroll="scroll($event, false)"
            class="base-view-scrollbar"
          >
            <div
              class="inner"
              ref="innerRef"
            >
              <div>
                <div :class="bindClass">
                  <slot></slot>
                </div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import BaseBackground from '@/components/content/baseBackground/BaseBackground.vue';
import BaseTopBar from '@/components/content/baseTopBar/BaseTopBar.vue';

/**
 * @description: 基本页面框架
 * @param {Boolean} background 是否启用背景颜色 `默认为false,不启用`
 * @param {Boolean} topBar 是否启用topBar `默认为false,不启用`
 * @param {String} bindClass 绑定类 `默认为null`
 * @param {Number} scrollDelay 滚动条触发底部最长延时 `默认200ms`
 * @param {Number} scrollDistance 触发加载的距离阈值，单位为px `默认0.8px`
 * @param {Boolean} scrollDisabled 是否禁用滚动底部触发 `默认不禁用`
 * @event scroll 滚动监听事件，回调参数{scrollTop, scrollLeft}
 * @event scrollToBottom 滚动到底部触发事件，无回调参数
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseView',
  props: {
    background: {
      type: Boolean,
      default: false,
    },
    topBar: {
      type: Boolean,
      default: false,
    },
    bindClass: {
      type: String,
      default: null,
    },
    scrollDelay: {
      type: Number,
      default: 200,
    },
    scrollDistance: {
      type: Number,
      default: 0.8,
    },
    scrollDisabled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    BaseTopBar,
    BaseBackground,
  },
  setup(props, context) {
    const width = ref(document.body.offsetWidth); // 容器宽度设置
    const height = ref(document.body.offsetHeight); // 容器高度设置
    const innerRef = ref(null); // inner ref
    const innerHeight = ref(height.value); // 内部容器高度设置
    const topBarRef = ref(null); // topBar的ref
    let topBarHeight = 0; // 获取topBar高度

    // dom加载完毕后执行
    onMounted(() => {
      if (props.topBar) {
        topBarHeight = topBarRef.value.$el.offsetHeight;
        innerHeight.value -= topBarHeight;
      }
    });

    // 监听窗口变化
    window.onresize = function () {
      width.value = document.body.offsetWidth;
      height.value = document.body.offsetHeight;
      innerHeight.value = height.value - topBarHeight;
    };

    let scrollLeft = 0; // 滚动条位置
    let scrollTop = 0;
    let timer = null; // 到底触发计时器

    /**
     * @description: 滚动事件监听
     * @param {object} e 滚动事件回调参数 `默认组件`
     * @param {boolean} hasLeft 滚动是否 scrollLeft 生效
     * @return {void}
     * @author: dreamy-xay
     */
    function scroll(e, hasLeft) {
      if (hasLeft) scrollLeft = (e.scrollLeft / 100) * width.value;
      else scrollTop = (e.scrollTop / 100) * innerHeight.value;
      context.emit('scroll', { scrollTop, scrollLeft });
      if (
        !props.scrollDisabled &&
        !timer &&
        scrollTop + innerHeight.value >= innerRef.value.offsetHeight - props.scrollDistance
      ) {
        context.emit('scrollToBottom');
        timer = setTimeout(() => {
          timer = null;
        }, props.scrollDelay);
      }
    }

    return {
      innerHeight,
      topBarRef,
      innerRef,
      width,
      height,
      scroll,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-view {
  overflow: hidden;

  :deep(.base-view-scrollbar > div > div.el-scrollbar__thumb) {
    background-color: $grey-10;
  }

  .base-view-container {
    width: 100%;
    height: 100%;
    min-width: 1154px;
    overflow: hidden;

    .base-view-inner {
      width: 100%;
      overflow: hidden;

      .inner {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        overflow: hidden;

        & > div {
          padding: 0 6px;
          width: 1142px;
          display: inline-block;
        }
      }
    }
  }
}
</style>
