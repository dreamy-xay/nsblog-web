<!--
 * @Description:工作信息模块
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-08-19 11:57:31
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-31 10:26:29
-->
<template>
  <div class="user-center-profile-job-edit">
    <div class="user-center-profile-job-edit-title">工作信息</div>
    <div class="user-center-profile-job-edit-describe1">
      <div class="user-center-profile-job-edit-describe1-text">职业</div>
      <base-select
        :swidth="150"
        :sdata="professionData"
        :selectTag="profession"
        @changeItem="changeProfession"
      ></base-select>
    </div>

    <div class="user-center-profile-job-edit-describe2">
      <div class="user-center-profile-job-edit-describe2-text">现居住地</div>

      <div
        v-for="(item , index) in adressData"
        :key="index"
        :class="index !==adressData.length-1 ? 'user-center-profile-job-edit-describe2-select' : ''"
      >
        <base-select
          :sdata="item"
          :selectTag="adress[index]"
          :showText="showAdressText[index]"
          :swidth="150"
          :disabled="adressDisabled[index]"
          @changeItem="changeAdress($event,index)"
        >
        </base-select>
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
import { computed, defineComponent, ref, reactive } from 'vue';
import BaseSelect from '@/components/content/baseSelect/BaseSelect.vue';

/**
 * @description: 工作信息模块
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'userCenterProfileEdit',
  components: {
    BaseSelect,
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
      profession.value = data;
    }

    const adressData = computed(() => {
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

    const adress = reactive(['', '', '']);

    const showAdressText = ['国家', '省份/地区', '城市'];

    const adressDisabled = reactive([false, true, true]);
    function changeAdress($event, index) {
      adress[index] = $event;
      if (adressDisabled[1] && index === 0) adressDisabled[1] = false;
      if (adressDisabled[2] && index === 1) adressDisabled[2] = false;
    }

    return {
      professionData,
      profession,
      changeProfession,

      adressData,
      adress,
      showAdressText,
      changeAdress,
      adressDisabled,
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
