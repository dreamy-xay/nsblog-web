<!--
 * @Description: 用户中心-基础资料-兴趣标签
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-28 14:54:52
 * @LastEditors: Ban
 * @LastEditTime: 2021-08-28 20:00:56
-->

<template>
  <div class="user-center-profile-interest">
    <div class="user-center-profile-interest-top">
      兴趣标签
    </div>
    <div class="user-center-profile-interest-body">
      <div class="body-show">
        <div>兴趣标签</div>
        <div class="body-show-tags">
          <el-tag
            closable
            v-for="n in 20"
            :key="n"
          >
            {{n}}
          </el-tag>
        </div>
      </div>
      <div class="body-select"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 用户中心-基础资料-兴趣标签
 * @param {*}
 * @return {*}
 * @author: Ban
 */
export default defineComponent({
  name: 'UserCenterProfileInterest',
  setup() {
    return {};
  },
});
</script>

<style lang='scss' scoped>
.user-center-profile-interest {
  margin-top: 16px;
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;
  background: $grey-0;

  .user-center-profile-interest-top {
    @include flex(center);
    height: 44px;
    font-size: 16px;
    box-sizing: border-box;
    padding-left: 24px;
    border-bottom: 1px solid $grey-4;
  }

  .user-center-profile-interest-body {
    box-sizing: border-box;
    padding: 24px 0 24px 24px;

    .body-show-tags {
      margin-left: 24px;
      width: 724px;
      border-bottom: 1px solid $grey-8;

      ::v-deep(.el-tag) {
        background: $blue-0;
        color: $blue-1;
        border-radius: 13px;
        height: 25px;
        line-height: 25px;
        font-size: 14px;

        .el-tag__close {
          // color: $blue-1;
          &:hover {
            color: white;
          }

          // &::before {
          //   color: transparent;
          // }
        }
      }
    }
    .body-show,
    .body-select {
      display: flex;
      align-content: flex-start;
      font-size: 14px;
    }
  }
}
</style>
