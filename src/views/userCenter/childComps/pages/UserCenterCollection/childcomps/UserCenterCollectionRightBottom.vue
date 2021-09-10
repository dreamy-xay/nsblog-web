<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2021-08-23 20:34:57
 * @LastEditors: continue-hs
 * @LastEditTime: 2021-09-10 22:23:56
-->
<template>
  <div class="user-center-collection-right-bottom">
    <div class="user-center-collection-right-bottom-typelist">
      <div
        v-for="(item,index) in typeList"
        :key="index"
        :class="{'Type':true,'Choice': choiceIndex === index}"
        @click="chooseChoice(index)"
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
      <!-- <el-scrollbar ref="scrollbar"> -->
      <ul>
        <li
          class="collections"
          v-for="(item,index) in typeList[choiceIndex].List"
          :key="index"
        >
          <a
            :href="(item.type === 1 ? '/article' : (item.type === 2 ? '/question' : '/resource') )+ item.content_id"
            :target="(item.type === 1 ? '/article' : (item.type === 2 ? '/question' : '/resource') )+ item.content_id"
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
            @click.stop="cancelCol(index,true,false)"
          ></i>
        </li>
      </ul>
      <!-- </el-scrollbar> -->
    </div>
  </div>
  <base-modal
    content="取消了就没有咯(⊙o⊙)"
    confirmeText="确认取消"
    :show="modalShow"
    @confirm="cancelCol(sureIndex,true)"
    @cancel="cancelCol(sureIndex,false)"
  />
</template>

<script>
import { defineComponent, ref } from 'vue';
import styles from '@/assets/style/define.scss';
import BaseTag from '@/components/content/baseTag/BaseTag.vue';

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
  setup(context) {
    const modalShow = ref(false); // 是否显示n-modal
    const scrollbar = ref(null); //scrollbar

    /**
     * @description: 更新类型列表下标
     * @param {number} index 选择的下标
     * @return {void}
     * @author: continue-hs
     */
    function chooseChoice(index) {
      this.$emit('change-Choice', index);
    }

    /**
     * @description: 更新取消收藏的下标及确认框的显示
     * @param {number} index 选择的下标
     * @return {void}
     * @author: continue-hs
     */
    function cancelCol(index, isConfirm, isModalShow = false) {
      if (isConfirm) {
        context.emit('cancel-col', index);
      }
      modalShow.value = isModalShow;
    }

    return {
      styles,
      chooseChoice,
      modalShow,
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
      transition: all 0.25s;
      float: left;

      &.Choice {
        border-bottom: 2px solid $green-0;
      }

      .type {
        @include size(32px, 21px);
        margin-left: 3.5px;
      }
    }
  }

  .user-center-collection-right-bottom-collectionlist {
    margin-top: 15px;
    @include size(736px, 465px);

    :deep(.el-scrollbar__thumb) {
      background-color: $grey-7 !important;
    }

    .collections {
      @include size(726px, 53px);
      margin: 16px 0 0 9px;
      background: $grey-1;
      border-radius: 8px;
      box-shadow: $shadow-0;

      &:hover {
        background-color: $grey-2;
      }

      .base-tag {
        margin: 16px 0 0 29px;
        float: left;
      }

      .title {
        color: $grey-11;
        padding-top: 17px;
        margin-left: 78px;
        @include ellipsis(1);
        width: 550px;
      }

      i {
        float: right;
        margin-right: 26px;
        color: $orange-0;
        position: relative;
        bottom: 20px;
        font-size: 20px;
      }
    }
  }
}
</style>
