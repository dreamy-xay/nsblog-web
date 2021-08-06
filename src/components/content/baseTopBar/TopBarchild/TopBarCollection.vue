<!--
 * @Description:basetopbarcollection
 * @Version:
 * @Autor: continue-hs
 * @Date: 2021-07-22 18:50:30
 * @LastEditors: continue-hs
 * @LastEditTime: 2021-08-05 21:53:16
-->

<template>
  <div class="top-bar-collection">
    <el-popover
      offset="18"
      placement="bottom"
      trigger="hover"
      hide-after="100"
      :width=498
      :popper-class="top-bar-collections"
    >

      <template #reference>
        <div class="top-bar-collection-header">
          收藏
        </div>
      </template>

      <div class="collections">
        <el-tabs
          type="card"
          :width="161"
          v-model="activeId"
          tab-position="left"
        >
          <el-tab-pane
            v-for="(item,index) in favorites"
            :key="index"
            :name="index"
            :class="collection-left"
          >
            <template #label>
              <span class="left">{{item.name}}</span>
              <span class="right">{{item.count}}</span>
            </template>
            <el-scrollbar height="401px">
              <div
                class="blank"
                v-if="item.count === 0"
              >该收藏夹还没有收藏内容哦~</div>
              <div
                v-for="(value,index) in item.collections"
                :key=index
                class="collection-right"
              >

                <el-link
                  :underline=false
                  :href=value.link
                  target="_blank"
                  style="text-align:left"
                >
                  <div class="collection">
                    <i
                      class="tag"
                      v-if="value.type === 1"
                    >问答</i>
                    <i
                      class="tag"
                      v-if="value.type === 2"
                    >文章</i>
                    <span class="collectioncontent"> {{value.title}}</span>
                  </div>
                </el-link>
              </div>
            </el-scrollbar>
          </el-tab-pane>
        </el-tabs>
      </div>

    </el-popover>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, onMounted } from 'vue';
import { getCollections } from '@/network/api/collections';

/**
 * @description:  收藏栏弹窗
 * @author: continue-hs
 */

export default defineComponent({
  name: 'basetopBarCollection',
  setup() {
    const activeId = ref(0);
    let favorites = ref();

    /**
     * @description: 获取所有收藏夹信息
     * @return {void}
     * @author: continue-hs
     */
    getCollections().then((res) => {
      console.log(res);
      favorites.value = res.favorites;
    });
    return {
      activeId,
      favorites,
    };
  },
});
</script>

<style >
.el-popover.NaN.el-popper.is-light {
  border: 0;
  padding: 0;
  background: #e5e5e5;
  text-align: left;
}
</style>

<style lang="scss" scoped>
@mixin font-style($size: 16px, $color: $grey-11) {
  font-size: $size;
  font-family: Arial, Arial-Regular;
  font-weight: 400;
  color: $color;
}

@mixin size($width, $height) {
  width: $width;
  height: $height;
}

.top-bar-collection-header {
  @include font-style;
}

::v-deep .el-tabs__item {
  border-width: 0;
  padding: 0;
  @include size(161px, 44px);
  line-height: 44px;
  @include font-style;
  display: inline-block;
  text-align: justify;

  &:hover {
    background: $grey-2;
  }

  &.is-active {
    color: $grey-0;
    background: $green-0;
  }

  .left {
    position: absolute;
    left: 15px;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 115px;
  }

  .right {
    position: absolute;
    right: 11px;
  }
}

::v-deep .el-link {
  @include font-style;

  &--inner {
    text-align: left;
  }

  &.el-link--default {
    @include size(337px, 44px);
    line-height: 44px;

    &:hover {
      background: $grey-2;
      color: $grey-11;
    }
  }
}

.blank {
  display: inline-block;
  position: absolute;
  top: 45%;
  left: 25%;
  line-height: 44px;
  font-family: Arial, Arial-Regular;
  color: $grey-11;
}

.collectioncontent {
  padding: 11px 22px 12px 13px;
  overflow-wrap: normal;
  @include font-style;
  text-align: left;
  @include size(248px, 21px);
  line-height: 21px;
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  // word-wrap: keep-all;
}

::v-deep .el-tabs__header.is-left {
  margin-right: 0;
}

.collection-right {
  @include font-style;
  text-align: left;
  @include size(337px, 44px);
  line-height: 44px;

  .tag {
    display: inline-block;
    display: inline-block;
    padding: 3px 5px 3px 5px;
    border-radius: 5px;
    border: 1px solid $pink-0;
    @include font-style(12px, $pink-0);
    text-align: left;
    @include size(24px, 16px);
    line-height: 16px;
  }
}

.collecion {
  text-align: left;
  @include size(337px, 44px);
  line-height: 44px;
}
</style>

