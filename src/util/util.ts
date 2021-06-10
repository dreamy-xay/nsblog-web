/*
 * @Description: 实用工具函数
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 11:22:38
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-10 10:11:16
 */

/**
 * @description: 浏览器下载文件
 * @param {string} fileName
 * @param {any} canvasImg
 * @return {void}
 * @author: dreamy-xay
 */
export function downLoadFile(fileName: string, canvasImg: any): void {
  // 创建一个a标签
  const a = document.createElement('a');
  // 指定下载文件名称
  a.href = canvasImg;
  a.download = fileName;
  // a标签 需要点击触发,所以强制给他分派一个点击事件
  // 创建一个鼠标事件
  const event = document.createEvent('MouseEvents');
  // 初始化鼠标事件
  event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  // 指定元素对象触发事件
  a.dispatchEvent(event);
}
