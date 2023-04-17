<!--
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-06-27 20:21:16
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-04-17 16:22:46
-->
<template>
  <admin-view
    class="admin-tools-text-correction"
    :style="{height: `calc(100vh - ${pageHeadHeight + 32}px)`}"
  >
    <div class="text-correction-left">
      <el-scrollbar
        @scroll="scroll(true)"
        ref="leftScrollbarRef"
      >
        <div class="scroll-inner">
          <el-input
            class="text"
            v-model="text"
            type="textarea"
            placeholder="请输入文本"
            ref="textareaRef"
            :autosize="{maxRows: 10000000}"
            :autofocus="true"
            @focus="showOriginInner = false"
            @blur="showOriginInner = true"
            @input="inputText"
          />
          <div
            class="inner"
            v-show="scrollSynchronize && showOriginInner"
            v-html="originalContent"
            @click="inputFocus"
          >
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="text-correction-right">
      <el-scrollbar
        @scroll="scroll(false)"
        ref="rightScrollbarRef"
      >
        <div
          class="inner"
          v-html="correctedContent"
        >
        </div>
      </el-scrollbar>
    </div>
    <div
      class="text-correction-submit"
      role="button"
      @click="correctContentClick"
    >纠错</div>
  </admin-view>
</template>
<script>
import AdminView from '@/views/admin/childComps/AdminView.vue';
import { defineComponent, inject, onBeforeUnmount, onMounted, ref } from 'vue';
import { correctContent } from '@/network/api/tools/intelligentCreation';
import { useMessage } from 'naive-ui';

/**
 * @description: 文本纠错工具
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminToolsTextCorrection',
  components: {
    AdminView,
  },
  setup() {
    const msg = useMessage(); // naive-ui message
    const pageHeadHeight = inject('pageHeadHeight'); // 子页面头部可视范围的高度
    const text = ref(''); // 纠错文本内容
    const correctedContent = ref(''); // 纠错的html渲染内容
    const originalContent = ref(''); // 原数据的html渲染内容
    const leftScrollbarRef = ref(null); // 左侧滚动条
    const rightScrollbarRef = ref(null); // 右侧滚动条
    const textareaRef = ref(null); // 输入框
    const scrollSynchronize = ref(false); // 滚动同步
    const showOriginInner = ref(false); // 是否显示原数据inner
    const windowFunctionName = 'markWordHover' + Math.floor(Math.random() * 100000); // markWordHover 函数全局函数名

    /**
     * @description: 根据数据生成纠错html
     * @param {Object} data 纠错数据 `必传参数`
     * @param {boolean} origin 是否渲染原数据 `默认为false`
     * @return {string}
     * @author: dreamy-xay
     */
    function generateCorrectionHtml(data, origin = false) {
      // 文本转html函数
      const textToHtml = (text) => text.replace(/ /g, '&nbsp;').replace(/\n/g, '<br/>');
      // 纠错的原文本
      const content = text.value;
      // 错误详细信息
      const errorDetails = data.error_details.sort((a, b) => {
        return a.position.start_index - b.position.start_index;
      });
      // 结果
      let html = '';

      if (errorDetails.length) {
        let pre = 0; //  前置拼接 前置索引

        // 开始拼接
        for (let i = 0; i < errorDetails.length; ++i) {
          const error = errorDetails[i];
          // 前置拼接
          html += textToHtml(content.substring(pre, error.position.start_index));
          // 错误纠正位置
          html += `<span class="mark-word" onmouseenter="${windowFunctionName}(${i}, true, ${origin})" onmouseleave="${windowFunctionName}(${i}, false, ${origin})">${textToHtml(
            origin ? error.original_word : error.correction_word
          )}</span>`;
          // 更新前置索引
          pre = error.position.end_index + 1;
        }

        // 后置拼接
        html += textToHtml(content.substring(errorDetails[errorDetails.length - 1].position.end_index + 1));
      } else html = textToHtml(content);

      return html;
    }

    /**
     * @description: 文本纠错点击触发
     * @return {void}
     * @author: dreamy-xay
     */
    function correctContentClick() {
      if (text.value.trim() === '') return;
      let loading = msg.loading('文本纠错中...', { closable: false, duration: 15000 });
      correctContent(text.value)
        .then((data) => {
          // 处理数据
          leftScrollbarRef.value.setScrollTop(0); // 回顶部
          scrollSynchronize.value = true; // 开启滚动同步监听
          correctedContent.value = generateCorrectionHtml(data);
          originalContent.value = generateCorrectionHtml(data, true);

          // message
          loading.destroy();
          loading = null;
          msg.success('文本纠错成功');
        })
        .catch((err) => {
          console.log(err);
          loading.destroy();
          loading = null;
          msg.error('文本纠错失败，网络错误');
        });
    }

    /**
     * @description: 文本输入触发
     * @return {void}
     * @author: dreamy-xay
     */
    function inputText() {
      if (correctedContent.value !== '') {
        scrollSynchronize.value = false;
        correctedContent.value = '';
      }
    }

    /**
     * @description: 左右侧滚动事件监听
     * @param {boolean} isLeft 是否为左侧
     * @return {void}
     * @author: dreamy-xay
     */

    function scroll(isLeft) {
      if (!scrollSynchronize.value) return;
      if (isLeft) {
        if (Math.abs(leftScrollbarRef.value.wrap.scrollTop - rightScrollbarRef.value.wrap.scrollTop) <= 1) return;
        rightScrollbarRef.value.setScrollTop(leftScrollbarRef.value.wrap.scrollTop);
      } else {
        if (Math.abs(leftScrollbarRef.value.wrap.scrollTop - rightScrollbarRef.value.wrap.scrollTop) <= 1) return;
        leftScrollbarRef.value.setScrollTop(rightScrollbarRef.value.wrap.scrollTop);
      }
    }

    /**
     * @description: 左侧输入框聚焦
     * @return {void}
     * @author: dreamy-xay
     */
    function inputFocus() {
      if (textareaRef.value.textarea != document.activeElement) textareaRef.value.focus(); /* 点击则输入框聚焦 */
    }

    /**
     * @description: 标记单词鼠标hover
     * @param {number} index hover的单词索引 `必传参数`
     * @param {boolean} enter 是否mouseenter `必传参数`
     * @param {boolean} origin 是否是原数据 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function markWordHover(index, enter, origin) {
      // 获得dom节点
      const markWord = (origin ? rightScrollbarRef : leftScrollbarRef).value.$el.getElementsByClassName('mark-word')[
        index
      ];
      // 修改类
      markWord.setAttribute('class', `mark-word${enter ? ' active' : ''}`);
    }

    onMounted(() => {
      // 绑定全局函数名
      window[windowFunctionName] = markWordHover;
      // 增加聚焦监听
      leftScrollbarRef.value.wrap.addEventListener('click', inputFocus);
    });

    onBeforeUnmount(() => {
      // 取消绑定全局函数名
      delete window[windowFunctionName];
      // 取消聚焦监听
      leftScrollbarRef.value.wrap.removeEventListener('click', inputFocus);
    });

    return {
      pageHeadHeight,
      text,
      correctedContent,
      originalContent,
      leftScrollbarRef,
      rightScrollbarRef,
      textareaRef,
      scrollSynchronize,
      showOriginInner,
      correctContentClick,
      inputText,
      inputFocus,
      scroll,
    };
  },
});
</script>


<style lang="scss" scoped>
.admin-tools-text-correction {
  border-radius: $border-radius-0;
  box-shadow: $border-radius-0;
  @include flex(center, space-between);
  overflow: hidden;
  background-color: $grey-0;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  position: relative;

  .text-correction-left,
  .text-correction-right {
    width: calc(50% - 40px);
    height: 100%;
    border-radius: $border-radius-1;
    overflow: hidden;
    border: 1px solid $grey-3;
    background-color: $grey-3;
    border-radius: $border-radius-1;
    box-shadow: none;
    color: $grey-9;
    font-size: 16px;
    cursor: text;

    &:hover,
    &:focus-within {
      border: 1px solid $grey-4;
    }
  }

  .text-correction-left .scroll-inner {
    width: 100%;
    position: relative;

    .text {
      margin: 8px 10px 8px 8px;
      width: calc(100% - 18px);

      :deep(textarea) {
        resize: none;
        background-color: transparent;
        border: none;
        padding: 0px;
        color: $grey-9;
        font-size: 16px;
        line-height: 24px;
        @include word-break;
      }
    }

    &:focus-within .inner {
      opacity: 0;
    }

    .inner {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 1;
      background-color: $grey-3;
      width: calc(100% - 16px);
      margin: 8px;
      line-height: 24px;
      @include word-break;

      :deep(.mark-word) {
        color: $red-2;
        background-color: rgba($red-2, 0.1);
        cursor: pointer;
        transition: 0.25s;

        &.active {
          color: $blue-2;
          background-color: rgba($blue-2, 0.1);
        }

        &:hover {
          background-color: rgba($red-2, 0.3);
        }
      }
    }
  }

  .text-correction-right .inner {
    width: calc(100% - 16px);
    margin: 8px;
    line-height: 24px;
    @include word-break;

    :deep(.mark-word) {
      color: $blue-2;
      background-color: rgba($blue-2, 0.1);
      cursor: pointer;
      transition: 0.25s;

      &.active {
        color: $red-2;
        background-color: rgba($red-2, 0.1);
      }

      &:hover {
        background-color: rgba($blue-2, 0.3);
      }
    }
  }

  .text-correction-submit {
    position: absolute;
    left: calc(50% - 32px);
    bottom: calc(50% - 16px);
    @include flex(center, center);
    width: 64px;
    height: 32px;
    background: $grey-0;
    border-radius: $border-radius-1;
    color: $grey-9;
    margin-bottom: 3px;
    transition: 0.25s;
    margin-right: 10px;
    border: 1px solid $grey-4;
    box-sizing: border-box;
    transition: 0.25s;

    &:hover {
      color: $blue-2;
      border: 1px solid $blue-2;
    }
  }
}
</style>
