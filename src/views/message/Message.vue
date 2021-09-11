<!--
 * @Description:消息页面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-07-28 13:11:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-11 17:09:48
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
          :messagetag="messagetag"
          :changeColor="changeColor"
        ></message-menu>
      </div>

      <div class="message-center-right">
        <message-top :messagetag="messagetag">
        </message-top>

        <div class="message-center-right-route">
          <router-view v-slot="{ Component }">
            <!-- 将页面数据缓存 -->
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </div>
      </div>
    </div>

  </base-view>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import MessageMenu from '@/views/message/childComps/MessageMenu.vue';
import MessageTop from '@/views/message/childComps/MessageTop.vue';
import { mapState, mapActions, mapMutations } from '@/util/store';
import store from '@/store';
import { useRoute, useRouter } from 'vue-router';

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
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { online, offline, notice } = mapActions('message', ['notice', 'online', 'offline']);
    const { tokenInfo } = mapState('global', ['tokenInfo']); // 获取tokenInfo
    const username = tokenInfo.value.username; // 登录用户名
    const { updateMessageCount } = mapMutations('message', ['updateMessageCount']);

    // 用户上线了
    online(username);

    //监听在线状态
    watch(
      () => tokenInfo.value.status,
      (value) => {
        if (!value) {
          offline('username'); // 下线
          router.push('/');
        }
      }
    );

    //路由信息
    const menus = [
      { iconfont: 'iconfont blog-xinxi', id: 'reply', key: '回复我的' },
      { iconfont: 'iconfont blog-tubiao73', id: 'like', key: '收到的赞' },
      { iconfont: 'iconfont blog-xin', id: 'attention', key: '关注我的' },
      { iconfont: 'iconfont blog-Ioniconsiosnotifications', id: 'system', key: '系统通知' },
      { iconfont: 'iconfont blog-message-square', id: 'my', key: '我的消息' },
    ];

    //路由信息
    const menu = { iconfont: 'iconfont blog-Ioniconsmdsettings', id: 'setting', key: '消息设置' };

    const messagetag = ref(''); // 路由界面名称 `menus[i].key`

    const redirect = route.path; // 当前界面路由
    const array = redirect.split('/'); //获取路由

    if (array[array.length - 1] === menu.id) {
      //得到路由相对应的key值
      messagetag.value = menu.key;
    } else {
      for (let i = 0; i < 5; i++) {
        if (menus[i].id === array[array.length - 1]) {
          messagetag.value = menus[i].key;
        }
      }
    }

    /**
     * @description:改变路由，传递数据（页面名称）到父组件
     * @param {Object} item 路由名称（item.id）和页面名称（item.key）
     * @param {Nmber} index 未读消息条数（只有5个）`必传参数`
     * @return {void}
     * @author: Z_Y_C
     */

    function changeColor(item) {
      router.push(`/message/${item.id}`); //改变路由
      messagetag.value = item.key;
    }

    //消息类型，更新未读消息数量
    notice((type) => {
      updateMessageCount({ type });
    });

    return {
      messagetag,
      menus,
      menu,
      changeColor,
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
