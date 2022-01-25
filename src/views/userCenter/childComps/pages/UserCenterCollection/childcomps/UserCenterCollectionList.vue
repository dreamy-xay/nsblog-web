<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2021-08-24 10:18:28
 * @LastEditors: continue-hs
 * @LastEditTime: 2022-01-25 13:29:47
-->
<template>
  <div class="user-center-collection-list">
    <div
      class="user-center-collection-list-new"
      role="button"
      @click="isVisible = true"
    >
      <i class="iconfont blog-wenjianjia"></i>
      <div class="newcollection">新建文件夹</div>
    </div>
    <div class="user-center-collection-list-other">
      <el-scrollbar>
        <div
          :class="{active : index === Index}"
          class="collection-name"
          role="button"
          v-for="(item,index) in favorites"
          :key="index"
          @click="chooseActive(index)"
        >
          <i
            v-if="!item.is_private"
            class="iconfont blog-weibiaoti5"
          ></i>
          <i
            v-else
            class="iconfont blog-jiami"
          ></i>
          <div class="collection">{{item.name}}</div>
          <n-badge
            :value="item.count"
            :max="99"
            :color="styles.orange0"
            v-if="item.count > -1"
          />
        </div>
      </el-scrollbar>
    </div>
    <n-modal
      title="新建文件夹"
      :show="isVisible"
      class="user-center-collection-list-new-modal"
      preset="card"
      :closable="true"
      @close="isVisible = false"
    >
      <div class="user-center-collection-list-new-modal-title">收藏夹名称</div>
      <base-input
        class="input-title"
        v-model="inputTitle"
        type="text"
        :show-Close="true"
        :maxlength="20"
      >
      </base-input>
      <div class="user-center-collection-list-new-modal-detail">描述</div>
      <el-input
        class="input-remark"
        v-model="inputRemark"
        type="textarea"
        :rows="7"
        maxlength="128"
        @keydown.enter="newfavorites(inputTitle, inputRemark, !radio,false,true)"
        show-word-limit
      >
      </el-input>
      <el-checkbox
        class="option"
        v-model="radio"
        label="公开收藏夹"
      ></el-checkbox>
      <template #footer>
        <div
          class="submit"
          role="button"
          @click="newfavorites(inputTitle, inputRemark, !radio,true,false)"
        >提交</div>
      </template>
    </n-modal>
    <base-modal
      content="确定要新建文件夹嘛(⊙o⊙)"
      confirmeText="确认"
      :show="modalShow"
      @confirm="newfavorites(inputTitle, inputRemark, !radio,true)"
      @cancel="newfavorites(inputTitle, inputRemark, !radio,false)"
    />
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import styles from '@/assets/style/define.scss';
import { useMessage } from 'naive-ui';
import BaseInput from '@/components/content/baseInput/BaseInput.vue';
import BaseModal from '@/components/content/baseModal/BaseModal.vue';

export default defineComponent({
  name: 'usercentercollectionlist',
  emits: {
    'change-index': null,
    'new-fav': null,
  },
  components: {
    BaseInput,
    BaseModal,
  },
  props: {
    activeIndex: {
      type: Number,
      default: 0,
    },
    favorites: {
      type: Array,
      default: null,
    },
  },
  setup(props, context) {
    const isVisible = ref(false);
    const radio = ref(true);
    const msg = useMessage(); //message提示
    const inputTitle = ref('');
    const inputRemark = ref('');
    const modalShow = ref(false);
    const Index = ref(0);

    //监听收藏夹改变，使滚动条回到顶部
    watch(
      () => props.activeIndex,
      (value) => {
        if (Index.value !== value) {
          Index.value = value;
        }
      }
    );

    /**
     * @description: 改变显示收藏夹
     * @param {number} index 显示收藏夹下标
     * @return {void}
     * @author: continue-hs
     */
    function chooseActive(index) {
      this.$emit('change-index', index);
    }

    /**
     * @description: 新建文件夹
     * @return {void}
     * @author: continue-hs
     */
    function newfavorites(name, remark, is_private, isConfirm, isConfirmModal = false) {
      if (isConfirm) {
        if (name !== '') {
          context.emit('new-fav', [name, remark, is_private]);
          isVisible.value = false;
          inputTitle.value = '';
          inputRemark.value = '';
          radio.value = true;
        } else msg.error('收藏夹标题为必填项');
      }
      modalShow.value = isConfirmModal;
    }

    return {
      radio,
      isVisible,
      chooseActive,
      styles,
      newfavorites,
      inputTitle,
      inputRemark,
      modalShow,
      Index,
    };
  },
});
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}

.user-center-collection-list {
  @include size(180px, 626px);
  overflow: hidden;

  .user-center-collection-list-new {
    @include size(180px, 60px);
    color: $grey-7;
    border-bottom: 1px solid #e5e5e5;

    i {
      padding-left: 30px;
      position: relative;
      top: 18px;
    }

    .newcollection {
      margin-left: 56px;
    }
  }

  .user-center-collection-list-other {
    @include size(180px, 565px);

    :deep(.el-scrollbar__thumb) {
      background-color: $grey-7 !important;
    }

    .collection-name {
      @include size(180px, 60px);
      display: flex;
      color: $grey-7;
      border-bottom: 1px solid $grey-4;
      .n-badge {
        padding: 35px 0 0 20px;
      }

      &.active {
        background: $grey-2;
      }

      i {
        padding: 19px 0 0 30px;
      }

      .collection {
        @include size(70px, 19px);
        @include ellipsis(1);
        padding: 19px 0 0 10px;
      }
    }
  }
}

.user-center-collection-list-new-modal {
  .user-center-collection-list-new-modal-title {
    @include size(75px, 20px);
    margin-top: 10px;
    color: $grey-8;
    font-size: 15px;
  }

  .input-title {
    border-radius: 4px;
    box-shadow: 0 0 6px 0 $green-0;
    margin-top: 10px;
  }

  .user-center-collection-list-new-modal-detail {
    @include size(30px, 20px);
    margin-top: 16px;
    color: $grey-8;
    font-size: 15px;
  }

  .input-remark {
    margin-top: 10px;
    border-radius: 4px;
    box-shadow: 0 0 6px 0 $green-0;

    :deep(.el-textarea__inner) {
      resize: none;
      padding: 6px 8px;
      &:hover,
      &:focus {
        color: $green-1;
        box-shadow: $shadow-2;
        border-color: $grey-0;
      }
    }
  }

  .option {
    margin-top: 16px;

    :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
      background-color: $green-0;
      border-color: $green-0;
    }

    :deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
      color: $green-0;
    }

    :deep(.el-checkbox__inner) {
      border-color: #bfbfbf;
    }
  }
  .option-text {
    margin-left: 8px;
  }

  :deep(.el-checkbox__label) {
    color: #707070;
  }
}
.option-text {
  margin-left: 8px;
}

.submit {
  @include size(67px, 30px);
  @include flex(center, center);
  float: right;
  color: $grey-0;
  background: $green-0;
  border-radius: 8px;
  box-shadow: $shadow-0;

  &:hover {
    background: $green-1;
  }
}
</style>
 <style lang="scss">
.user-center-collection-list-new-modal {
  background-color: $grey-0;
  width: 446px;
  height: 441px;
  border-radius: 8px;
  box-shadow: $shadow-0;
}
</style>
