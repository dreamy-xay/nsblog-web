<!--
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-24 14:11:23
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-24 14:28:10
-->
<template>
  <span
    class="svg"
    :style="styleSVG"
    :title="label"
    v-html="icon"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
export default defineComponent({
  name: 'CategoryItem',
  props: {
    label: {
      type: String,
    },
    icon: {
      type: String,
    },
    styles: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, context) {
    const { styles } = props as any;
    const styleSVG = computed(() => ({ ...styles }));
    return {
      styleSVG,
    };
  },
});
</script>

<style scoped lang="scss">
.svg {
  display: inline-block;
  vertical-align: middle;
}
</style>
