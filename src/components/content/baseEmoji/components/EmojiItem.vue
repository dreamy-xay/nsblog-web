<!--
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-24 14:11:23
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-15 21:13:32
-->

<template>
  <span
    :class="['emoji', { border: withBorder }]"
    :style="styleSize"
    v-html="emoji.data"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'EmojiItem',
  props: {
    emoji: {
      type: Object,
      required: true,
    },
    size: {
      type: Number,
      default: 28,
    },
    withBorder: {
      type: Boolean,
    },
  },
  setup(props) {
    const { size } = props as any;
    const styleSize = computed(() => ({
      fontSize: `${size - 5}px`,
      lineHeight: `${size}px`,
      height: `${size}px`,
      width: `${size}px`,
    }));
    return { styleSize };
  },
});
</script>


<style lang="scss" scoped>
.emoji {
  display: inline-block;
  text-align: center;
  padding: 3px;
  box-sizing: content-box;
  overflow: hidden;
  transition: transform 0.2s;

  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
}

.border:hover {
  background: #00000010;
  border-radius: 8px;
}
</style>
