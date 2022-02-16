<!--
 * @Description: 用户详细信息页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:04:40
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-15 23:53:08
-->
<template>
  <base-view
    :top-bar="true"
    :background="true"
    :back-top="true"
    :footer="true"
    :footer-show-all="false"
    bind-class="user"
  >
    <div class="user-head">
      <user-header
        :data="userHeaderData"
        :self="isSelf"
      />
    </div>
    <div class="user-body">
      <div class="user-body-info">
        <user-info
          :data="userInfoData"
          :self="isSelf"
          @attention="changeAttention"
          @updateCount="updateCount"
        />
      </div>

      <div class="user-body-main">
        <user-main :data="userMainData" />
      </div>

    </div>
  </base-view>
</template>

<script>
import { computed, defineComponent, reactive, watch, ref } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import UserHeader from '@/views/user/childComps/UserHeader.vue';
import UserInfo from '@/views/user/childComps/userInfo/UserInfo.vue';
import UserMain from '@/views/user/childComps/userMain/UserMain.vue';
import { addAttentions, deleteAttentions } from '@/network/api/attentions';
import { mapMutations, mapState } from '@/util/store';
import { useRoute } from 'vue-router';
import { getUserInfo } from '@/network/api/user';
import { useMessage } from 'naive-ui';
import { getPrivacySetting } from '@/network/api/setting';

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
    const { tokenInfo } = mapState('global', ['tokenInfo']); // token信息
    const isSelf = ref(tokenInfo.value.status ? tokenInfo.value.username === username : null); // 判断是否是自己访问用户主页

    // watch 登录状态
    watch(
      () => tokenInfo.value,
      (info) => {
        isSelf.value = info.status ? info.username === username : null;
      }
    );

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
        console.log(data);
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
        msg.error('获取消息失败');
      });

    const userHeaderData = computed(() => {
      return {
        // 头部
        username: userData.username,
        nickname: userData.nickname,
        avatar: userData.avatar,
        signature: userData.signature,
        rank: userData.rank,
      };
    });

    const userInfoData = computed(() => {
      return {
        username: userData.username,
        // 关注相关
        like_count: userData.like_count,
        fans_count: userData.fans_count,
        attention: userData.attention,
        // 获得成就
        registration_time: userData.registration_time,
        browse_count: userData.browse_count,
        recommend_count: userData.recommend_count,
        collect_count: userData.collect_count,
        browse_yesterday: userData.browse_yesterday,
        recommend_yesterday: userData.recommend_yesterday,
        collect_yesterday: userData.collect_yesterday,
        // 基本信息
        gender: userData.gender,
        tags: userData.tags,
        qq: userData.qq,
        weibo: userData.weibo,
        email: userData.email,
        // 个人简介
        birthday: userData.birthday,
        profession: userData.profession,
        address: userData.address,
        best_topic: userData.best_topic,
      };
    });

    const userMainData = computed(() => {
      return {
        // 图表
        article_chart: {
          article_count: userData.article_chart.article_count,
          data: userData.article_chart.data,
          rank_total: userData.article_chart.rank_total,
          rank_week: userData.article_chart.rank_week,
          release_recently: userData.article_chart.release_recently,
        },
        FAQ_chart: {
          FAQ_count: userData.FAQ_chart.FAQ_count,
          question_count: userData.FAQ_chart.question_count,
          reply_count: userData.FAQ_chart.reply_count,
          reply_adoption: userData.FAQ_chart.reply_adoption,
        },
        resource_chart: {
          resource_count: userData.resource_chart.resource_count,
          data: userData.resource_chart.data,
          release_recently: userData.resource_chart.release_recently,
        },
      };
    });

    /**
     * @description: 改变关注状态
     * @param {Boolean} data 关注还是取消关注
     * @author: Z_Y_C
     */
    function changeAttention(data) {
      if (isSelf.value !== null)
        if (data)
          addAttentions(username)
            .then(() => {
              userData.attention = data;
            })
            .catch((error) => {
              console.log(error);
              msg.error('关注失败');
            });
        else
          deleteAttentions(username)
            .then(() => {
              userData.attention = data;
            })
            .catch((error) => {
              console.log(error);
              msg.error('取消关注失败');
            });
      else msg.error('请先登录');
    }

    const { changePrivacySetting } = mapMutations('user', ['changePrivacySetting']); //修改隐私设置

    getPrivacySetting(username)
      .then((data) => {
        changePrivacySetting(data);
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取隐私设置失败');
      });

    /**
     * @description: 修改关注或粉丝数量
     * @param {Object} info info.flag: {true: 修改关注 ,false: 修改粉丝}  info.data: {true: 增加, false: 减少}
     * @return {void}
     * @author: clq
     */
    function updateCount(info) {
      // console.log('info.flag:' + info.flag);
      // console.log('info.data:' + info.data);
      if (info.flag) {
        if (info.data) {
          userData.like_count += 1;
        } else {
          userData.like_count -= 1;
        }
      } else {
        if (info.data) {
          userData.fans_count += 1;
        } else {
          userData.fans_count -= 1;
        }
      }
    }

    return {
      userData,
      isSelf,
      userInfoData,
      userHeaderData,
      userMainData,
      changeAttention,
      updateCount,
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

    .user-body-info {
      width: 238px;
    }

    .user-body-main {
      width: 890px;
    }
  }
}
</style>
