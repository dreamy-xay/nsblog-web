<!--
 * @Description: 用户中心左侧详细信息
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 18:09:18
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-14 19:51:32
-->
<template>
  <div class="user-info">
    <div class="user-info-attention">
      <div
        class="user-info-attention-ok"
        role="button"
        @click="showModel(true)"
      >关注了
        <div class="user-info-attention-ok-number">{{data.like_count}}</div>
      </div>
      <div class="user-info-attention-line"></div>
      <div
        class="user-info-attention-ok"
        role="button"
        @click="showModel(false)"
      >关注者
        <div class="user-info-attention-ok-number">{{data.fans_count}}</div>
      </div>

    </div>
    <div
      class="user-info-button"
      role="button"
      @click="attentionClick"
    >{{attentionText}}
    </div>

    <div class="user-info-achieve ">
      <user-info-achievement
        :self="self"
        :data="achievementData"
      />
    </div>

    <div class="user-info-line"></div>

    <div class="user-info-inform">
      <user-info-information
        :data="informationData"
        :self="self"
      />
    </div>

    <div class="user-info-line"></div>

    <div class="user-info-profile">
      <div class="user-info-profile-title"> 个人简介</div>

      <div
        class="user-info-profile-context"
        v-for="(item , index) in iconsData"
        :key="index"
      >

        <div class="icon"><i :class="item.icon"></i></div>
        <div class="text">{{item.text}}</div>
        <div class="context">{{profileData[index]}}</div>

      </div>
    </div>
    <user-info-attention
      v-model="showAttentionModel"
      v-model:flag="flag"
      :attentionNum="data.like_count"
      :fanNum="data.fans_count"
      :username="data.username"
    />
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import UserInfoAchievement from '@/views/user/childComps/userInfo/childComps/UserInfoAchievement.vue';
import UserInfoInformation from '@/views/user/childComps/userInfo/childComps/UserInfoInformation.vue';
import UserInfoAttention from '@/views/user/childComps/userInfo/childComps/UserInfoAttention.vue';
import router from '@/router';
import { dateFormat } from '@/util/date';

/**
 * @description: 用户中心左侧详细信息
 * @param {Object} data 用户中心左侧详细信息数据 `必传参数`
 * @param {null | Boolean} self 用户是否是自己或在线，是自己为true 用户退出登录为null 不是自己false `必传参数`
 * @event attention 点击关注或取消关注触发
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userInfo',
  components: { UserInfoAchievement, UserInfoInformation, UserInfoAttention },
  props: {
    data: {
      type: Object,
      required: true,
    },
    self: {
      required: true,
    },
  },
  setup(props, context) {
    const showAttentionModel = ref(false);
    const flag = ref(true);

    // 关注数据
    const attentionText = computed(() => {
      if (props.self === null) return '点击关注';
      return props.data.attention !== null ? (props.data.attention ? '取消关注' : '点击关注') : '编辑个人资料';
    });

    /**
     * @description: 点击按钮触发事件
     * @return {void}
     * @author: Z_Y_C
     */
    function attentionClick() {
      if (props.data.attention === null) router.push({ name: 'userCenterProfile' });
      else if (props.data.attention) context.emit('attention', false);
      else context.emit('attention', true);
    }

    /**
     * @description: 显示模态框
     * @param {Boolean} modelFlag true:显示关注了 false:显示关注者
     * @return {*}
     * @author: clq
     */
    function showModel(modelFlag) {
      flag.value = modelFlag;
      showAttentionModel.value = true;
    }

    // 获得成就
    const achievementData = computed(() => {
      return {
        registration_time: props.data.registration_time,
        browse_count: props.data.browse_count,
        recommend_count: props.data.recommend_count,
        collect_count: props.data.collect_count,
        browse_yesterday: props.data.browse_yesterday,
        recommend_yesterday: props.data.recommend_yesterday,
        collect_yesterday: props.data.collect_yesterday,
      };
    });

    // 基本信息数据
    const informationData = computed(() => {
      return {
        username: props.data.username,
        gender: props.data.gender,
        tags: props.data.tags,
        qq: props.data.qq,
        weibo: props.data.weibo,
        email: props.data.email,
      };
    });

    // 个人简介数据
    const profileData = computed(() => {
      if (props.data.username) {
        const address = props.data.address.split(',');
        return [
          props.data.birthday !== null ? dateFormat('Y年m月d日', new Date(props.data.birthday)) : '保密',
          props.data.profession !== null ? props.data.profession : '保密',
          address[0] + address[1] !== '' ? address[0] + address[1] : '保密',
          props.data.best_topic !== null ? props.data.best_topic : '保密',
        ];
      }
      return ['', '', '', ''];
    });

    // 个人简介目录
    const iconsData = [
      { icon: 'iconfont blog-calendar-alt', text: '出生年月' },
      { icon: 'iconfont blog-user-tie', text: '个人职业' },
      { icon: 'iconfont blog-chengshi', text: '现居住地' },
      { icon: 'iconfont blog-heartbeat', text: '兴趣领域' },
    ];

    return {
      showAttentionModel,
      flag,
      attentionText,
      attentionClick,
      showModel,
      achievementData,
      informationData,
      profileData,
      iconsData,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-info {
  width: 238px;
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;
  background-color: $grey-0;
  @include flex(center, initial, column);

  .user-info-attention {
    @include flex(center);
    margin: 16px 0;

    .user-info-attention-ok {
      @include flex(center, center, column);
      width: 118.5px;
      height: 43px;
      font-size: 14px;
      line-height: 19px;
      color: $grey-9;

      .user-info-attention-ok-number {
        margin-top: 7px;
        font-size: 16px;
        color: $grey-11;
        line-height: 17px;
        font-weight: 700;
      }
    }
    .user-info-attention-line {
      border-right: 1px solid $grey-3;
      height: 26px;
    }
  }

  .user-info-button {
    height: 32px;
    width: 206px;
    background-color: $grey-2;
    border-radius: $border-radius-0;
    @include flex(center, center);
    color: $grey-9;
    font-size: 14px;
    transition: all 0.25s;

    &:hover {
      color: $grey-10;
      background-color: $grey-3;
    }
  }

  .user-info-achieve {
    width: 100%;
    padding: 24px 0;
  }

  .user-info-line {
    width: 206px;
    border-bottom: 1px solid $grey-3;
  }

  .user-info-inform {
    width: 100%;
    padding: 24px 0;
  }

  .user-info-profile {
    width: 100%;
    @include flex(initial, center, column);
    padding: 16px 0;

    .user-info-profile-title {
      margin-left: 16px;
      font-size: 16px;
      font-weight: 700;
      color: $grey-11;
      line-height: 21px;
    }

    .user-info-profile-context {
      @include flex(center, initial, row);
      margin: 16px 16px 0 16px;

      .icon {
        width: 20px;
        height: 20px;
        margin-right: 10px;

        .iconfont {
          font-size: 20px;
        }
      }

      .text {
        width: 66px;
        font-size: 14px;
        line-height: 20px;
        height: 20px;
        color: $grey-8;
      }

      .context {
        width: 110px;
        color: $grey-9;
        @include ellipsis(1);
        text-align: right;
        line-height: 20px;
        font-weight: 700;
      }

      &:nth-child(2) {
        color: $orange-0;
      }
      &:nth-child(3) {
        color: $blue-1;
      }
      &:nth-child(4) {
        color: $blue-0;
      }
      &:last-child {
        color: $pink-0;
      }
    }
  }
}
</style>
