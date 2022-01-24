<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2021-08-18 15:25:00
 * @LastEditors: continue-hs
 * @LastEditTime: 2022-01-24 23:45:00
-->
<template>
  <div class="user-center-collection">
    <user-center-collection-list
      :favorites="favorites"
      :activeIndex="activeIndex"
      @change-index="chooseActive($event)"
      @new-fav="newfavorites($event)"
    />
    <div class="user-center-collection-line"></div>
    <div class="user-center-collection-right">
      <user-center-collection-right-top
        :data="display"
        @updateName="changeName"
        @updateRemark="changeRemark"
        @cancelf="deleteFav"
        @updatePrivate="changePrivate($event)"
      />
      <div class="right-line"></div>
      <user-center-collection-right-bottom
        :choiceIndex="choiceIndex"
        :Index="activeIndex"
        :List="List"
        :favoritesList="favorites"
        @changeChoice="chooseChoice($event)"
        @cancel-col="cancelCol($event)"
        @update="getList"
      />
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
    const List = ['全部', '文章', '问答', '资源'];
    const { tokenInfo } = mapState('global', ['tokenInfo']);
    let favorites = reactive([]); //全部收藏夹全部内容
    const choiceIndex = ref(0); //显示收藏类型的下标
    const activeIndex = ref(0); //显示收藏夹的下标
    let display = computed(() => {
      const len = favorites.length;
      return {
        name: len ? favorites[activeIndex.value].name : '',
        remark: len ? favorites[activeIndex.value].remark : '',
        is_private: len ? favorites[activeIndex.value].is_private : '',
      };
    });
    const msg = useMessage();
    const limit = ref(20);
    if (tokenInfo.value.status) {
      getFavorites(tokenInfo.value.username, limit.value, 0, 0, 1)
        .then((res) => {
          const len = res.favorites.length;
          for (var i = 0; i < len; i++) {
            let typeList = reactive([]); //收藏夹分类收藏列表
            typeList.push({ List: [] }, { List: [] }, { List: [] }, { List: [] });
            let lenList = reactive([]); //收藏夹分类列表数量
            lenList.push({ lens: 0 }, { lens: 0 }, { lens: 0 }, { lens: 0 });

            favorites.push({ ...res.favorites[i], typeList, isBottom: false, lenList, offset: 0 });
            //判断获取到的收藏列表长度是否小于limit，以此判断是否到底
            if (res.favorites[i].collections.length < limit.value) favorites[i].isBottom = true;
            for (var n = 0; n < favorites[i].collections.length; n++) {
              typeList[0].List.push({ ...favorites[i].collections[n], allIndex: n, Index: 0 });
            }
            favorites[i].offset += typeList[0].List.length;
            //判断每个收藏夹下全部列表中的元素类型，并推入对应类型列表
            for (var x = 0; x < favorites[i].typeList[0].List.length; x++) {
              const j = favorites[i].typeList[0].List[x].type;
              favorites[i].typeList[j].List.push({
                ...favorites[i].typeList[0].List[x],
                allIndex: x, //该收藏在总列表中的下标
                Index: favorites[i].lenList[j].lens, //该收藏在分类列表中的下标
              });
              favorites[i].lenList[j].lens++;
            }
          }
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
    }

    /**
     * @description: 改变显示收藏类型
     * @param {number} index 显示收藏类型下标 `0为全部 1为文章 2为问答 3为资源`
     * @return {void}
     * @author: continue-hs
     */
    function chooseChoice(index) {
      choiceIndex.value = index;
    }

    /**
     * @description: 修改收藏夹类型
     * @param {number} isPrivate 修改的收藏夹类型
     * @return {void}
     * @author: continue-hs
     */
    function changePrivate(isPrivate) {
      modifyPrivate(isPrivate, favorites[activeIndex.value].favorite_id)
        .then(() => {
          favorites[activeIndex.value].is_private = isPrivate;
          msg.success('修改收藏夹类型成功');
        })
        .catch((error) => {
          console.log(error);
        });
    }

    /**
     * @description: 更新收藏列表
     * @return {void}
     * @author: continue-hs
     */
    function getList() {
      //若判断该收藏夹是否到底，未到底则继续获取列表
      if (favorites[activeIndex.value].isBottom === false) {
        getFavorites(
          tokenInfo.value.username,
          limit.value,
          favorites[activeIndex.value].offset,
          0,
          1,
          favorites[activeIndex.value].favorite_id
        )
          .then((res) => {
            const lens = favorites[activeIndex.value].typeList[0].List.length;
            favorites[activeIndex.value].typeList[0].List.splice(lens, 0, ...res.collections);
            favorites[activeIndex.value].offset += res.collections.length;
            for (var x = lens; x < favorites[activeIndex.value].typeList[0].List.length; x++) {
              const j = favorites[activeIndex.value].typeList[0].List[x].type;
              favorites[activeIndex.value].typeList[j].List.push(favorites[activeIndex.value].typeList[0].List[x]);
            }
            //若获取到的列表长度小于limit,则判断列表已到底
            if (res.collections.length < limit.value) {
              favorites[activeIndex.value].isBottom = true;
              msg.success('已经获取到了全部了哦');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    /**
     * @description: 修改收藏夹标题
     * @param {string} name 修改的收藏夹标题内容
     * @return {void}
     * @author: continue-hs
     */
    function changeName(name, error) {
      modifyName(name, favorites[activeIndex.value].favorite_id)
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
      modifyRemark(remark, favorites[activeIndex.value].favorite_id)
        .then(() => {
          favorites[activeIndex.value].remark = remark;
          msg.success('修改收藏夹描述成功');
        })
        .catch((err) => {
          console.log(err);
          error();
        });
    }
    /**
     * @description: 删除收藏夹
     * @return {void}
     * @author: continue-hs
     */
    function deleteFav() {
      deleteFavorites(favorites[activeIndex.value].favorite_id)
        .then(() => {
          favorites.splice(activeIndex.value, 1);
          msg.success('删除收藏夹成功');
          chooseActive(0);
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
      cancelCollections(favorites[activeIndex.value].typeList[choiceIndex.value].List[index].collection_id)
        .then(() => {
          const type = favorites[activeIndex.value].typeList[choiceIndex.value].List[index].type;
          if (choiceIndex.value === 0) {
            const Index = favorites[activeIndex.value].typeList[choiceIndex.value].List[index].Index;
            favorites[activeIndex.value].typeList[0].List.splice(index, 1);
            favorites[activeIndex.value].typeList[type].List.splice(Index, 1);
          } else {
            const allIndex = favorites[activeIndex.value].typeList[choiceIndex.value].List[index].allIndex;
            favorites[activeIndex.value].typeList[0].List.splice(allIndex, 1);
            favorites[activeIndex.value].typeList[type].List.splice(index, 1);
          }
          favorites[activeIndex.value].count--;
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
      let typeList = reactive([]);
      typeList.push({ List: [] }, { List: [] }, { List: [] }, { List: [] });
      let lenList = reactive([]);
      lenList.push({ lens: 0 }, { lens: 0 }, { lens: 0 }, { lens: 0 });
      newFavorites(tokenInfo.value.username, id, e[0], e[1], e[2])
        .then(() => {
          favorites.unshift({
            favorite_id: id,
            name: e[0],
            count: 0,
            remark: e[1],
            is_private: e[2],
            collections: [],
            typeList,
            isBottom: false,
            lenList,
            offset: 0,
          });
          chooseActive(0);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return {
      choiceIndex,
      activeIndex,
      getList,
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
      List,
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
  @include flex(initial, center);

  .user-center-collection-line {
    @include size(1px, 626px);
    opacity: 1;
    border-left: 1px solid $grey-4;
  }

  .user-center-collection-right {
    @include size(746px, 626px);
    overflow: hidden;

    .right-line {
      @include size(747px, 1px);
      background: $grey-4;
    }
  }
}
</style>
