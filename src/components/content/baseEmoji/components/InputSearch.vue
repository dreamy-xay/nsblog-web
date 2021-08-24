<!--
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-24 14:11:23
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-24 14:30:55
-->
<template>
  <div id="InputSearch">
    <div class="container-search">
      <input
        type="text"
        v-model="inputSearch"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { t } from '../locale';
const timemout = 500;
let listenInput: unknown;
export default defineComponent({
  name: 'InputSearch',
  setup(props, context) {
    const inputSearch = ref<string>();
    const placeholder = computed(() => t('search'));
    let listenInput = null;
    watch(inputSearch, (newValue, old) => {
      clearTimeout(listenInput);
      listenInput = setTimeout(() => context.emit('update', newValue), timemout);
    });
    return { inputSearch, placeholder };
  },
});
</script>


<style lang="scss" scoped>
#InputSearch {
  display: block;
  width: 100%;
  max-width: 100%;
}

.container-search {
  display: block;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  margin: 5px 0;
  padding: 0 5%;

  input {
    width: 100%;
    font-size: 14px;
    padding: 6px 8px;
    box-sizing: border-box;
    border-radius: 8px;
    background: var(--ep-color-sbg);
    color: var(--ep-color-text);
    border: 1px solid var(--ep-color-border);
  }
}
</style>
