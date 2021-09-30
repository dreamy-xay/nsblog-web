<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2021-08-23 20:34:57
 * @LastEditors: continue-hs
 * @LastEditTime: 2021-09-29 22:15:21
-->
<template>
  <div class="user-center-collection-right-bottom">
    <div class="user-center-collection-right-bottom-typelist">
      <div
        v-for="(item,index) in List"
        :key="index"
        :class="{'Type':true,'Choice': choiceIndex === index}"
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
          v-for="(item1,index) in favoritesList"
          :key="index"
        >
          <div v-if=" index === Index">
            <div
              class="user-center-collection-right-bottom-collections"
              v-for="(item3,index) in item1.typeList[choiceIndex].List"
              :key="index"
            >
              <a
                :href="(item3.type === 1 ? '/article' : (item3.type === 2 ? '/question' : '/resource') )+ item3.content_id"
                :target="(item3.type === 1 ? '/article' : (item3.type === 2 ? '/question' : '/resource') )+ item3.content_id"
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
              class="user-center-collection-right-bottom-blank"
              v-if="item1.typeList[choiceIndex].List.length === 0"
            >此收藏夹为空，快去添加收藏吧</div>
            <div v-else>
              <div
                class="user-center-collection-right-bottom-more"
                v-if="item1.isBottom == false"
                @click="upload"
                role="button"
              >查看更多</div>
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
  setup(props) {
    const modalShow = ref(false); // 是否显示n-modal
    const scrollbar = ref(null); //scrollbar
    const sureIndex = ref(-1);
    const index = ref(0);

    //监听收藏夹改变，使滚动条回到顶部
    watch(
      () => props.Index,
      (value) => {
        if (index.value !== value) {
          scrollbar.value.setScrollTop(0);
          index.value = value;
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
      this.$emit('change-Choice', index);
      scrollbar.value.setScrollTop(0);
    }

    /**
     * @description: 更新取消收藏的下标及确认框的显示
     * @param {number} index 选择的下标
     * @return {void}
     * @author: continue-hs
     */
    function cancelCol(index, isConfirm, isModalShow = false) {
      console.log(index);
      sureIndex.value = index;
      if (isConfirm) {
        this.$emit('cancel-col', sureIndex.value);
      }
      modalShow.value = isModalShow;
    }

    /**
     * @description: 更新收藏列表
     * @return {void}
     * @author: continue-hs
     */
    function upload() {
      this.$emit('update');
    }

    return {
      styles,
      chooseChoice,
      modalShow,
      cancelCol,
      scrollbar,
      sureIndex,
      upload,
      index,
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
      transition: 0.5s;
      float: left;
      border-bottom: 2px solid $grey-0;

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

    .user-center-collection-right-bottom-collections {
      @include size(726px, 53px);
      margin: 16px 0 0 9px;
      background: $grey-0;
      border-radius: 8px;
      box-shadow: $shadow-0;

      &:hover {
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
      @include flex(center, center, center);
    }
  }
}
</style>
