<!--
 * @Description: 注册成功页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-26 18:58:19
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-05 10:42:12
-->
<template>
  <div class="success">
    <div class="sucess-top">
      <i class="iconfont blog-smile"></i>
      <span class="main-content">{{mainContent}}</span>
      <span class="sub-content">{{subContent}}</span>
    </div>
    <div class="sucess-bottom">
      <login-button
        @click="submit"
        bind-class="submit"
      >
        {{buttonContent}}
      </login-button>
    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import LoginButton from '@/views/login/childComps/LoginButton.vue';
import events from '@/events';

/**
 * @description: 注册成功页面
 * @param {{enter: boolean, eventId?: string | number, mainContent?: string, subContent?: string, buttonContent?: string}} params router传递params
 *  enter:为true时页面才不会被拦截
 *  eventId:一次性绑定事件的ID，在点击底部按钮时触发
 *  mainContent:页面主要内容
 *  subContent:页面次要内容
 *  buttonContent: 按钮内容
 *  `默认值为注册成功效果`
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'success',
  components: {
    LoginButton,
  },
  beforeRouteEnter(to, from, next) {
    if (to.params['enter']) next();
    else next({ path: from.path });
  },
  setup() {
    const info = useRoute().params; // 上个页面 params

    /**
     * @description: 返回指定页面,默认返回登陆页面
     * @return {void}
     * @author: dreamy-xay
     */
    function submit() {
      if (info['eventId']) events.emit(info.eventId);
    }

    return {
      submit,
      mainContent: info['mainContent'] ? info['mainContent'] : '您已成功注册',
      subContent: info['subContent'] ? info['subContent'] : '欢迎您加入部落阁，请仔细保管好您的账户信息',
      buttonContent: info['buttonContent'] ? info['buttonContent'] : '返回登陆页面',
    };
  },
});
</script>

<style lang="scss" scoped>
.success {
  width: 100%;
  height: 100%;
  user-select: none;

  .sucess-top {
    width: 100%;
    height: 335px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    .iconfont {
      font-size: 180px;
      display: inline-block;
      height: 160px;
      line-height: 160px;
      color: $green-1;
    }

    .main-content {
      display: inline-block;
      height: 27.2px;
      line-height: 27.2px;
      margin-top: 42px;
      font-size: 24px;
      color: $green-1;
    }

    .sub-content {
      display: inline-block;
      height: 18.4px;
      line-height: 18.4px;
      margin-top: 22px;
      margin-bottom: 66px;
      font-size: 16px;
      color: $grey-8;
    }
  }

  .sucess-bottom {
    width: 100%;
    height: 45px;
    overflow: hidden;
  }
}
</style>
