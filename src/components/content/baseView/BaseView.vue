<!--
 * @Description: 基本页面框架
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-05 11:51:03
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-05 13:25:06
-->
<template>
  <div
    class="base-view"
    :style="{height: height + 'px', width: width + 'px'}"
  >
    <el-scrollbar :height="height + 'px'">
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
          <el-scrollbar>
            <div class="inner">
              <div :class="bindClass">
                <slot></slot>
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
 * @param {Boolean} background 是否启用背景颜色 `默认为true,启用`
 * @param {Boolean} topBar 是否启用topBar `默认为true,启用`
 * @param {String} bindClass 绑定类 `默认为null`
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseView',
  props: {
    background: {
      type: Boolean,
      default: true,
    },
    topBar: {
      type: Boolean,
      default: true,
    },
    bindClass: {
      type: String,
      default: null,
    },
  },
  components: {
    BaseTopBar,
    BaseBackground,
  },
  setup(props) {
    const width = ref(document.body.offsetWidth); // 容器宽度设置
    const height = ref(document.body.offsetHeight); // 容器高度设置
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

    return {
      innerHeight,
      topBarRef,
      width,
      height,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-view {
  width: 100%;
  height: 100%;
  overflow: hidden;

  ::v-deep(.el-scrollbar__thumb) {
    background-color: $grey-10;
  }

  .base-view-container {
    width: 100%;
    height: 100%;
    min-width: 1442px;
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
          width: 1442px;
          display: inline-block;
        }
      }
    }
  }
}
</style>
