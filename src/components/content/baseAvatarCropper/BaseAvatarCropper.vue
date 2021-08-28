<!--
 * @Description: 头像裁剪组件
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-28 11:21:46
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-28 18:15:23
-->
<template>
  <div class="base-avatar-cropper">
    <div
      class="base-avatar-cropper-overlay"
      :class="{'base-avatar-cropper-overlay-inline': inline}"
      v-if="dataUrl"
    >
      <div
        class="base-avatar-cropper-mark"
        v-if="!inline"
      >
        <a
          @click="cancel"
          class="base-avatar-cropper-close"
          :title="labels.cancel"
          href="javascript:;"
        >&times;</a>
      </div>

      <div class="base-avatar-cropper-container">
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
    },
    uploadHandler: {
      type: Function,
    },
    uploadUrl: {
      type: String,
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
    },
    labels: {
      type: Object,
      default() {
        return {
          submit: 'Ok',
          cancel: 'Cancel',
        };
      },
    },
    inline: {
      type: Boolean,
      default: false,
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
      context.emit('submit');
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
      context.emit('cancel');
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
      destroy,
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
  .base-avatar-cropper-overlay {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99999;
  }

  .base-avatar-cropper-overlay-inline {
    position: initial;
  }

  .base-avatar-cropper-img-input {
    display: none;
  }

  .base-avatar-cropper-close {
    float: right;
    padding: 20px;
    font-size: 3rem;
    color: #fff;
    font-weight: 100;
    text-shadow: 0px 1px rgba(40, 40, 40, 0.3);
  }

  .base-avatar-cropper-mark {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
  }

  .base-avatar-cropper-container {
    background: #fff;
    z-index: 999;
    box-shadow: 1px 1px 5px rgba(100, 100, 100, 0.14);

    .base-avatar-cropper-image-container {
      position: relative;
      max-width: 400px;
      height: 300px;
    }

    img {
      max-width: 100%;
      height: 100%;
    }
  }
}
</style>
