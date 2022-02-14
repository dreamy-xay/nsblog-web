<!--
 * @Description: 隐私设置页面
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-19 11:57:55
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-15 19:31:59
-->
<template>
  <div class="user-center-setting">
    <div class="user-center-setting-title">隐私设置</div>

    <div
      class="user-center-setting-menu"
      v-for="(item,index) in textmenus"
      :key="index"
    >
      <div class="user-center-setting-menu-text">
        <span>{{item.text1}}</span>
        <span class="user-center-setting-menu-text-font">{{item.text2}}</span>
      </div>

      <div class="user-center-setting-menu-radio">
        <el-radio-group
          v-model="settingData[index]"
          @change="changeSetting(index)"
        >
          <el-radio
            :label="radio.value"
            v-for="radio in radiomenus[index]"
            :key='radio.value'
          >{{radio.lable}}
          </el-radio>
        </el-radio-group>
      </div>
    </div>

  </div>
</template>

<script>
import { computed, defineComponent, reactive } from 'vue';
import { getPrivacySetting, modifySetting } from '@/network/api/setting';
import { useMessage } from 'naive-ui';
import { mapState } from '@/util/store';

/**
 * @description: 隐私设置页面
 * @author: Z_Y_C
 */
export default defineComponent({
  name: 'userCenterSettting',
  setup() {
    const msg = useMessage(); // naive-ui message

    const { tokenInfo } = mapState('global', ['tokenInfo']);
    // 隐私设置介绍
    const textmenus = [
      { text1: '查看动态', text2: '（允许后，在个人主页展示动态）' },
      { text1: '查看问答', text2: '（允许后，在个人主页展示问答）' },
      { text1: '查看个人介绍', text2: '（允许后，在个人主页展示个人介绍）' },
    ];

    // 隐私设置选项
    const radiomenus = [
      [
        { lable: '允许', value: 1 },
        { lable: '关闭', value: 0 },
      ],
      [
        { lable: '允许', value: 1 },
        { lable: '关闭', value: 0 },
      ],
      [
        { lable: '允许', value: 1 },
        { lable: '关闭', value: 0 },
      ],
    ];

    const settingData = reactive([1, 1, 1]); // 绑定隐私设置数据

    // 获取隐私设置数据
    getPrivacySetting(tokenInfo.value.username)
      .then((data) => {
        settingData[0] = data.view_dynamic;
        settingData[1] = data.view_ask;
        settingData[2] = data.view_profile;
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取隐私设置失败');
      });

    /**
     * @description: 更改设置
     * @param {Number} index 得到设置项
     * @return {void}
     * @author: Z_Y_C
     */
    function changeSetting(index) {
      const data = [
        { view_dynamic: settingData[index] },
        { view_ask: settingData[index] },
        { view_profile: settingData[index] },
      ];
      modifySetting(data[index]).catch((error) => {
        console.log(error);
        msg.error('修改设置失败,请重试');
      });
    }
    return {
      textmenus,
      radiomenus,
      settingData,
      changeSetting,
    };
  },
});
</script>

<style lang='scss' scoped>
$border-radius0: $border-radius-0;
$shadow0: $shadow-0;
$grey10: $grey-10;
$grey7: $grey-7;
$grey0: $grey-0;
$green0: $green-0;
$green1: $green-1;
$shadow2: $shadow-2;

:deep(.el-radio) {
  color: $grey7;

  .el-radio__inner {
    width: 20px;
    height: 20px;
    background: transparent;
    box-sizing: border-box;
    border: 2px solid $grey7;
    border-color: $grey7;
    box-shadow: $shadow0;

    &::after {
      box-shadow: $shadow2;
      background-color: $green1;
      width: 10px;
      height: 10px;
    }

    &:hover {
      border: 2px solid $green1;
    }
  }

  .el-radio__input.is-checked + .el-radio__label {
    color: $green1;
  }

  .el-radio__input.is-checked .el-radio__inner {
    background: $grey0;
    border-color: $green1;
    box-shadow: $shadow2;
  }
}

.user-center-setting {
  display: flex;
  background-color: transparent;
  flex-direction: column;

  .user-center-setting-title {
    display: flex;
    align-items: center;
    padding-left: 16px;
    margin-bottom: 16px;
    width: 910px;
    height: 42px;
    background-color: $grey-0;
    font-size: 17px;
    color: $grey-7;
    border-radius: $border-radius-0;
    box-shadow: $shadow-0;
    line-height: 22px;
  }

  .user-center-setting-menu {
    width: 878px;
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    padding: 16px 24px;
    background-color: $grey-0;
    border-radius: $border-radius-0;
    box-shadow: $shadow-0;
    height: 50px;

    .user-center-setting-menu-text {
      font-size: 16px;
      line-height: 21px;
      margin-bottom: 10px;
      color: $grey-10;

      .user-center-setting-menu-text-font {
        color: $grey-7;
      }
    }
    .user-center-setting-menu-radio {
      font-size: 14px;
      line-height: 19px;
      color: $grey10;
    }
  }
}
</style>
