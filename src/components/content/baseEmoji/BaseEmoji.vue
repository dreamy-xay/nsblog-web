<template>
  <div
    id="EmojiPicker"
    :class="['emoji-picker', { dark }]"
  >
    <InputSearch
      v-if="showSearch"
      @update="onSearch"
    />
    <EmojiList
      :data="mapEmojis"
      :category="currentCategory"
      :filter="filterEmoji"
      :emojiWithBorder="emojiWithBorder"
      :emojiSize="emojiSize"
      :emojisByRow="emojisByRow"
      :continuousList="continuousList"
      :hasSearch="showSearch"
      @select="onSelectEmoji"
    />
    <Categories
      v-if="showCategories"
      :categories="categoriesFiltered"
      :current="currentCategory"
      @select="changeCategory"
    />
  </div>
</template>

<script lang="ts">
import { IEmoji } from './models/Emoji';
import { ICategory } from './models/Category';
import { MapEmojis } from './models/MapEmojis';

import { emojisDefault } from './utils/emojis';
import { categoriesDefault } from './utils/categories';

import Categories from './components/Categories.vue';
import EmojiList from './components/EmojiList.vue';
import InputSearch from './components/InputSearch.vue';

import locale from './locale';
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue';

export default defineComponent({
  name: 'VEmojiV3',
  components: {
    Categories,
    EmojiList,
    InputSearch,
  },
  props: {
    customEmojis: {
      type: Object,
      default: () => emojisDefault,
    },
    customCategories: {
      type: Object,
      default: () => categoriesDefault,
    },
    limitFrequently: {
      type: Number,
      default: 15,
    },
    emojisByRow: {
      type: Number,
      default: 5,
    },
    continuousList: {
      type: Boolean,
      default: false,
    },
    emojiSize: {
      type: Number,
      default: 32,
    },
    emojiWithBorder: {
      type: Boolean,
      default: true,
    },
    showSearch: {
      type: Boolean,
      default: false,
    },
    showCategories: {
      type: Boolean,
      default: true,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    initialCategory: {
      type: String,
      default: 'Peoples',
    },
    exceptCategories: {
      type: Array,
      default: () => [],
    },
    exceptEmojis: {
      type: Array,
      default: () => [],
    },
    bearing: {
      type: String,
      default: 'vertical',
    },
    i18n: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, context) {
    const { initialCategory, customCategories, exceptCategories, i18n, limitFrequently, exceptEmojis, customEmojis } =
      props as any;
    const mapEmojis: MapEmojis = reactive({});
    const currentCategory = ref(initialCategory);
    const filterEmoji = ref<string>();
    const categoriesFiltered = computed(() => {
      return (customCategories as any).filter((category: ICategory) => !(exceptCategories as any).includes(category));
    });

    const onSearch = async (term: string) => {
      filterEmoji.value = term;
    };

    const changeCategory = async (category: ICategory) => {
      const hasEmojis = mapEmojis[category.name].length;
      currentCategory.value = category.name;

      if (hasEmojis) {
        await onChangeCategory(category);
      }
    };

    const updateFrequently = async (emoji: IEmoji) => {
      const oldEmojis = mapEmojis['Frequently'];
      const emojis = [...new Set([emoji, ...oldEmojis])];
      mapEmojis['Frequently'] = emojis.slice(0, limitFrequently);
      await saveFrequentlyEmojis(emojis);
    };

    const mapperEmojisCategory = async (emojis: IEmoji) => {
      mapEmojis['Frequently'] = [];

      (emojis as any)
        .filter((emoji: IEmoji) => !(exceptEmojis as any).includes(emoji))
        .forEach((emoji: IEmoji) => {
          const _category = emoji.category;
          if (!mapEmojis[_category]) {
            mapEmojis[_category] = [];
          }
          mapEmojis[_category].push(emoji);
        });
    };

    const restoreFrequentlyEmojis = async () => {
      const jsonMapIndexEmojis = localStorage.getItem('frequentlyEmojis');

      const mapIndexEmojis = JSON.parse(jsonMapIndexEmojis as any) || [];
      mapEmojis['Frequently'] = mapIndexEmojis
        .map((index: IEmoji) => customEmojis[index as any])
        .filter((value) => {
          return value;
        });
    };

    const saveFrequentlyEmojis = async (emojis: IEmoji[]) => {
      const mapIndexEmojis = emojis.map((emoji) => {
        for (let i: number = 0; i < customEmojis.length; ++i) if (customEmojis[i].data === emoji.data) return i;
        return -1;
      });
      localStorage.setItem(
        'frequentlyEmojis',
        JSON.stringify(
          mapIndexEmojis.filter((value) => {
            return value > -1;
          })
        )
      );
    };

    const onSelectEmoji = async (emoji: IEmoji) => {
      await updateFrequently(emoji);
      context.emit('select', emoji);
    };

    const onChangeCategory = async (category: ICategory) => {
      context.emit('select', category);
    };

    watch(
      () => customEmojis,
      (newEmojis) => {
        if (newEmojis && (newEmojis as any).length) {
          mapperEmojisCategory(newEmojis as any);
        }
      }
    );

    onMounted(() => {
      const categoriesNames = (customCategories as any).map((c) => c.name);
      if (!categoriesNames.includes(initialCategory)) {
        currentCategory.value = categoriesNames[0];
      }

      mapperEmojisCategory(customEmojis);
      restoreFrequentlyEmojis();

      if (i18n) {
        locale.i18n(i18n);
      }
    });

    return {
      categoriesFiltered,
      currentCategory,
      changeCategory,
      onSearch,
      onSelectEmoji,
      mapEmojis,
      filterEmoji,
    };
  },
});
</script>


<style lang="scss" scoped>
.emoji-picker {
  --ep-color-bg: $grey-0;
  --ep-color-sbg: #f6f6f6;
  --ep-color-border: #e4e4e4;
  --ep-color-text: #4a4a4a;
  --ep-color-active: #009688;

  display: inline-flex;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeSpeed;
  flex-direction: column;
  align-items: center;
  background-color: var(--ep-color-bg);
  border-radius: 4px;
  border: 1px solid var(--ep-color-border);
  overflow: hidden;
  width: 325px;
  user-select: none;

  @media screen and (max-width: 325px) {
    width: 100%;
  }
}

.dark {
  --ep-color-bg: #191b1a;
  --ep-color-sbg: #212221;
  --ep-color-border: #3e3d42;
  --ep-color-text: #f0f0f0;
  --ep-color-active: #009688;
}
</style>
