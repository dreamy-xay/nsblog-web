/*
 * @Description: element-plus
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-19 21:30:24
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-07 11:18:11
 */
import { App } from 'vue';
import 'dayjs/locale/zh-cn';
import locale from 'element-plus/lib/locale';
import lang from 'element-plus/lib/locale/lang/zh-cn';

import {
  // ElAffix,
  // ElAlert,
  // ElAside,
  // ElAutocomplete,
  // ElAvatar,
  // ElBacktop,
  // ElBadge,
  // ElBreadcrumb,
  // ElBreadcrumbItem,
  ElButton,
  // ElButtonGroup,
  // ElCalendar,
  // ElCard,
  // ElCarousel,
  // ElCarouselItem,
  // ElCascader,
  // ElCascaderPanel,
  // ElCheckbox,
  // ElCheckboxButton,
  // ElCheckboxGroup,
  // ElCol,
  // ElCollapse,
  // ElCollapseItem,
  // ElCollapseTransition,
  // ElColorPicker,
  // ElContainer,
  // ElConfigProvider,
  // ElDatePicker,
  // ElDialog,
  // ElDivider,
  // ElDrawer,
  // ElDropdown,
  // ElDropdownItem,
  // ElDropdownMenu,
  // ElEmpty,
  // ElFooter,
  // ElForm,
  // ElFormItem,
  // ElHeader,
  // ElIcon,
  // ElImage,
  // ElImageViewer,
  // ElInput,
  // ElInputNumber,
  // ElLink,
  // ElMain,
  // ElMenu,
  // ElMenuItem,
  // ElMenuItemGroup,
  // ElOption,
  // ElOptionGroup,
  // ElPageHeader,
  // ElPagination,
  // ElPopconfirm,
  // ElPopper,
  // ElProgress,
  // ElRadio,
  // ElRadioButton,
  // ElRadioGroup,
  // ElRate,
  // ElRow,
  ElScrollbar,
  // ElSelect,
  // ElSlider,
  // ElStep,
  // ElSteps,
  // ElSubmenu,
  // ElSwitch,
  // ElTabPane,
  // ElTable,
  // ElTableColumn,
  // ElTabs,
  // ElTag,
  // ElTimePicker,
  // ElTimeSelect,
  // ElTimeline,
  // ElTimelineItem,
  // ElTooltip,
  // ElTransfer,
  // ElTree,
  // ElUpload,
  // ElSpace,
  // ElSkeleton,
  // ElSkeletonItem,
  // ElCheckTag,
  // ElDescriptions,
  // ElDescriptionsItem,
  // ElResult,
  // ElSelectV2,
  // ElInfiniteScroll,
  // ElLoading,
  // ElMessage
  // ElMessageBox,
  // ElNotification,
  ElPopover
} from 'element-plus';

const components = [
  // ElAffix,
  // ElAlert,
  // ElAside,
  // ElAutocomplete,
  // ElAvatar,
  // ElBacktop,
  // ElBadge,
  // ElBreadcrumb,
  // ElBreadcrumbItem,
  ElButton,
  // ElButtonGroup,
  // ElCalendar,
  // ElCard,
  // ElCarousel,
  // ElCarouselItem,
  // ElCascader,
  // ElCascaderPanel,
  // ElCheckbox,
  // ElCheckboxButton,
  // ElCheckboxGroup,
  // ElCol,
  // ElCollapse,
  // ElCollapseItem,
  // ElCollapseTransition,
  // ElColorPicker,
  // ElContainer,
  // ElConfigProvider,
  // ElDatePicker,
  // ElDialog,
  // ElDivider,
  // ElDrawer,
  // ElDropdown,
  // ElDropdownItem,
  // ElDropdownMenu,
  // ElEmpty,
  // ElFooter,
  // ElForm,
  // ElFormItem,
  // ElHeader,
  // ElIcon,
  // ElImage,
  // ElImageViewer,
  // ElInput,
  // ElInputNumber,
  // ElLink,
  // ElMain,
  // ElMenu,
  // ElMenuItem,
  // ElMenuItemGroup,
  // ElOption,
  // ElOptionGroup,
  // ElPageHeader,
  // ElPagination,
  // ElPopconfirm,
  // ElPopper,
  // ElProgress,
  // ElRadio,
  // ElRadioButton,
  // ElRadioGroup,
  // ElRate,
  // ElRow,
  ElScrollbar
  // ElSelect,
  // ElSlider,
  // ElStep,
  // ElSteps,
  // ElSubmenu,
  // ElSwitch,
  // ElTabPane,
  // ElTable,
  // ElTableColumn,
  // ElTabs,
  // ElTag,
  // ElTimePicker,
  // ElTimeSelect,
  // ElTimeline,
  // ElTimelineItem,
  // ElTooltip,
  // ElTransfer,
  // ElTree,
  // ElUpload,
  // ElSpace,
  // ElSkeleton,
  // ElSkeletonItem,
  // ElCheckTag,
  // ElDescriptions,
  // ElDescriptionsItem,
  // ElResult,
  // ElSelectV2,
];

const plugins = [
  // ElInfiniteScroll,
  // ElLoading,
  // ElMessage
  // ElMessageBox,
  // ElNotification,
  ElPopover
];

const directives = [
  // { key: 'infinite-scroll', value: ElInfiniteScroll }
];

import '@/assets/style/element-variables.scss';

export default (app: App) => {
  // app.config.globalProperties.$ELEMENT = { locale };

  // 可以查看文档
  // locale.use(lang);
  components.forEach(component => {
    app.component(component.name, component);
  });

  plugins.forEach(plugin => {
    app.use(plugin);
  });

  directives.forEach(directive => {
    app.directive(directive.key, directive.value);
  });
};
