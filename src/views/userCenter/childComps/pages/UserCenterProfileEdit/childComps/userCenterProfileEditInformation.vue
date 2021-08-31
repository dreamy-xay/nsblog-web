<!--
 * @Description:基本信息模块
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-08-28 23:20:26
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-31 11:10:55
-->
<template>
  <div class="user-center-profile-information">
    <div class="user-center-profile-information-title">基本信息</div>
    <div class="user-center-profile-information-nickname">
      <div class="user-center-profile-information-nickname-text">昵称</div>

      <input
        class="user-center-profile-information-nickname-input"
        type="text"
        :value="nickName"
        @input="input"
      >

    </div>

    <div class="user-center-profile-information-gender">
      <div class="user-center-profile-information-gender-text">性别</div>
      <div class="user-center-profile-information-gender-radio">
        <el-radio-group
          v-model="genderData.value"
          @change="changeGender()"
        >
          <el-radio
            :label="radio.value"
            v-for="radio in radiomenus"
            :key='radio.value'
          >{{radio.lable}}
          </el-radio>
        </el-radio-group>
      </div>
    </div>

    <div class="user-center-profile-information-city">
      <div class="user-center-profile-information-city-text">家乡</div>

      <div
        v-for="(item , index) in cityData"
        :key="index"
        :class="index !==cityData.length-1 ? 'user-center-profile-information-city-select' : ''"
      >
        <base-select
          :sdata="item"
          :selectTag="city[index]"
          :showText="showCityText[index]"
          :swidth="150"
          :disabled="cityDisabled[index]"
          @changeItem="changeCity($event,index)"
        >
        </base-select>
      </div>
    </div>

    <div class="user-center-profile-information-birthday">
      <div class="user-center-profile-information-birthday-text">出生年月</div>
      <div
        v-for="(item , index) in birthdayData"
        :key="index"
        :class="index !==birthdayData.length-1 ? 'user-center-profile-information-birthday-select' : ''"
      >
        <base-select
          :sdata="item"
          :selectTag="birthday[index]"
          :showText="showBirthdayText[index]"
          :swidth="80"
          :disabled="birthdayDisabled[index]"
          @changeItem="changeBirthday($event,index)"
        >
        </base-select>
      </div>
    </div>

    <div class="user-center-profile-information-personal">
      <div class="user-center-profile-information-personal-text">个人介绍</div>
      <!-- markdown -->
    </div>

    <div
      class="user-center-profile-information-button"
      role="button"
    >
      保存
    </div>

  </div>
</template>

<script>
import { computed, defineComponent, ref, reactive } from 'vue';
import BaseSelect from '@/components/content/baseSelect/BaseSelect.vue';
/**
 * @description: 基本信息模块
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'userCenterProfileEdit',
  components: {
    BaseSelect,
  },
  setup(props, context) {
    const nickName = ref('1233');

    const genderData = reactive({ key: 'message_prompt', value: 3 });

    const radiomenus = computed(() => {
      return [
        { lable: '男', value: 1 },
        { lable: '女', value: 2 },
        { lable: '保密', value: 3 },
      ];
    });

    function input(e) {
      nickName.value = e.target.value;
    }

    function changeGender() {
      console.log(genderData.value);
    }

    const cityData = computed(() => {
      return [
        [
          '学生1',
          '打工仔1',
          '老板1',
          '学生2',
          '打工仔2',
          '老板2',
          '学生3',
          '打工仔3',
          '老板3',
          '学生4',
          '打工仔4',
          '老板4',
          '学生5',
          '打工仔5',
          '老板5',
          '学生6',
          '打工仔6',
          '老板6',
          '学生7',
          '打工仔7',
          '老板7',
        ],
        [
          '学生1',
          '打工仔1',
          '老板1',
          '学生2',
          '打工仔2',
          '老板2',
          '学生3',
          '打工仔3',
          '老板3',
          '学生4',
          '打工仔4',
          '老板4',
          '学生5',
          '打工仔5',
          '老板5',
          '学生6',
          '打工仔6',
          '老板6',
          '学生7',
          '打工仔7',
          '老板7',
        ],
        [
          '学生1',
          '打工仔1',
          '老板1',
          '学生2',
          '打工仔2',
          '老板2',
          '学生3',
          '打工仔3',
          '老板3',
          '学生4',
          '打工仔4',
          '老板4',
          '学生5',
          '打工仔5',
          '老板5',
          '学生6',
          '打工仔6',
          '老板6',
          '学生7',
          '打工仔7',
          '老板7',
        ],
      ];
    });

    const city = reactive(['', '', '']);

    const showCityText = ['国家', '省份/地区', '城市'];

    const cityDisabled = reactive([false, true, true]);
    function changeCity($event, index) {
      city[index] = $event;
      if (cityDisabled[1] && index === 0) cityDisabled[1] = false;
      if (cityDisabled[2] && index === 1) cityDisabled[2] = false;
    }

    const birthdayData = computed(() => {
      return [
        [
          '学生1',
          '打工仔1',
          '老板1',
          '学生2',
          '打工仔2',
          '老板2',
          '学生3',
          '打工仔3',
          '老板3',
          '学生4',
          '打工仔4',
          '老板4',
          '学生5',
          '打工仔5',
          '老板5',
          '学生6',
          '打工仔6',
          '老板6',
          '学生7',
          '打工仔7',
          '老板7',
        ],
        [
          '学生1',
          '打工仔1',
          '老板1',
          '学生2',
          '打工仔2',
          '老板2',
          '学生3',
          '打工仔3',
          '老板3',
          '学生4',
          '打工仔4',
          '老板4',
          '学生5',
          '打工仔5',
          '老板5',
          '学生6',
          '打工仔6',
          '老板6',
          '学生7',
          '打工仔7',
          '老板7',
        ],
        [
          '学生1',
          '打工仔1',
          '老板1',
          '学生2',
          '打工仔2',
          '老板2',
          '学生3',
          '打工仔3',
          '老板3',
          '学生4',
          '打工仔4',
          '老板4',
          '学生5',
          '打工仔5',
          '老板5',
          '学生6',
          '打工仔6',
          '老板6',
          '学生7',
          '打工仔7',
          '老板7',
        ],
      ];
    });

    const birthday = reactive(['', '', '']);

    const showBirthdayText = ['年', '月', '日'];

    const birthdayDisabled = reactive([false, true, true]);
    function changeBirthday($event, index) {
      birthday[index] = $event;
      if (birthdayDisabled[1] && index === 0) birthdayDisabled[1] = false;
      if (birthdayDisabled[2] && index === 1) birthdayDisabled[2] = false;
    }

    return {
      nickName,
      input,
      genderData,
      radiomenus,
      changeGender,

      cityData,
      city,
      showCityText,
      changeCity,
      cityDisabled,

      birthdayData,
      birthday,
      showBirthdayText,
      changeBirthday,
      birthdayDisabled,
    };
  },
});
</script>

<style lang='scss' scoped>
:deep(.el-radio) {
  color: $grey-7;

  .el-radio__inner {
    width: 20px;
    height: 20px;
    background: transparent;
    box-sizing: border-box;
    border: 2px solid $grey-7;
    border-color: $grey-7;
    box-shadow: $shadow-0;

    &::after {
      box-shadow: $shadow-2;
      background-color: $green-1;
      width: 10px;
      height: 10px;
    }

    &:hover {
      border: 2px solid $green-1;
    }
  }

  .el-radio__input.is-checked + .el-radio__label {
    color: $green-1;
  }

  .el-radio__input.is-checked .el-radio__inner {
    background: $grey-0;
    border-color: $green-1;
    box-shadow: $shadow-2;
  }
}

.user-center-profile-information {
  display: flex;
  flex-direction: column;
  width: 926px;
  margin-top: 16px;
  background-color: $grey-0;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;

  .user-center-profile-information-title {
    padding: 12px 0 12px 24px;
    color: $grey-10;
    border-bottom: 1px solid $grey-4;
    font-size: 16px;
    line-height: 21px;
  }

  .user-center-profile-information-nickname {
    display: flex;
    align-items: center;
    padding: 24px;

    .user-center-profile-information-nickname-text {
      font-size: 14px;
      line-height: 19px;
      margin-right: 52px;
      color: $grey-7;
    }

    .user-center-profile-information-nickname-input {
      width: 200px;
      height: 32px;
      padding: 6px 8px;
      outline-style: none;
      border: 0px;
      background-color: $grey-0;
      border-radius: $border-radius-1;
      box-shadow: $shadow-0;
      font-size: 14px;
      color: $grey-10;
      &:hover {
        box-shadow: $shadow-2;
        color: $green-1;
      }

      &:focus {
        box-shadow: $shadow-2;
        color: $green-1;
      }
    }
  }

  .user-center-profile-information-gender {
    display: flex;
    align-items: center;
    padding: 0 24px 24px 24px;
    .user-center-profile-information-gender-text {
      font-size: 14px;
      line-height: 19px;
      margin-right: 52px;
      color: $grey-7;
    }
  }

  .user-center-profile-information-city {
    display: flex;
    align-items: center;
    padding: 0 24px 24px 24px;

    .user-center-profile-information-city-text {
      font-size: 14px;
      line-height: 19px;
      margin-right: 52px;
      color: $grey-7;
    }
    .user-center-profile-information-city-select {
      margin-right: 8px;
    }
  }

  .user-center-profile-information-birthday {
    display: flex;
    align-items: center;
    padding: 0 24px 24px 24px;

    .user-center-profile-information-birthday-text {
      font-size: 14px;
      line-height: 19px;
      margin-right: 24px;
      color: $grey-7;
    }

    .user-center-profile-information-birthday-select {
      margin-right: 8px;
    }
  }
  .user-center-profile-information-personal {
    display: flex;
    align-items: center;
    padding: 0 24px 24px 24px;

    .user-center-profile-information-personal-text {
      font-size: 14px;
      line-height: 19px;
      margin-right: 24px;
      color: $grey-7;
    }
  }

  .user-center-profile-information-button {
    margin: auto;
    width: 60px;
    height: 30px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $green-0;
    color: $grey-0;
    border-radius: 15px;
    box-shadow: $shadow-0;

    &:hover {
      background-color: $green-1;
      box-shadow: $shadow-2;
    }
  }
}
</style>
