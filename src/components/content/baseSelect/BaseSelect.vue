<!--
 * @Description:
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-08-23 19:01:15
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-04-23 16:19:19
-->
<template>
  <n-popover
    trigger="click"
    display-directive="show"
    :disabled="disabled"
    :raw="true"
    :show="visible"
    placement="bottom"
    class="base-select"
    :style="{marginTop: '10px'}"
  >

    <el-scrollbar max-height="300px">
      <div
        class="base-select-content"
        v-for="(item, index) in sdata"
        :key="index"
        :class="item === selectTag ? 'base-select-content-ok' : ''"
        @click="changeSelect(index)"
        :style="selectStyle"
        role="button"
        v-bind="$attrs"
      >{{ item }}</div>

    </el-scrollbar>
    <template #trigger>
      <div
        :class="disabled ?  'base-select-buttontrue' : (visible ? 'base-select-buttonfalse selcect-click' : 'base-select-buttonfalse')"
        :style="butStyle"
        role="button"
        @click="computedPages"
        v-click-outside="computedPosFalse"
        v-bind="$attrs"
      >
        <div
          class="base-select-button-text"
          v-text="selectTag === '' ? showText : selectTag"
        >
        </div>
        <div
          class='iconfont blog-arrow-down base-select-button-iconfont'
          :class="rotate ? 'base-select-button-iconfont-rotate' : ''"
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
 * @param {Object} buttonStyle 按钮样式 `默认为{}`
 * @event changeItem 改变选择数据
 * @style 针对css变量 --select-color --select-emphasize-color 可自定义
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'baseSelect',
  emits: ['changeItem'],
  inheritAttrs: false,
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
    buttonStyle: {
      type: Object,
      default: () => ({}),
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

    // 按钮样式
    const butStyle = computed(() => {
      return Object.assign(props.buttonStyle, selectStyle.value);
    });

    /**
     * @description: 点击select外关闭select
     * @return {void}
     * @author: Z_Y_C
     */

    function computedPosFalse() {
      if (visible.value) {
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
      rotate.value = visible.value = !visible.value;
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
      butStyle,
    };
  },
});
</script>

<style lang="scss" scoped>
$select-color: var(--select-color, $green-0);
$select-emphasize-color: var(--select-emphasize-color, $green-1);
$select-shadow: 0px 0px 6px $select-emphasize-color;

.base-select-content {
  display: flex;
  border-radius: $border-radius-1;
  transition: all 0.25s;
  font-size: 14px;
  color: $grey-10;

  &:hover {
    background-color: $select-color;
    color: $grey-0;
  }
}

.base-select-content-ok {
  background-color: $select-emphasize-color;
  color: $grey-0;
}

.base-select-buttontrue {
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

  .base-select-button-text {
    align-items: center;
    width: calc(100% - 23px);
    height: 20px;
    @include ellipsis(1);
  }

  .base-select-button-iconfont {
    display: flex;
    align-items: center;
    margin-left: 5px;
    width: 18px;
    height: 20px;
  }
}

.base-select-buttonfalse {
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
    box-shadow: $select-shadow;
    color: $select-emphasize-color;
  }

  .base-select-button-text {
    align-items: center;
    width: calc(100% - 23px);
    height: 20px;
    @include ellipsis(1);
  }

  .base-select-button-iconfont {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 5px;
    width: 18px;
    height: 20px;
  }

  .base-select-button-iconfont-rotate {
    transform: rotate(180deg);
  }
}

.selcect-click {
  box-shadow: $select-shadow;
  color: $select-emphasize-color;
}
</style>

<style lang="scss">
.base-select {
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;
  background-color: $grey-0;
}
</style>
