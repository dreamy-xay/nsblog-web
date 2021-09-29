/*
 * @Description: dom操作工具库
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-28 21:37:34
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-29 22:10:54
 */
import ResizeObserver from 'resize-observer-polyfill';
import { debounce, throttle } from 'lodash';

/**
 * @description: 向后动态添加dom元素
 * @param {Element} element 需要添加的元素  `必传参数`
 * @param {string} html html字符串 `必传参数`
 * @return {void}
 * @author: dreamy-xay
 */
export async function appendHTML(element: Element, html: string): Promise<void> {
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
  element.appendChild(fragment);
  // 据说下面这样子世界会更清净
  nodes = null;
  fragment = null;
}

/**
 * @description: 向前动态添加dom元素
 * @param {Element} element 需要添加的元素  `必传参数`
 * @param {string} html html字符串 `必传参数`
 * @return {void}
 * @author: dreamy-xay
 */
export async function prependHTML(element: Element, html: string): Promise<void> {
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
 * @param {Element} element 监听dom节点 `必传参数`
 * @param {'resize' | 'mutation'} observer 选用的resize Observer `默认为 'resize'`
 * @param {function} callback 监听回调函数 `必传参数`
 * @param {'throttle' | 'debounce' | null} method 监听模式，包括节流，防抖，或者原生 `默认为null`
 * @param {number} wait 防抖或节流模式等待时间
 * @param {MutationObserverInit}} mutationConfig observer为 'mutation' 时生效 `默认为{attributes: true, attributeFilter: ['style'], attributeOldValue: true}`
 * @return {ResizeObserver | MutationObserver} 返回Observer对象
 * @author: dreamy-xay
 */
export function addObserverListener(
  element: Element,
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
