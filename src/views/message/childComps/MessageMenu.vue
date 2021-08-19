<!--
 * @Description:Message的子组件MessageLeft
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-07-29 22:48:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-08-17 21:16:25
-->
<template>
  <div class="message-left">

    <div
      class="message-left-title1"
      role="button"
    >
      <i class="iconfont blog-paper-full message-left-title1-iconfont"></i>
      <span>消息中心</span>
    </div>

    <div
      v-for="(item,index) in menus"
      :key="item.id"
      class="message-left-title2"
      :class="messagetag === item.key ? 'message-left-title-color' : ''"
      @click="changeColor(item,index)"
      role="button"
    >
      <i
        :class="item.iconfont"
        class="message-left-title2-iconfont"
      ></i>
      <span class="message-left-title2-text">{{item.key}}</span>

      <n-badge
        :value="menuData[index]"
        :max="99"
        v-if="menuData[index]>0"
        :color="styles.pink0"
      />

    </div>

    <div class='message-left-line'></div>

    <div
      class="message-left-title3"
      :class="messagetag === menu.key ? 'message-left-title-color' : ''"
      @click="changeColor(menu)"
      role="button"
    >
      <i
        :class="menu.iconfont"
        class="message-left-title3-iconfont"
      ></i>
      <span>{{menu.key}}</span>
    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue';
import styles from '@/assets/style/define.scss';

/**
 * @description: Message的子组件MessageLeft
 * @param {Array} menus 左侧菜单目录 `默认为[]`
 * @param {Object} menu 左侧菜单目录 `默认为{}`
 * @param {String} messagetag 当前页面名称 `默认为''`
 * @param {Function} changeColor 改变当前选中页面目录颜色 `默认为null`
 * @param {Array} menuData 菜单目录未读消息 `默认为[]`
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'MessageMenu',
  props: {
    menus: {
      type: Array,
      default: () => [],
    },
    menu: {
      type: Object,
      default: () => ({}),
    },
    messagetag: {
      type: String,
      default: '',
    },
    changeColor: {
      type: Function,
      default: null,
    },
    menuData: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    return { styles };
  },
});
</script>

<style lang="scss" scoped>
$border-radius0: $border-radius-0;
$shadow0: $shadow-0;
$grey0: $grey-0;
$grey11: $grey-11;
$grey7: $grey-7;
$grey4: $grey-4;
$green0: $green-0;

.message-left {
  width: 120px;
  height: 343px;
  display: flex;
  flex-wrap: wrap;
  background-color: $grey0;
  margin: 10px 0 10px 0;
  padding: 12px 0 16px 20px;
  border-radius: $border-radius0;
  box-shadow: $shadow0;
  font-size: 14px;
  line-height: 18px;
  font-weight: 700;
  transition: all 0.4s;

  .message-left-title1 {
    margin-bottom: 25px;
    color: $grey11;

    .message-left-title1-iconfont {
      margin-right: 6px;
    }
  }

  .message-left-title2 {
    display: flex;
    align-items: center;
    padding: 15px 0;
    font-size: 14px;
    line-height: 18px;
    font-weight: 700;
    color: $grey7;
    transition: all 0.4s;
    .message-left-title2-iconfont {
      margin-right: 6px;
    }

    .message-left-title2-text {
      margin-right: 4px;
    }
    &:hover {
      color: $green0;
    }
  }

  .message-left-line {
    width: 80px;
    height: 1px;
    margin: 15px 0;
    background-color: $grey-4;
  }

  .message-left-title3 {
    padding-top: 5px;
    color: $grey-7;
    transition: all 0.4s;

    .message-left-title3-iconfont {
      margin-right: 6px;
    }

    &:hover {
      color: $green-0;
    }
  }

  .message-left-title-color {
    color: $green-0;
  }
}
</style>
