<!--
 * @Description: 头像裁剪组件
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-28 11:21:46
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-02 20:05:11
-->
<template>
  <div class="base-avatar-cropper">
    <div
      class="base-avatar-cropper-image-container"
      v-show="show"
    >
      <img
        ref="img"
        :src="imageUrl"
        alt="image"
        @load.stop="createCropper"
        @error="onImgElementError"
      />
    </div>
    <input
      :accept="cleanedMimes"
      :capture="capture"
      class="base-avatar-cropper-img-input"
      ref="fileInputRef"
      type="file"
      @change="onFileInputChange"
    />
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue';
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';

/**
 * @description: 头像裁剪组件
 * @param {String} url 图片文件的路径 `默认为null`
 * @param {Object} cropperOptions 传递给cropperJS 实例的选项 `默认为： {aspectRatio: 1, autoCropArea: 1, viewMode: 3, minContainerWidth: 276, minContainerHeight: 276}`
 * @param {Object} outputOptions 传递给cropper.getCroppedCanvas() 方法的选 `默认： {} 推荐的用例是指定输出大小，例如：{ width: 512, height: 512 }`
 * @param {String} outputMime 生成的头像图像 mime 类型 `默认值：null`
 * @param {Number} outputQuality 生成的头像图像质量 [0 - 1] `默认值：1（如果 output-mime 属性是 'image/jpeg' 或 'image/webp'）`
 * @param {String} mimes 允许的图像格式 `默认：'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'`
 * @param {String} capture 文件输入的捕获属性 `默认：null 强制移动用户使用后置（使用值'environment'）或前置（使用值'user'）相机拍摄新照片`
 * @method pickImage 挑选图片
 * @event fileChange 用户选择一个文件是触发 ({file: File，reader: FileReader}) => void
 * @event changed 裁剪图片数据发送改变 (base64Img) => void
 * @event error 发生了一些错误 ({message: string, type: 'load'|'upload'|'user', context: string}) => void
 * @var imageUrl 裁剪图片路由变量
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseAvatarCropper',
  props: {
    url: {
      type: String,
      default: null,
    },
    cropperOptions: {
      type: Object,
      default() {
        return {
          aspectRatio: 1,
          autoCropArea: 1,
          viewMode: 3,
          minContainerWidth: 276,
          minContainerHeight: 276,
        };
      },
    },
    outputOptions: {
      type: Object,
      default: () => ({}),
    },
    outputMime: {
      type: String,
      default: 'image/jpeg',
    },
    outputQuality: {
      type: Number,
      default: 1,
    },
    mimes: {
      type: String,
      default: 'image/*',
    },
    capture: {
      type: String,
      default: null,
    },
  },
  setup(props, context) {
    let cropper = null; // 裁剪工具
    const imageUrl = ref(props.url); // 显示图片路径
    const show = ref(false); // 是否显示

    // watch
    watch(
      () => props.url,
      (value) => {
        if (value) imageUrl.value = value;
      }
    );

    // computed
    const cleanedMimes = computed(() => {
      if (!props.mimes) throw new Error('base-avatar-cropper: mimes prop cannot be empty');
      return props.mimes.trim().toLowerCase();
    });

    // ref
    const fileInputRef = ref(null);

    // methods
    function destroy() {
      if (cropper) cropper.destroy();
      show.value = false;
    }

    function onImgElementError() {
      context.emit('error', {
        type: 'load',
        message: 'File loading failed',
      });
      destroy();
    }

    function pickImage() {
      if (fileInputRef.value) fileInputRef.value.click();
    }

    function onFileChange(file) {
      if (cleanedMimes.value === 'image/*') {
        if (file.type.split('/')[0] !== 'image') {
          context.emit('error', {
            type: 'user',
            message: 'File type not correct',
          });
          return;
        }
      } else if (cleanedMimes.value) {
        const correctType = cleanedMimes.value.split(', ').find((mime) => mime === file.type);
        if (!correctType) {
          context.emit('error', {
            type: 'user',
            message: 'File type not correct',
          });
          return;
        }
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        imageUrl.value = e.target.result;
      };
      reader.readAsDataURL(file);

      context.emit('fileChange', {
        file,
        reader,
      });
    }

    function onFileInputChange(e) {
      if (!e.target.files || !e.target.files[0]) return;
      onFileChange(e.target.files[0]);
    }

    function createCropper(e) {
      if (cropper) destroy();
      cropper = new Cropper(e.target, {
        ...props.cropperOptions,
        ready(_) {
          show.value = true;
          context.emit(
            'changed',
            cropper.getCroppedCanvas(props.outputOptions).toDataURL(props.outputMime, props.outputQuality)
          );
        },
        crop(_) {
          context.emit(
            'changed',
            cropper.getCroppedCanvas(props.outputOptions).toDataURL(props.outputMime, props.outputQuality)
          );
        },
      });
    }

    return {
      imageUrl,
      cleanedMimes,
      fileInputRef,
      onImgElementError,
      pickImage,
      onFileInputChange,
      createCropper,
      show,
    };
  },
});
</script>

<style lang="scss">
.base-avatar-cropper {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .base-avatar-cropper-image-container {
    background-color: $grey-0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    img {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }

  .base-avatar-cropper-img-input {
    display: none;
  }
}
</style>
