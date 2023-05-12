/*
 * @Description: dom操作工具库
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-28 21:37:34
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-14 20:40:43
 */
import ResizeObserver from 'resize-observer-polyfill';
import { debounce, throttle } from 'lodash';

/**
 * @description: 获取元素相对于页面文档的位置
 * @param {HTMLElement} el 元素节点 `必传参数`
 * @return {{ left: number; top: number }} 返回一个对象，保护left和top
 * @author: dreamy-xay
 */
export function getRelativeDocumentPosition(el: HTMLElement): { left: number; top: number } {
  if (el.parentNode === null || el.style.display == 'none') return { left: 0, top: 0 };

  if (el.getBoundingClientRect) {
    //IE
    const box: DOMRect = el.getBoundingClientRect();
    const scrollTop: number = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    const scrollLeft: number = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
    return { left: box.left + scrollLeft, top: box.top + scrollTop };
  } else {
    const pos: [number, number] = [el.offsetLeft, el.offsetTop];
    let parent: any = el.offsetParent;
    if (parent != el)
      while (parent) {
        pos[0] += parent.offsetLeft;
        pos[1] += parent.offsetTop;
        parent = parent.offsetParent;
      }
    return { left: pos[0], top: pos[1] };
  }
}

/**
 * @description: 向后动态添加dom元素
 * @param {HTMLElement} element 需要添加的元素  `必传参数`
 * @param {string} html html字符串 `必传参数`
 * @return {Promise<void>}
 * @author: dreamy-xay
 */
export async function appendHTML(element: HTMLElement, html: string): Promise<void> {
  const divTemp: HTMLDivElement = document.createElement('div');
  let nodes: any = null;
  // 文档片段，一次性append，提高性能
  divTemp.innerHTML = html;
  nodes = divTemp.childNodes;

  for (let i: number = 0; i < nodes.length; ++i) {
    if (nodes[i]['getAttributeNames'] !== undefined) {
      const attrs: string[] = nodes[i].getAttributeNames();
      let newNode: any = document.createElement(nodes[i].nodeName);
      for (const key of attrs) newNode.setAttribute(key, nodes[i].getAttribute(key));
      element.appendChild(newNode);
      if (nodes[i].childNodes.length) appendHTML(newNode, nodes[i].innerHTML);
      if (nodes[i].nodeName.toLowerCase() === 'script' && nodes[i].getAttribute('src'))
        await new Promise<void>((resolve: () => void) => {
          newNode.onload = function() {
            resolve();
          };
        });
      newNode = null;
    } else element.appendChild(nodes[i].cloneNode(true));
  }
  // 据说下面这样子世界会更清净
  nodes = null;
}

/**
 * @description: 向前动态添加dom元素
 * @param {HTMLElement} element 需要添加的元素  `必传参数`
 * @param {string} html html字符串 `必传参数`
 * @return {void}
 * @author: dreamy-xay
 */
export async function prependHTML(element: HTMLElement, html: string): Promise<void> {
  const divTemp: HTMLDivElement = document.createElement('div');
  let nodes: any = null;
  // 文档片段，一次性append，提高性能
  let fragment: DocumentFragment = document.createDocumentFragment();
  divTemp.innerHTML = html;
  nodes = divTemp.childNodes;
  for (let i: number = 0; i < nodes.length; ++i) {
    if (nodes[i]['getAttributeNames'] !== undefined) {
      const attrs: string[] = nodes[i].getAttributeNames();
      let newNode: any = document.createElement(nodes[i].nodeName);
      for (const key of attrs) newNode.setAttribute(key, nodes[i].getAttribute(key));
      if (nodes[i].childNodes.length) appendHTML(newNode, nodes[i].innerHTML);
      if (nodes[i].nodeName.toLowerCase() === 'script' && nodes[i].getAttribute('src')) {
        element.appendChild(newNode);
        await new Promise<void>((resolve: () => void) => {
          newNode.onload = function() {
            resolve();
          };
        });
      } else fragment.appendChild(newNode);
      newNode = null;
    } else fragment.appendChild(nodes[i].cloneNode(true));
  }
  element.insertBefore(fragment, element.firstChild);
  // 据说下面这样子世界会更清净
  nodes = null;
  fragment = null;
}

/**
 * @description: 增加resize监听，包括高度宽度变化('mutation')
 * @param {HTMLElement} element 监听dom节点 `必传参数`
 * @param {'resize' | 'mutation'} observer 选用的resize Observer `默认为 'resize'`
 * @param {function} callback 监听回调函数 `必传参数`
 * @param {'throttle' | 'debounce' | null} method 监听模式，包括节流，防抖，或者原生 `默认为null`
 * @param {number} wait 防抖或节流模式等待时间
 * @param {MutationObserverInit}} mutationConfig observer为 'mutation' 时生效 `默认为{attributes: true, attributeFilter: ['style'], attributeOldValue: true}`
 * @return {ResizeObserver | MutationObserver} 返回Observer对象
 * @author: dreamy-xay
 */
export function addObserverListener(
  element: HTMLElement,
  callback: (...args: any[]) => void,
  observer: 'resize' | 'mutation' = 'resize',
  method: 'throttle' | 'debounce' | null = null,
  wait: number = 400,
  mutationConfig: MutationObserverInit = {
    attributes: true,
    attributeFilter: ['style'],
    attributeOldValue: true
  }
): ResizeObserver | MutationObserver {
  const elObserver: ResizeObserver | MutationObserver = new (observer === 'resize' ? ResizeObserver : MutationObserver)(
    method ? (method === 'throttle' ? throttle : debounce)(callback, wait) : callback
  );
  if (observer === 'resize') elObserver.observe(element);
  else (elObserver as MutationObserver).observe(element, mutationConfig);
  return elObserver;
}

/**
 * @description: 全屏或者关闭全屏
 * @param {boolean} fullscreen 当前全屏状态 `必传参数`
 * @return {boolean} 返回全屏状态
 * @author: Z_Y_C
 */
export function changeFullScreen(fullscreen: boolean): boolean {
  const element = document.documentElement;
  // 如果是全屏状态
  if (fullscreen) {
    // 如果浏览器有这个Function
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document['webkitCancelFullScreen']) document['webkitCancelFullScreen']();
    else if (document['mozCancelFullScreen']) document['mozCancelFullScreen']();
    else if (document['msExitFullscreen']) document['msExitFullscreen']();
  } else {
    // 如果浏览器有这个Function
    if (element.requestFullscreen) element.requestFullscreen();
    else if (element['webkitRequestFullScreen']) element['webkitRequestFullScreen']();
    else if (element['mozRequestFullScreen']) element['mozRequestFullScreen']();
    else if (element['msRequestFullscreen']) element['msRequestFullscreen']();
  }
  // 判断全屏状态的变量
  return !fullscreen;
}

/**
 * @description: 等待图片加完成
 * @param {HTMLElement} element 根节点元素 `默认为 document.body`
 * @return {Promise<any>} 返回Promise
 * @author: dreamy-xay
 */
export async function waitImageLoaded(element: HTMLElement = document.body): Promise<any> {
  const imgNodes: HTMLImageElement[] | NodeListOf<HTMLImageElement> =
    element instanceof HTMLImageElement ? [element] : element.querySelectorAll('img');
  const imgArr: any[] = Array.prototype.slice.call(imgNodes); // NodeList转Array，Array才有map方法
  return await Promise.all(
    imgArr.map(img => {
      new Promise(resolve => {
        img.addEventListener('load', () => resolve(img));
      });
    })
  );
}
