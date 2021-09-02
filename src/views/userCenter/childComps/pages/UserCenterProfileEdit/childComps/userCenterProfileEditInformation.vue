<!--
 * @Description:基本信息模块
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-08-28 23:20:26
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-02 13:30:45
-->

<template>
  <div class="user-center-profile-information">
    <div class="user-center-profile-information-title">基本信息</div>
    <div class="user-center-profile-information-nickname">
      <div class="user-center-profile-information-nickname-text">昵称</div>
      <user-center-input
        v-model="nickName"
        :style="{width: '200px'}"
      />
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
      <div class="user-center-profile-information-personal-markdown">
        <v-md-editor
          v-model="text"
          mode="edit"
          left-toolbar="undo redo clear| bold link code quote"
          @fullscreen-change="sss"
          height="244px"
        />
      </div>
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
import UserCenterInput from '@/views/userCenter/childComps/UserCenterInput.vue';
import location from '@/util/json/location';

/**
 * @description: 基本信息模块
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'userCenterProfileEdit',
  components: {
    BaseSelect,
    UserCenterInput,
  },
  setup(props, context) {
    const nickName = ref('12345');

    const genderData = reactive({ key: 'message_prompt', value: 3 });

    const radiomenus = computed(() => {
      return [
        { lable: '男', value: 1 },
        { lable: '女', value: 2 },
        { lable: '保密', value: 3 },
      ];
    });

    function changeGender() {
      console.log(genderData.value);
    }

    const cityData = reactive([[], [], []]);

    const city = reactive(['', '', '']);

    for (let i = 0; i < location.Location.length; i++) {
      cityData[0].push(location.Location[i].CountryRegion);
    }

    const showCityText = ['国家', '省份/地区', '城市'];

    const cityDisabled = reactive([false, true, true]);
    let countryIndex = 0;
    let stateIndex = 0;
    function changeCity($event, index) {
      if (index === 0) {
        countryIndex = $event;
        city[1] = '省份/地区';
        city[2] = '城市';
        city[0] = location.Location[$event].CountryRegion;
        cityData[1] = [];
        for (let i = 0; i < location.Location[$event].State.length; i++) {
          cityData[1].push(location.Location[$event].State[i].StateName);
        }
        if (cityData[1].length === 0) cityDisabled[1] = true;
        else cityDisabled[1] = false;
        cityDisabled[2] = true;
      } else if (index === 1) {
        stateIndex = $event;
        city[1] = location.Location[countryIndex].State[$event].StateName;
        city[2] = '城市';
        cityData[2] = [];
        for (let i = 0; i < location.Location[countryIndex].State[$event].City.length; i++) {
          cityData[2].push(location.Location[countryIndex].State[$event].City[i].CityName);
        }
        if (cityData[2].length === 0) cityDisabled[2] = true;
        else cityDisabled[2] = false;
      } else {
        city[2] = location.Location[countryIndex].State[stateIndex].City[$event].CityName;
      }
    }

    const birthdayData = reactive([[], [], []]);

    const birthday = reactive(['', '', '']);

    const showBirthdayText = ['年', '月', '日'];

    const MonHead = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const y = new Date().getFullYear();
    for (let i = y; i >= 1900; i--) birthdayData[0].push(i + '');
    for (let i = 1; i <= 12; i++) birthdayData[1].push(i + '');
    const birthdayDisabled = reactive([false, true, true]);
    function changeBirthday($event, index) {
      if (index === 0) {
        birthday[0] = birthdayData[0][$event];
        if (birthday[1] === '') {
          birthday[1] = '1';
          birthday[2] = '1';
        }

        birthdayDisabled[1] = false;
        birthdayDisabled[2] = false;
      } else if (index === 1) {
        birthday[1] = birthdayData[1][$event];
      } else {
        birthday[2] = birthdayData[2][$event];
      }
      birthdayData[2] = [];
      for (let i = 1; i <= MonHead[parseInt(birthday[1] - 1)]; i++) {
        birthdayData[2].push(i + '');
      }
      if (
        0 === parseInt(birthday[0]) % 4 &&
        (parseInt(birthday[0]) % 100 !== 0 || parseInt(birthday[0]) % 400 === 0) &&
        birthday[1] === '2'
      )
        birthdayData[2].push(29 + '');

      if (birthday[2] > birthdayData[2][birthdayData[2].length - 1]) {
        birthday[2] = birthdayData[2][birthdayData[2].length - 1];
      }
    }

    const text = ref('123123');

    function sss(event, isFullscreen) {
      console.log(event);
      console.log(isFullscreen);
    }

    return {
      nickName,
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

      text,
      sss,
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
    padding: 0 24px 24px 24px;

    .user-center-profile-information-personal-text {
      font-size: 14px;
      line-height: 19px;
      margin-right: 24px;
      color: $grey-7;
    }
    .user-center-profile-information-personal-markdown {
      width: 798px;
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
