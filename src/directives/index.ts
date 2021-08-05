/*
 * @Description: 注册指令
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-06 16:13:51
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-05 11:24:52
 */

import { debounce, throttle } from 'lodash';
import { App, nextTick } from 'vue';
import ResizeObserver from 'resize-observer-polyfill';

export default (app: App): void => {
  // 点击元素之外隐藏该元素
  app.directive('clickOutside', {
    beforeMount(el: any, binding: any) {
      el.__vueClickOutside__ = function documentHandle(e: any) {
        if (el.contains(e.target)) {
          return false;
        }
        if (binding.expression) {
          binding.value(e);
        }
      };
      document.addEventListener('click', el.__vueClickOutside__, true);
    },
    unmounted(el: any) {
      document.removeEventListener('click', el.__vueClickOutside__, true);
      delete el.__vueClickOutside__;
    }
  });

  // 监听元素大小变化
  app.directive('resize', {
    beforeMount(el: any, binding: any) {
      const { value, modifiers, arg }: any = binding;
      const callback = (entries: any) => {
        value(entries[0]);
      };
      const [method] = Object.keys(modifiers);
      const wait = (arg && arg.wait) || 300;
      if (method && method === 'throttle') {
        el._observer = new ResizeObserver(throttle(callback, wait));
      } else {
        el._observer = new ResizeObserver(debounce(callback, wait));
      }
    },
    mounted(el: any) {
      nextTick(() => {
        el._observer && el._observer.observe(el);
      });
    },
    unmounted(el: any) {
      el._observer && el._observer.unobserve(el);
    }
  });
};
