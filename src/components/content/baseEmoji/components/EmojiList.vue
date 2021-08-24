<template>
  <div id="Emojis">
    <div
      ref="container-emoji"
      class="container-emoji"
    >
      <template v-if="continuousList">
        <div
          v-for="(category, category_name) in dataFilteredByCategory"
          :key="category_name"
        >
          <CategoryLabel
            v-show="category.length"
            :name="category_name"
            :ref="category_name"
          />
          <div
            v-if="category.length"
            class="grid-emojis"
            :style="gridDynamic"
          >
            <EmojiItem
              v-for="(emoji, index_e) in category"
              :key="`${category_name}-${index_e}`"
              :emoji="emoji"
              :size="emojiSize"
              :withBorder="emojiWithBorder"
              @click="onSelect(emoji)"
            />
          </div>
        </div>
      </template>
      <template v-else>
        <div
          class="grid-emojis"
          :style="gridDynamic"
        >
          <EmojiItem
            v-for="(emoji, index) in dataFiltered"
            :key="index"
            :emoji="emoji"
            :size="emojiSize"
            :withBorder="emojiWithBorder"
            @click="onSelect(emoji)"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import EmojiItem from './EmojiItem.vue';
import CategoryLabel from './CategoryLabel.vue';

export default {
  name: 'EmojiList',
  components: { EmojiItem, CategoryLabel },
  props: {
    data: {
      type: [Object, Array],
      required: true,
      default: () => ({}),
    },
    emojisByRow: {
      type: Number,
      required: true,
    },
    emojiWithBorder: {
      type: Boolean,
    },
    emojiSize: {
      type: Number,
    },
    filter: {
      type: String,
    },
    continuousList: {
      type: Boolean,
    },
    category: {
      type: String,
    },
    hasSearch: {
      type: Boolean,
    },
  },
  computed: {
    gridDynamic: function () {
      const percent = 100 / this.emojisByRow;
      return {
        gridTemplateColumns: `repeat(${this.emojisByRow}, ${percent}%)`,
      };
    },
    dataFiltered: function () {
      let data = this.data[this.category];
      const searchValue = this.filter?.trim().toLowerCase();
      if (searchValue) {
        data = data.filter((emoji) => this.searchByAlias(searchValue, emoji));
      }
      return data;
    },
    dataFilteredByCategory: function () {
      let _data = Object.assign({}, this.data);
      const searchValue = this.filter?.trim().toLowerCase();
      if (searchValue) {
        this.categories.forEach((category) => {
          _data[category] = this.data[category].filter((item) => this.searchByAlias(searchValue, item));
        });
      }
      return _data;
    },
    categories: function () {
      return Object.keys(this.data);
    },
    containerEmoji: function () {
      return this.$refs['container-emoji'];
    },
  },
  watch: {
    data: function () {
      this.onDataChanged();
    },
    category: function (newValue) {
      this.onCategoryChanged(newValue);
    },
  },
  methods: {
    searchByAlias(term, emoji) {
      const isRelevant = (alias) => alias.toLowerCase().includes(term);
      return emoji.aliases.some((alias) => isRelevant(alias));
    },
    calcScrollTop() {
      return this.hasSearch ? 88 : 44;
    },
    onSelect(emoji) {
      this.$emit('select', emoji);
    },
    onDataChanged() {
      this.containerEmoji.scrollTop = 0;
    },
    onCategoryChanged(newValue) {
      if (this.continuousList) {
        const categoryEl = this.$refs[newValue][0].$el;
        this.containerEmoji.scrollTop = categoryEl.offsetTop - this.calcScrollTop();
      }
    },
  },
};
</script>



<style lang="scss" scoped>
#Emojis {
  font-family: Twemoji, NotomojiColor, Notomoji, EmojiOne Color, Symbola, Noto, Segoe UI Emoji, OpenSansEmoji, monospace;
  display: block;
  width: 100%;
  max-width: 100%;
  color: var(--ep-color-text);

  // Custom Scroll
  ::-webkit-scrollbar {
    border-radius: 4px;
    width: 4px;
    overflow: hidden;
  }
}

.container-emoji {
  overflow-x: hidden;
  overflow-y: scroll;
  height: 350px;
}

.grid-emojis {
  display: grid;
  margin: 5px 0;
  justify-items: center;
}
</style>
