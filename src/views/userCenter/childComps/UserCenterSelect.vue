<!--
 * @Description:
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-08-23 19:01:15
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-06 20:38:46
-->
<template>
  <n-popover
    trigger="click"
    :disabled="disabled"
    :show="visible"
    :offset="10"
    placement="bottom"
    class="user-center-select"
  >

    <el-scrollbar max-height="300px">

      <div
        class="user-center-select-content"
        v-for="(item,index) in sdata"
        :key="index"
        :class="item===selectTag ? 'user-center-select-content-ok' : ''"
        @click="changeSelect(index)"
        :style="selectStyle"
      >{{ item }}</div>

    </el-scrollbar>
    <template #trigger>
      <div
        :class="disabled ? 'user-center-select-buttontrue' : 'user-center-select-buttonfalse'"
        :style="selectStyle"
        @click="computedPages"
        v-click-outside="computedPosFalse"
      >
        <div
          class="user-center-select-button-text"
          v-text="selectTag==='' ? showText : selectTag"
        >
        </div>
        <div
          class='iconfont blog-arrow-down user-center-select-button-iconfont'
          :class="rotate ? 'user-center-select-button-iconfont-rotate' : ''"
        ></div>
      </div>
    </template>
  </n-popover>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
/**
 * @description: 选择器组件
 * @param {Number} swidth 选择器宽 `默认为80`
 * @param {Number} spaddingTop 选择器上下padding `默认为6`
 * @param {Number} spaddingLeft 选择器宽左右padding `默认为8`
 * @param {String} showText 在未选择时显示的数据 `默认为'请选择'`
 * @param {String} selectTag 选择的数据 `默认为''`
 * @param {Arrey} sdata 可供选择的数据 `默认为[]`
 * @param {Boolean} disabled 是否禁用 `默认为false`
 * @event changeItem 改变选择数据
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'userCenterSelect',
  emits: ['changeItem'],
  props: {
    swidth: {
      type: Number,
      default: 80,
    },
    spaddingTop: {
      type: Number,
      default: 6,
    },
    spaddingLeft: {
      type: Number,
      default: 8,
    },
    showText: {
      type: String,
      default: '请选择',
    },
    selectTag: {
      type: String,
      default: '',
    },
    sdata: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const rotate = ref(false); // 旋转
    const visible = ref(false); // 显示

    //加载select样式
    const selectStyle = computed(() => {
      return {
        width: props.swidth + 'px',
        padding: `${props.spaddingTop}px ${props.spaddingLeft}px`,
      };
    });

    /**
     * @description: 点击select外关闭select
     * @return {Void}
     * @author: Z_Y_C
     */

    function computedPosFalse() {
      if (visible.value === true) {
        rotate.value = false;
        visible.value = false;
      }
    }

    /**
     * @description: 点击select按钮
     * @return {Void}
     * @author: Z_Y_C
     */

    function computedPages() {
      if (visible.value === true) {
        rotate.value = false;
        visible.value = false;
      } else {
        rotate.value = true;
        visible.value = true;
      }
    }

    /**
     * @description: 改变select选择数据
     * @param {Number} index 数据下标
     * @return {Void}
     * @author: Z_Y_C
     */

    function changeSelect(index) {
      context.emit('changeItem', index);
    }

    return {
      selectStyle,
      rotate,
      visible,
      computedPosFalse,
      computedPages,
      changeSelect,
    };
  },
});
</script>

<style lang='scss' scoped>
.user-center-select-content {
  display: flex;
  border-radius: $border-radius-1;
  height: 20px;
  transition: all 0.25s;
  font-size: 14px;
  color: $grey-10;

  &:hover {
    background-color: $green-0;
    color: $grey-0;
  }
}

.user-center-select-content-ok {
  background-color: $green-1;
  color: $grey-0;
}

.user-center-select-buttontrue {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: $grey-0;
  border-radius: $border-radius-1;
  box-shadow: $shadow-0;
  font-size: 14px;
  color: $grey-7;
  transition: all 0.25s;
  user-select: none;

  &:hover {
    cursor: not-allowed;
  }

  .user-center-select-button-text {
    display: flex;
    align-items: center;
    width: calc(100% - 23px);
    height: 20px;
  }

  .user-center-select-button-iconfont {
    display: flex;
    align-items: center;
    margin-left: 5px;
    width: 18px;
    height: 20px;
  }
}

.user-center-select-buttonfalse {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: $grey-0;
  border-radius: $border-radius-1;
  box-shadow: $shadow-0;
  font-size: 14px;
  color: $grey-10;
  transition: all 0.25s;
  user-select: none;

  &:hover {
    box-shadow: $shadow-2;
    color: $green-1;
  }

  .user-center-select-button-text {
    display: flex;
    align-items: center;
    width: calc(100% - 23px);
    height: 20px;
  }

  .user-center-select-button-iconfont {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 5px;
    width: 18px;
    height: 20px;
  }

  .user-center-select-button-iconfont-rotate {
    transform: rotate(180deg);
  }
}
</style>

<style lang="scss">
.user-center-select {
  padding: 0 !important;
  box-shadow: $shadow-0 !important;
  border-radius: $border-radius-0 !important;
}

.v-binder-follower-container {
  z-index: 1999 !important;
}
</style>
