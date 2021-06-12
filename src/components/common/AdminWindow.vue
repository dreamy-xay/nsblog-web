<!--
 * @Description: 基本管理员界面窗口
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-12 18:26:18
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-12 21:42:14
-->

<template>
  <div
    class="admin-window"
    :class="bindClass"
  >
    <div class="admin-window-title">
      <el-breadcrumb
        :separator="separator"
        :separator-class="separatorClass"
      >
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumbList"
          :to="item.to"
          :replace="item.replace"
          :key="index"
        >{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="admin-window-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'adminWindow',
  props: {
    bindClass: {
      type: String,
      default: null,
    },
    title: {
      type: [String, Object],
      required: true,
    },
    separator: {
      type: String,
      default: '/',
    },
    separatorClass: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      breadcrumbList:
        Object.prototype.toString.call((this as any).title) === '[object String]'
          ? [{ name: (this as any).title, to: null, replace: null }]
          : [(this as any).title],
    };
  },
  methods: {
    push(name: string, to: object | null = null, replace: boolean = false) {
      (this as any).breadcrumbList.splice((this as any).breadcrumbList.length, 0, { name, to, replace });
    },
    pop() {
      (this as any).breadcrumbList.splice((this as any).breadcrumbList.length, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-window {
  width: calc(100% - 48px);
  overflow: hidden;
  padding: 24px;

  .admin-window-title {
    width: 100%;
    user-select: none;
    overflow: hidden;
    /deep/ .el-breadcrumb__item {
      font-size: 19px;

      span {
        color: $admin-window-title-text-color;
        cursor: default;
      }

      span[class='el-breadcrumb__inner is-link'] {
        cursor: pointer;
      }
    }
    padding-bottom: 24px;
  }

  .admin-window-content {
    widows: 100%;
    overflow: hidden;
  }
}
</style>
