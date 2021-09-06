<!--
 * @Description:工作信息模块
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-08-19 11:57:31
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-06 11:09:28
-->
<template>
  <div class="user-center-profile-job-edit">
    <div class="user-center-profile-job-edit-title">工作信息</div>
    <div class="user-center-profile-job-edit-describe1">
      <div class="user-center-profile-job-edit-describe1-text">职业</div>
      <user-center-select
        :swidth="150"
        :sdata="professionData"
        :selectTag="profession"
        @changeItem="changeProfession"
      ></user-center-select>
    </div>

    <div class="user-center-profile-job-edit-describe2">
      <div class="user-center-profile-job-edit-describe2-text">现居住地</div>

      <div
        v-for="(item , index) in addressData"
        :key="index"
        :class="index !==addressData.length-1 ? 'user-center-profile-job-edit-describe2-select' : ''"
      >
        <user-center-select
          :sdata="item"
          :selectTag="address[index]"
          :showText="showAddressText[index]"
          :swidth="150"
          :disabled="addressDisabled[index]"
          @changeItem="changeAddress($event,index)"
        >
        </user-center-select>
      </div>
    </div>

    <div
      class="user-center-profile-job-edit-button"
      role="button"
    >
      保存
    </div>

  </div>
</template>

<script>
import { computed, defineComponent, ref, reactive, watch } from 'vue';
import UserCenterSelect from '@/views/userCenter/childComps/UserCenterSelect.vue';
import location from '@/util/json/location';

/**
 * @description: 工作信息模块
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'userCenterProfileEdit',
  components: {
    UserCenterSelect,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    const professionData = computed(() => {
      return [
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
      ];
    });

    const profession = ref('');

    function changeProfession(data) {
      profession.value = professionData.value[data];
    }

    const addressData = computed(() => {
      return [([], [], [])];
    });

    const address = reactive(['', '', '']);

    for (let i = 0; i < location.Country.length; i++) {
      addressData.value[0].push(location.Country[i].CountryName);
    }
    const showAddressText = ['国家', '省份/地区', '城市'];

    const addressDisabled = reactive([false, true, true]);
    let countryIndex = 0;
    let stateIndex = 0;
    function changeAddress($event, index) {
      if (index === 0) {
        countryIndex = $event;
        address[1] = '省份/地区';
        address[2] = '城市';
        address[0] = location.Country[$event].CountryName;
        addressData.value[1] = [];
        for (let i = 0; i < location.Country[$event].State.length; i++) {
          addressData.value[1].push(location.Country[$event].State[i].StateName);
        }
        if (addressData.value[1].length === 0) addressDisabled[1] = true;
        else addressDisabled[1] = false;
        addressDisabled[2] = true;
      } else if (index === 1) {
        stateIndex = $event;
        address[1] = location.Country[countryIndex].State[$event].StateName;
        address[2] = '城市';
        addressData.value[2] = [];
        for (let i = 0; i < location.Country[countryIndex].State[$event].City.length; i++) {
          addressData.value[2].push(location.Country[countryIndex].State[$event].City[i].CityName);
        }
        if (addressData.value[2].length === 0) addressDisabled[2] = true;
        else addressDisabled[2] = false;
      } else {
        address[2] = location.Country[countryIndex].State[stateIndex].City[$event].CityName;
      }
    }

    watch(
      () => props.data.username,
      () => {
        profession.value = props.data.profession;

        address.splice(0, props.data.address.split(',').length, ...props.data.address.split(','));
        if (props.data.address.split(',').length === 1) addressDisabled[1] = false;
        if (props.data.address.split(',').length > 1) {
          addressDisabled[1] = false;
          addressDisabled[2] = false;
        }
        for (let i = 0; i < addressData.value[0].length; i++) {
          if (address[0] === addressData.value[0][i]) {
            for (let j = 0; j < location.Location[i].State.length; j++) {
              addressData.value[1].push(location.Location[i].State[j].StateName);
              if (location.Location[i].State[j].StateName === address[1]) {
                for (let k = 0; k < location.Location[i].State[j].City.length; k++) {
                  addressData.value[2].push(location.Location[i].State[j].City[k].CityName);
                }
              }
            }
          }
        }
      }
    );

    return {
      professionData,
      profession,
      changeProfession,

      addressData,
      address,
      showAddressText,
      changeAddress,
      addressDisabled,
    };
  },
});
</script>

<style lang='scss' scoped>
.user-center-profile-job-edit {
  display: flex;
  flex-direction: column;
  width: 926px;
  margin-top: 16px;
  background-color: $grey-0;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;

  .user-center-profile-job-edit-title {
    padding: 12px 0 12px 24px;
    color: $grey-10;
    border-bottom: 1px solid $grey-4;
    font-size: 16px;
    line-height: 21px;
  }

  .user-center-profile-job-edit-describe1 {
    display: flex;
    align-items: center;
    padding: 24px;

    .user-center-profile-job-edit-describe1-text {
      font-size: 14px;
      line-height: 19px;
      margin-right: 52px;
      color: $grey-7;
    }
  }

  .user-center-profile-job-edit-describe2 {
    display: flex;
    align-items: center;
    padding: 0 24px 24px 24px;

    .user-center-profile-job-edit-describe2-text {
      font-size: 14px;
      line-height: 19px;
      margin-right: 24px;
      color: $grey-7;
    }

    .user-center-profile-job-edit-describe2-select {
      margin-right: 8px;
    }
  }

  .user-center-profile-job-edit-button {
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
