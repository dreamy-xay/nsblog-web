<!--
 * @Description: 发布文章
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-04-06 14:57:24
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-04-11 17:50:52
-->
<template>
  <admin-view class="admin-creation-article-release">
    <div class="article-release-top">
      <div class="release-top-title">
        <div class="title-left">文章发布</div>

        <div class="title-right">
          <div
            class="button"
            role="button"
            @click="save"
          >保存</div>
          <div
            class="button"
            role="button"
          >发布</div>
        </div>
      </div>
      <div class="top-cover">
        <div class="name">封面</div>
        <div
          v-show="imageUrl==null"
          role="button"
          @click="pickImage"
          class="cover-button"
        >
          <i class="iconfont blog-daochu1024-29"></i>
        </div>
        <input
          accept="image/jpeg,image/jpg,image/png"
          class="cover-img-input"
          ref="fileInputRef"
          type="file"
          @change="changeImage"
        />
        <img
          @click="pickImage"
          v-show="imageUrl!=null"
          class="cover-image"
          :src="imageUrl"
        />
      </div>
      <div class="top-title">
        <div class="name">标题</div>
        <div class="title-input">
          <base-input
            showClose
            :modelValue="titleValue"
          />
        </div>
      </div>

      <div class="top-abstract">
        <div class="name">摘要</div>
        <el-input
          class="input-remark"
          v-model="inputRemark"
          type="textarea"
          :rows="7"
          show-word-limit
        >
        </el-input>
      </div>

      <div class="top-classification">
        <div class="name">专题标签</div>

        <div class="classification-select">
          <base-select
            showText="专题"
            :swidth="500"
            :sdata="topics"
            @changeItem="changeTopics($event)"
            :selectTag="topic"
          />

          <base-select
            showText="标签"
            :swidth="500"
            :disabled="topic=='' ? true:false"
            :sdata="topicTags"
            :selectTag="topicTag"
            @changeItem="changeTags($event)"
          />

        </div>
      </div>

      <div class="top-category">
        <div class="name">文章分类</div>
        <div
          class="top-category-right"
          @click="selectClick"
        >
          <div
            class="top-category-tag"
            v-for="(item,index) in category"
            :key="index"
          >
            <base-tag
              :size="25"
              :color="style.orange0"
              :hoverColor="style.orange1"
              :text="item"
              @mouseenter="categoryHover(index)"
              @mouseleave="categoryLeave(index)"
            >
              <template v-slot:text-after>
                <div
                  role="button"
                  class="icon"
                  v-show="showCategory[index]"
                  @click="deleteCategory(index)"
                >
                  <i class="iconfont blog-quxiao"></i>
                </div>
              </template>
            </base-tag>
          </div>
          <div class="top-category-select">
            <el-select
              v-model="value"
              filterable
              ref="elSelect"
              remote
              placeholder='最多3个'
              @change="changeCategory"
            >
              <el-option
                v-for="item in categories"
                :key="item"
                :value="item.name"
              />
            </el-select>
          </div>

        </div>

      </div>

      <div class="top-tag">
        <div class="name">文章标签</div>
        <div
          class="top-tag-right"
          @click="inputClick"
        >
          <div
            class="top-tag-tag"
            v-for="(item,index) in tags"
            :key="index"
          >
            <base-tag
              :size="25"
              :color="style.orange0"
              :hoverColor="style.orange1"
              :text="item"
              @mouseenter="tagHover(index)"
              @mouseleave="tagLeave(index)"
            >
              <template v-slot:text-after>
                <div
                  role="button"
                  class="icon"
                  v-show="showTag[index]"
                  @click="deleteTag(index)"
                >
                  <i class="iconfont blog-quxiao"></i>
                </div>
              </template>
            </base-tag>
          </div>
          <div class="top-tag-input">
            <input
              type="text"
              ref="inputRef"
              maxlength="8"
              placeholder='最多3个'
              @keyup.enter="tagEnter"
              v-model="inputValue"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="article-release-bottom">
      <div class="release-bottom-top">
        <div class="title-left">编辑文章</div>
        <div class="icon">
          <div
            class="icon1"
            role="button"
            @click="clickHistory"
          ><i class="iconfont blog-zuijinxinxi"></i></div>
          <div
            class="icon2"
            role="button"
            @click="clickSetting"
          ><i class="iconfont blog-Ioniconsmdsettings"></i></div>
        </div>
      </div>
      <div class="edit">
        <v-md-editor
          :include-level="[1,2,3,4,5,6]"
          v-model="text"
          height="600px"
          ref="markdown"
        ></v-md-editor>
      </div>
      <div class="bottom-button">
        <div
          class="button"
          role="button"
          @click="generateTitleClick"
        >生成标题</div>

        <div
          class="button"
          role="button"
          @click="extractSummaryClick"
        >生成摘要</div>

        <div
          class="button"
          role="button"
          @click="extractTagsClick"
        >抽取标签</div>
      </div>

    </div>
    <base-modal
      content="是否保存为草稿"
      :show="showQuitModal"
      :color="style.blue0"
      :hover-color="style.blue1"
      @confirm="quitModalHandle(true)"
      @cancel="quitModalHandle(false)"
    />
  </admin-view>

  <n-drawer
    v-model:show="innerDrawer"
    :width="502"
  >
    <n-drawer-content
      title="云端历史"
      closable
    >
      <div class="history-body">暂无历史哦~</div>
    </n-drawer-content>
  </n-drawer>

  <n-modal
    display-directive="show"
    :show="showModel"
    @update:show="close"
  >

    <div class="article-setting">
      <div class="article-setting-top">
        <div class="title">文章设置</div>
        <div
          class="close"
          role="button"
          @click="close"
        ><i class="iconfont blog-close"></i></div>
      </div>
      <div class="article-setting-context">

        <div class="access-permission">
          <div class="name">访问权限</div>
          <div class="content">
            <n-radio-group
              v-model:value="radioButtonValue"
              size="large"
            >
              <n-radio-button
                v-for="song in ['公开','仅登录用户','只有我']"
                :key="song"
                :value="song"
              >
                {{ song }}
              </n-radio-button>
            </n-radio-group>
          </div>
        </div>

        <div class="precedence-level">
          <div class="name">优先等级</div>
          <div class="content">
            <n-input-number
              max='99999'
              min='0'
              v-model:value="levelNumber"
              button-placement="both"
              size="large"
            />
          </div>
        </div>

        <div class="allow-comments">
          <div class="name">允许评论</div>
          <div class="content">
            <n-switch
              v-model:value="switchValue"
              size="large"
            />
          </div>
        </div>

        <div class="sharing-agreement">
          <div class="name">共享协议</div>
          <div class="content">
            <n-input
              v-model:value="sharingValue"
              size="large"
              type="text"
              placeholder="Sharing agreement"
            />
          </div>
        </div>

        <div class="password-protection">
          <div class="name">密码保护</div>
          <div class="content">
            <n-input
              v-model:value="passwordValue"
              size="large"
              type="password"
              placeholder="Password protection"
            />
          </div>
        </div>

      </div>

    </div>
  </n-modal>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import AdminView from '@/views/admin/childComps/AdminView.vue';
import BaseInput from '@/components/content/baseInput/BaseInput.vue';
import BaseSelect from '@/components/content/baseSelect/BaseSelect.vue';
import BaseTag from '@/components/content/baseTag/BaseTag.vue';
import BaseModal from '@/components/content/baseModal/BaseModal.vue';
import { getTopics, getTopicTags } from '@/network/api/topics';
import style from '@/assets/style/define.scss';
import { useMessage } from 'naive-ui';
import { getCategories } from '@/network/api/articles';
import { mapMutations, mapState } from '@/util/store';
import { extractSummary, generateTitle, extractTags } from '@/network/api/tools/intelligentCreation';

/**
 * @description: 发布文章
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminCreationArticleRelease',
  components: {
    AdminView,
    BaseInput,
    BaseSelect,
    BaseTag,
    BaseModal,
  },
  setup() {
    const msg = useMessage(); // naive-ui mssage
    const imageUrl = ref(null); // 显示图片路径
    const inputRemark = ref(null); // 摘要
    const titleValue = ref(''); // 标题
    const { tokenInfo } = mapState('global', ['tokenInfo']); // 获取tokenInfo
    const username = tokenInfo.value.username; // 登录用户名

    // ref
    const fileInputRef = ref(null); //选择图片
    const inputRef = ref(null); // 分类

    /**
     * @description: 选择图片
     * @param {*} e
     * @return {*}
     * @author: Z_Y_C
     */
    function changeImage(e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        imageUrl.value = this.result;
      };
    }

    /**
     * @description: 触发点击事件，选择封面
     * @return {*}
     * @author: Z_Y_C
     */
    function pickImage() {
      if (fileInputRef.value) fileInputRef.value.click();
    }

    function save() {
      msg.success('保存成功');
    }

    /**
     * @description: 点击聚焦
     * @return {*}
     * @author: Z_Y_C
     */
    function inputClick() {
      inputRef.value.focus();
    }

    const showTag = reactive([false, false, false]); // 显示X图标

    /**
     * @description: hover显示
     * @param {number} index 下标
     * @return {*}
     * @author: Z_Y_C
     */
    function tagHover(index) {
      showTag[index] = true;
    }

    /**
     * @description: 移除隐藏
     * @param {number} index 下标
     * @return {*}
     * @author: Z_Y_C
     */
    function tagLeave(index) {
      showTag[index] = false;
    }

    const text = ref(''); // markdown输入内容

    const topics = reactive([]); // 专题列表
    const topic = ref(''); // 当前选择专题

    // 获取专题
    getTopics()
      .then((data) => {
        topics.splice(0, 0, ...data.topics);
      })
      .catch((error) => {
        console.log(error);
      });

    /**
     * @description: 改变专题
     * @param {number} e 下标
     * @return {*}
     * @author: Z_Y_C
     */
    function changeTopics(e) {
      topic.value = topics[e];
      getTags(topic.value);
    }

    const topicTags = reactive([]); // 专题tag
    const topicTag = ref(''); // 当前选择tag

    /**
     * @description: 获取tags
     * @param {string} topic_name 专题名 `必传参数`
     * @return {void}
     * @author:ZYC
     */
    function getTags(topic_name) {
      topicTag.value = '';
      getTopicTags(topic_name)
        .then((data) => {
          topicTags.splice(0, topicTags.length, ...data.tags);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    /**
     * @description: 改变专题tag
     * @param {number} e 下标
     * @return {*}
     * @author: Z_Y_C
     */
    function changeTags(e) {
      topicTag.value = topicTags[e];
    }

    const inputValue = ref(''); // 输入分类内容
    const tags = reactive([]); // 显示分类

    /**
     * @description: 回车触发事件
     * @return {*}
     * @author: Z_Y_C
     */
    function tagEnter() {
      if (inputValue.value != '' && tags.length < 3) {
        let flag = 0;
        for (let i = 0; i < tags.length; i++) {
          if (tags[i] == inputValue.value) {
            flag = 1;
          }
        }
        if (flag == 0) {
          tags.splice(tags.length, 0, inputValue.value);
          showTag[tags.length + 1] = false;
          inputValue.value = '';
          msg.success('添加成功');
        } else {
          msg.error('添加失败');
        }
      } else {
        inputValue.value = '';
        msg.error('添加失败');
      }
    }

    /**
     * @description: 删除标签
     * @param {number} index 下标
     * @return {*}
     * @author: Z_Y_C
     */
    function deleteTag(index) {
      tags.splice(index, 1);
      msg.success('删除成功');
    }

    const categories = reactive([]);
    // 初始化获取数据
    getCategories(username)
      .then((data) => {
        categories.splice(0, 0, ...data.categories);
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取标签失败');
      });

    const value = ref('');
    const showCategory = reactive([false, false, false]);
    const category = reactive([]);

    /**
     * @description: hover显示
     * @param {number} index 下标
     * @return {*}
     * @author: Z_Y_C
     */
    function categoryHover(index) {
      showCategory[index] = true;
    }

    /**
     * @description: 移除隐藏
     * @param {number} index 下标
     * @return {*}
     * @author: Z_Y_C
     */
    function categoryLeave(index) {
      showCategory[index] = false;
    }

    /**
     * @description: 删除标签
     * @param {number} index 下标
     * @return {*}
     * @author: Z_Y_C
     */
    function deleteCategory(index) {
      category.splice(index, 1);
      msg.success('删除成功');
    }

    function changeCategory() {
      if (category.length < 3) {
        let flag = 0;
        for (let i = 0; i < category.length; i++) {
          if (category[i] == value.value) {
            flag = 1;
          }
        }
        if (flag == 0) {
          category.splice(category.length, 0, value.value);
          showCategory[category.length + 1] = false;
          msg.success('添加成功');
        } else {
          msg.error('添加失败');
        }
      } else {
        msg.error('添加失败');
      }
      value.value = '';
    }

    const elSelect = ref(null);

    /**
     * @description: 点击聚焦
     * @return {*}
     * @author: Z_Y_C
     */
    function selectClick() {
      elSelect.value.focus();
    }

    const innerDrawer = ref(false);
    function clickHistory() {
      innerDrawer.value = true;
      console.log(markdown.value);
      console.log('preprocessing:' + getPreProcessingContent());
    }

    function getPreProcessingContent() {
      return markdown.value.$el
        .getElementsByClassName('vuepress-markdown-body')[0]
        .innerText.trim()
        .replace(/[ \t]+/g, '，')
        .replace(/(\n)+/g, '。')
        .replace(/[，。]{2,}/g, '。');
    }

    const showModel = ref(false);
    function close() {
      showModel.value = false;
    }

    function clickSetting() {
      showModel.value = true;
    }

    const radioButtonValue = ref('公开');

    const levelNumber = ref(66666);

    const switchValue = ref(true);

    const sharingValue = ref('');
    const passwordValue = ref('');

    const markdown = ref(null);

    function generateTitleClick() {
      let loading = msg.loading('生成标题中...', { closable: false, duration: 15000 });

      generateTitle(getPreProcessingContent())
        .then((data) => {
          titleValue.value = data.title;

          loading.destroy();
          loading = null;
          msg.success('生成标题成功');
        })
        .catch((err) => {
          console.log(err);
          loading.destroy();
          loading = null;
          msg.error('生成标题失败，网络错误');
        });
    }

    function extractSummaryClick() {
      let loading = msg.loading('抽取摘要中...', { closable: false, duration: 15000 });
      extractSummary(getPreProcessingContent())
        .then((data) => {
          inputRemark.value = data.summary;

          loading.destroy();
          loading = null;
          msg.success('抽取摘要成功');
        })
        .catch((err) => {
          console.log(err);
          loading.destroy();
          loading = null;
          msg.error('抽取摘要失败，网络错误');
        });
    }

    function extractTagsClick() {
      let loading = msg.loading('抽取标签中...', { closable: false, duration: 15000 });
      extractTags(getPreProcessingContent())
        .then((data) => {
          tags.splice(0, tags.length, ...data.tags.map((tag) => tag.word));

          loading.destroy();
          loading = null;
          msg.success('抽取标签成功');
        })
        .catch((err) => {
          console.log(err);
          loading.destroy();
          loading = null;
          msg.error('抽取标签失败，网络错误');
        });
    }

    const showQuitModal = ref(false);
    let globalNext = null;
    const { updateAdminRoutes } = mapMutations('global', ['updateAdminRoutes']);

    updateAdminRoutes({
      name: 'adminCreationArticleRelease',
      meta: {
        beforeToggle(next) {
          globalNext = next;
          showQuitModal.value = true;
        },
        beforeClose(next) {
          globalNext = next;
          showQuitModal.value = true;
        },
      },
    });
    function quitModalHandle(isConfirm) {
      if (isConfirm) {
        console.log('save article success!!!');
      } else {
        console.log('not save article???');
      }
      showQuitModal.value = false;
      globalNext();
    }

    return {
      changeImage,
      imageUrl,
      fileInputRef,
      pickImage,
      titleValue,
      inputRemark,
      style,
      inputRef,
      inputClick,
      tagHover,
      tagLeave,
      showTag,
      text,
      topics,
      changeTopics,
      topic,
      topicTags,
      topicTag,
      changeTags,
      tagEnter,
      inputValue,
      tags,
      deleteTag,
      categories,
      value,
      deleteCategory,
      categoryHover,
      categoryLeave,
      category,
      showCategory,
      changeCategory,
      elSelect,
      selectClick,
      innerDrawer,
      clickHistory,
      showModel,
      close,
      clickSetting,
      radioButtonValue,
      levelNumber,
      switchValue,
      sharingValue,
      passwordValue,
      markdown,
      generateTitleClick,
      extractSummaryClick,
      extractTagsClick,
      save,
      showQuitModal,
      quitModalHandle,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-creation-article-release {
  .article-release-top {
    width: 100%;
    padding: 16px 0;
    background: $grey-0;
    border-radius: $border-radius-0;
    box-shadow: $border-radius-0;
    @include flex(initial, initial, column);

    .release-top-title {
      @include flex(center, space-between);
      border-bottom: 1px solid $grey-4;
      margin-bottom: 12px;
      padding: 0 16px 16px 16px;

      .title-left {
        font-weight: 700;
        font-size: 24px;
      }
      .title-right {
        @include flex(center);

        .button {
          @include flex(center, center);
          width: 100px;
          height: 32px;
          margin-left: 12px;
          background: $grey-0;
          border-radius: $border-radius-1;
          box-shadow: $shadow-0;
          color: $grey-9;
          margin-bottom: 3px;
          transition: 0.25s;

          &:hover {
            background: $green-0;
            color: $grey-0;
            box-shadow: $shadow-2;
          }
        }
      }
    }

    .name {
      width: 72px;
      overflow: hidden;
    }

    .top-cover {
      @include flex();
      margin-bottom: 12px;
      padding: 0 16px;

      .cover-button {
        height: 100px;
        width: calc(100% - 72px);
        @include flex(center, center);
        border-radius: $border-radius-1;
        box-shadow: $shadow-0;
        transition: 0.25;

        .iconfont {
          font-weight: 300;
          font-size: 40px;
          color: $grey-7;
        }

        &:hover {
          color: $green-1;
          box-shadow: $shadow-2;
          border-color: $grey-0;

          .iconfont {
            font-size: 40px;
            color: $green-1;
          }
        }
      }

      .cover-img-input {
        display: none;
      }

      .cover-image {
        height: 100px;
        border-radius: $border-radius-1;
        box-shadow: $shadow-0;
      }
    }

    .top-title {
      @include flex(center);
      margin-bottom: 12px;
      padding: 0 16px;

      .title-input {
        width: calc(100% - 72px);
      }
    }

    .top-abstract {
      @include flex();
      margin-bottom: 12px;
      padding: 0 16px;

      .input-remark {
        border-radius: $border-radius-1;
        box-shadow: $shadow-0;
        width: calc(100% - 72px);

        :deep(.el-textarea__inner) {
          resize: none;
          padding: 6px 8px;
          border: none;
          &:hover,
          &:focus {
            color: $green-1;
            box-shadow: $shadow-2;
            border-color: $grey-0;
          }
        }
      }
    }

    .top-classification {
      @include flex(center);
      margin-bottom: 12px;
      padding: 0 16px;

      .classification-select {
        width: calc(100% - 72px);
        @include flex(center, space-between);
      }
    }

    .top-category {
      @include flex(center);
      padding: 0 16px;
      margin-bottom: 12px;

      .top-category-right {
        @include flex(center);
        width: calc(100% - 72px);
        height: 32px;
        border-radius: $border-radius-1;
        box-shadow: $shadow-0;
        transition: 0.25;

        :deep(.el-input__inner) {
          border: none;
          color: $green-1;
          height: 32px;
          padding: 6px 8px;

          &::-webkit-input-placeholder {
            color: $grey-8;
            transition: color 0.25s;
            letter-spacing: 1.2px !important;
          }

          &:hover,
          &:focus-within {
            &::-webkit-input-placeholder {
              color: $green-1;
            }
          }
        }

        &:hover,
        &:focus-within {
          color: $green-1;
          box-shadow: $shadow-2;
          border-color: $grey-0;

          &::-webkit-input-placeholder {
            color: $green-1;
          }
        }
      }

      .top-category-tag {
        @include flex(center);
        height: 32px;
        padding-left: 10px;

        .icon {
          margin-left: 5px;
        }
      }
    }

    .top-tag {
      @include flex(center);
      padding: 0 16px;

      .top-tag-right {
        @include flex(center);
        width: calc(100% - 72px);
        height: 32px;
        border-radius: $border-radius-1;
        box-shadow: $shadow-0;
        transition: 0.25;

        &:hover,
        &:focus-within {
          color: $green-1;
          box-shadow: $shadow-2;
          border-color: $grey-0;
        }

        .top-tag-tag {
          @include flex(center);
          height: 32px;
          padding-left: 10px;

          .icon {
            margin-left: 5px;
          }
        }

        .top-tag-input {
          height: 32px;
          border-radius: $border-radius-1;
          overflow: hidden;

          input {
            padding: 6px 8px;
            width: 100%;
            height: 32px;
            outline: none;
            border: 0px;
            font-size: 14px;
            color: $grey-8;
            transition: color 0.25s;
            transition: box-shadow 0.25s;

            &::-webkit-input-placeholder {
              color: $grey-8;
              transition: color 0.25s;
              letter-spacing: 1.2px !important;
            }

            &:focus,
            &:hover {
              color: $green-1;
              box-shadow: $shadow-2;

              &::-webkit-input-placeholder {
                color: $green-1;
              }

              & ~ .base-input-eye,
              & ~ .base-input-close {
                color: $green-1;
              }
            }
          }
        }
      }
    }
  }
  .article-release-bottom {
    width: calc(100%-32px);
    padding: 16px 0;
    margin-top: 16px;
    background: $grey-0;
    border-radius: $border-radius-0;
    box-shadow: $border-radius-0;
    @include flex(initial, initial, column);

    .release-bottom-top {
      @include flex(initial, space-between);
      margin-bottom: 12px;
      border-bottom: 1px solid $grey-4;
      padding: 0 16px 12px;
      .title-left {
        font-weight: 700;
        font-size: 24px;
      }
      .icon {
        @include flex(center);

        .icon1 {
          margin-right: 10px;
          height: 20px;
          .iconfont {
            font-size: 20px;
            color: $grey-8;
          }

          &:hover {
            .iconfont {
              font-size: 20px;
              color: $green-1;
            }
          }
        }

        .icon2 {
          height: 20px;

          .iconfont {
            font-size: 20px;
            color: $grey-8;
          }
          &:hover {
            .iconfont {
              font-size: 20px;
              color: $green-1;
            }
          }
        }
      }
    }

    .edit {
      padding: 0 16px;
      margin-bottom: 12px;
    }

    .bottom-button {
      @include flex(center, initial, row-reverse);
      padding: 0 16px;

      .button {
        margin-left: 12px;
        @include flex(center, center);
        width: 100px;
        height: 32px;
        background: $grey-0;
        border-radius: $border-radius-1;
        box-shadow: $shadow-0;
        color: $grey-9;
        margin-bottom: 3px;
        transition: 0.25s;

        &:hover {
          background: $green-0;
          color: $grey-0;
          box-shadow: $shadow-2;
        }
      }
    }
  }
}

.article-setting {
  width: 360px;
  background-color: $grey-0;
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;
  padding: 24px;

  .article-setting-top {
    @include flex(center, center);
    position: relative;
    width: 100%;
    height: 21px;
    margin-bottom: 24px;

    .title {
      line-height: 21px;
      font-size: 16px;
      color: $grey-11;
      font-weight: 700;
    }

    .close {
      position: absolute;
      right: 0;
      height: 16px;
      line-height: 16px;
      color: $grey-7;
      transition: 0.25s;

      .iconfont {
        font-size: 16px;
      }

      &:hover {
        color: $green-0;
      }
    }
  }

  .article-setting-context {
    width: 100%;
    @include flex(center, initial, column);

    .name {
      width: 72px;
    }

    .access-permission {
      @include flex(center);
      margin-bottom: 12px;
      width: 100%;

      .content {
        width: calc(100% - 72px);
      }
    }

    .precedence-level {
      @include flex(center);
      margin-bottom: 12px;
      width: 100%;
    }

    .allow-comments {
      @include flex(center);
      margin-bottom: 12px;
      width: 100%;
    }

    .sharing-agreement {
      @include flex(center);
      margin-bottom: 12px;
      width: 100%;

      .content {
        width: calc(100% - 72px);
      }
    }

    .password-protection {
      @include flex(center);
      margin-bottom: 12px;
      width: 100%;

      .content {
        width: calc(100% - 72px);
      }
    }
  }
}

.history-body {
  text-align: center;
}
</style>
