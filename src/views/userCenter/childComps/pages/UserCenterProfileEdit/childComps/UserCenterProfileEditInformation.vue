<!--
 * @Description:基本信息模块
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-08-28 23:20:26
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-07 11:57:43
-->

<template>
  <div class="user-center-profile-information">
    <div class="user-center-profile-information-title">基本信息</div>
    <div class="user-center-profile-information-nickname">
      <div class="user-center-profile-information-nickname-text">昵称</div>
      <user-center-input
        v-model="nickName"
        :style="{width: '200px'}"
        ref="inputRef"
        :verify="inputVerify"
        :maxlength="20"
      />
    </div>

    <div class="user-center-profile-information-gender">
      <div class="user-center-profile-information-gender-text">性别</div>
      <div class="user-center-profile-information-gender-radio">
        <el-radio-group v-model="genderData">
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
        <user-center-select
          :sdata="item"
          :selectTag="city[index]"
          :showText="showCityText[index]"
          :swidth="150"
          :disabled="cityDisabled[index]"
          @changeItem="changeCity($event,index)"
        >
        </user-center-select>
      </div>
    </div>

    <div class="user-center-profile-information-birthday">
      <div class="user-center-profile-information-birthday-text">出生年月</div>
      <div
        v-for="(item , index) in birthdayData"
        :key="index"
        :class="index !==birthdayData.length-1 ? 'user-center-profile-information-birthday-select' : ''"
      >
        <user-center-select
          :sdata="item"
          :selectTag="birthday[index]"
          :showText="showBirthdayText[index]"
          :swidth="80"
          :disabled="birthdayDisabled[index]"
          @changeItem="changeBirthday($event,index)"
        >
        </user-center-select>
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
          height="244px"
        />
      </div>
    </div>

    <div
      class="user-center-profile-information-button"
      role="button"
      @click="saveInformation"
    >
      保存
    </div>

  </div>
</template>

<script>
import { computed, defineComponent, ref, reactive, watch } from 'vue';
import UserCenterSelect from '@/views/userCenter/childComps/UserCenterSelect.vue';
import UserCenterInput from '@/views/userCenter/childComps/UserCenterInput.vue';
import location from '@/util/json/location';

/**
 * @description: 基本信息模块
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'userCenterProfileEdit',
  components: {
    UserCenterSelect,
    UserCenterInput,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    const nickName = ref(props.data.nickname); //昵称

    const genderData = ref(props.data.gender); //性别

    const radiomenus = computed(() => {
      return [
        { lable: '男', value: 0 },
        { lable: '女', value: 1 },
        { lable: '保密', value: 2 },
      ];
    });

    const cityData = computed(() => {
      return [[], [], []];
    });

    const city = reactive(['', '', '']); //保存家乡信息

    for (let i = 0; i < location.Country.length; i++) {
      cityData.value[0].push(location.Country[i].CountryName);
    }

    const showCityText = ['国家', '省份/地区', '城市'];

    const cityDisabled = reactive([false, true, true]);

    let countryIndex = 0;
    let stateIndex = 0;

    /**
     * @description: 更改地址信息显示
     * @param {Number} event 记录地址数据下标
     * @param {Number} index 更改的是三个地址中的哪个
     * @author: Z_Y_C
     */

    function changeCity($event, index) {
      if (index === 0) {
        countryIndex = $event;
        city[1] = '省份/地区';
        city[2] = '城市';
        city[0] = location.Country[$event].CountryName;
        cityData.value[1] = [];
        for (let i = 0; i < location.Country[$event].State.length; i++) {
          cityData.value[1].push(location.Country[$event].State[i].StateName);
        }
        if (cityData.value[1].length === 0) cityDisabled[1] = true;
        else cityDisabled[1] = false;
        cityDisabled[2] = true;
      } else if (index === 1) {
        stateIndex = $event;
        city[1] = location.Country[countryIndex].State[$event].StateName;
        city[2] = '城市';
        cityData.value[2] = [];
        for (let i = 0; i < location.Country[countryIndex].State[$event].City.length; i++) {
          cityData.value[2].push(location.Country[countryIndex].State[$event].City[i].CityName);
        }
        if (cityData.value[2].length === 0) cityDisabled[2] = true;
        else cityDisabled[2] = false;
      } else {
        city[2] = location.Country[countryIndex].State[stateIndex].City[$event].CityName;
      }
    }

    const birthdayData = reactive([[], [], []]); //日期数据

    const birthday = reactive(['', '', '']); //保存出生日期信息

    const showBirthdayText = ['年', '月', '日'];

    const MonHead = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const y = new Date().getFullYear();
    for (let i = y; i >= 1900; i--) birthdayData[0].push(i + '');
    for (let i = 1; i <= 12; i++) birthdayData[1].push(i + '');

    const birthdayDisabled = reactive([false, true, true]);

    /**
     * @description: 更改出生日期信息显示
     * @param {Number} event 记录日期下标下标
     * @param {Number} index 更改的是三个日期中的哪个
     * @author: Z_Y_C
     */
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
      getDate();
    }

    /**
     * @description: 得到该月的天数
     * @author: Z_Y_C
     */

    function getDate() {
      birthdayData[2] = [];
      for (let i = 1; i <= MonHead[parseInt(birthday[1] - 1)]; i++) {
        birthdayData[2].push(i + '');
      }
      if (
        0 === parseInt(birthday[0]) % 4 &&
        (parseInt(birthday[0]) % 100 !== 0 || parseInt(birthday[0]) % 400 === 0) &&
        birthday[1] === '2'
      )
        birthdayData[2].push('29');

      if (parseInt(birthday[2]) > parseInt(birthdayData[2][birthdayData[2].length - 1])) {
        birthday[2] = birthdayData[2][birthdayData[2].length - 1];
      }
    }

    const text = ref(''); //保存个人简介信息

    //监听username信息变化，来改变显示的值
    watch(
      () => props.data.username,
      () => {
        nickName.value = props.data.nickname;
        if (props.data.gender === null) genderData.value = 2;
        else genderData.value = props.data.gender;

        if (props.data.city !== null) {
          city.splice(0, props.data.city.split(',').length, ...props.data.city.split(','));
          if (props.data.city.split(',').length === 1) cityDisabled[1] = false;
          if (props.data.city.split(',').length > 1) {
            cityDisabled[1] = false;
            cityDisabled[2] = false;
          }
          for (let i = 0; i < cityData.value[0].length; i++) {
            if (city[0] === cityData.value[0][i]) {
              for (let j = 0; j < location.Country[i].State.length; j++) {
                cityData.value[1].push(location.Country[i].State[j].StateName);
                if (location.Country[i].State[j].StateName === city[1]) {
                  for (let k = 0; k < location.Country[i].State[j].City.length; k++) {
                    cityData.value[2].push(location.Country[i].State[j].City[k].CityName);
                  }
                }
              }
            }
          }
        }
        const brit = new Date(props.data.birthday);
        birthday[0] = brit.getFullYear() + '';
        birthday[1] = brit.getMonth() + 1 + '';
        birthday[2] = brit.getDate() + '';
        birthdayDisabled[1] = false;
        birthdayDisabled[2] = false;
        getDate();
        if (props.data.profile === null) text.value = '';
        else text.value = props.data.profile;
      }
    );

    /**
     * @description: 保存个人基本信息
     * @author: Z_Y_C
     */
    function saveInformation() {
      if (inputRef.value.check({ message: '昵称不为空', duration: 2000 })) {
        let saveCity = props.data.city; //处理家乡数据
        if (city[0] !== '') {
          saveCity = city[0];
          if (city[1] !== '' && city[1] !== '省份/地区') {
            saveCity += ',' + city[1];
            if (city[2] !== '' && city[2] !== '城市') saveCity += ',' + city[2];
          }
        }

        let saveBirthday = props.data.birthday; //处理生日数据
        if (birthday[0] !== '') saveBirthday = birthday[0] + ',' + birthday[1] + ',' + birthday[2];

        const brits = new Date(props.data.birthday); //处理生日
        console.log(props.data.birthday);
        const times = brits.getFullYear() + ',' + (brits.getMonth() + 1) + ',' + brits.getDate();

        let saveGender = genderData.value;
        if (saveGender === 2) saveGender = null;
        if (
          props.data.nickname !== nickName.value ||
          props.data.gender !== saveGender ||
          props.data.city !== saveCity ||
          times !== saveBirthday ||
          props.data.profile !== text.value ||
          (props.data.profile === null && text.value === '')
        ) {
          context.emit('changeInformation', {
            type: 0,
            nickname: nickName.value,
            gender: genderData.value,
            city: saveCity,
            birthday: saveBirthday,
            profile: text.value,
          });
        }
      }
    }

    const inputRef = ref(null); // input ref
    function inputVerify(value) {
      return value !== '';
    }

    return {
      nickName,
      genderData,
      radiomenus,

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
      saveInformation,

      inputRef,
      inputVerify,
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

      :deep(.v-md-editor) {
        z-index: 9999999999;
      }
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
