/*
 * @Description: store map api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-11 11:55:09
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-11 12:23:47
 */
import { computed } from 'vue';
import { Store, Computed, useStore, createNamespacedHelpers } from 'vuex';

/**
 * @description: 使用映射器
 * @param {unknown} mapper 映射options `必传参数`
 * @param {Function} mapFn 映射函数 `必传参数`
 * @return {Record<string, unknown>} 返回一个包含store map映射的对象
 * @author: dreamy-xay
 */
function useMapper(mapper: unknown, mapFn: Function): Record<string, unknown> {
  // 拿到store独享
  const store: Store<any> = useStore();

  // 获取到对应的对象的functions: {name: function, age: function}
  const storeStateFns: Record<string, Computed> = mapFn(mapper);

  // 对数据进行转换
  const storeState: Record<string, unknown> = {};
  Object.keys(storeStateFns).forEach(fnKey => {
    const fn = storeStateFns[fnKey].bind({ $store: store });
    storeState[fnKey] = computed(fn);
  });

  return storeState;
}

/**
 * @description: 映射 state
 * @param {string} moduleName 模块空间名 `必传参数`
 * @param {unknown} mapper 映射参数，可参考store map `必传参数`
 * @return {: Record<string, unknown> }
 * @author: dreamy-xay
 */
export function mapState(moduleName: string, mapper: unknown): Record<string, unknown> {
  return useMapper(mapper, createNamespacedHelpers(moduleName).mapState);
}

/**
 * @description: 映射 getters
 * @param {string} moduleName 模块空间名 `必传参数`
 * @param {unknown} mapper 映射参数，可参考store map `必传参数`
 * @return {: Record<string, unknown> }
 * @author: dreamy-xay
 */
export function mapGetters(moduleName: string, mapper: unknown): Record<string, unknown> {
  return useMapper(mapper, createNamespacedHelpers(moduleName).mapGetters);
}

/**
 * @description: 映射 mutations
 * @param {string} moduleName 模块空间名 `必传参数`
 * @param {unknown} mapper 映射参数，可参考store map `必传参数`
 * @return {: Record<string, unknown> }
 * @author: dreamy-xay
 */
export function mapMutations(moduleName: string, mapper: unknown): Record<string, unknown> {
  return useMapper(mapper, createNamespacedHelpers(moduleName).mapMutations);
}

/**
 * @description: 映射 actions
 * @param {string} moduleName 模块空间名 `必传参数`
 * @param {unknown} mapper 映射参数，可参考store map `必传参数`
 * @return {: Record<string, unknown> }
 * @author: dreamy-xay
 */
export function mapActions(moduleName: string, mapper: unknown): Record<string, unknown> {
  return useMapper(mapper, createNamespacedHelpers(moduleName).mapActions);
}
