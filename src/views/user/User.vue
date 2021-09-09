<!--
 * @Description: 用户详细信息页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:04:40
<<<<<<< HEAD
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-09 21:36:20
=======
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-09 12:09:45
>>>>>>> 4a561d9c6da55af9a76fde0e13808266e450e16d
-->
<template>
  <base-view
    :top-bar="true"
    :background="true"
    bind-class="user"
  >
    <div class="user-head">
      <user-header
        :data="userData"
        :self="isSelf"
      />
    </div>
    <div class="user-body">
      <user-info
        :data="userData"
        :self="isSelf"
      />
      <user-main :data="userData" />
    </div>
  </base-view>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import UserHeader from '@/views/user/childComps/UserHeader.vue';
import UserInfo from '@/views/user/childComps/userInfo/UserInfo.vue';
import UserMain from '@/views/user/childComps/userMain/UserMain.vue';
import { mapState } from '@/util/store';
import { useRoute } from 'vue-router';
import { getUserInfo } from '@/network/api/user';
import { useMessage } from 'naive-ui';

/**
 * @description: 用户详细信息页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'user',
  components: {
    BaseView,
    UserHeader,
    UserInfo,
    UserMain,
  },
  setup() {
    const msg = useMessage(); // naive-ui message
    const route = useRoute(); // route
    const username = route.params.username; // 获取路由的username
    const isSelf = mapState('global', ['tokenInfo']).tokenInfo.value.username === username; // 判断是否是自己访问用户主页
    // 用户数据
    const userData = reactive({
      // 头部
      username: null,
      nickname: null,
      avatar: '',
      signature: null,
      rank: null,
      // 关注相关
      like_count: null,
      fans_count: null,
      attention: null, // null
      // 获得成就
      registration_time: null,
      browse_count: null,
      recommend_count: null,
      collect_count: null,
      browse_yesterday: null, //
      recommend_yesterday: null, //
      collect_yesterday: null, //
      // 基本信息
      gender: null,
      tags: [],
      qq: null,
      weibo: null,
      email: null,
      // 个人简介
      birthday: null,
      profession: null,
      address: null,
      best_topic: null,
      // 图表
      article_chart: {
        article_count: null,
        data: [],
        rank_total: null,
        rank_week: null,
        release_recently: null,
      },
      FAQ_chart: {
        FAQ_count: null,
        question_count: null,
        reply_count: null,
        reply_adoption: null,
      },
      resource_chart: {
        resource_count: null,
        data: [],
        release_recently: null,
      },
    });

    // 获取用户数据
    getUserInfo(username, 2)
      .then((data) => {
        userData.username = data.username;
        userData.nickname = data.nickname;
        userData.avatar = data.avatar;
        userData.signature = data.signature;
        userData.rank = data.rank;
        userData.like_count = data.like_count;
        userData.fans_count = data.fans_count;
        userData.attention = data.attention;
        userData.registration_time = data.registration_time;
        userData.browse_count = data.browse_count;
        userData.recommend_count = data.recommend_count;
        userData.collect_count = data.collect_count;
        userData.browse_yesterday = data.browse_yesterday;
        userData.recommend_yesterday = data.recommend_yesterday;
        userData.collect_yesterday = data.collect_yesterday;
        userData.gender = data.gender;
        userData.tags = data.tags;
        userData.qq = data.qq;
        userData.weibo = data.weibo;
        userData.email = data.email;
        userData.birthday = data.birthday;
        userData.profession = data.profession;
        userData.address = data.address;
        userData.best_topic = data.best_topic;
        userData.article_chart = data.article_chart;
        userData.FAQ_chart = data.FAQ_chart;
        userData.resource_chart = data.resource_chart;
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取消息失败', { duration: 2000, closable: true });
      });

    return {
      userData,
      isSelf,
    };
  },
});
</script>

<style lang="scss" scoped>
.user {
  .user-head {
    width: 100%;
    @include flex();
    margin: 16px 0;
  }

  .user-body {
    width: 100%;
    @include flex(initial, space-between);
    margin-bottom: 16px;
  }
}
</style>
