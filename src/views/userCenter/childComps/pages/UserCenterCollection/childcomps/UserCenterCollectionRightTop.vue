<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2021-09-01 16:41:52
 * @LastEditors: continue-hs
 * @LastEditTime: 2021-09-05 10:57:12
-->
<template>
  <div class="user-center-collection-right-top">
    <div
      class="name"
      v-show="isClick1"
    >
      {{display.name}}
      <i
        class="iconfont blog-bianji1"
        role="button"
        @click="isClick1 = false"
      ></i>
    </div>
    <div class="name">
      <user-center-input
        v-show="!isClick1"
        type="text"
        v-model="inputName"
        ref="signtrueName"
        maxlength="50"
      />
    </div>

    <base-modal
      :show="confirmModalShow"
      @confirm="updateName(true)"
      @cancel="updateName(false)"
      content="确认修改收藏夹标题~ o(*￣▽￣*)o"
      confirmeText="确认修改"
    />
  </div>
</template>

<script>
import { defineComponent, ref, nextTick } from 'vue';
import UserCenterInput from '@/views/userCenter/childComps/UserCenterInput.vue';
import BaseModal from '@/components/content/baseModal/BaseModal.vue';

export default defineComponent({
  name: 'userCenterCollectionRightTop',
  components: {
    UserCenterInput,
    BaseModal,
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        name: '默认收藏夹',
        remark: '无',
        is_private: false,
      }),
    },
  },
  setup(props) {
    const inputName = ref(props.data.name); //标题输入内容
    const isEditName = ref(false); //
    const confirmNameModal = ref(false); //
    const nameInput = ref(null); //

    const inputRemark = ref(props.data.remark); //描述输入内容
    const isEditRemark = ref(false); //
    const confirmRemarkModal = ref(false); //
    const RemarkInput = ref(null); //

    /**
     * @description: 编辑收藏夹标题
     * @return {void}
     * @author: continue-hs
     */
    function editName() {
      isEditName.value = true;
      nextTick(() => {
        nameInput.value.UserCenterInput.focus();
      });
    }

    // function updataName(isConfirm,isConfirmM)
    return {
      inputName,
      isEditName,
      confirmNameModal,
      nameInput,
      inputRemark,
      isEditRemark,
      confirmRemarkModal,
      RemarkInput,
    };
  },
});
</script>
