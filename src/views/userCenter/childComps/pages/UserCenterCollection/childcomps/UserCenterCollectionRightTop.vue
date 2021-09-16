<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2021-09-01 16:41:52
 * @LastEditors: continue-hs
 * @LastEditTime: 2021-09-11 19:12:11
-->
<template>
  <div class="user-center-collection-right-top">
    <div
      class="user-center-collection-right-top-name"
      role="button"
      v-show="!isEditName"
      @click="editName"
    >
      {{data.name ? data.name : '编辑收藏夹标题~ o(*￣▽￣*)o'}}
      <i
        class="iconfont blog-bianji1"
        role="button"
      ></i>
    </div>
    <user-center-input
      class="user-center-collection-right-top-nametext"
      v-show="isEditName"
      type="text"
      v-model="inputName"
      ref="nameInput"
      :maxlength="100"
      @blur="updateName(false,true)"
      show-close
    />
    <div
      class="user-center-collection-right-top-remark"
      role="button"
      v-show="!isEditRemark"
      @click="editRemark"
    >
      {{data.remark ? data.remark : '编辑收藏夹描述~ o(*￣▽￣*)o'}}
      <i
        class="iconfont blog-bianji1"
        role="button"
      ></i>
    </div>
    <user-center-input
      class="user-center-collection-right-top-remarktext"
      v-show="isEditRemark"
      type="text"
      v-model="inputRemark"
      ref="remarkInput"
      :maxlength="100"
      @blur="updateRemark(false,true)"
      show-close
    />
    <div class="user-center-collection-right-top-button">
      <div
        class="button1"
        role="button"
        v-text="data.is_private? '取消私有' : '私有'"
        @click="updateprivate(false,true)"
      ></div>
      <div
        class="button2"
        role="button"
        @click="deleteFav(false,true)"
      >删除</div>
    </div>
  </div>
  <base-modal
    :show="confirmNameModal"
    @confirm="updateName(true)"
    @cancel="updateName(false)"
    content="确认修改收藏夹标题~ o(*￣▽￣*)o"
    confirmeText="确认修改"
  />
  <base-modal
    :show="confirmRemarkModal"
    @confirm="updateRemark(true)"
    @cancel="updateRemark(false)"
    content="确认修改收藏夹描述~ o(*￣▽￣*)o"
    confirmeText="确认修改"
  />
  <base-modal
    content="确认要取消私有嘛~ o(*￣▽￣*)o"
    confirmeText="确认"
    :show="confirmPrivateModal"
    @confirm="updateprivate(true)"
    @cancel="updateprivate(false)"
  />
  <base-modal
    content="确认要设为私有嘛~ o(*￣▽￣*)o"
    confirmeText="确认"
    :show="isConfirmPrivateModal"
    @confirm="updateprivate(true)"
    @cancel="updateprivate(false)"
  />
  <base-modal
    content="删除了就没有咯(⊙o⊙)"
    confirmeText="确认删除"
    :show="modalShow"
    @confirm="deleteFav(true)"
    @cancel="deleteFav(false)"
  />
</template>

<script>
import { defineComponent, ref, nextTick, watch } from 'vue';
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
      required: true,
    },
  },
  setup(props, context) {
    const inputName = ref(props.data.name); //收藏夹标题输入内容
    const isEditName = ref(false); //编辑收藏夹标题
    const confirmNameModal = ref(false); //编辑收藏夹标题确认框
    const nameInput = ref(null);
    const inputRemark = ref(props.data.remark); //收藏夹描述输入内容
    const isEditRemark = ref(false); //编辑收藏夹描述
    const confirmRemarkModal = ref(false); //编辑收藏夹描述确认框
    const remarkInput = ref(null);
    const confirmPrivateModal = ref(false); //设为私有确认框
    const isConfirmPrivateModal = ref(false); //取消私有确认框
    const modalShow = ref(false);
    //watch收藏夹标题
    watch(
      () => props.data.name,
      (value) => {
        inputName.value = value;
      }
    );

    //watch收藏夹标题
    watch(
      () => props.data.remark,
      (value) => {
        inputRemark.value = value;
      }
    );

    /**
     * @description: 编辑收藏夹标题
     * @return {void}
     * @author: continue-hs
     */
    function editName() {
      isEditName.value = true;
      nextTick(() => {
        nameInput.value.userCenterInput.focus();
      });
    }

    /**
     * @description: 更新删除收藏夹标题及确认框的显示
     * @return {void}
     * @author: continue-hs
     */
    function updateName(isConfirm, isConfirmNameModal = false) {
      if (isConfirm) {
        if (inputName.value !== props.data.name)
          context.emit('updateName', inputName.value, () => {
            inputName.value = props.data.name;
          });
      }
      confirmNameModal.value = isConfirmNameModal;
      if (!isConfirmNameModal) {
        isEditName.value = false;
        if (!isConfirm) inputName.value = props.data.name;
      }
    }

    /**
     * @description: 编辑收藏夹标题
     * @return {void}
     * @author: continue-hs
     */
    function editRemark() {
      isEditRemark.value = true;
      nextTick(() => {
        remarkInput.value.userCenterInput.focus();
      });
    }

    /**
     * @description: 更新删除收藏夹描述及确认框的显示
     * @return {void}
     * @author: continue-hs
     */
    function updateRemark(isConfirm, isConfirmRemarkModal = false) {
      if (isConfirm) {
        if (inputRemark.value !== props.data.remark)
          context.emit('updateRemark', inputRemark.value, () => {
            inputRemark.value = props.data.remark;
          });
      }
      confirmRemarkModal.value = isConfirmRemarkModal;
      if (!isConfirmRemarkModal) {
        isEditRemark.value = false;
        if (!isConfirm) inputRemark.value = props.data.remark;
      }
    }

    /**
     * @description: 更新删除收藏夹类型及确认框的显示
     * @return {void}
     * @author: continue-hs
     */
    function updateprivate(isConfirm, isConfirmPrivate = false) {
      if (isConfirm) {
        if (props.data.is_private === true) {
          context.emit('updatePrivate', false);
          confirmPrivateModal.value = isConfirmPrivate;
        } else {
          context.emit('updatePrivate', true);
          isConfirmPrivateModal.value = isConfirmPrivate;
        }
      }
      if (isConfirmPrivate && !isConfirm) {
        if (props.data.is_private === true) confirmPrivateModal.value = true;
        else isConfirmPrivateModal.value = true;
      }
    }

    /**
     * @description: 更新删除收藏夹下标及确认框的显示
     * @param {number} index 选择的下标
     * @return {void}
     * @author: continue-hs
     */
    function deleteFav(isConfirm, isConfirmModal = false) {
      if (isConfirm) {
        context.emit('cancelf');
      }
      modalShow.value = isConfirmModal;
    }

    return {
      inputName,
      isEditName,
      confirmNameModal,
      editName,
      updateName,
      nameInput,
      remarkInput,
      inputRemark,
      isEditRemark,
      confirmRemarkModal,
      editRemark,
      updateRemark,
      confirmPrivateModal,
      isConfirmPrivateModal,
      updateprivate,
      deleteFav,
      modalShow,
    };
  },
});
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}

.user-center-collection-right-top {
  @include size(736px, 139px);

  .user-center-collection-right-top-name {
    color: $grey-8;
    padding: 17px 0 0 30px;
    height: 32px;
  }

  i {
    margin-left: 14px;
  }

  :deep(.user-center-input.user-center-collection-right-top-nametext input) {
    margin: 17px 0 0 30px !important;
  }

  .user-center-collection-right-top-remark {
    color: $grey-8;
    padding-left: 30px;
    height: 32px;
    display: flex;

    .user-center-collection-right-top-remarktext {
      width: 300px;
      @include ellipsis(1);
    }
  }

  :deep(.user-center-input.user-center-collection-right-top-remarktext input) {
    margin-left: 30px !important;
  }

  .user-center-collection-right-top-button {
    @include flex(center, flex-end);
    transition: all 0.25s;
    margin-top: 10px;

    .button1 {
      @include flex(center, center);
      @include size(70px, 30px);
      margin-right: 20px;
      color: $grey-2;
      background: $green-0;
      border-radius: 15px;
      box-shadow: $shadow-0;

      &:hover {
        background: $green-2;
      }
    }

    .button2 {
      @include flex(center, center);
      @include size(70px, 30px);
      color: $grey-2;
      margin-right: 30px;
      background: $green-0;
      border-radius: 15px;
      box-shadow: $shadow-0;

      &:hover {
        background: $green-1;
      }
    }
  }
}
</style>
