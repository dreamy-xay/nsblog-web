<!--
 * @Description: 头像裁剪模态框
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-02 15:01:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-02 17:02:47
-->
<template>
  <n-modal
    display-directive="show"
    :show="modelValue"
  >
    <div class="avatar-cropper">
      <div class="avatar-cropper-header">
        更换头像
        <i
          class="iconfont blog-close"
          role="button"
          @click="closeModal"
        ></i>
      </div>
      <div class="avatar-cropper-body">
        <div class="left">
          <base-avatar-cropper
            ref="avatarCropperRef"
            :url="url"
            @changed="avatarCropperChange"
          />
        </div>
        <div
          class="right"
          v-show="effectShow"
        >
          <img
            :src="avatarCropperImageSrc"
            alt="image"
            @error="error"
          >
          <img
            :src="avatarCropperImageSrc"
            alt="image"
            @error="error"
          >
        </div>
      </div>
      <div class="avatar-cropper-footer">
        <div
          role="button"
          @click="submit"
        >上传并保存</div>
        <div
          role="button"
          @click="select"
        >选择图片</div>
      </div>
    </div>

  </n-modal>
</template>

<script>
import { defineComponent, ref } from 'vue';
import BaseAvatarCropper from '@/components/content/baseAvatarCropper/BaseAvatarCropper.vue';
import { base64ToFile } from '@/util/util';

/**
 * @description: 头像裁剪模态框
 * @param {Boolean} modelValue 模态框显示绑定值，使用v-model指令即可 `默认为false`
 * @param {String} url 首次加载图片路由 `默认为null`
 * @event upload 头像上传触发事件 (file: File, next: () => void) => void
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'avatarCropper',
  components: {
    BaseAvatarCropper,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: null,
    },
  },
  setup(props, context) {
    const avatarCropperImageSrc = ref(props.url); // 图片base64
    const effectShow = ref(false); // 右侧图片加载成功显示

    /**
     * @description: 裁剪图片更新
     * @param {string} image base64图片字符串 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function avatarCropperChange(image) {
      avatarCropperImageSrc.value = image;
      effectShow.value = true;
    }

    /**
     * @description: 关闭模态框
     * @return {void}
     * @author: dreamy-xay
     */
    function closeModal() {
      context.emit('update:modelValue', false);
      // 动画结束后
      setTimeout(() => {
        avatarCropperRef.value.imageUrl = props.url;
      }, 100);
    }

    /**
     * @description: 上传并保存
     * @return {void}
     * @author: dreamy-xay
     */
    function submit() {
      context.emit('upload', base64ToFile(avatarCropperImageSrc.value, 'avatar'), () => {
        context.emit('update:modelValue', false);
      });
    }

    const avatarCropperRef = ref(null);
    /**
     * @description: 选择图片
     * @return {void}
     * @author: dreamy-xay
     */
    function select() {
      avatarCropperRef.value.pickImage();
    }

    /**
     * @description: 图片加载错误，不显示加载
     * @return {void}
     * @author: dreamy-xay
     */
    function error() {
      if (effectShow.value) effectShow.value = false;
    }

    return {
      avatarCropperImageSrc,
      avatarCropperChange,
      closeModal,
      submit,
      avatarCropperRef,
      select,
      effectShow,
      error,
    };
  },
});
</script>

<style lang="scss" scoped>
.avatar-cropper {
  width: 430px;
  overflow: hidden;
  padding: 20px;
  background-color: $grey-0;
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;

  .avatar-cropper-header {
    height: 24px;
    width: 100%;
    @include flex(center, space-between);
    font-size: 18px;
    color: $grey-8;
    margin-bottom: 30px;

    .iconfont {
      font-size: 14px;
      color: $grey-6;
      transition: 0.25s;
      line-height: 24px;

      &:hover {
        color: $grey-10;
      }
    }
  }

  .avatar-cropper-body {
    width: 100%;
    height: 276px;
    @include flex(center, space-between);

    & > div {
      height: 100%;
      overflow: hidden;
    }

    .left {
      width: 276px;
    }

    .right {
      width: 128px;

      img {
        width: 128px;
        height: 128px;
        display: block;
        user-select: none;

        &:first-child {
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 20px;
        }

        &:last-child {
          border-radius: $border-radius-0;
        }
      }
    }
  }

  .avatar-cropper-footer {
    width: 100%;
    height: 32px;
    margin-top: 30px;
    @include flex(center, flex-end);

    div {
      height: 100%;
      line-height: 32px;
      padding: 0 15px;
      background-color: $green-0;
      transition: 0.25s;
      box-shadow: $shadow-0;
      color: $grey-0;
      border-radius: $border-radius-0;

      &:hover {
        background-color: $green-1;
      }

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
