<!--
 * @Description: 输入标签框
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-20 10:22:05
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-20 14:56:23
-->
<template>
  <div
    class="base-tag-input"
    @click="showTagInput"
    :style="{background: background}"
  >
    <div class="base-tag-input-empty" />
    <div
      class="base-tag-input-placeholder"
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
    <el-input
      class="input-new-tag"
      v-if="tagInputVisible"
      v-model.trim="tagInputValue"
      ref="baseTagInput"
      :size="inputSize"
      @keyup.enter.native="tagHandleInputConfirm"
      @blur="tagInputVisible = false"
    >
    </el-input>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * @description: 输入标签框，部分参数具体可参考ElementUI
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
 * @event tagClose 当某个标签点击关闭了，出发时间并传递参数 index(在tags中的索引)
 * @event tagRepeat 当标签重复输入了触发事件
 * @event tagInputConfirm 输入标签回车触发事件，传递参数 name,type
 * @author: dreamy-xay
 */

export default Vue.extend({
  name: 'BaseTagInput',
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
  },
  data() {
    return {
      tagInputVisible: false,
      tagInputValue: '',
      tagType: ['', 'success', 'info', 'danger', 'warning'],
    };
  },
  methods: {
    tagHandleClose(index: number) {
      this.$emit('tagClose', index);
    },
    showTagInput() {
      this.tagInputVisible = true;
      this.$nextTick(() => {
        (this.$refs.baseTagInput as any).$refs.input.focus();
      });
    },
    tageInputValueEffective(value: string): boolean {
      if (value) {
        for (const item of this.tags)
          if (value === (item as any).name) {
            this.$emit('tagRepeat');
            return false;
          }
        return true;
      }
      return false;
    },
    tagHandleInputConfirm() {
      if (this.tageInputValueEffective(this.tagInputValue)) {
        this.$emit('tagInputConfirm', this.tagInputValue, this.tagType[Math.floor(Math.random() * 5)]);
        this.tagInputValue = '';
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.base-tag-input {
  width: 100%;
  height: 100%;
  padding: 0 5px;
  border-radius: 4px;
  cursor: text;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  user-select: none;
  overflow: hidden;
  position: relative;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    opacity: 0;
  }

  .base-tag-input-empty {
    float: left;
    width: 0.0001px;
    height: 40px;
  }

  .base-tag-input-placeholder {
    position: absolute;
    left: 15px;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
  }

  /deep/ {
    .el-tag {
      margin-right: 5px;
      cursor: default;
    }

    .el-input__inner {
      border: 0;
    }

    input {
      background: transparent;
      border: none !important;
      outline: none !important;
    }
  }

  .input-new-tag {
    width: 90px;
    vertical-align: bottom;
  }
}
</style>
