<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2021-08-18 15:25:00
 * @LastEditors: continue-hs
 * @LastEditTime: 2021-09-11 20:21:03
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
      <user-center-collection-right-top
        :data="display"
        @updateName="changeName"
        @updateRemark="changeRemark"
        @cancelf="deleteFav(activeIndex)"
        @updatePrivate="changePrivate($event)"
      >
      </user-center-collection-right-top>
      <div class="right-line"></div>
      <user-center-collection-right-bottom
        :typeList="typeList"
        :choiceIndex="choiceIndex"
        @change-choice="chooseChoice($event)"
        @cancel-col="cancelCol($event)"
      ></user-center-collection-right-bottom>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, ref } from 'vue';
import { mapState } from '@/util/store';
import {
  getFavorites,
  deleteFavorites,
  cancelCollections,
  modifyName,
  modifyRemark,
  newFavorites,
  modifyPrivate,
} from '@/network/api/favorites';
import UserCenterCollectionList from '@/views/userCenter/childComps/pages/UserCenterCollection/childcomps/UserCenterCollectionList.vue';
import UserCenterCollectionRightTop from '@/views/userCenter/childComps/pages/UserCenterCollection/childcomps/UserCenterCollectionRightTop.vue';
import UserCenterCollectionRightBottom from '@/views/userCenter/childComps/pages/UserCenterCollection/childcomps/UserCenterCollectionRightBottom.vue';
import { Random } from 'better-mock';
import { useMessage } from 'naive-ui';

export default defineComponent({
  name: 'userCenterCollection',
  components: {
    UserCenterCollectionList,
    UserCenterCollectionRightTop,
    UserCenterCollectionRightBottom,
  },
  setup() {
    let typeList = reactive([
      { name: '全部', List: [] },
      { name: '文章', List: [] },
      { name: '问答', List: [] },
      { name: '资源', List: [] },
    ]);
    const activeIndex = ref(0); //显示收藏夹的下标
    const { tokenInfo } = mapState('global', ['tokenInfo']);
    let favorites = reactive([]); //全部收藏夹全部内容
    const choiceIndex = ref(0); //显示收藏类型的下标
    let display = computed(() => {
      const len = favorites.length;
      return {
        name: len ? favorites[activeIndex.value].name : '',
        remark: len ? favorites[activeIndex.value].remark : '',
        is_private: len ? favorites[activeIndex.value].is_private : '',
      };
    });
    const msg = useMessage();
    let offset = 0;
    /**
     * @description: 获取收藏内容
     * @return {void}
     * @author: continue-hs
     */
    if (tokenInfo.value.status) {
      getFavorites(tokenInfo.value.username, 0, 0, 0, 1)
        .then((res) => {
          console.log(res.favorites);
          favorites.splice(0, 0, ...res.favorites);
          getFavorites(tokenInfo.value.username, 15, offset, 0, 0, res.favorites[0].id)
            .then((data) => {
              typeList[0].List.splice(0, favorites[0].collections.length);
              typeList[0].List.splice(0, 0, ...data.collections);
              console.log(data.collections);
            })
            .catch((error) => {
              console.log(error);
            });
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
      getFavorites(tokenInfo.value.username, 15, offset, 0, 1, favorites[index].id)
        .then((data) => {
          typeList[0].List.splice(0, typeList[0].List.length);
          typeList[0].List.splice(0, 0, ...data.collections);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    /**
     * @description: 改变显示收藏类型
     * @param {number} index 显示收藏类型下标 `0为全部 1为文章 2为问答 3为资源`
     * @return {void}
     * @author: continue-hs
     */
    function chooseChoice(index) {
      choiceIndex.value = index;
      getFavorites(tokenInfo.value.username, 15, offset, index, 0, favorites[index].id)
        .then((data) => {
          typeList[index].List.splice(0, typeList[index].List.length);
          typeList[index].List.splice(0, 0, ...data.collections);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    /**
     * @description: 修改收藏夹类型
     * @param {number} isPrivate 修改的收藏夹类型
     * @return {void}
     * @author: continue-hs
     */
    function changePrivate(isPrivate) {
      modifyPrivate(isPrivate, favorites[activeIndex.value].id)
        .then(() => {
          favorites[activeIndex.value].is_private = isPrivate;
          msg.success('修改收藏夹类型成功');
        })
        .catch((error) => {
          console.log(error);
        });
    }

    /**
     * @description: 修改收藏夹标题
     * @param {string} name 修改的收藏夹标题内容
     * @return {void}
     * @author: continue-hs
     */
    function changeName(name, error) {
      modifyName(name, favorites[activeIndex.value].id)
        .then(() => {
          favorites[activeIndex.value].name = name;
          msg.success('修改收藏夹标题成功');
        })
        .catch((err) => {
          console.log(err);
          error();
        });
    }

    /**
     * @description: 修改收藏夹描述
     * @param {string} remark 修改的收藏夹描述内容
     * @return {void}
     * @author: continue-hs
     */
    function changeRemark(remark, error) {
      modifyRemark(remark, favorites[activeIndex.value].id)
        .then(() => {
          msg.favorites[activeIndex.value].remark = remark;
          msg.success('修改收藏夹描述成功');
        })
        .catch((err) => {
          console.log(err);
          error();
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
              msg.success('删除收藏夹成功');
            }
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
      cancelCollections(typeList[choiceIndex.value].List[index].collection_id)
        .then(() => {
          typeList[choiceIndex.value].List.splice(index, 1);
          msg.success('取消收藏成功');
        })
        .catch((error) => {
          console.log(error);
        });
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
      offset,
      choiceIndex,
      activeIndex,
      typeList,
      favorites,
      display,
      changePrivate,
      cancelCol,
      deleteFav,
      chooseActive,
      chooseChoice,
      newfavorites,
      changeName,
      changeRemark,
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
    border-left: 1px solid $grey-4;
  }

  .user-center-collection-right {
    @include size(736px, 645px);
    margin-right: 10px;

    .right-line {
      @include size(747px, 1px);
      background: $grey-4;
    }
  }
}
</style>
