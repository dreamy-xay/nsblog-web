<!--
 * @Description: login路由下页面输入框
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-26 22:15:27
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-15 12:48:51
-->
<template>
  <div class="login-input">
    <input
      :type="inputType ? 'password' : 'text'"
      ref="loginInput"
      :class="inputClass"
      :maxlength="maxlength"
      :value="modelValue"
      :placeholder="placeholder"
      @input="input"
      @focus="focus"
      @keyup.enter="inputEnter"
      :style="{paddingRight: showPassword ? '25px' : '5px', letterSpacing: inputType ? '3.9px' : '1.2px'}"
    >
    <div class="login-input-focus-border"></div>
    <i
      v-if="showPassword"
      class="login-input-eye iconfont"
      role="button"
      @click="toggleType"
      :class="inputType ? 'blog-eyehidden' : 'blog-eyeshow'"
    ></i>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { useMessage } from 'naive-ui';

/**
 * @description: login路由下页面输入框
 * @param {String} type 输入框类型 `默认为text`
 * @param {String} bindClass 输入框绑定类 `默认为null`
 * @param {String} modelValue 输入框绑定值，使用v-model指令即可 `默认为''`
 * @param {String} placeholder 占位内容 `默认为null`
 * @param {Boolean} showPassword 是否显示密码切换按钮 `默认为false`
 * @param {Function} verify 输入验证函数 `默认为null`
 * @param {Number} maxlength 输入内容最大长度 `默认为null`
 * @event enter 键盘按下回车时出发事件
 * @event toggleType 当输入框类型发生改变时触发事件，携带一个参数type['password', 'text']
 * @method check 最终检查校验，message选项，无效时触发，返回是否有效，{message:'',type:'', duration}
 * @var {HtmlElement} loginInput 输入框dom节点
 * @var {Boolean} efficient 输入内容是否通过验证函数有效
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'loginInput',
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
    verify: {
      type: Function,
      default: null,
    },
    maxlength: {
      type: Number,
      default: null,
    },
  },
  setup(props, context) {
    const msg = useMessage(); // naive-ui mssage
    const inputType = ref(props.type !== 'text'); // 输入框类型
    const loginInput = ref(null); // 输入框dom节点
    const efficient = ref(props.verify === null || props.verify(props.modelValue)); // 是否有效
    const error = ref(false);

    // 监听props.type更新状态
    watch(
      () => props.type,
      (_, newValue) => {
        inputType.value = newValue !== 'text';
      }
    );

    // dom 渲染完成
    onMounted(() => {
      // 点击显示密码按钮不失去焦点
      document.addEventListener(
        'mousedown',
        (e) => {
          const domClass = e.target.getAttribute('class');
          if (domClass && domClass.includes('login-input-eye')) e.preventDefault();
        },
        false
      );
    });

    // 计算属性
    const inputClass = computed(() => {
      return props.bindClass + (efficient.value ? '' : ' login-input-warn') + (error.value ? ' login-input-error' : '');
    });

    /**
     * @description: 输入框失焦触发
     * @return {void}
     * @author: dreamy-xay
     */
    function focus() {
      error.value = false;
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
      let value = e.target.value;

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
      // 输入验证
      efficient.value = props.verify === null || props.verify(props.modelValue);
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

    return {
      loginInput,
      efficient,
      input,
      inputClass,
      inputEnter,
      inputType,
      toggleType,
      focus,
      check,
    };
  },
});
</script>

<style lang="scss" scoped>
$default: $grey-6;
$success: $green-0;
$warn: $red-1;
$error: $red-2;

.login-input {
  width: 100%;
  overflow: hidden;
  position: relative;

  .login-input-eye {
    position: absolute;
    display: inline-block;
    height: 20px;
    line-height: 20px;
    right: 5px;
    bottom: calc(50% - 9px);
    font-size: 18px;
    color: $default;
  }

  input {
    width: 100%;
    outline: none;
    border: 0;
    height: 28px;
    width: 100%;
    border-bottom: 2px solid $grey-4;
    font-size: 14px;
    color: $default;
    transition: all 0.4s;
    transition: letter-spacing 0s;
    transition: padding-left 0.4s;

    &::-webkit-input-placeholder {
      color: $default;
      transition: all 0.4s;
      letter-spacing: 1.2px !important;
    }

    &:focus {
      color: $success;
      padding-left: 5px;

      &::-webkit-input-placeholder {
        color: $success;
      }

      & ~ .login-input-focus-border {
        width: 100%;
      }

      & ~ .login-input-eye {
        color: $success;
      }

      &.login-input-warn {
        color: $warn;

        &::-webkit-input-placeholder {
          color: $warn;
        }

        & ~ .login-input-eye {
          color: $warn;
        }
      }
    }

    &.login-input-warn ~ .login-input-focus-border {
      background-color: $warn;
    }

    &.login-input-error {
      color: $error;
      border-bottom: 2px solid $error;

      &::-webkit-input-placeholder {
        color: $error;
      }

      & ~ .login-input-focus-border {
        background-color: $error;
      }

      & ~ .login-input-eye {
        color: $error;
      }
    }
  }

  .login-input-focus-border {
    position: relative;
    left: 0;
    top: -2px;
    width: 0;
    height: 2px;
    background-color: $success;
    transition: all 0.4s;
  }
}
</style>
