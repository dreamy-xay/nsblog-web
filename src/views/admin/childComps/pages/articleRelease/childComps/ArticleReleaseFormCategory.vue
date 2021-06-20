<!--
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-20 00:08:20
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-20 00:22:09
-->
<template>
  <div
    class="el-input-tag input-tag-wrapper"
    :class="[size ? 'el-input-tag--' + size : '']"
    @click="foucusTagInput"
  >
    <el-tag
      v-for="(tag, idx) in innerTags"
      :key="tag"
      :size="size"
      :closable="!readOnly"
      :disable-transitions="false"
      @close="remove(idx)"
    >
      {{tag}}
    </el-tag>
    <el-autocomplete
      v-model.trim="newTag"
      :fetch-suggestions="UserNameSearchAsync"
      placeholder="邮箱前缀"
      style="outline:none;      border:none;"
      @select="handleSelect"
      clearable
    ></el-autocomplete>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * @description:
 * @param {*}
 * @return {*}
 * @author: dreamy-xay
 */

export default Vue.extend({
  name: 'ArticleReleaseFormCategory',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    addTagOnKeys: {
      type: Array,
      default: () => [13, 188, 9],
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    size: String,
  },
  data() {
    return {
      newTag: '',
      innerTags: [...this.value],
      dialog_temp: {},
    };
  },
  watch: {
    value() {
      this.innerTags = [...this.value];
    },
  },
  methods: {
    foucusTagInput() {
      if (this.readOnly || !this.$el.querySelector('.tag-input')) {
        return;
      } else {
        (this.$el as any).querySelector('.tag-input').focus();
      }
    },
    // handleSelect是自己实现的方法
    handleSelect(item: any) {
      let addSuucess = false;
      if (this.addTag(this.newTag.trim())) {
        addSuucess = true;
      }
      if (addSuucess) {
        this.tagChange();
        this.newTag = '';
      }
      console.log('value---1');
      console.log(this.innerTags); // 选中的数据保存在了this.innerTags中，这个用来和后端交互
      console.log('value---2');
    },
    // addNew是https://github.com/xiispace/el-input-tag/blob/master/src/ElInputTag.vue上原先的方法
    addNew(e: any) {
      if (e && !this.addTagOnKeys.includes(e.keyCode) && e.type !== 'blur') {
        return;
      }
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      let addSuucess = false;
      if (this.newTag.includes(',')) {
        this.newTag.split(',').forEach((item) => {
          if (this.addTag(item.trim())) {
            addSuucess = true;
          }
        });
      } else {
        if (this.addTag(this.newTag.trim())) {
          addSuucess = true;
        }
      }
      if (addSuucess) {
        this.tagChange();
        this.newTag = '';
      }
    },
    addTag(tag: string) {
      tag = tag.trim();
      if (tag && !this.innerTags.includes(tag)) {
        this.innerTags.push(tag);
        return true;
      }
      return false;
    },
    remove(index: number) {
      this.innerTags.splice(index, 1);
      this.tagChange();
      console.log('value---1');
      console.log(this.innerTags);
      console.log('value---2');
    },
    removeLastTag() {
      if (this.newTag) {
        return;
      }
      this.innerTags.pop();
      this.tagChange();
    },
    tagChange() {
      this.$emit('input', this.innerTags);
    },

    // 下面两个方法是autocomplete相关的搜索方法
    UserNameSearchAsync(queryString: string, cb: any) {
      const usernameList = [
        { key: 'admin_key', value: 'admin_value' },
        { key: 'wuxiaoyu', value: 'wuxiaoyu' },
        { key: 'wangguangshan', value: 'wangguangshan' },
      ];
      const results = queryString ? usernameList.filter(this.createUserNameFilter(queryString)) : usernameList;

      clearTimeout((this as any).timeout);
      (this as any).timeout = setTimeout(() => {
        cb(results);
      }, 100 * Math.random());
    },
    createUserNameFilter(queryString: string) {
      return (state: any) => {
        return state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
  },
});
</script>

<style lang="scss" scoped>
.input-tag-wrapper {
  position: relative;
  font-size: 14px;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  outline: none;
  padding: 0 10px 0 5px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}

.el-tag {
  margin-right: 4px;
}

.tag-input {
  background: transparent;
  border: none !important;
  font-size: 14px;
  height: 40px;
  outline: none;
  padding-left: 0;
  width: 100px;
}

.el-input-tag--mini .tag-input {
  height: 28px;
  line-height: 28px;
}

.el-input-tag--small .tag-input {
  height: 32px;
  line-height: 32px;
}

.el-input-tag--medium .tag-input {
  height: 36px;
  line-height: 36px;
}

/* 下面这个的效果是autocomplete的input没有边框*/
/deep/ input {
  /* input { */
  /* background-color: red!important;  调试用的样式 */
  outline: none !important;
  border: none !important;
}
</style>
