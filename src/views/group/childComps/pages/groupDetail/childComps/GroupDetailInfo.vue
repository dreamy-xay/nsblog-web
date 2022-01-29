<!--
 * @Description: 学习小组细节信息
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-29 17:12:45
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-29 21:38:39
-->
<template>
  <div class="group-detail-info">
    <div class="group-detail-info-head">
      <div class="left">
        <div class="icon">
          <i class="iconfont blog-xiaozu1"></i>
        </div>
        <div class="name">
          {{ groupName }}
        </div>
      </div>
      <div
        class="right"
        role="button"
        @click="joinClick"
      >
        <template v-if="data.join">
          已加入
        </template>
        <template v-else>
          <div class="icon">
            <i class="iconfont blog-daochu1024-29"></i>
          </div>
          加入
        </template>
        <base-modal
          content="确认退出学习小组( *^-^)ρ(*╯^╰)"
          @confirm="quitGroup(true)"
          @cancel="quitGroup(false)"
          :show="showModal"
        />
      </div>
    </div>
    <div class="group-detail-info-body">
      <div class="info">
        <div class="info-left">
          <div class="count">
            {{ data.member_count }}
          </div>
          <div class="text">
            <div class="icon">
              <i class="iconfont blog-chengyuan"></i>
            </div>
            学习小组成员
          </div>
        </div>
        <div class="info-right">
          <div class="count">
            {{ data.content_count }}
          </div>
          <div class="text">
            <div class="icon">
              <i class="iconfont blog-neirongguanli1"></i>
            </div>
            学习小组内容
          </div>
        </div>
      </div>
      <div class="remark">
        {{ data.remark }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import BaseModal from '@/components/content/baseModal/BaseModal.vue';
import { mapGetters } from '@/util/store';
import { useRoute } from 'vue-router';
import { useMessage } from 'naive-ui';

/**
 * @description: 学习小组细节信息
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'groupDetailInfo',
  components: {
    BaseModal,
  },
  setup() {
    const msg = useMessage(); // naive-ui message
    const route = useRoute(); // route
    const groupName = route.params.groupName; // 学习组名

    const data = reactive({
      member_count: 8173,
      content_count: 1496,
      remark:
        '创建由Python学习者和社区专家组成的国内最大的第三方Python中文社区，帮助社区成员更好地入门学习、职业成长和应用实践。',
      join: 0, // 是否加入
    });

    const { isLogin } = mapGetters('global', ['isLogin']); // 是否登录
    const showModal = ref(false); // 是否弹出模态框确认

    /**
     * @description: 加入按钮被点击
     * @return {void}
     * @author: dreamy-xay
     */
    function joinClick() {
      if (isLogin.value) {
        if (data.join) showModal.value = true;
        else {
          data.join = 1;
          msg.success('加入学习小组成功', { duration: 2000, closable: true });
        }
      } else msg.error('请先登录', { duration: 2000, closable: true });
    }

    /**
     * @description: 模态框是否退出学习小组
     * @param {boolean} isConfirm 是否确认 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function quitGroup(isConfirm) {
      showModal.value = false;
      if (isConfirm) {
        data.join = 0;
        msg.success('已退出该学习小组', { duration: 2000, closable: true });
      }
    }

    return {
      groupName,
      data,
      joinClick,
      showModal,
      quitGroup,
    };
  },
});
</script>

<style lang="scss" scoped>
.group-detail-info {
  width: 284px;
  height: 208px;
  margin-top: 16px;
  background-color: $grey-0;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;
  @include flex(center, center, column);

  .group-detail-info-head {
    height: 24px;
    width: 252px;
    border-bottom: 1px solid $grey-3;
    padding: 16px 16px 9px 16px;
    @include flex(center, space-between);

    .left {
      height: 100%;
      @include flex(center, center);

      .icon {
        width: 14px;
        height: 100%;
        color: $green-1;
        font-size: 16px;
        @include flex(center, center);
        margin-right: 10px;
      }

      .name {
        height: 100%;
        width: 160px;
        line-height: 24px;
        font-size: 14px;
        font-weight: 700;
        color: $grey-10;
        @include ellipsis(1);
      }
    }

    .right {
      width: 55px;
      height: 20px;
      box-sizing: border-box;
      border-radius: 16px;
      border: 1px solid $grey-7;
      @include flex(center, center);
      font-size: 12px;
      color: $grey-7;
      transition: 0.25s;

      &:hover {
        border: 1px solid $green-1;
        color: $green-1;
      }

      .icon {
        width: 10px;
        height: 100%;
        @include flex(center, center);
        margin-right: 4px;

        .iconfont {
          font-size: 12px;
          transform: scale(0.9);
        }
      }
    }
  }

  .group-detail-info-body {
    height: 158px;
    width: 100%;

    .info {
      height: 48px;
      width: 252px;
      border-bottom: 1px solid $grey-3;
      padding: 8px 16px 9px 16px;
      @include flex(center, space-between);

      & > div {
        height: 100%;
        width: 126px;
        box-sizing: border-box;
        @include flex(initial, center, column);

        .count {
          height: 28px;
          width: 100%;
          @include flex(center);
          font-size: 18px;
          font-weight: 700;
          color: $grey-10;
        }

        .text {
          height: 20px;
          width: 100%;
          @include flex(center);
          color: $grey-7;
          font-size: 12px;

          .icon {
            height: 100%;
            width: 12px;
            margin-right: 4px;
            @include flex(center, center);

            .iconfont {
              font-size: 13px;
            }
          }
        }
      }

      .info-left {
        border-right: 1px solid $grey-3;
      }

      .info-right {
        padding-left: 14px;
      }
    }

    .remark {
      width: 252px;
      height: 66px;
      margin: 10px 16px 16px 16px;
      line-height: 22px;
      @include ellipsis(3);
      font-size: 12px;
      color: $grey-7;
    }
  }
}
</style>
