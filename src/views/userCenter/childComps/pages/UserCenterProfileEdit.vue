<!--
 * @Description:
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-19 11:57:31
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-08-26 21:45:12
-->
<template>
  <div class="user-center-profie-job">
    <div class="user-center-profie-job-title">工作信息</div>
    <div class="user-center-profie-job-describe1">
      <div class="user-center-profie-job-describe1-text">职业</div>
      <base-select
        :swidth="70"
        :sdata="professionData"
        :selectTag="profession"
        @changeItem="chandeProfession"
      ></base-select>
    </div>

    <div class="user-center-profie-job-describe2">
      <div class="user-center-profie-job-describe2-text">现居住地</div>

      <div class="user-center-profie-job-describe2-select">
        <base-select
          :swidth="150"
          :sdata="adressDataG"
          :selectTag="adressG"
          @changeItem="chandeadressG"
          showText="国家"
        ></base-select>
      </div>

      <div class="user-center-profie-job-describe2-select">
        <base-select
          :swidth="150"
          :sdata="adressDataS"
          :selectTag="adressS"
          @changeItem="chandeadressS"
          showText="省份/地区"
          :disabled="adressG==='' ? true : false"
        ></base-select>
      </div>

      <base-select
        :swidth="150"
        :sdata="adressDataC"
        :selectTag="adressC"
        @changeItem="chandeadressC"
        showText="城市"
        :disabled="adressS==='' ? true : false"
      ></base-select>
    </div>

    <div
      class="user-center-profie-job-button"
      role="button"
    >
      保存
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import BaseSelect from '@/components/content/baseSelect/BaseSelect.vue';

export default defineComponent({
  name: 'UserCenterProfileEdit',
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

    const adressDataG = computed(() => {
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

    const adressDataS = computed(() => {
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

    const adressDataC = computed(() => {
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

    const adressG = ref('');
    const adressS = ref('');
    const adressC = ref('');

    function chandeProfession(data) {
      profession.value = data;
    }

    function chandeadressG(data) {
      adressG.value = data;
    }

    function chandeadressS(data) {
      adressS.value = data;
    }
    function chandeadressC(data) {
      adressC.value = data;
    }

    return {
      professionData,
      profession,
      chandeProfession,

      adressDataG,
      adressG,
      chandeadressG,

      adressDataS,
      adressS,
      chandeadressS,

      adressDataC,
      adressC,
      chandeadressC,
    };
  },
});
</script>

<style lang='scss' scoped>
.user-center-profie-job {
  // height: 2000px;
  display: flex;
  flex-direction: column;
  // align-items: center;
  width: 926px;
  background-color: $grey-0;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;

  .user-center-profie-job-title {
    padding: 12px 0 12px 24px;
    color: $grey-10;
    border-bottom: 1px solid $grey-4;
    font-size: 16px;
    line-height: 21px;
  }

  .user-center-profie-job-describe1 {
    display: flex;
    align-items: center;
    padding: 24px;

    .user-center-profie-job-describe1-text {
      margin-right: 52px;
      color: $grey-7;
    }
  }

  .user-center-profie-job-describe2 {
    display: flex;
    align-items: center;
    padding: 0 24px 24px 24px;

    .user-center-profie-job-describe2-text {
      margin-right: 24px;
      color: $grey-7;
    }

    .user-center-profie-job-describe2-select {
      margin-right: 8px;
    }
  }

  .user-center-profie-job-button {
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
