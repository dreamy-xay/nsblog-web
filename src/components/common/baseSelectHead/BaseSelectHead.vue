<!--
 * @Description:部分页面头部组件
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-23 21:16:25
 * @LastEditors: Ban
 * @LastEditTime: 2022-02-19 16:18:18
-->
<template>
  <div
    class="base-select-head"
    :style="style"
  >
    <div
      class="base-select-head-context"
      :class="type ? 'space-between':'initial'"
    >
      <div class="context-context-left">
        <div
          class="box"
          v-for="(item , index) in menu"
          :key="index"
          :class="selectTag==index ? 'select-box' : ''"
          @click="changeTag(index)"
          role="button"
        >
          <div class="text">{{item}}</div>
        </div>
      </div>

      <div class="context-context-right">
        <div class="select">
          <n-popover
            ref="npopoverRef"
            trigger="hover"
            display-directive="show"
            :show-arrow="false"
            :raw="true"
            :style="{ marginTop: '4px' }"
            placement="bottom"
            class="select-menu-style"
          >
            <el-scrollbar max-height="300px">
              <div
                class="select-menu"
                :class="type ? '' : 'select-menu-false'"
                v-for="(item , index) in (type ? selectMenu : rankMenu)"
                :key="index"
                @click="changeSelect(index)"
                role="button"
              >{{ item }}</div>

            </el-scrollbar>
            <template #trigger>
              <div
                class="select-button"
                :class="type ? '' : 'select-button-false'"
                role="button"
                v-show="(type ? true : (selectTag == 2 ? true : false )) && selectMenu.length != 0"
              >
                <div
                  class="select-button-text"
                  v-text="type ? selectMenu[selectTime] : rankMenu[selectTime]"
                >
                </div>
                <div class="icon"><i class='iconfont blog-down'></i></div>
              </div>
            </template>
          </n-popover>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

/**
 * @description:部分页面头部组件
 * @param {Number} selectTag 选择 0:'综合', 1:'最新', 2:'热门'标签 `默认为0`
 * @param {Number} selectTime 选择 0:'时间不限', 1:'最近一天', 2:'最近一周', 3:'最近三月'时间筛选 `默认为0`
 * @param {Object} style 最外层样式 `默认为 null`
 * @param {Boolean} type 类型true下拉框在最后，false下拉框在旁边 `默认为 true`
 * @param {Array} menu 左侧标签选项 `默认为['综合', '最新', '热门']`
 * @param {Array} selectMenu 右侧时间选项 `默认为[时间不限', '最近一天', '最近一周', '最近一月]`
 * @event changeTag 改变标签，传回标签下标
 * @event changeSelect 改变时间筛选，传回时间筛选下标
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'baseSelectHead',
  props: {
    selectTag: {
      type: Number,
      default: 0,
    },
    selectTime: {
      type: Number,
      default: 0,
    },
    style: {
      type: Object,
      default: null,
    },
    type: {
      type: Boolean,
      default: true,
    },
    menu: {
      type: Array,
      default: () => ['综合', '最新', '热门'],
    },
    selectMenu: {
      type: Array,
      default: () => ['时间不限', '最近一天', '最近一周', '最近一月'],
    },
  },
  setup(props, context) {
    //const menu = ['综合', '最新', '热门']; // 0 1 2
    //const selectMenu = ['时间不限', '最近一天', '最近一周', '最近一月'];
    const rankMenu = ['3天内', '7天内', '30天内', '全部'];
    const npopoverRef = ref(null); //n-popover引用对象

    /**
     * @description: 改变标签
     * @param {Number} index 标签下标
     * @return {Void}
     * @author: Z_Y_C
     */
    function changeTag(index) {
      context.emit('changeTag', { index: index });
    }

    /**
     * @description: 改变时间筛选
     * @param {Number} index 时间筛选下标
     * @return {Void}
     * @author: Z_Y_C
     */
    function changeSelect(index) {
      context.emit('changeSelect', { index: index });
      npopoverRef.value.setShow(false); // 不显示 popover
    }
    return {
      //menu,
      rankMenu,
      //selectMenu,
      npopoverRef,
      changeTag,
      changeSelect,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-select-head {
  @include flex(center);
  height: 46px;
  background-color: $grey-0;
  border-radius: $border-radius-0 $border-radius-0 0 0;
  border-bottom: 1px solid $grey-2;
  padding: 0 12px;

  .space-between {
    @include flex(center, space-between);
  }

  .initial {
    @include flex(center);
  }

  .base-select-head-context {
    width: 100%;
    height: 14px;

    .context-context-left {
      @include flex(center, center);

      .box {
        @include flex(center, center);
        //width: 58px;
        padding: 0 15px;
        box-sizing: border-box;
        height: 14px;
        line-height: 14px;
        color: $grey-9;
        border-right: 1px solid $grey-4;
        transition: 0.25s;

        &:hover {
          color: $green-1;
        }

        &:last-child {
          border-right: 0px;
        }

        .text {
          font-size: 14px;
        }
      }

      .select-box {
        color: $green-1;
      }
    }

    .context-context-right {
      .select {
        margin-right: 8px;
      }
    }
  }
}

.select-menu {
  @include flex(center);
  padding-left: 10px;
  transition: 0.25s;
  font-size: 12px;
  color: $grey-9;
  width: 74px;
  height: 32px;
  transition: 0.25s;

  &:hover {
    background-color: $grey-1;
  }
}

.select-menu-false {
  width: 64px;
}

.select-button {
  @include flex(center, space-between);
  width: 62px;
  height: 18px;
  border: 1px solid $grey-4;
  border-radius: $border-radius-1;
  padding: 0 10px;
  color: $grey-9;
  transition: 0.25s;

  .select-button-text {
    @include flex(center);
    font-size: 12px;
  }
  .icon {
    @include flex(center);

    .iconfont {
      font-size: 12px;
    }
  }

  &:hover {
    color: $green-1;
  }
}

.select-button-false {
  width: 52px;
}
</style>

<style lang="scss">
.select-menu-style {
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;
  background-color: $grey-0;
  padding: 5px 0;
}
</style>
