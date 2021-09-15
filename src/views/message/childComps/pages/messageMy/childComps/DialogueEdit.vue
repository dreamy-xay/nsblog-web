<!--
 * @Description: 对话框编辑器
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-19 16:19:04
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-15 22:45:12
-->
<template>
  <div class="dialogue-edit">
    <div class="dialogue-edit-icon">
      <input
        class="upload"
        type="file"
        @change="fileChange"
        ref="uploadRef"
        accept=".jpg,.png,.gif,.tif,.tiff,.ico,.bmp,.webp,.jepg"
      >
      <i
        class="iconfont blog-image"
        role="button"
        @click="uploadImage"
      ></i>
      <el-popover
        trigger="click"
        :width="null"
        placement="top-start"
        :offset="0"
        :show-arrow="false"
      >
        <base-emoji
          @select="selectEmoji"
          :limit-frequently="45"
        />
        <template #reference>
          <i
            class="iconfont blog-emoji"
            role="button"
          ></i>
        </template>
      </el-popover>
    </div>
    <div class="dialogue-edit-text">
      <el-scrollbar ref="scrollbarRef">
        <textarea
          ref="textareaRef"
          v-model="content"
          :maxlength="500"
          :style="{height: inputHeight}"
          placeholder="ctrl+enter send..."
          @keydown.ctrl.enter="submit"
        ></textarea>
      </el-scrollbar>
    </div>
    <div class="dialogue-edit-submit">
      <div
        class="submit"
        role="button"
        @click="submit"
      >
        发送
      </div>
      <div class="computed">
        {{textCount}}
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, nextTick, ref, watch } from 'vue';
import BaseEmoji from '@/components/content/baseEmoji/BaseEmoji.vue';
import { useMessage } from 'naive-ui';

/**
 * @description: 对话框编辑器
 * @event submit 递交消息，以供发送
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'dialogueEdit',
  components: {
    BaseEmoji,
  },
  setup(_, context) {
    const msg = useMessage(); // naive-ui message
    const content = ref(''); // 对话框内容
    const textareaRef = ref(null); // 输入框ref
    const uploadRef = ref(null); // 上传文件标签ref
    const showEmoji = ref(false); // 是否显示表情弹框
    const inputHeight = ref('60px'); // 输入框高度
    const scrollbarRef = ref(null); // scrollbar ref

    // 监听输入框高度自适应
    watch(
      () => content.value,
      (value, oldValue) => {
        if (value.length >= oldValue.length) inputHeight.value = textareaRef.value.scrollHeight + 'px';
        else {
          inputHeight.value = textareaRef.value.scrollHeight - 20 + 'px';
          nextTick(() => {
            inputHeight.value = textareaRef.value.scrollHeight + 'px';
            nextTick(() => {
              scrollbarRef.value.setScrollTop(scrollbarRef.value.wrap.scrollHeight);
            });
          });
        }
      }
    );

    /**
     * @description: 选择表情后插入
     * @param {any} emoji 组件自带参数
     * @return {void}
     * @author: dreamy-xay
     */
    function selectEmoji(emoji) {
      if (emoji.data) {
        const startPos = textareaRef.value.selectionStart;
        const endPos = textareaRef.value.selectionEnd;
        content.value =
          textareaRef.value.value.substring(0, startPos) + emoji.data + textareaRef.value.value.substring(endPos);
        textareaRef.value.focus();
        nextTick(() => {
          textareaRef.value.setSelectionRange(startPos + emoji.data.length, startPos + emoji.data.length);
        });
      }
    }

    // 计算内容长度
    const textCount = computed(() => {
      return content.value.length + '/500';
    });

    /**
     * @description: 递交消息
     * @param {any} e click event事件 `必传参数`
     * @param {boolean} image 图像数据 `默认为null`
     * @return {void}
     * @author: dreamy-xay
     */
    function submit(e, image = null) {
      if (image) context.emit('submit', image, true);
      else if (content.value) {
        context.emit('submit', content.value, false);
        content.value = '';
      }
    }

    /**
     * @description: 图片更改
     * @param {any} e change event事件 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function fileChange(e) {
      if (!e.target.files || !e.target.files[0]) return;
      const file = e.target.files[0];
      if (file.type.substr(0, 5) !== 'image') msg.warning('发送图片失败', { duration: 2000, closable: true });
      else if (file.size > 1024 * 1024) msg.warning('发送图片大小不得超过1M', { duration: 2000, closable: true });
      else {
        const reader = new FileReader();
        reader.onload = (event) => {
          submit(e, `<img src="${event.target.result}" alt="image">`);
        };
        reader.readAsDataURL(file);
      }
    }

    /**
     * @description: 上传文件，通过触发 input click事件
     * @return {void}
     * @author: dreamy-xay
     */
    function uploadImage() {
      uploadRef.value.click();
    }

    return {
      content,
      selectEmoji,
      textareaRef,
      uploadRef,
      inputHeight,
      showEmoji,
      textCount,
      submit,
      uploadImage,
      fileChange,
      scrollbarRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.dialogue-edit {
  width: 100%;
  height: 100%;
  overflow: hidden;
  @include flex(center, center, column);

  .dialogue-edit-icon {
    width: calc(100% - 32px);
    height: 20px;
    padding: 16px 16px 12px 16px;
    @include flex(center);

    .iconfont {
      font-size: 24px;
      color: $grey-7;
      transition: 0.25s;
      margin-right: 16px;

      &:hover {
        color: $grey-10;
      }
    }

    .upload {
      display: none;
    }
  }

  .dialogue-edit-text {
    width: calc(100% - 32px);
    height: 60px;
    padding: 0 16px;

    textarea {
      width: 100%;
      height: auto;
      overflow: hidden;
      resize: none;
      outline: none;
      background-color: transparent;
      @include word-break;
      border: 0;
      display: block;
      font-size: 14px;
      letter-spacing: 1px;
      color: $grey-10;
      line-height: 20px;
    }
  }

  .dialogue-edit-submit {
    width: calc(100% - 32px);
    height: 30px;
    padding: 12px 16px 12px 16px;

    & > div {
      float: right;
      user-select: none;
    }

    .submit {
      border-radius: $border-radius-1;
      background-color: $green-0;
      color: $grey-0;
      @include flex(center, center);
      font-weight: 600;
      box-shadow: $shadow-0;
      width: 82px;
      margin-left: 16px;
      font-size: 14px;
      transition: 0.25s;
      height: 100%;

      &:hover {
        background-color: $green-1;
      }
    }

    .computed {
      height: 100%;
      @include flex(center);
      font-size: 12px;
      color: $grey-7;
    }
  }
}
</style>
