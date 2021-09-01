<!--
 * @Description: 用户中心专用输入框
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-31 16:34:22
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-01 21:06:01
-->
<template>
  <div
    class="user-center-input"
    :style="{width: style.width, height: style.height}"
  >
    <input
      :type="inputType ? 'password' : 'text'"
      ref="userCenterInput"
      :class="inputClass"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :value="modelValue"
      @input="input"
      @focus="focus"
      @blur="blur"
      @keyup.enter="inputEnter"
      :style="{paddingRight: showPassword && showClose ? '45px' : (showPassword || showClose ? '25px' : '5px'), letterSpacing: inputType ? '3.9px' : '1.2px', ...style}"
    >
    <i
      v-if="showPassword"
      class="user-center-input-eye iconfont"
      role="button"
      @click="toggleType"
      :class="inputType ? 'blog-eyehidden' : 'blog-eyeshow'"
    ></i>
    <i
      v-if="showClose"
      v-show="modelValue !== ''"
      role="button"
      class="iconfont blog-close-circle user-center-input-close"
      :class="{'right-has': showPassword}"
      @click="clearInputValue"
    ></i>
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed, onMounted, nextTick } from 'vue';
import { useMessage } from 'naive-ui';

/**
 * @description: login路由下页面输入框
 * @param {String} type 输入框类型 `默认为text`
 * @param {String} bindClass 输入框绑定类 `默认为null`
 * @param {String} modelValue 输入框绑定值，使用v-model指令即可 `默认为''`
 * @param {String} placeholder 占位内容 `默认为null`
 * @param {Boolean} showPassword 是否显示密码切换按钮 `默认为false`
 * @param {Boolean} showClose 是否显示清空输入框按钮 `默认为false`
 * @param {Function} verify 输入验证函数，(value) => boolean `默认为null`
 * @param {Number} maxlength 输入内容最大长度 `默认为null`
 * @param {Object} style 输入框样式，可以修改宽高等等 `默认为{}`
 * @event enter 键盘按下回车时出发事件
 * @event blur 输入框失焦
 * @event focus 输入框聚焦
 * @event toggleType 当输入框类型发生改变时触发事件，携带一个参数type['password', 'text']
 * @method check 最终检查校验，message选项，无效时触发，返回是否有效，{message:'',type:'', duration}
 * @var {HtmlElement} userCenterInput 输入框dom节点
 * @var {Boolean} efficient 输入内容是否通过验证函数有效
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userCenterInput',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    bindClass: {
      type: String,
      default: null,
    },
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: null,
    },
    showPassword: {
      type: Boolean,
      default: false,
    },
    showClose: {
      type: Boolean,
      default: false,
    },
    verify: {
      type: Function,
      default: null,
    },
    maxlength: {
      type: Number,
      default: null,
    },
    style: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, context) {
    const msg = useMessage(); // naive-ui mssage
    const inputType = ref(props.type !== 'text'); // 输入框类型
    const userCenterInput = ref(null); // 输入框dom节点
    const efficient = ref(props.verify === null || props.verify('')); // 是否有效
    const error = ref(false);

    // 监听props.type更新状态
    watch(
      () => props.type,
      (_, newValue) => {
        inputType.value = newValue !== 'text';
      }
    );

    // dom渲染完成
    onMounted(() => {
      // 点击关闭按钮和显示密码按钮不失去焦点
      document.addEventListener(
        'mousedown',
        (e) => {
          if (
            e.target.getAttribute('class').includes('user-center-input-close') ||
            e.target.getAttribute('class').includes('user-center-input-eye')
          ) {
            e.preventDefault();
          }
        },
        false
      );
    });

    // 计算属性
    const inputClass = computed(() => {
      return (
        props.bindClass +
        (efficient.value ? '' : ' user-center-input-warn') +
        (error.value ? ' user-center-input-error' : '')
      );
    });

    /**
     * @description: 输入框聚焦触发
     * @return {void}
     * @author: dreamy-xay
     */
    function focus() {
      context.emit('focus');
      error.value = false;
    }

    /**
     * @description: 输入框失焦触发
     * @return {void}
     * @author: dreamy-xay
     */
    function blur() {
      context.emit('blur');
    }

    /**
     * @description: 切换密码输入框类型
     * @return {void}
     * @author: dreamy-xay
     */
    function toggleType() {
      inputType.value = !inputType.value;
      context.emit('toggleType', inputType.value ? 'password' : 'text');
    }

    /**
     * @description: 监听input事件
     * @param {any} e 事件
     * @return {void}
     * @author: dreamy-xay
     */
    function input(e) {
      const value = e.target.value;

      // v-model
      context.emit('update:modelValue', value);

      // 输入验证
      efficient.value = props.verify === null || props.verify(value);
    }

    /**
     * @description: 监听鼠标按下回车事件，并向上发送事件
     * @return {void}
     * @author: dreamy-xay
     */
    function inputEnter() {
      context.emit('enter');
    }

    /**
     * @description: 最终检查
     * @param {Object | null} messageOptions message选项
     * @return {boolean} 返回是否有效
     * @author: dreamy-xay
     */
    function check(messageOptions) {
      error.value = !efficient.value;
      // 发出消息
      if (error.value && typeof messageOptions === 'object') {
        if (!messageOptions['type']) messageOptions['type'] = 'error';
        setTimeout(() => {
          msg[messageOptions['type']](messageOptions.message, {
            duration: messageOptions.duration ? messageOptions.duration : 3000,
            closable: true,
          });
        }, 0);
      }
      return efficient.value;
    }

    /**
     * @description: 清空输入框内值
     * @return {void}
     * @author: dreamy-xay
     */
    function clearInputValue() {
      context.emit('update:modelValue', '');
    }

    return {
      userCenterInput,
      efficient,
      input,
      inputClass,
      inputEnter,
      inputType,
      toggleType,
      focus,
      blur,
      check,
      clearInputValue,
    };
  },
});
</script>

<style lang="scss" scoped>
$default: $grey-8;
$success: $green-1;
$warn: $red-1;
$error: $red-2;
$default-shadow: $shadow-0;
$success-shadow: $shadow-2;
$warn-shadow: 0 0 6px $warn;
$error-shadow: 0 0 6px $error;

.user-center-input {
  @include flex();
  width: 100%;
  position: relative;

  .iconfont {
    position: absolute;
    display: inline-block;
    height: 20px;
    line-height: 20px;

    color: $default;
    transition: 0.25s;
  }

  .user-center-input-eye {
    font-size: 18px;
    right: 5px;
    bottom: calc(50% - 9px);
  }

  .user-center-input-close {
    font-size: 16px;
    right: 6px;
    bottom: calc(50% - 10px);

    &.right-has {
      right: 25px;
    }
  }

  input {
    padding: 6px 8px;
    width: 100%;
    height: 32px;
    outline: none;
    border: 0px;
    border-radius: $border-radius-1;
    box-shadow: $default-shadow;
    font-size: 14px;
    color: $default;
    transition: color 0.25s;
    transition: box-shadow 0.25s;

    &::-webkit-input-placeholder {
      color: $default;
      transition: color 0.25s;
      letter-spacing: 1.2px !important;
    }

    &:focus,
    &:hover {
      color: $success;
      box-shadow: $success-shadow;

      &::-webkit-input-placeholder {
        color: $success;
      }

      & ~ .user-center-input-eye,
      & ~ .user-center-input-close {
        color: $success;
      }

      &.user-center-input-warn {
        color: $warn;
        box-shadow: $warn-shadow;

        &::-webkit-input-placeholder {
          color: $warn;
        }

        & ~ .user-center-input-eye,
        & ~ .user-center-input-close {
          color: $warn;
        }
      }
    }

    &.user-center-input-error {
      color: $error;
      box-shadow: $error-shadow;

      &::-webkit-input-placeholder {
        color: $error;
      }

      & ~ .user-center-input-eye,
      & ~ .user-center-input-close {
        color: $error;
      }
    }
  }
}
</style>
