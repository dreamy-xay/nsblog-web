<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2021-09-01 16:41:52
 * @LastEditors: continue-hs
 * @LastEditTime: 2022-01-24 19:10:18
-->
<template>
  <div class="user-center-collection-right-top">
    <div class="user-center-collection-right-top-text">
      <div
        class="user-center-collection-right-top-name"
        role="button"
        v-show="!isEditName"
      >
        <div class="user-center-collection-right-top-name-text">
          {{data.name ? data.name : '编辑收藏夹标题~ o(*￣▽￣*)o'}}
          <i
            class="iconfont blog-bianji1"
            role="button"
            @click="editName"
          ></i>
        </div>
      </div>
      <base-input
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
      </div>
      <base-input
        v-show="isEditRemark"
        type="text"
        v-model="inputRemark"
        ref="remarkInput"
        :maxlength="100"
        @blur="updateRemark(false,true)"
        show-close
      />
    </div>
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
import BaseInput from '@/components/content/baseInput/BaseInput.vue';
import BaseModal from '@/components/content/baseModal/BaseModal.vue';

export default defineComponent({
  name: 'userCenterCollectionRightTop',
  emits: {
    updateName: null,
    updateRemark: null,
    updatePrivate: null,
    cancelf: null,
  },
  components: {
    BaseInput,
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

    //watch收藏夹描述
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
     * @description: 更新收藏夹标题及确认框的显示
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
     * @description: 更新收藏夹描述及确认框的显示
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
     * @description: 更新收藏夹类型及确认框的显示
     * @return {void}
     * @author: continue-hs
     */
    function updateprivate(isConfirm, isConfirmPrivate = false) {
      if (isConfirm) {
        if (props.data.is_private === true) {
          context.emit('updatePrivate', false);
        } else {
          context.emit('updatePrivate', true);
        }
      }
      if (isConfirmPrivate && !isConfirm) {
        if (props.data.is_private === true) confirmPrivateModal.value = true;
        else isConfirmPrivateModal.value = true;
      }
      if (props.data.is_private === true) confirmPrivateModal.value = isConfirmPrivate;
      else isConfirmPrivateModal.value = isConfirmPrivate;
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
  @include size(736px, 136px);

  .user-center-collection-right-top-text {
    margin: 17px 0 0 30px;

    .user-center-collection-right-top-name {
      @include flex(center);

      .user-center-collection-right-top-name-text {
        color: $grey-8;
        padding: 6px 0 6px 8px;
        height: 20px;

        i {
          margin-left: 14px;
          height: 16px;
        }
      }
    }
    .user-center-collection-right-top-remark {
      color: $grey-8;
      padding: 6px 25px 6px 8px;
      @include ellipsis(1);
      @include size(673px, 20px);
    }
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
        background: $green-1;
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
