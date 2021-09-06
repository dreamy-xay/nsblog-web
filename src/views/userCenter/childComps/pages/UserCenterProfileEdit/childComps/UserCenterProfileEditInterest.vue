<!--
 * @Description: 用户中心-基础资料-兴趣标签
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-28 14:54:52
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-06 22:22:43
-->

<template>
  <div class="user-center-profile-interest">
    <div class="user-center-profile-interest-top">
      兴趣标签
    </div>
    <div class="user-center-profile-interest-body">
      <div class="body-show">
        <div class="body-text">兴趣标签</div>
        <div class="body-show-tags">
          <el-tag
            closable
            v-for="(item, index) in tags"
            :key="index"
            @close="deleteTag(index)"
          >
            {{ item }}
          </el-tag>
        </div>
      </div>
      <div class="body-select">
        <div class="body-text">选择标签</div>
        <div class="body-select-tags">
          <div class="select-tag1">
            <el-tag
              v-for="(item, index) in tagsSelected"
              :key="index"
              role="button"
              @click="changePitch(index)"
              :class="tagsPitch === index ? 'active' : ''"
            >
              {{item.name}}
            </el-tag>
          </div>

          <div class="select-tag2">
            <el-tag
              v-for="item in (tagsSelected.length > 0 ? tagsSelected[tagsPitch].tags : [])"
              :key="item"
              role="button"
              @click="addTag(item.name)"
            >
              {{item.name}}
            </el-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, computed, onMounted } from 'vue';
import { getTag, addUserTag } from '@/network/api/user';
import { mapState } from '@/util/store';
import { getTopics, getTopicTags } from '@/network/api/topics';
/**
 * @description: 用户中心-基础资料-兴趣标签
 * @param {*}
 * @return {*}
 * @author: Ban
 */
export default defineComponent({
  name: 'UserCenterProfileInterest',
  setup() {
    const { tokenInfo } = mapState('global', ['tokenInfo']); // 获取tokenInfo
    const tags = ref([]); // 兴趣标签
    const tagsSelected = reactive([]); // 可选择标签
    const tagsPitch = ref(0); // 选中的标签
    // 获取已有标签
    getTag(tokenInfo.value.username)
      .then((data) => {
        tags.value = data.tags;
      })
      .catch((error) => {
        console.log(error);
      });
    // 获取专题名
    // onMounted(() => {
    getTopics()
      .then((data) => {
        // console.log(data);
        const length = data.topics.length;
        for (let i = 0; i < length; i++) {
          let obj = new Object();
          obj.name = data.topics[i].name;
          obj.tags = '';
          tagsSelected.push(obj);
        }
        // console.log(tagsSelected);
        getTopicTags(tagsSelected[0].name)
          .then((data) => {
            tagsSelected[0].tags = data.tags;
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    // });

    // 删除兴趣标签
    function deleteTag(index) {
      tags.value.splice(index, 1);
    }

    // 选择标签中改变选中
    function changePitch(index) {
      //   获取标签名
      if (tagsSelected[index].tags === '') {
        getTopicTags(tagsSelected[index].name)
          .then((data) => {
            tagsSelected[index].tags = data.tags;
            tagsPitch.value = index;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        tagsPitch.value = index;
      }
    }

    // 选择标签中已选中子标签
    function tagsPitched() {
      const lenght = tags.value.length - 1;
    }

    //新加用户标签
    function addTag(tag) {
      addUserTag(tag)
        .then(() => {
          tags.value.push(tag);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return {
      tags,
      deleteTag,
      tagsSelected,
      tagsPitch,
      changePitch,
      addTag,
    };
  },
});
</script>

<style lang='scss' scoped>
.user-center-profile-interest {
  margin: 16px 0;
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;
  background: $grey-0;
  // height: 500px;

  .user-center-profile-interest-top {
    @include flex(center);
    height: 44px;
    font-size: 16px;
    box-sizing: border-box;
    padding-left: 24px;
    border-bottom: 1px solid $grey-4;
  }

  .user-center-profile-interest-body {
    box-sizing: border-box;
    padding: 24px 0 24px 24px;

    .body-show-tags {
      margin-left: 24px;
      width: 724px;
      border-bottom: 1px solid $grey-3;
      min-height: 29px;

      ::v-deep(.el-tag) {
        background: $blue-0;
        color: $blue-1;
        border-radius: 13px;
        height: 25px;
        line-height: 25px;
        font-size: 14px;
        margin-right: 9px;
        margin-bottom: 4px;
        box-shadow: $shadow-0;

        .el-tag__close {
          &:hover {
            color: $blue-0;
          }
        }
      }
    }
    .body-show,
    .body-select {
      display: flex;
      align-content: flex-start;
      font-size: 14px;
    }

    .body-text {
      color: $grey-7;
    }

    .body-select {
      margin-top: 24px;
      line-height: 25px;

      .body-select-tags {
        margin-left: 24px;
        max-width: 671px;

        .select-tag1 {
          margin-bottom: 7px;

          ::v-deep(.el-tag) {
            background: $grey-1;
            height: 25px;
            line-height: 25px;
            font-size: 14px;
            margin-bottom: 4px;
            margin-right: 24px;
            border-radius: $border-radius-0;
            color: $grey-7;
            border: none;
            box-shadow: $shadow-0;
            transition: 0.25s;
          }

          .active {
            box-shadow: $shadow-2;
            color: $green-1;
          }
        }

        .select-tag2 {
          box-sizing: border-box;
          padding: 7px 10px 1px 10px;
          max-width: 671px;
          border-radius: $border-radius-0;
          box-shadow: $shadow-0;
          margin-right: 24px;

          :deep(.el-tag) {
            background: $grey-0;
            height: 25px;
            line-height: 25px;
            font-size: 14px;
            margin-bottom: 6px;
            margin-right: 10px;
            border-radius: 11px;
            color: $grey-8;
            border: none;
            box-shadow: $shadow-0;
          }

          .active {
            background: $green-0;
            color: $green-3;
          }
        }
      }
    }
  }
}
</style>
