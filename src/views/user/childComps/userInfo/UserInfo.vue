<!--
 * @Description: 用户中心左侧详细信息
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 18:09:18
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-09 18:29:09
-->
<template>
  <div class="user-info">
    <div class="user-info-attention">
      <div class="user-info-attention-ok">关注了
        <div class="user-info-attention-ok-number">{{data.like_count}}</div>
      </div>
      <div class="user-info-attention-line"></div>
      <div class="user-info-attention-ok">关注者
        <div class="user-info-attention-ok-number">{{data.fans_count}}</div>
      </div>

    </div>
    <div
      class="user-info-button"
      role="button"
      @click="attentionClick"
    >{{attentionText}}
    </div>
    <user-info-achievement :self="self" />
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import UserInfoAchievement from '@/views/user/childComps/userInfo/childComps/UserInfoAchievement.vue';
import router from '@/router';

/**
 * @description: 用户中心左侧详细信息
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userInfo',
  components: { UserInfoAchievement },
  props: {
    data: {
      type: Object,
      require: true,
    },
    self: {
      type: Boolean,
      require: true,
    },
  },
  setup(props, context) {
    const attentionText = computed(() => {
      return props.data.attention !== null ? (props.data.attention ? '取消关注' : '点击关注') : '编辑个人资料';
    });

    function attentionClick() {
      if (props.data.attention === null) router.push({ name: 'userCenterProfile' });
      else if (props.data.attention) context.emit('attention', false);
      else context.emit('attention', true);
    }
    return { attentionText, attentionClick };
  },
});
</script>

<style lang="scss" scoped>
.user-info {
  width: 238px;
  height: 743px;
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
      background-color: $grey-3;
    }
  }
}
</style>
