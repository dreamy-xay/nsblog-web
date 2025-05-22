/*
 * @Description: 注册指令
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-06 16:13:51
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2025-05-22 15:15:16
 */

import { debounce, throttle } from 'lodash';
import { App, nextTick } from 'vue';
import ResizeObserver from 'resize-observer-polyfill';
import { LoadingBarProviderInst } from 'naive-ui';
import { waitImageLoaded } from '@/utils/dom';

export default (app: App): void => {
  // 点击元素之外隐藏该元素
  app.directive('clickOutside', {
    mounted(el: any, binding: any) {
      el.__vueClickOutside__ = function documentHandle(e: any) {
        if (el.contains(e.target)) {
          return false;
        }
        binding.value(e);
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
      const wait = arg || 300;
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

  // naive-ui loadingBar 状态显示指令
  app.directive('naiveUiLoadingBar', {
    created(el: any, binding: any) {
      const naiveUiLoadingBar: LoadingBarProviderInst = binding.value;
      naiveUiLoadingBar.start();
    },
    mounted(el: any, binding: any) {
      const naiveUiLoadingBar: LoadingBarProviderInst = binding.value;
      waitImageLoaded(el)
        .then(() => setTimeout(() => naiveUiLoadingBar.finish(), 0))
        .catch(() => setTimeout(() => naiveUiLoadingBar.error(), 0));
    }
  });

  // url 前缀
  app.directive('prefix', {
    mounted(el: HTMLElement) {
      const hashPrefix = process.env.VUE_APP_ROUTER_MODE === "false" ? "/#" : "";
      const basePrefix = process.env.VUE_APP_BASE_PREFIX || '';
      nextTick(() => {
        if (basePrefix && el.tagName === 'IMG' && el.hasAttribute('src') && el.getAttribute('src')?.startsWith('/'))
          el.setAttribute('src', `${basePrefix}${el.getAttribute('src')}`);
        if ((hashPrefix || basePrefix) && el.tagName === 'A') {
          if (el.hasAttribute('href') && el.getAttribute('href')?.startsWith('/'))
            el.setAttribute('href', `${basePrefix}${hashPrefix}${el.getAttribute('href')}`);
          if (el.hasAttribute('target') && el.getAttribute('target')?.startsWith('/'))
            el.setAttribute('target', `${basePrefix}${hashPrefix}${el.getAttribute('target')}`);
        }
      });
    }
  });
};
