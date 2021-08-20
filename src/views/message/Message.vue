<!--
 * @Description:消息页面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-07-28 13:11:57
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-20 16:55:18
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
          <router-view
            :replyData="replyData"
            :attentionData="attentionData"
            :likeData="likeData"
            :systemData="systemData"
            @add-data="addData"
            @delete-data="deleteData"
            @change-atteneion="changeAtteneion"
          />
        </div>
      </div>
    </div>

  </base-view>
</template>

<script>
import { defineComponent, ref, reactive, watch, computed } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import MessageMenu from '@/views/message/childComps/MessageMenu.vue';
import MessageTop from '@/views/message/childComps/MessageTop.vue';
import { getMessages } from '@/network/api/messages.ts';
import { mapGetters, mapState, mapActions, mapMutations } from '@/util/store';
import { useMessage } from 'naive-ui';
import router from '@/router';
import store from '@/store';

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
  beforeRouteEnter(_, __, next) {
    if (store.getters['global/isLogin']) next();
    else next({ name: 'signIn' });
  },
  setup(props, context) {
    const msg = useMessage(); // naive-ui mssage

    const menuData = reactive([]); // 目录未读消息

    const replyData = reactive([]); // 回复我的界面数据

    const attentionData = reactive([]); // 关注我的界面数据

    const likeData = reactive([]); // 收到的赞界面数据

    const systemData = reactive([]); //系统通知界面数据

    const { online, notice } = mapActions('message', ['notice', 'online']);
    const { isLogin } = mapGetters('global', ['isLogin']);
    const { tokenInfo } = mapState('global', ['tokenInfo']); // 获取tokenInfo
    const { updateMessageCount } = mapMutations('message', ['updateMessageCount']);
    console.log(tokenInfo);

    // 用户上线了
    if (isLogin.value)
      setTimeout(() => {
        online(tokenInfo.value.username);
      }, 3000);
    else router.push('/');

    //监听在线状态
    watch(
      () => isLogin.value,
      () => {
        if (!isLogin.value) router.push('/');
      }
    );

    //路由信息
    const menus = computed(() => {
      return [
        { iconfont: 'iconfont blog-huifu1', id: 'reply', key: '回复我的' },
        { iconfont: 'iconfont blog-dianzan1', id: 'like', key: '收到的赞' },
        { iconfont: 'iconfont blog-xin', id: 'attention', key: '关注我的' },
        { iconfont: 'iconfont blog-tongzhi', id: 'system', key: '系统通知' },
        { iconfont: 'iconfont blog-xiaoxi', id: 'my', key: '我的消息' },
      ];
    });

    //路由信息
    const menu = computed(() => {
      return { iconfont: 'iconfont blog-shezhi', id: 'setting', key: '消息设置' };
    });

    const messagetag = ref(''); // 路由界面名称 `menus[i].key`

    /**
     * @description: 得到未读消息之后查看路由，所在路由界面消息置为0
     * @return {void}
     * @author: Z_Y_C
     */

    if (isLogin.value)
      getMessages()
        .then((data) => {
          menuData.splice(0, 0, ...data.count);

          const redirect = router.currentRoute.value.path; // 当前界面路由
          const array = redirect.split('/'); //获取路由

          if (array[array.length - 1] === menu.value.id) {
            //得到路由相对应的key值
            messagetag.value = menu.value.key;
          } else {
            for (let i = 0; i < 5; i++) {
              if (menus.value[i].id === array[array.length - 1]) {
                messagetag.value = menus.value[i].key;
                setTimeout(() => {
                  // 延迟1s消失
                  menuData[i] = 0;
                }, 1000);
              }
            }
          }
        })
        .catch((error) => {
          console.log(error), msg.error('获取未读消息条数，请重试', { duration: 2000, closable: true });
        });

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

    /**
     * @description:改变关注
     * @param {Number} index 数据下标
     * @return {void}
     * @author: Z_Y_C
     */

    function changeAtteneion(index) {
      attentionData[index].content.attention = !attentionData[index].content.attention;
    }

    /**
     * @description: 根据页面名称增加数据
     * @param {Array} data 要增加的数据
     * @return {void}
     * @author: Z_Y_C
     */

    function addData(data) {
      if (messagetag.value === menus.value[0].key) replyData.splice(replyData.length, 0, ...data.messages);
      else if (messagetag.value === menus.value[2].key) attentionData.splice(attentionData.length, 0, ...data.messages);
      else if (messagetag.value === menus.value[1].key) likeData.splice(likeData.length, 0, ...data.messages);
      else if (messagetag.value === menus.value[3].key) systemData.splice(systemData.length, 0, ...data.messages);
    }

    /**
     * @description: 根据页面名称删除数据
     * @param {Number} index 要删除数据的下表
     * @return {void}
     * @author: Z_Y_C
     */
    function deleteData(index) {
      if (messagetag.value === menus.value[0].key) replyData.splice(index, 1);
      else if (messagetag.value === menus.value[2].key) attentionData.splice(index, 1);
      else if (messagetag.value === menus.value[1].key) likeData.splice(index, 1);
      else if (messagetag.value === menus.value[3].key) systemData.splice(index, 1);
    }

    /**
     * @description: 接收消息显示未读条数
     * @param {Number} index 下标来判断页面名称
     * @return {void}
     * @author: Z_Y_C
     */

    function addMenu(index) {
      if (messagetag.value === menus.value[index].key) {
        // 如果在该页面，延迟一秒消失
        menuData[index]++;
        setTimeout(() => {
          // 延迟1s消失
          menuData[index] = 0;
        }, 1000);
      } else menuData[index]++;
    }

    notice((type) => {
      updateMessageCount(type);
    });

    // receiveMessage({
    //   type: 1,
    //   callback(data) {
    //     console.log('message type: 11');
    //     systemData.splice(0, 0, data);
    //     addMenu(3);
    //   },
    // });

    // receiveMessage({
    //   type: 2,
    //   callback(data) {
    //     console.log('message type: 22');
    //     replyData.splice(0, 0, data);
    //     addMenu(0);
    //   },
    // });

    // receiveMessage({
    //   type: 3,
    //   callback(data) {
    //     console.log('message type: 33');
    //     likeData.splice(0, 0, data);
    //     addMenu(1);
    //   },
    // });

    // receiveMessage({
    //   type: 4,
    //   callback(data) {
    //     console.log('message type: 44');
    //     attentionData.splice(0, 0, data);
    //     addMenu(2);
    //   },
    // });

    return {
      messagetag,
      menus,
      menu,
      menuData,
      scroll,
      changeColor,
      addData,
      deleteData,
      changeAtteneion,
      replyData,
      attentionData,
      likeData,
      systemData,
    };
  },
});
</script>

<style lang="scss" scoped>
.message {
  .message-center {
    width: 1152px;
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
