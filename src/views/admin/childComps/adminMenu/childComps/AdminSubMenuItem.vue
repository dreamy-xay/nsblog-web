<!--
 * @Description: 管理员页面子菜单单条
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-27 13:30:32
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-27 14:41:39
-->
<template>
  <div
    class="admin-sub-menu-item"
    :class="{'menu-item-active': active}"
    role="button"
    @click="itemClick(item)"
  >
    <div
      class="admin-sub-menu-item-left"
      :style="{marginLeft: rank * 20 + 'px'}"
    >
      <div
        class="icon"
        v-if="item.icon"
      >
        <i
          class="iconfont"
          :class="item.icon"
        ></i>
      </div>
      {{ item.title }}
    </div>
    <div class="admin-sub-menu-item-right">
      <div
        v-if="item.children.length"
        class="icon"
        :class="{'icon-expand': expand}"
      >
        <i class="iconfont blog-arrow-down"></i>
      </div>
      <div
        class="badge"
        v-else-if="item['badge']"
      >
        {{ item.badge }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 管理员页面子菜单单条
 * @param {Object} item 菜单项数据 `必传参数`
 * @param {Number} rank 菜单项级别数 `必传参数`
 * @param {Boolean} active 该菜单是否激活 `必传参数`
 * @param {Boolean} expand 子菜单模式下是否展开 `默认为 true`
 * @event itemClick 子菜单点击触发 (route: object) => void
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminSubMenuItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
    rank: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    expand: {
      type: Boolean,
      default: true,
    },
  },
  setup(_, context) {
    /**
     * @description: item 点击触发
     * @param {object} route 路由数据 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function itemClick(route) {
      context.emit('itemClick', route);
    }

    return {
      itemClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-sub-menu-item {
  height: 50px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: $border-radius-1;
  transition: background-color 0.25s, color 0.25s;
  background-color: $grey-0;
  margin-bottom: 5px;
  color: $grey-8;
  @include flex(center, space-between);

  &.menu-item-active,
  &:hover {
    color: $blue-2;
    background-color: rgba($blue-1, 0.14);
  }

  .admin-sub-menu-item-left {
    height: 100%;
    @include flex(center);

    .icon {
      height: 100%;
      width: 16px;
      margin-right: 3px;
      @include flex(center, center);

      .iconfont {
        font-size: 17px;
      }
    }
  }

  .admin-sub-menu-item-right {
    height: 100%;
    @include flex(center);

    .icon {
      height: 100%;
      @include flex(center);
      transition: 0.25s;

      &.icon-expand {
        transform: rotate(180deg);
      }

      .iconfont {
        font-size: 12px;
      }
    }

    .badge {
      height: 16px;
      padding: 0 4px;
      line-height: 16px;
      font-size: 12px;
      background-color: rgba($red-2, 0.65);
      border-radius: $border-radius-1;
      color: $grey-0;
      font-weight: 300;
    }
  }
}
</style>
