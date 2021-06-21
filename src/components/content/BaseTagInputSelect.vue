<!--
 * @Description: 标签输入下拉选择框
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-20 00:08:20
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-21 14:05:57
-->
<template>
  <div
    class="base-tag-input-select"
    :class="inputSize ? 'el-input-tag--' + inputSize : null"
    :style="{background: background}"
    @click="showTagInput"
  >
    <div class="base-tag-input-select-empty" />
    <div
      class="base-tag-input-select-placeholder"
      :style="{color: color}"
      v-show="tags.length === 0 && !tagInputVisible"
    >
      {{placeholder}}
    </div>
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      :color="tag.color"
      :type="tag.color ? null : tag.type"
      :closable="closable"
      :disable-transitions="disableTransitions"
      :size="tagSize"
      @close="tagHandleClose(index)"
      @click.stop=""
      :effect="effect"
    >
      {{tag.name}}
    </el-tag>
    <el-autocomplete
      v-if="tagInputVisible"
      v-model.trim="tagInputValue"
      :fetch-suggestions="valueSearch"
      :placement="placement"
      ref="baseTagInputSelect"
      @select="tagHandleInputSelect"
      @change="tagHandleInputChange"
      @blur="tagHandleInputBlur"
    ></el-autocomplete>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * @description: 标签输入下拉选择框
 * @param {Array} tags  传入的标签列表 `必传参数`
 * @param {String} placeholder 输入标签框初始内容 `默认为空`
 * @param {String} background 输入标签框背景颜色 `默认为 #ffffff`
 * @param {String} color 标签输入栏字体颜色 `默认为#c0c4cc`
 * @param {String} tagSize 标签大小 `默认为空`
 * @param {String} inputSize 标签输入框大小 `默认为small`
 * @param {String} effect 标签主题 `默认为dark`
 * @param {Boolean} disableTransitions 标签是否禁用渐变动画 `默认为false`
 * @param {Boolean} closable 标签是否可关闭 `默认为true`
 * @param {Boolean} hit 标签是否有边框描边 `默认为false`
 * @param {Array} searchList 搜索列表，列表中为对象，每个对象必含有属性 `必传参数`
 * @param {Function} searchFilter 过滤函数，参考ElementUI `默认为包含过滤`
 * @param {String} placement 菜单弹出位置，参考ElementUI `默认为bottom`
 * @event tagClose 当某个标签点击关闭了，出发时间并传递参数 index(在tags中的索引)
 * @event tagInputChange 输入内容改变时触发事件，传递参数value
 * @event tagInputSelect 输入标签选择后触发事件，传递参数 name,type,item(为searchList中单个值)
 * @author: dreamy-xay
 */

export default Vue.extend({
  name: 'BaseTagInputSelect',
  props: {
    tags: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    background: {
      type: String,
      default: '#ffffff',
    },
    color: {
      type: String,
      default: '#c0c4cc',
    },
    tagSize: {
      type: String,
      default: null,
    },
    inputSize: {
      type: String,
      default: 'small',
    },
    effect: {
      type: String,
      default: 'dark',
    },
    disableTransitions: {
      type: Boolean,
      default: false,
    },
    closable: {
      type: Boolean,
      default: true,
    },
    hit: {
      type: Boolean,
      default: false,
    },
    searchList: {
      type: Array,
      default: () => [],
    },
    searchFilter: {
      type: Object,
      default: null,
    },
    placement: {
      type: String,
      default: 'bottom',
    },
  },
  data() {
    return {
      tagInputValue: '',
      tagInputVisible: false,
      tagType: ['', 'success', 'info', 'danger', 'warning'],
      thisSearchList: JSON.parse(JSON.stringify(this.searchList)),
    };
  },
  watch: {
    searchList() {
      this.changeThisSearchList();
    },
    tags() {
      this.changeThisSearchList();
    },
  },
  methods: {
    tagHandleClose(index: number) {
      this.$emit('tagClose', index);
    },
    showTagInput() {
      this.tagInputVisible = true;
      this.$nextTick(() => {
        (this.$refs.baseTagInputSelect as any).focus();
      });
    },
    tagHandleInputChange(value: string) {
      this.$emit('tagInputChange', value);
    },
    tagHandleInputSelect(item: any) {
      if (this.tagInputValue !== '') {
        this.$emit('tagInputSelect', this.tagInputValue, this.tagType[Math.floor(Math.random() * 5)], item);
        this.tagInputValue = '';
      }
    },
    tagHandleInputBlur() {
      setTimeout(() => {
        this.tagInputVisible = false;
      }, 300);
    },
    // 修改本地 searchList
    changeThisSearchList() {
      this.thisSearchList = JSON.parse(JSON.stringify(this.searchList));
      for (const tag of this.tags)
        for (let i = 0; i < this.thisSearchList.length; ++i)
          if ((this.thisSearchList[i] as any).value === (tag as any).name) {
            this.thisSearchList.splice(i, 1);
            break;
          }
    },
    // 下面两个方法是autocomplete相关的搜索方法
    valueSearch(queryString: string, callback: any) {
      if (this.searchFilter) this.searchFilter(queryString, callback);
      else
        callback(
          queryString
            ? this.thisSearchList.filter((elem: any) => {
                return elem.value.toLowerCase().includes(queryString.toLowerCase());
              })
            : this.thisSearchList
        );
    },
  },
});
</script>

<style lang="scss" scoped>
.base-tag-input-select {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  padding: 0 5px;
  cursor: text;
  box-sizing: border-box;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  overflow: hidden;
  user-select: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    opacity: 0;
  }

  /deep/ {
    .el-tag {
      margin-right: 5px;
      cursor: default;
    }

    .el-input__inner {
      border: 0;
    }
  }

  /deep/ {
    input {
      background: transparent;
      margin-left: 10px;
      padding: 0;
      outline: none !important;
      border: none !important;
      overflow: hidden;
    }
  }

  .base-tag-input-select-empty {
    float: left;
    width: 0.0001px;
    height: 40px;
  }

  .base-tag-input-select-placeholder {
    position: absolute;
    left: 15px;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
  }

  .el-input-tag--mini /deep/ input {
    height: 28px;
    line-height: 28px;
  }

  .el-input-tag--small /deep/ input {
    height: 32px;
    line-height: 32px;
  }

  .el-input-tag--medium /deep/ input {
    height: 36px;
    line-height: 36px;
  }
}
</style>
