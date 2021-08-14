<!--
 * @Description:消息页面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-07-28 13:11:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-08-14 19:57:48
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
          <router-view />
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

/**
 * @description: 消息页面
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

    //路由信息
    const menus = [
      { iconfont: 'iconfont blog-huifu1', id: 'reply', key: '回复我的' },
      { iconfont: 'iconfont blog-dianzan1', id: 'like', key: '收到的赞' },
      { iconfont: 'iconfont blog-xin', id: 'attention', key: '关注我的' },
      { iconfont: 'iconfont blog-tongzhi', id: 'system', key: '系统通知' },
      { iconfont: 'iconfont blog-xiaoxi', id: 'my', key: '我的消息' },
    ];

    //路由信息
    const menu = { iconfont: 'iconfont blog-shezhi', id: 'setting', key: '消息设置' };

    const messagetag = ref(''); // 路由界面名称 `menus[i].key`

    /**
     * @description: 得到未读消息之后查看路由，所在路由界面消息置为0
     * @return {void}
     * @author: Z_Y_C
     */
    getMessages()
      .then((data) => {
        menuData.splice(0, 0, ...data.count);

        const redirect = route.path;
        const array = redirect.split('/'); //获取路由

        if (array[array.length - 1] === menu.id) {
          //得到路由相对应的key值
          messagetag.value = menu.key;
        } else {
          for (let i = 0; i < 5; i++) {
            if (menus[i].id === array[array.length - 1]) {
              messagetag.value = menus[i].key;
              setTimeout(() => {
                // 延迟1s消失
                menuData[i] = 0;
              }, 1000);
            }
          }
        }
      })
      .catch((error) => console.log(error));

    /**
     * @description:改变路由，传递数据（页面名称）到父组件
     * @param {Object} item 路由名称（item.id）和页面名称（item.key）
     * @param {Nmber} index 未读消息条数（只有5个）`默认为6`
     * @return {void}
     * @author: Z_Y_C
     */

    function changeColor(item, index = 6) {
      router.push(`/message/${item.id}`); //改变路由
      messagetag.value = item.key;
      if (index !== 6) menuData[index] = 0;
    }

    return {
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
