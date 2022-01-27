<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2021-08-23 20:34:57
 * @LastEditors: continue-hs
 * @LastEditTime: 2022-01-27 21:04:46
-->
<template>
  <div class="user-center-collection-right-bottom">
    <div class="user-center-collection-right-bottom-typelist">
      <div
        v-for="(item,index) in List"
        :key="index"
        :class="{'Type':true,'Choice': index === choiceIndex}"
        @click="chooseChoice(index)"
      >
        <div
          role="button"
          class="type"
        >
          {{item}}
        </div>
      </div>
    </div>
    <div class="user-center-collection-right-bottom-collectionlist">
      <el-scrollbar ref="scrollbar">
        <div
          class="user-center-collection-tight-bottom-collectionlists"
          v-for="(item1,index) in favoritesList"
          :key="index"
        >
          <div v-if=" index === Index">
            <div
              class="user-center-collection-right-bottom-blank"
              v-if="item1.typeList[choiceIndex].List.length === 0"
            >空空如也，快去寻找你想要的资源吧</div>
            <div
              v-else
              class="user-center-collection-right-bottom-collections"
              v-for="(item3,index) in item1.typeList[choiceIndex].List"
              :key="index"
            >
              <a
                :href="(item3.type === 1 ? '/article/' : (item3.type === 2 ? '/question/' : '/resource/') )+ item3.content_id"
                :target="(item3.type === 1 ? '/article/' : (item3.type === 2 ? '/question/' : '/resource/') )+ item3.content_id"
              >
                <base-tag
                  :text="item3.type === 1 ? '文章' : (item3.type === 2 ? '问答' : '资源')"
                  :color="styles.pink0"
                  :hollow="true"
                  role="button"
                ></base-tag>
                <div class="user-center-collection-right-bottom-title">{{item3.title}} </div>
              </a>
              <i
                class="iconfont blog-fav"
                role="button"
                @click="cancelCol(index,false,true)"
              ></i>
            </div>
            <div
              class="user-center-collection-right-bottom-more"
              v-if="item1.typeList[choiceIndex].List.length != 0 && item1.isBottom == false"
              @click="upload"
              role="button"
            >
              <div class="more">
                <div class="more-text">
                  加载更多...
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
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
import { defineComponent, ref, watch } from 'vue';
import styles from '@/assets/style/define.scss';
import BaseTag from '@/components/content/baseTag/BaseTag.vue';
import BaseModal from '@/components/content/baseModal/BaseModal.vue';

export default defineComponent({
  name: 'userCenterCollectionRightBottom',
  emits: {
    changeChoice: null,
    'cancel-col': null,
    update: null,
  },
  components: {
    BaseTag,
    BaseModal,
  },
  props: {
    choiceIndex: {
      type: Number,
      default: 0,
    },
    Index: {
      type: Number,
      default: 0,
    },
    List: {
      type: Array,
      default: null,
    },
    favoritesList: {
      type: Object,
      default: null,
    },
  },
  setup(props, context) {
    const modalShow = ref(false); // 是否显示n-modal
    const scrollbar = ref(null); //scrollbar
    const sureIndex = ref(-1);
    const actieveindex = ref(0);
    const choiceindex = ref(0);

    //监听收藏夹改变，使滚动条回到顶部
    watch(
      () => props.Index,
      (value) => {
        if (actieveindex.value !== value) {
          actieveindex.value = value;
          scrollbar.value.setScrollTop(0);
        }
      }
    );

    //监听收藏夹改变，使滚动条回到顶部
    watch(
      () => props.choiceIndex,
      (value) => {
        if (choiceindex.value !== value) {
          choiceindex.value = value;
          scrollbar.value.setScrollTop(0);
        }
      }
    );
    /**
     * @description: 更新类型列表下标
     * @param {number} index 选择的下标
     * @return {void}
     * @author: continue-hs
     */
    function chooseChoice(index) {
      context.emit('changeChoice', index);
      scrollbar.value.setScrollTop(0);
    }

    /**
     * @description: 更新取消收藏的下标及确认框的显示
     * @param {number} index 选择的下标
     * @return {void}
     * @author: continue-hs
     */
    function cancelCol(index, isConfirm, isModalShow = false) {
      sureIndex.value = index;
      if (isConfirm) {
        context.emit('cancel-col', sureIndex.value);
      }
      modalShow.value = isModalShow;
    }

    /**
     * @description: 更新收藏列表
     * @return {void}
     * @author: continue-hs
     */
    function upload() {
      context.emit('update');
    }

    return {
      styles,
      chooseChoice,
      modalShow,
      cancelCol,
      scrollbar,
      sureIndex,
      upload,
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
  @include size(746px, 504px);

  .user-center-collection-right-bottom-typelist {
    @include size(711px, 21px);
    margin: 9px 0 0 35px;

    .Type {
      @include size(38px, 21px);
      margin-right: 30px;
      padding-bottom: 5px;
      transition: 0.5s;
      float: left;
      border-bottom: 2px solid $grey-0;

      &.Choice {
        transition: 0.25s;
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
    @include size(746px, 440px);

    :deep(.el-scrollbar__thumb) {
      background-color: $grey-7 !important;
    }

    .user-center-collection-right-bottom-blank {
      @include flex(center, center);
      @include size(746px, 440px);
    }

    .user-center-collection-right-bottom-collections {
      @include size(726px, 53px);
      margin: 16px 0 1px 9px;
      background: $grey-0;
      border-radius: 8px;
      box-shadow: $shadow-0;

      &:hover {
        transition: 0.25s;
        background-color: $grey-1;
      }

      .base-tag {
        margin: 16px 0 0 29px;
        float: left;
      }

      .user-center-collection-right-bottom-title {
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

    .user-center-collection-right-bottom-more {
      width: 100%;
      @include flex(initial, center);
      margin: 10px 0;

      .more {
        @include size(300px, 32px);
        background: $grey-0;
        border-radius: 8px;
        box-shadow: $shadow-0;
        @include flex(cneter, center);

        .more-text {
          @include size(68px, 19px);
          font-size: 14px;
          font-weight: 400;
          color: $grey-9;
          margin-top: 7px;
        }
      }
    }
  }
}
</style>
