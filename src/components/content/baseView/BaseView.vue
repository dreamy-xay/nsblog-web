<!--
 * @Description: 基本页面框架
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-05 11:51:03
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-13 21:19:03
-->
<template>
  <div
    class="base-view"
    :style="{height: height + 'px', width: width + 'px'}"
  >
    <el-scrollbar
      @scroll="scroll($event, true)"
      class="base-view-scrollbar"
      ref="scrollbarRowRef"
    >
      <div class="base-view-container">
        <base-background v-if="background" />
        <div
          class="container-top-bar"
          v-resize="resizeListener"
          :style="{top: topBarTop + 'px'}"
        >
          <base-top-bar
            v-if="topBar"
            ref="topBarRef"
          />
          <slot name="top-bar-bottom"></slot>
        </div>
        <div
          class="base-view-inner"
          :style="{height: innerHeight + 'px', marginTop: containerTopBarHeight + 'px', transition: innerTransition}"
        >
          <el-scrollbar
            @scroll="scroll($event, false)"
            class="base-view-scrollbar"
            ref="scrollbarColumnRef"
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
            <base-footer
              v-if="footer"
              :show-all="footerShowAll"
            />
          </el-scrollbar>
        </div>
      </div>
    </el-scrollbar>
    <el-backtop
      v-if="backTop"
      :right="backTopRight"
      :bottom="backTopBottom"
      :visibility-height="backTopVisibilityHeight"
      target=".base-view-inner .el-scrollbar__wrap"
    />
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, nextTick } from 'vue';
import BaseBackground from '@/components/content/baseBackground/BaseBackground.vue';
import BaseTopBar from '@/components/content/baseTopBar/BaseTopBar.vue';
import BaseFooter from '@/components/content/baseFooter/BaseFooter.vue';

/**
 * @description: 基本页面框架
 * @param {Boolean} background 是否启用背景颜色 `默认为false,不启用`
 * @param {Boolean} topBar 是否启用topBar `默认为false,不启用`
 * @param {Boolean} footer 是否启用footer `默认为false,不启用`
 * @param {String} bindClass 绑定类 `默认为null`
 * @param {Number} scrollDelay 滚动条触发底部最长延时 `默认200ms`
 * @param {Number} scrollDistance 触发加载的距离阈值，单位为px `默认200px`
 * @param {Boolean} scrollDisabled 是否禁用滚动底部触发 `默认不禁用`
 * @param {Boolean} backTop 是否启用回顶部按钮 `默认不启用`
 * @param {Number} backTopRight 启用回顶部按钮生效right位置  `默认为40`
 * @param {Number} backTopBottom 启用回顶部按钮生效bottom位置  `默认为40`
 * @param {Number} backTopVisibilityHeight 滚动高度达到此参数值才出现 `默认为200`
 * @param {Boolean} topBarScroll topBar 是否跟随页面滚动而滚动（配合插槽【top-bar-bottom】使用）`默认为false,不启用`
 * @param {Number} topBarScrollLimitHeight topBar 触发滚动的极限高度 `默认为50`
 * @param {Boolean} footerShowAll footer  是否显示全部内容 `默认为true`
 * @event scroll 滚动监听事件，回调参数{scrollTop, scrollLeft}
 * @event scrollToBottom 滚动到底部触发事件，无回调参数
 * @method setScrollTop 设置滚动条到顶部的距离,类型为boolean时:true为滚动到顶部,false为滚动到底部;类型为number时则直接设置高度  (value: boolean | number) => void
 * @slot 全局内容插槽
 * @slot name="top-bar-bottom" 具名插槽，在top-bar下方
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
    footer: {
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
      default: 200,
    },
    scrollDisabled: {
      type: Boolean,
      default: false,
    },
    backTop: {
      type: Boolean,
      default: false,
    },
    backTopRight: {
      type: Number,
      default: 40,
    },
    backTopBottom: {
      type: Number,
      default: 60,
    },
    backTopVisibilityHeight: {
      type: Number,
      default: 200,
    },
    topBarScroll: {
      type: Boolean,
      default: false,
    },
    topBarScrollLimitHeight: {
      type: Number,
      default: 50,
    },
    footerShowAll: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    BaseTopBar,
    BaseBackground,
    BaseFooter,
  },
  setup(props, context) {
    const width = ref(document.body.offsetWidth); // 容器宽度设置
    const height = ref(document.body.offsetHeight); // 容器高度设置
    const innerRef = ref(null); // inner ref
    const innerHeight = ref(height.value); // 内部容器高度设置
    const topBarRef = ref(null); // topBar的ref
    let topBarHeight = 0; // 获取topBar高度
    const containerTopBarHeight = ref(0); // 页面 topBar 真实高度
    const topBarTop = ref(0); // 页面 topBar 距离顶部距离
    const innerTransition = ref('0s'); // 内部容器过渡效果

    // dom加载完毕后执行
    onMounted(() => {
      if (props.topBar) {
        topBarHeight = topBarRef.value.$el.offsetHeight;
        containerTopBarHeight.value = topBarRef.value.$el.parentNode.offsetHeight;
        innerHeight.value = height.value - containerTopBarHeight.value;
      }

      // 初始时取消动画，0.2s后加载
      setTimeout(() => {
        innerTransition.value = '0.2s';
      }, 200);
    });

    /**
     * @description: 监听容器大小变化
     * @return {void}
     * @author: dreamy-xay
     */
    function resizeListener() {
      width.value = document.body.offsetWidth;
      height.value = document.body.offsetHeight;
      containerTopBarHeight.value = topBarRef.value.$el.parentNode.offsetHeight;
      innerHeight.value = height.value - containerTopBarHeight.value;
      nextTick(() => {
        // 更新滚动条
        scrollbarColumnRef.value.update();
        scrollbarRowRef.value.update();
      });
    }

    // 监听窗口变化
    window.onresize = function () {
      resizeListener();
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
      else {
        const thisScrollTop = (e.scrollTop / 100) * innerHeight.value;
        listenrTopBarScroll(thisScrollTop - scrollTop); // 上下滚动时增加监听
        scrollTop = thisScrollTop;
      }
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

    let scrollCache = 0; // 滚动缓存高度
    let scrollCacheClearTimer = null; // 滚动缓存清除器
    /**
     * @description: 监听滚动行为，并做出相应答复
     * @param {Number} scrollValue 本次滚动滚动距离（矢量）`必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function listenrTopBarScroll(scrollValue) {
      if (props.topBarScroll) {
        // 2s 清空一次滚动缓存高度
        if (scrollCacheClearTimer) {
          clearTimeout(scrollCacheClearTimer);
          scrollCacheClearTimer = null;
        }
        scrollCacheClearTimer = setTimeout(() => {
          scrollCache = 0;
          clearTimeout(scrollCacheClearTimer);
          scrollCacheClearTimer = null;
        }, 1000 * 2);

        scrollCache += scrollValue;
        if (Math.abs(scrollCache) >= props.topBarScrollLimitHeight) {
          if (scrollCache > 0) {
            // 向下滚的
            if (topBarTop.value === 0) {
              topBarTop.value = -topBarHeight;
              containerTopBarHeight.value = topBarRef.value.$el.parentNode.offsetHeight - topBarHeight;
              innerHeight.value = height.value - containerTopBarHeight.value;
              setTimeout(() => {
                // 更新滚动条
                scrollbarColumnRef.value.update();
              }, 200);
            }
          } else {
            // 向上滚的
            if (topBarTop.value !== 0) {
              topBarTop.value = 0;
              containerTopBarHeight.value = topBarRef.value.$el.parentNode.offsetHeight;
              innerHeight.value = height.value - containerTopBarHeight.value;
              setTimeout(() => {
                // 更新滚动条
                scrollbarColumnRef.value.update();
              }, 200);
            }
          }
          scrollCache = 0;
        }
      }
    }

    const scrollbarRowRef = ref(null); // 控制左右滚动条 ref
    const scrollbarColumnRef = ref(null); // 控制上下滚动条 ref
    /**
     * @description: 设置滚动条到顶部的距离
     * @param {boolean | number} value 类型为boolean时:true为滚动到顶部,false为滚动到底部;类型为number时则直接设置高度,具体可参考element-plus `默认为false`
     * @return {void}
     * @author: Z_Y_C
     */
    function setScrollTop(value = false) {
      nextTick(() => {
        if (typeof value === 'boolean') {
          if (value) value = 0;
          else value = scrollbarColumnRef.value.wrap.scrollHeight;
        }
        scrollbarColumnRef.value.setScrollTop(value);
      });
    }

    return {
      innerHeight,
      topBarRef,
      innerRef,
      width,
      height,
      scroll,
      topBarHeight,
      scrollbarRowRef,
      scrollbarColumnRef,
      containerTopBarHeight,
      setScrollTop,
      topBarTop,
      innerTransition,
      resizeListener,
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

    .container-top-bar {
      width: 100%;
      z-index: 2000;
      position: fixed;
      @include flex(center, center, column);
      transition: 0.2s;
    }

    .base-view-inner {
      width: 100%;
      transition: 0.2s;
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
        }
      }
    }
  }

  :deep(.el-backtop) {
    background-color: $grey-0;
    color: $green-0;
    transition: 0.25s;

    &:hover {
      background-color: rgba($green-0, 0.05);
      color: $green-1;
    }
  }
}
</style>
