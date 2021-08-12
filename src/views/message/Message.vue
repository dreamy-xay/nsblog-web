<!--
 * @Description:消息页面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-07-28 13:11:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-08-12 23:21:00
-->
<template>

  <base-view
    :background="true"
    :top-bar="true"
    bind-class="message"
  >

    <div class="message-center">

      <div class="message-center-left">
        <message-menu
          :menus="menus"
          :menu="menu"
          :menuData="menuData"
          :messagetag="messagetag"
          :changeColor="changeColor"
        ></message-menu>
      </div>

      <div class="message-center-right">
        <message-top :messagetag="messagetag">
        </message-top>

        <div class="message-center-right-route">
          <!-- <el-scrollbar
            ref="innerRef"
            max-height="636px"
            @scroll="scroll"
          > -->
          <router-view />
          <!-- </el-scrollbar> -->
        </div>
      </div>
    </div>

  </base-view>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import BaseView from '@/components/content/baseView/BaseView.vue';
import MessageMenu from '@/views/message/childComps/MessageMenu.vue';
import MessageTop from '@/views/message/childComps/MessageTop.vue';
import { getMessages } from '@/network/api/messages.ts';
import events from '@/events';

/**
 * @description: 消息页面
 * @param {*}
 * @return {*}
 * @author: Z_Y_C
 */
export default defineComponent({
  name: 'message',
  components: {
    MessageMenu,
    MessageTop,
    BaseView,
  },

  setup(props, context) {
    const router = useRouter(),
      route = useRoute();
    const menuData = reactive([]);

    const menus = [
      { iconfont: 'iconfont blog-huifu1', id: 'reply', key: '回复我的' },
      { iconfont: 'iconfont blog-dianzan1', id: 'like', key: '收到的赞' },
      { iconfont: 'iconfont blog-xin', id: 'attention', key: '关注我的' },
      { iconfont: 'iconfont blog-tongzhi', id: 'system', key: '系统通知' },
      { iconfont: 'iconfont blog-xiaoxi', id: 'my', key: '我的消息' },
    ];

    const menu = { iconfont: 'iconfont blog-shezhi', id: 'setting', key: '消息设置' };

    const redirect = route.path;
    const array = redirect.split('/'); //获取路由

    const messagetag = ref('');

    if (array[array.length - 1] === menu.id) {
      //得到路由相对应的key值
      messagetag.value = menu.key;
    } else {
      for (let i = 0; i < 5; i++) {
        if (menus[i].id === array[array.length - 1]) messagetag.value = menus[i].key;
      }
    }
    /**
     * @description: 得到未读消息
     * @param {*}
     * @return {*}
     * @author: Z_Y_C
     */
    getMessages()
      .then((data) => {
        menuData.splice(0, 0, ...data.count);
        menuData[0] = 0;
      })
      .catch((error) => console.log(error));

    /**
     * @description:改变路由，传递数据（页面名称）到父组件
     * @param {menu} 路由名称（menu.id）和页面名称（menu.key）
     * @return {void}
     * @author: Z_Y_C
     */

    function changeColor(item, index) {
      router.push(`/message/${item.id}`); //改变路由
      messagetag.value = item.key;
      menuData[index] = 0;
    }

    /**
     * @description: 判断是否到了底部，到了底部加载数据
     * @param {*}
     * @return {*}
     * @author: Z_Y_C
     */

    const innerRef = ref(null); // inner ref
    let timer = 0; // 到底触发计时器

    function scroll() {
      if (
        (1 - parseFloat(innerRef.value.sizeHeight) / 100) * innerRef.value.wrap.scrollHeight <
          innerRef.value.wrap.scrollTop &&
        timer === 0
      ) {
        timer = 1;
        setTimeout(() => {
          timer = 0;
        }, 300);
        events.emit('Message-GetDataTag');
      }
    }

    return {
      innerRef,
      messagetag,
      menus,
      menu,
      menuData,
      scroll,
      changeColor,
    };
  },
});
</script>

<style lang="scss" scoped>
.message {
  .message-center {
    width: 1152px;
    height: 100%;
    margin: 0 auto;
    display: flex;

    .message-center-left {
      width: 140px;
      background-color: transparent;
    }

    .message-center-right {
      width: 1012px;
      background-color: transparent;

      .message-center-right-route {
        background-color: transparent;
      }
    }
  }
}
</style>
