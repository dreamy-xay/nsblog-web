<!--
 * @Description: 浏览标签
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-02-22 13:26:38
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-18 15:44:32
-->
<template>
  <div class="admin-tab">
    <div class="admin-tab-left">
      <el-tabs
        v-model="currentTabModelValue"
        type="card"
        :closable="false"
        @tab-remove="removeTab"
        @tab-click="clickTab"
      >
        <el-tab-pane
          v-for="(item, index) in editableTabs"
          :key="index"
          :name="item.name"
          :closable="index ? true : false"
        >

          <template #label>
            <div class="label">
              <div class="icon"><i :class="'iconfont '+ item.icon"></i></div>
              {{item.title}}
            </div>
          </template>
        </el-tab-pane>

      </el-tabs>
    </div>

    <div class="admin-tab-right">
      <el-dropdown
        placement="bottom-end"
        @visible-change="visibleChange"
      >
        <div
          role="button"
          class="tab-close"
          :class="{'tab-close-rotate': Dropdownvisible}"
        >
          <div class="tab-top">
            <div
              class="icon"
              :class="{'icon-rotate': Dropdownvisible}"
            ><i class="iconfont blog-box"></i></div>
            <div class="icon icon-left"><i class="iconfont blog-box"></i></div>
          </div>

          <div class="tab-bottom">
            <div class="icon"><i class="iconfont blog-box"></i></div>
            <div class="icon icon-left"><i class="iconfont blog-box"></i></div>
          </div>

        </div>
        <template #dropdown>
          <el-dropdown-menu v-show="Dropdownvisible">
            <div
              class="el-dropdown-item"
              role="button"
              v-for="(item, index) in menus"
              :key="index"
              @click="handleCommand(index)"
            >
              <div class="icon"><i :class="item.icon"></i></div>
              {{item.text}}
            </div>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div
        class="tab-zoom"
        @click="zoomClick"
        role="button"
      >
        <svg
          v-if="zoom"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="iconify iconify--codicon"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="M3.5 4H1V3h2V1h1v2.5l-.5.5zM13 3V1h-1v2.5l.5.5H15V3h-2zm-1 9.5V15h1v-2h2v-1h-2.5l-.5.5zM1 12v1h2v2h1v-2.5l-.5-.5H1zm11-1.5l-.5.5h-7l-.5-.5v-5l.5-.5h7l.5.5v5zM10 7H6v2h4V7z"
          ></path>
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="iconify iconify--codicon"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="M3 12h10V4H3v8zm2-6h6v4H5V6zM2 6H1V2.5l.5-.5H5v1H2v3zm13-3.5V6h-1V3h-3V2h3.5l.5.5zM14 10h1v3.5l-.5.5H11v-1h3v-3zM2 13h3v1H1.5l-.5-.5V10h1v3z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import { useMessage } from 'naive-ui';
import { defineComponent, nextTick, ref, watch } from 'vue';

/**
 * @description: 浏览标签
 * @param {Array} editableTabs 缓存标签 `必传参数`
 * @param {String} editableTabsValue 绑定值，选中选项卡的 name 在editableTabs中id属性 `必传参数`
 * @event removeTab 移除缓存页面 id 被删除的标签的id
 * @event handleCommand 点击关闭发生事件 index 关闭类型 0:关闭其他，1:关闭左侧，2:关闭右侧，3:关闭全部
 * @event clickTab 点击了新的tab
 * @event zoomToggle 点击了页面放大缩小按钮
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'adminTab',
  props: {
    editableTabs: {
      type: Array,
      required: true,
    },
    editableTabsValue: {
      type: String,
      required: true,
    },
  },
  emits: ['removeTab', 'handleCommand', 'clickTab', 'zoomToggle'],
  setup(props, context) {
    const msg = useMessage(); // naive-ui message
    const Dropdownvisible = ref(false); // 下拉框显示
    const currentTabModelValue = ref(props.editableTabsValue); // 当前激活的tab value
    const zoom = ref(false); // 是否显示窗口放大缩小（false 未正常状态， true 为放大状态）

    // 监听更新激活状态
    watch(
      () => props.editableTabsValue,
      (value) => {
        currentTabModelValue.value = value;
      }
    );

    const menus = [
      { icon: 'iconfont blog-ri-close-line', text: '关闭其他' },
      { icon: 'iconfont blog-ri-arrow-left-line', text: '关闭左侧' },
      { icon: 'iconfont blog-ri-arrow-left-line rotate', text: '关闭右侧' },
      { icon: 'iconfont blog-ri-close-line', text: '关闭全部' },
    ];

    /**
     * @description: 下拉框显示
     * @param {boolean} e 显示状态
     * @return {void}
     * @author: Z_Y_C
     */
    function visibleChange(e) {
      Dropdownvisible.value = e;
    }

    /**
     * @description: 移除缓存页面
     * @param {string} name 被删除的标签的name
     * @return {void}
     * @author: Z_Y_C
     */
    function removeTab(name) {
      context.emit('removeTab', name);
    }

    /**
     * @description: 点击缓存页面跳转
     * @param {object} e tab 被点击的标签
     * @return {void}
     * @author: Z_Y_C
     */
    function clickTab(e) {
      if (e.paneName !== props.editableTabsValue) {
        // 恢复原激活状态，等待 clickTab events 更新 currentTabModelValue
        nextTick(() => {
          currentTabModelValue.value = props.editableTabsValue;
        });
        context.emit('clickTab', e.paneName);
      }
    }

    /**
     * @description: 点击关闭发生事件
     * @param {number} index 关闭类型 0:关闭其他，1:关闭左侧，2:关闭右侧，3:关闭全部
     * @return {void}
     * @author: Z_Y_C
     */
    function handleCommand(index) {
      context.emit('handleCommand', index);
      Dropdownvisible.value = false;
    }

    /**
     * @description: 点击触发放大缩小页面
     * @return {void}
     * @author: dreamy-xay
     */
    let zoomMessage = null; // 缓存msg
    function zoomClick() {
      zoom.value = !zoom.value;
      context.emit('zoomToggle', zoom.value);
      console.log(this);
      if (zoom.value) zoomMessage = msg.info('Ctrl + F11 缩放子页面', { closable: false });
      else {
        zoomMessage.destroy();
        zoomMessage = null;
      }
    }

    // 监听按键事件
    window.addEventListener('keydown', (e) => {
      //事件对象兼容
      let event = e || window.event || arguments.callee.caller.arguments[0];
      if (typeof zoom.value !== 'undefined' && event && event.keyCode == 122) {
        const ctrlKey = event.ctrlKey || event.metaKey;
        if (ctrlKey) zoomClick();
      }
    });

    return {
      Dropdownvisible,
      currentTabModelValue,
      zoom,
      visibleChange,
      removeTab,
      clickTab,
      menus,
      handleCommand,
      zoomClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-tab {
  width: 100%;
  border-top: 1px solid $grey-2;
  height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  @include flex(center);

  .admin-tab-left {
    width: calc(100% - 83px);

    :deep(.el-tabs__header) {
      border: none;
      margin-bottom: 0;

      .border-card {
        border: none;
      }

      .el-tabs__nav-prev {
        margin-top: 10px;
        line-height: 40px;
      }

      .el-tabs__nav-next {
        margin-top: 10px;
        line-height: 40px;
      }

      .el-tabs__nav {
        @include flex(center);
        border: none;
      }

      // 正常样式
      .el-tabs__item {
        margin-top: 12px;
        border-left: none;
        @include flex(center);
        padding: 0 30px 0 20px;
        margin-right: -18px;
        height: 38px;
        // color: $grey-10;
        // cursor: pointer;
        user-select: none;
        mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);

        // hover颜色
        &:hover {
          padding: 0 30px;
          mask-size: 100% 100%;
          color: $grey-8;
          background: $grey-5;
        }
      }

      // X图标位置
      .el-tabs__item .el-icon-close {
        top: 0px;
        &:hover {
          background-color: $grey-7;
          color: $grey-0;
        }
      }

      .el-tabs__item {
        border: none;
      }

      // 选择后颜色
      .el-tabs__item.is-active {
        color: $blue-1;
        background: #e8f4ff;
        padding: 0 30px;
        mask-size: 100% 100%;

        .el-icon-close:hover {
          background-color: $blue-1;
        }
      }
    }

    .label {
      @include flex(center);

      .icon {
        margin-right: 3px;
        width: 16px;

        .iconfont {
          font-size: 16px;
        }
      }
    }
  }

  .admin-tab-right {
    width: 80px;
    margin-right: 3px;
    @include flex(center, initial, row-reverse);

    .tab-zoom {
      @include flex(center);
      color: $grey-8;
      margin-right: 20px;

      svg {
        transform: scale(1.4);
      }
    }

    :deep(.el-dropdown .tab-close:focus-visible) {
      outline: none;
    }
    .tab-close {
      @include flex(center, initial, column);
      color: $grey-8;
      transition: 0.5s all;

      .tab-top {
        @include flex(center, initial);
        margin-bottom: 3px;

        .icon {
          width: 6px;
          height: 6px;
          @include flex(center, center);

          .iconfont {
            font-size: 12px;
          }
        }

        .icon-left {
          margin-left: 3px;
        }

        .icon-rotate {
          transform: rotate(-135deg);
        }
      }

      .tab-bottom {
        @include flex(center, initial);

        .icon {
          width: 6px;
          height: 6px;
          @include flex(center, center);

          .iconfont {
            font-size: 12px;
          }
        }
        .icon-left {
          margin-left: 3px;
        }
      }
    }

    .tab-close-rotate {
      color: $blue-1;
      transform: rotate(90deg);
    }
  }
}

.el-dropdown-item {
  line-height: 22px;
  padding: 5px 16px;
  margin: 0;
  font-size: 14px;
  transition: 0.25s;
  @include flex(center);
  color: $grey-8;

  .icon {
    height: 22px;
    line-height: 22px;
    @include flex(center);
    margin-right: 3px;

    .iconfont {
      font-size: 14px;
    }

    .rotate {
      transform: rotate(180deg);
    }
  }

  &:hover {
    background: rgba($blue-0, 0.2);
    color: $blue-1;
  }
}
</style>
