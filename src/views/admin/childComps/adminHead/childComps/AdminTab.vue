<!--
 * @Description: 浏览标签
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-02-22 13:26:38
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-03-16 12:03:16
-->
<template>
  <div class="admin-tab">
    <div class="admin-tab-left">
      <el-tabs
        :model-value="editableTabsValue"
        type="card"
        :closable='false'
        @tab-remove="removeTab"
        @tab-click="clickTab"
      >
        <el-tab-pane
          v-for="(item , index) in editableTabs"
          :key="index"
          :name="item.name"
          :closable="index ? true : false"
        >

          <template #label>
            <div class="label">
              <div class="icon"><i :class="'iconfont '+item.icon"></i></div>
              {{item.content}}
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
          :class="Dropdownvisible ? 'tab-close-rotate' : ''"
        >
          <div class="tab-top">
            <div
              class="icon"
              :class="Dropdownvisible ? 'icon-rotate' : ''"
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
              v-for="(item , index) in menus"
              :key="index"
              @click="handleCommand(index)"
            >
              <div class="icon"><i :class="item.icon"></i></div>
              {{item.text}}
            </div>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router';
import { defineComponent, ref } from 'vue';

/**
 * @description: 浏览标签
 * @param {Array} editableTabs 缓存标签 `必传参数`
 * @param {String} editableTabsValue 绑定值，选中选项卡的 name 在editableTabs中id属性 `必传参数`
 * @event removeTab 移除缓存页面 id 被删除的标签的id
 * @event handleCommand 点击关闭发生事件 index 关闭类型 0:关闭其他，1:关闭左侧，2:关闭右侧，3:关闭全部
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
  setup(props, content) {
    const Dropdownvisible = ref(false); // 下拉框显示
    const router = useRouter(); // 路由跳转

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
      content.emit('removeTab', name);
    }

    /**
     * @description: 点击缓存页面跳转
     * @param {object} e 	tab 被点击的标签
     * @return {void}
     * @author: Z_Y_C
     */
    function clickTab(e) {
      if (e.paneName !== props.editableTabsValue.value) {
        content.emit('update:editableTabsValue', e.paneName);
        router.push({ name: e.paneName });
      }
    }

    /**
     * @description: 点击关闭发生事件
     * @param {number} index 关闭类型 0:关闭其他，1:关闭左侧，2:关闭右侧，3:关闭全部
     * @return {void}
     * @author: Z_Y_C
     */
    function handleCommand(index) {
      content.emit('handleCommand', index);
      Dropdownvisible.value = false;
    }

    return {
      Dropdownvisible,
      visibleChange,
      removeTab,
      clickTab,
      menus,
      handleCommand,
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
        line-height: 50px;
      }

      .el-tabs__nav-next {
        line-height: 50px;
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

      // 选择后颜色
      .el-tabs__item.is-active {
        color: $blue-1;
        background: #e8f4ff;
        padding: 0 30px;
        mask-size: 100% 100%;
      }

      // 图标位置
      .el-tabs__item .el-icon-close {
        top: 0px;
      }

      .el-tabs__item {
        border: none;
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
