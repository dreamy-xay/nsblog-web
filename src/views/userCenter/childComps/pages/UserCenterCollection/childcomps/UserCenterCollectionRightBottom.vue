<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2021-08-23 20:34:57
 * @LastEditors: continue-hs
 * @LastEditTime: 2021-09-06 10:02:46
-->
<template>
  <div class="user-center-collection-right-bottom">
    <div class="user-center-collection-right-bottom-typelist">
      <div
        v-for="(item,index) in typeList"
        :key="index"
        :class="{'Type':true,'Choice': choiceIndex === index}"
        @click="chooseChoice(index);this.scrollbar.setScrollTop(0);"
      >
        <div
          role="button"
          class="type"
        >
          {{item.name}}
        </div>
      </div>
    </div>
    <div class="user-center-collection-right-bottom-collectionlist">
      <el-scrollbar ref="scrollbar">
        <div
          class="collections"
          v-for="(item,index) in typeList[choiceIndex].List"
          :key="index"
        >
          <a
            :href="(item.type === 1 ? '/article' : (item.type === 2 ? '/question' : '/resource') )+ item.id"
            :target="(item.type === 1 ? '/article' : (item.type === 2 ? '/question' : '/resource') )+ item.id"
          >
            <base-tag
              :text="item.type === 1 ? '文章' : (item.type === 2 ? '问答' : '资源')"
              :color="styles.pink0"
              :hollow="true"
              role="button"
            ></base-tag>
            <div class="title">{{item.title}} </div>
          </a>
          <i
            class="iconfont blog-fav"
            role="button"
            @click.stop="cancelCol(index)"
          ></i>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import styles from '@/assets/style/define.scss';
import BaseTag from '@/components/content/baseTag/BaseTag.vue';
import BaseModal from '@/components/content/baseModal/BaseModal.vue';

export default defineComponent({
  name: 'userCenterCollectionRightBottom',
  components: {
    BaseTag,
  },
  props: {
    typeList: {
      type: Object,
      default: null,
    },
    choiceIndex: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const modalShow = ref(false); // 是否显示n-modal
    const scrollbar = ref(null); //scrollbar

    function chooseChoice(index) {
      this.$emit('change-Choice', index);
    }

    function sureCancelCollection() {
      modalShow.value = !modalShow.value;
      cancelCol;
    }

    function cancelCol(index) {
      this.$emit('cancel-col', index);
    }

    return {
      styles,
      chooseChoice,
      modalShow,
      sureCancelCollection,
      cancelCol,
      scrollbar,
    };
  },
});
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}

.user-center-collection-right-bottom {
  @include size(736px, 872px);

  .user-center-collection-right-bottom-typelist {
    @include size(736px, 21px);
    margin: 10px 0 0 35px;

    .Type {
      @include size(38px, 21px);
      margin-right: 30px;
      padding-bottom: 5px;
      color: #262626;
      transition: 0.25s;
      float: left;

      .type {
        @include size(32px, 21px);
        margin-left: 3.5px;
      }

      &.Choice {
        border-width: 36px;
        border-bottom: 1px solid #85e8c7;
      }
    }
  }

  .user-center-collection-right-bottom-collectionlist {
    margin: 15px 0 0 9px;
    @include size(736px, 465px);

    :deep(.el-scrollbar__thumb) {
      background-color: $grey-7 !important;
    }

    .collections {
      @include size(726px, 53px);
      margin-top: 16px;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: $shadow-0;

      .base-tag {
        margin: 16px 0 0 29px;
        float: left;
      }

      .title {
        color: #000000;
        padding-top: 17px;
        margin-left: 78px;
        @include ellipsis(1);
        width: 550px;
      }

      i {
        float: right;
        margin-right: 26px;
        color: #ffb792;
        position: relative;
        bottom: 20px;
        font-size: 20px;
      }
    }
  }
}
</style>
