<!--
 * @Description: 未登录时提示
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-09 12:14:46
 * @LastEditors: Ban
 * @LastEditTime: 2021-08-12 14:10:52
-->

<template>
  <div class="top-bar-not-login-in">
    <el-popover
      placement="bottom"
      trigger="hover"
      :offset="offset"
      class="top-bar-not-login-in-popover"
      width="334px"
    >
      <template #reference>
        <a
          :href="href"
          :style="{'color' : color}"
        >
          <slot></slot>
        </a>
      </template>
      <div class="popover-title">
        登录即可查看{{ title }}
      </div>
      <a
        href="/login"
        class="popover-a"
      >
        立即登录
      </a>
    </el-popover>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 未登录时提示
 * @param {String} title 登录既可查看title `必传参数`
 * @param {Number} offset 出现位置的偏移量 `默认为0`
 * @author: Ban
 */
export default defineComponent({
  name: 'TopBarNotLoginIn',
  props: {
    title: {
      type: String,
      required: true,
    },
    offset: {
      type: Number,
      default: 0,
    },
    href: {
      type: String,
      default: '/',
    },
    color: {
      type: String,
      default: '#000',
    },
  },
});
</script>

<style lang="scss" scoped>
.popover-title {
  text-align: center;
  height: 40px;
  line-height: 40px;
  color: $grey-7;
  margin-bottom: 14px;
}

.popover-a {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  background: $green-0;
  color: $grey-0;
  width: 100%;
  text-align: center;
  border-radius: $border-radius-1;
  transition: background 0.2s linear;

  &:hover {
    background: $green-1;
  }
}
</style>
