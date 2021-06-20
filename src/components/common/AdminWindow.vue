<!--
 * @Description: 基本管理员界面窗口
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-12 18:26:18
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-20 17:28:29
-->

<template>
  <div class="admin-window">
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
    <div
      class="admin-window-content"
      :class="bindClass"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * @description: 管理员界面窗口
 * @param {String} bindClass 窗口外层绑定类 `默认为空`
 * @param {[String, Object]} 窗口标题，可以为对象或者字符串 `必传参数`
 * @param {String} separator 窗口标题面包屑分隔符 `默认为 '/'`
 * @param {String} separatorClass 窗口标题面包屑分隔符指定字体图标类 `默认为空`
 * @method push 添加面包屑
 * @method pop 删除栈顶面包屑
 * @slot 主题内容的无名插槽
 * @author: dreamy-xay
 */

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
  height: calc(100% - 24px);
  overflow: hidden;
  padding: 24px;
  padding-bottom: 0;

  .admin-window-title {
    width: 100%;
    height: 18.5px;
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
    width: 100%;
    height: calc(100% - 42.5px);
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0;
      opacity: 0;
    }
  }
}
</style>
