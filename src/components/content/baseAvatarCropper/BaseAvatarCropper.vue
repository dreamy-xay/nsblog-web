<!--
 * @Description: 头像裁剪组件
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-28 11:21:46
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-30 12:26:03
-->
<template>
  <div class="base-avatar-cropper">
    <div
      class="base-avatar-cropper-container"
      v-show="dataUrl"
    >
      <div class="base-avatar-cropper-image-container">
        <img
          ref="img"
          :src="dataUrl"
          alt="image"
          @load.stop="createCropper"
          @error="onImgElementError"
        />
      </div>
    </div>
    <input
      v-if="!file"
      :accept="cleanedMimes"
      :capture="capture"
      class="base-avatar-cropper-img-input"
      ref="input"
      type="file"
      @change="onFileInputChange"
    />
  </div>
</template>

<script>
import { defineComponent, ref, watch, onMounted, computed } from 'vue';
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';

/**
 * @description: 头像裁剪组件
 * @param {Boolean} modelValue v-modal控制显示  `默认为false`
 * @param {File} file 文件的使用，而不是提示用户上传一个 `默认为null`
 * @param {Function} uploadHandler 来替换默认的上传处理程序，参数是cropperJS实例 `默认为null`
 * @param {String} uploadUrl 上传文件的URL `默认为null`
 * @param {Object} requestOptions 传递给 Request() 构造函数的 init 参数的选项，使用它来设置方法、标题等 `默认值：{ method: 'POST' }`
 * @param {String} uploadFileField 用于文件的 FormData 字段 `默认值：'文件'`
 * @param {FormData} uploadFormData 附加表单数据 `默认值：new FormData()`
 * @param {Object} cropperOptions 传递给cropperJS 实例的选项 `默认为： {aspectRatio: 1, autoCropArea: 1, viewMode: 1, movable: false, zoomable: false}`
 * @param {Object} outputOptions 传递给cropper.getCroppedCanvas() 方法的选 `默认： {} 推荐的用例是指定输出大小，例如：{ width: 512, height: 512 }`
 * @param {String} outputMime 生成的头像图像 mime 类型 `默认值：null`
 * @param {Number} outputQuality 生成的头像图像质量 [0 - 1] `默认值：0.9（如果 output-mime 属性是 'image/jpeg' 或 'image/webp'）`
 * @param {String} mimes 允许的图像格式 `默认：'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'`
 * @param {String} capture 文件输入的捕获属性 `默认：null 强制移动用户使用后置（使用值'environment'）或前置（使用值'user'）相机拍摄新照片`
 * @method submit 裁剪结束提交
 * @method cancel 取消裁剪
 * @event changed 用户选择一个文件是触发 ({file: File，reader: FileReader}) => void
 * @event uploading 在提交上传请求之前
 *                  form object, FormData instance.
 *                  request object, Request instance.
 *                  response object, Promise which resolves to a Response instance.
 * @event uploaded 请求成功后 参数同上
 * @event completed 请求完成后 参数同上
 * @event error 发生了一些错误 ({message: string, type: 'load'|'upload'|'user', context: string}) => void
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseAvatarCropper',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    file: {
      type: File,
      default: null,
    },
    uploadHandler: {
      type: Function,
      default: null,
    },
    uploadUrl: {
      type: String,
      default: null,
    },
    requestOptions: {
      type: Object,
      default() {
        return {
          method: 'POST',
        };
      },
    },
    uploadFileField: {
      type: String,
      default: 'file',
    },
    uploadFormData: {
      type: FormData,
      default() {
        return new FormData();
      },
    },
    cropperOptions: {
      type: Object,
      default() {
        return {
          aspectRatio: 1,
          autoCropArea: 1,
          viewMode: 1,
          movable: false,
          zoomable: false,
        };
      },
    },
    outputOptions: {
      type: Object,
      default: () => ({}),
    },
    outputMime: {
      type: String,
      default: null,
    },
    outputQuality: {
      type: Number,
      default: 0.9,
    },
    mimes: {
      type: String,
      default: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon',
    },
    capture: {
      type: String,
      default: null,
    },
  },
  setup(props, context) {
    let cropper = undefined;
    let filename = undefined;
    const dataUrl = ref(undefined);

    // computed
    const cleanedMimes = computed(() => {
      if (!props.mimes) throw new Error('vue-base-avatar-cropper: mimes prop cannot be empty');
      return props.mimes.trim().toLowerCase();
    });

    // watch
    watch(
      () => props.modelValue,
      (value) => {
        if (!value) return;
        if (props.file) onFileChange(props.file);
        else pickImage();
        context.emit('update:modelValue', false);
      }
    );

    // mounted
    onMounted(() => {
      context.emit('update:modelValue', false);
    });

    // ref
    const input = ref(null);
    const img = ref(null);

    // methods
    function destroy() {
      if (cropper) cropper.destroy();
      if (input.value) input.value.value = '';
      dataUrl.value = undefined;
    }

    function submit() {
      if (props.uploadUrl) uploadImage();
      else if (props.uploadHandler) props.uploadHandler(cropper);
      else
        context.emit('error', {
          type: 'user',
          message: 'No upload handler found',
        });

      destroy();
    }

    function cancel() {
      destroy();
    }

    function onImgElementError() {
      context.emit('error', {
        type: 'load',
        message: 'File loading failed',
      });
      destroy();
    }

    function pickImage() {
      if (input.value) input.value.click();
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
        dataUrl.value = e.target.result;
      };

      reader.readAsDataURL(file);

      filename = file.name || 'unknown';
      context.emit('changed', {
        file,
        reader,
      });
    }

    function onFileInputChange(e) {
      if (!e.target.files || !e.target.files[0]) return;
      onFileChange(e.target.files[0]);
    }

    function createCropper() {
      cropper = new Cropper(img.value, props.cropperOptions);
    }

    function uploadImage() {
      cropper.getCroppedCanvas(props.outputOptions).toBlob(
        async (blob) => {
          const form = new FormData();

          for (const [key, value] in props.uploadFormData.entries()) {
            form.append(key, value);
          }

          form.append(props.uploadFileField, blob, filename);

          const requestOptions = Object.assign(
            {
              body: form,
            },
            props.requestOptions
          );

          const request = new Request(props.uploadUrl, requestOptions);

          const reqPromise = fetch(request);

          context.emit('uploading', {
            form,
            request,
            response: reqPromise,
          });

          const response = await reqPromise;

          context.emit('completed', {
            form,
            request,
            response,
          });

          if (response.ok) {
            context.emit('uploaded', {
              form,
              request,
              response,
            });
          } else {
            context.emit('error', {
              type: 'upload',
              message: 'Image upload fail',
              context: {
                request,
                response,
              },
            });
          }
        },
        props.outputMime,
        props.outputQuality
      );
    }

    return {
      dataUrl,
      cleanedMimes,
      input,
      img,
      submit,
      cancel,
      onImgElementError,
      pickImage,
      onFileChange,
      onFileInputChange,
      createCropper,
      uploadImage,
    };
  },
});
</script>

<style lang="scss">
.base-avatar-cropper {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .base-avatar-cropper-container {
    background-color: $grey-0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .base-avatar-cropper-image-container {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

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
