<!--
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-24 14:11:23
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-24 17:33:24
-->
<template>
  <div id="Categories">
    <div
      v-for="(category, index) in categories"
      :class="['category', { active: category.name === current }]"
      :key="index"
      @click="onSelect(category)"
    >
      <CategoryItem
        :label="category.label"
        :icon="category.icon"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Category } from '../models/Category';
import CategoryItem from './CategoryItem.vue';
export default defineComponent({
  name: 'Categories',
  components: { CategoryItem },
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    current: {
      type: String,
    },
  },
  setup(props, context) {
    const onSelect = (category: Category) => {
      context.emit('select', category);
    };
    return {
      onSelect,
    };
  },
});
</script>

<style lang="scss" scoped>
#Categories {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid var(--ep-color-border);
  background: var(--ep-color-bg);
  overflow-x: auto;
}

.category {
  flex: 1;
  padding: 5px;
  text-align: center;
  cursor: pointer;

  &.active {
    border-bottom: 3px solid var(--ep-color-active);
    filter: saturate(3);
    padding-bottom: 2px;
  }

  & > img {
    width: 22px;
    height: 22px;
  }

  &:hover {
    filter: saturate(3);
  }
}
</style>
