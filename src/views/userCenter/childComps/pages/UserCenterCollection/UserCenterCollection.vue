<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2021-08-18 15:25:00
 * @LastEditors: continue-hs
 * @LastEditTime: 2021-09-06 10:02:47
-->
<template>
  <div class="user-center-collection">
    <user-center-collection-list
      :favorites="favorites"
      :activeIndex="activeIndex"
      @change-index="chooseActive($event)"
      @new-fav="newfavorites($event)"
    ></user-center-collection-list>
    <div class="user-center-collection-line"></div>
    <div class="user-center-collection-right">
      <div class="right-top">
        <!-- <collection-right-top
          :isClick1="isClick1"
          :isClick2="isClick2"
          @is-click1="click1($event)"
          @is-click2="click2($event)"
        >
        </collection-right-top> -->
        <!-- <div
          class="name"
          v-show="isClick1"
        >
          {{display.name}}
          <i
            class="iconfont blog-bianji1"
            role="button"
            @click="isClick1 = false"
          ></i>
        </div>
        <div class="name">
          <user-center-input
            v-show="!isClick1"
            type="text"
            v-model="inputName"
            ref="signtrueName"
            maxlength="50"
          />
          <div class="option">
            <i
              class="iconfont blog-quxiao"
              role="button"
              @click="isClick1 = true"
            ></i>
            <i
              class="iconfont blog-queding"
              role="button"
            ></i>
          </div>
        </div>
        <div
          class="more"
          v-if="isClick2"
        >
          <div class="moretext">{{display.remark}}</div>
          <i
            class="iconfont blog-bianji1"
            role="button"
          ></i>
        </div>
        <div
          class="name"
          v-else
        >
          <input type="text">
          <div class="option">
            <i
              class="iconfont blog-quxiao"
              role="button"
              @click="isClick2 = true"
            ></i>
            <i
              class="iconfont blog-queding"
              role="button"
              @click="isClick2 = true"
            ></i>
          </div>
        </div> -->
        <!-- <div class="button">
          <div
            class="button1"
            role="button"
            @click="cancelf(activeInex)"
          >删除</div>
          <div
            class="button2"
            role="button"
            v-text="this.display.is_private? '取消私有' : '私有'"
            @click="privateShow = true"
          ></div>
        </div> -->
      </div>
      <div class="right-line"></div>
      <div class="right-bottom">
        <user-center-collection-right-bottom
          :typeList="typeList"
          :choiceIndex="choiceIndex"
          :modalShow="modalShow"
          @change-choice="chooseChoice($event)"
          @cancel-col="cancelc($event)"
        ></user-center-collection-right-bottom>
      </div>
    </div>
  </div>
  <base-modal
    content="取消了就没有咯(⊙o⊙)"
    confirmeText="确认取消"
    :show="modalShow"
    @confirm="cancelCol(sureIndex)"
    @cancel="modalShow = !modalShow"
  />
  <base-modal
    content="删除了就没有咯(⊙o⊙)"
    confirmeText="确认删除"
    :show="show"
    @confirm="deleteFav(activeIndex)"
    @cancel="show = !show"
  />
  <base-modal
    content="确认要取消私有嘛"
    confirmeText="确认"
    :show="privateShow"
    @confirm="changePrivate(true)"
    @cancel="privateShow = !privateShow"
  />
</template>

<script>
import { computed, defineComponent, reactive, ref, nextTick } from 'vue';
import { mapState } from '@/util/store';
import { getFavorites, deleteFavorites, cancelCollections, change, newFavorites } from '@/network/api/favorites';
import styles from '@/assets/style/define.scss';
import BaseModal from '@/components/content/baseModal/BaseModal.vue';
import UserCenterCollectionList from '@/views/userCenter/childComps/pages/UserCenterCollection/childcomps/UserCenterCollectionList.vue';
import UserCenterCollectionRightTop from '@/views/userCenter/childComps/pages/UserCenterCollection/childcomps/UserCenterCollectionRightTop.vue';
import UserCenterCollectionRightBottom from '@/views/userCenter/childComps/pages/UserCenterCollection/childcomps/UserCenterCollectionRightBottom.vue';
import { Random } from 'better-mock';
import UserCenterInput from '@/views/userCenter/childComps/UserCenterInput.vue';
export default defineComponent({
  name: 'userCenterCollection',
  components: {
    BaseModal,
    UserCenterCollectionList,
    // UserCenterCollectionRightTop,
    UserCenterCollectionRightBottom,
    // UserCenterInput,
  },
  setup() {
    let typeList = reactive([
      { name: '全部', List: [] },
      { name: '文章', List: [] },
      { name: '问答', List: [] },
      { name: '资源', List: [] },
    ]);
    const show = ref(false); //删除收藏夹确认框
    const activeIndex = ref(0); //显示收藏夹的下标
    const modalShow = ref(false); //取消收藏确认框
    const privateShow = ref(false); //是否私有确认框
    const sureIndex = ref(-1); //取消收藏的下标
    const { tokenInfo } = mapState('global', ['tokenInfo']);
    let favorites = reactive([]); //全部收藏夹全部内容
    const choiceIndex = ref(0); //显示收藏类型的下标
    const isClick1 = ref(true);
    const isClick2 = ref(true);
    const scrollbar = ref(null); //scrollbar
    // let display = computed(() => {
    //   const len = favorites.length;
    //   return {
    //     name: len ? favorites[activeIndex.value].name : '',
    //     remark: len ? favorites[activeIndex.value].remark : '',
    //     is_private: len ? favorites[activeIndex.value].is_private : '',
    //   };
    // });
    // const inputName = ref(this.display.name);
    const signtrueName = ref(null); //修改标题
    const isEditName = ref(false);

    // function editName() {
    //   isEditName.value = true;
    //   nextTick(() => {
    //     signtrueName.value.UserCenterInput.focus();
    //   });
    // }

    /**
     * @description: 获取收藏内容
     * @return {void}
     * @author: continue-hs
     */
    if (tokenInfo.value.status) {
      getFavorites(tokenInfo.value.username, 10000, 0, 1)
        .then((res) => {
          favorites.splice(0, 0, ...res.favorites);
          console.log(res.favorites);
          typeList[0].List.splice(0, 0, ...res.favorites[0].collections); //默认收藏夹的全部收藏
        })
        .catch((error) => {
          console.log(error);
        });
    }

    /**
     * @description: 改变显示收藏夹
     * @param {number} index 显示收藏夹下标
     * @return {void}
     * @author: continue-hs
     */
    function chooseActive(index) {
      activeIndex.value = index;
      choiceIndex.value = 0;
      typeList[0].List.splice(0, typeList[0].List.length);
      typeList[0].List.splice(0, 0, ...favorites[activeIndex.value].collections);
    }

    /**
     * @description: 改变显示收藏类型
     * @param {number} index 显示收藏类型下标 `0为全部 1为文章 2为问答 3为资源`
     * @return {void}
     * @author: continue-hs
     */
    function chooseChoice(index) {
      choiceIndex.value = index;
      for (var i = 1; i < 4; i++) {
        typeList[i].List.splice(0, typeList[i].List.length);
      }
      for (index in typeList[0].List) {
        const j = typeList[0].List[index].type;
        typeList[j].List.push(typeList[0].List[index]);
      }
    }

    /**
     * @description: 修改设置
     * @return {void}
     * @author: continue-hs
     */
    function changePrivate(result) {
      change('private', result, favorites[activeIndex.value].id)
        .then(() => {
          favorites[activeIndex.value].is_private = result;
          this.display.is_private = result;
        })
        .catch((error) => {
          console.log(error);
        });
    }

    /**
     * @description: 删除收藏夹
     * @param {number} index 删除收藏夹索引 `v-for索引`
     * @return {void}
     * @author: continue-hs
     */
    function deleteFav(index) {
      deleteFavorites(favorites[index].id)
        .then(() => {
          favorites.splice(index, 1);
          if (!favorites.length)
            for (var i = 0; i < 4; i++) {
              typeList[i].List.splice(0, typeList[i].List.length);
            }
          show.value = false;
          chooseActive(activeIndex.value);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    /**
     * @description: 取消收藏
     * @param {number} index 取消收藏夹索引 `v-for索引`
     * @return {void}
     * @author: continue-hs
     */
    function cancelCol(index) {
      cancelCollections(favorites[activeIndex.value].id, choiceIndex)
        .then(() => {
          typeList[choiceIndex.value].List.splice(index, 1);
          modalShow.value = false;
        })
        .catch((error) => {
          console.log(error);
        });
    }

    /**
     * @description: 显示取消收藏确认框
     * @return {void}
     * @author: continue-hs
     */
    function cancelc(index) {
      modalShow.value = true;
      sureIndex.value = index;
    }

    /**
     * @description: 显示删除收藏夹确认框
     * @return {void}
     * @author: continue-hs
     */
    function cancelf() {
      show.value = true;
    }

    /**
     * @description: 新建文件夹
     * @return {void}
     * @author: continue-hs
     */
    function newfavorites(e) {
      const id = Random.id();
      newFavorites(tokenInfo.value.username, id, e[0], e[1], e[2]).then(() => {
        favorites.unshift({
          id: id,
          name: e[0],
          count: 0,
          remark: e[1],
          is_private: e[2],
          collection: [],
        });
      });
    }

    return {
      show,
      modalShow,
      privateShow,
      styles,
      choiceIndex,
      activeIndex,
      typeList,
      favorites,
      isClick1,
      isClick2,

      scrollbar,
      sureIndex,
      // inputName,

      changePrivate,
      cancelCol,
      deleteFav,
      cancelc,
      cancelf,
      chooseActive,
      chooseChoice,
      newfavorites,
    };
  },
});
</script>

<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}

.user-center-collection {
  box-shadow: $shadow-0;
  background: $grey-0;
  border-radius: 8px;
  @include flex(center, center);

  .user-center-collection-line {
    @include size(1px, 645px);
    opacity: 1;
    border-left: 1px solid #e5e5e5;
  }

  .user-center-collection-right {
    @include size(736px, 645px);
    margin-right: 10px;

    .right-top {
      @include size(736px, 120px);

      .name {
        color: #707070;
        padding-top: 17px;
        margin-left: 29px;

        i {
          margin-left: 14px;
        }

        input {
          height: 25px;
          width: calc(100% - 48px);
          max-width: 325px;
          border: 1px solid $grey-4;
          border-radius: 3px 0 0 3px;
          border-color: #85e8c7;
          background: $grey-2;
          text-indent: 16px;
          vertical-align: top;
          outline: 0;
        }
        .option {
          float: right;
          font-size: 16px;

          .blog-queding {
            margin-right: 275px;
            color: $green-3;
          }
          .blog-quxiao {
            margin-right: 25px;
            color: $red-2;
          }
        }
      }

      .more {
        color: #707070;
        padding-top: 10px;
        margin-left: 29px;
        display: flex;
        .moretext {
          width: 300px;
          @include ellipsis(1);
        }

        i {
          margin-left: 14px;
        }
      }

      .button1 {
        @include flex(center, center);
        @include size(70px, 30px);
        float: right;
        margin-right: 20px;
        color: #f4f4f4;
        background: $green-0;
        border-radius: 15px;
        box-shadow: $shadow-0;
        transition: all 0.25s;

        &:hover {
          background: $green-2;
        }
      }

      .button2 {
        @include flex(center, center);
        @include size(70px, 30px);
        color: #f4f4f4;
        float: right;
        margin-right: 30px;
        background: $green-0;
        border-radius: 15px;
        box-shadow: $shadow-0;
        transition: all 0.25s;

        &:hover {
          background: $green-1;
        }
      }
    }

    .right-line {
      @include size(747px, 1px);
      background: #e5e5e5;
    }
  }
}
</style>

