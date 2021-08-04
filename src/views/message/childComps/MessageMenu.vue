<!--
 * @Description:Message的子组件MessageLeft
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-07-29 22:48:57
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-04 21:18:31
-->
<template>
  <div class="message-left">

    <div class="message-left-title1">
      <i class="iconfont blog-paper-full message-left-title1-iconfont"></i>
      <span>消息中心</span>
    </div>

    <div
      v-for="item,index in menus"
      :key="item.id"
      class="message-left-title2"
      :class="colortag===item.id? 'message-left-title-color':''"
      @click="changecolor(item)"
    >
      <i
        :class="icons[index]"
        class="message-left-title2-iconfont"
      ></i>
      <span>{{item.key}}</span>
    </div>

    <div class='message-left-line'></div>

    <div
      class="message-left-title3"
      :class="colortag===menu.id ? 'message-left-title-color':''"
      @click="changecolor(menu)"
    >
      <i class="iconfont blog-shezhi  message-left-title3-iconfont"></i>
      <span>{{menu.key}}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

/**
 * @description: Message的子组件MessageLeft
 * @param {*}
 * @return {*}
 * @author: Z_Y_C
 */
export default defineComponent({
  name: 'MessageMenu',
  setup(props, context) {
    const icons = [
      'iconfont blog-huifu1',
      'iconfont blog-dianzan1',
      'iconfont blog-xin',
      'iconfont blog-tongzhi',
      'iconfont blog-xiaoxi',
    ];
    const menus = [
      { id: 'reply', key: '回复我的' },
      { id: 'like', key: '收到的赞' },
      { id: 'attention', key: '关注我的' },
      { id: 'system', key: '系统通知' },
      { id: 'my', key: '我的消息' },
    ];
    let messagetag;

    const menu = { id: 'setting', key: '消息设置' };
    const router = useRouter(),
      route = useRoute();

    const redirect = route.path;
    const array = redirect.split('/');

    const colortag = ref(array[array.length - 1]);

    if (menu.id === colortag.value) messagetag = ref(menu.key);
    else
      for (let i = 0; i < menus.length; i++) {
        if (menus[i].id === colortag.value) messagetag = ref(menus[i].key);
      }

    context.emit('sendMsg', messagetag.value); //传递数据（页面名称）到父组件

    // 获取路由器实例
    // const router1 = useRouter();
    // console.log(router1);
    // //使用
    // //router.push..... 等等方法

    // // route响应式对象，监控变化，传值

    // const route = useRoute;
    // console.log(route);
    //获取 处理route.query 等等

    /**
     * @description:改变路由，传递数据（页面名称）到父组件
     * @param {menu} 路由名称（menu.id）和页面名称（menu.key）
     * @return {void}
     * @author: Z_Y_C
     */
    function changecolor(menu) {
      colortag.value = menu.id; //改变选中名称颜色
      router.push(`/message/${menu.id}`); //改变路由
      console.log();
      messagetag.value = menu.key;
      context.emit('sendMsg', menu.key); //传递数据（页面名称）到父组件
    }

    return {
      icons,
      menu,
      menus,
      colortag,
      messagetag,
      changecolor,
    };
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
  width: 107px;
  height: 343px;
  display: flex;
  flex-wrap: wrap;
  background-color: $grey0;
  margin: 10px 0 10px 6px;
  padding: 12px 8px 16px 25px;
  border-radius: $border-radius0;
  box-shadow: $shadow0;
  font-size: 14px;
  line-height: 18px;
  font-weight: 700;

  .message-left-title1 {
    margin-bottom: 25px;
    color: $grey11;

    .message-left-title1-iconfont {
      margin-right: 6px;
    }
  }

  .message-left-title2 {
    padding: 15px 0;
    font-size: 14px;
    line-height: 18px;
    font-weight: 700;
    color: $grey7;
    transition: all 0.4s;

    .message-left-title2-iconfont {
      margin-right: 6px;
    }

    &:hover {
      color: $green0;
      cursor: pointer;
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
      cursor: pointer;
    }
  }
  .message-left-title-color {
    color: $green-0;
  }
}
</style>
