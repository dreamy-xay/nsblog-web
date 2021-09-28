/*
 * @Description: dom操作工具库
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-28 21:37:34
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-28 21:46:13
 */

/**
 * @description: 向后动态添加dom元素
 * @param {any} element 需要添加的元素  `必传参数`
 * @param {string} html html字符串 `必传参数`
 * @return {void}
 * @author: dreamy-xay
 */
export function appendHTML(element: any, html: string): void {
  const divTemp: HTMLDivElement = document.createElement('div');
  let nodes: any = null;
  // 文档片段，一次性append，提高性能
  let fragment: DocumentFragment = document.createDocumentFragment();
  divTemp.innerHTML = html;
  nodes = divTemp.childNodes;
  for (let i: number = 0; i < nodes.length; ++i) {
    if (nodes[i].childNodes.length) {
      const attrs: string[] = nodes[i].getAttributeNames();
      const newNode: any = document.createElement(nodes[i].nodeName);
      for (const key of attrs) newNode.setAttribute(key, nodes[i].getAttribute(key));
      appendHTML(newNode, nodes[i].innerHTML);
      fragment.appendChild(newNode);
    } else fragment.appendChild(nodes[i].cloneNode(true));
  }
  element.appendChild(fragment);
  // 据说下面这样子世界会更清净
  nodes = null;
  fragment = null;
}

/**
 * @description: 向前动态添加dom元素
 * @param {any} element 需要添加的元素  `必传参数`
 * @param {string} html html字符串 `必传参数`
 * @return {void}
 * @author: dreamy-xay
 */
export function prependHTML(element: any, html: string): void {
  const divTemp: HTMLDivElement = document.createElement('div');
  let nodes: any = null;
  // 文档片段，一次性append，提高性能
  let fragment: DocumentFragment = document.createDocumentFragment();
  divTemp.innerHTML = html;
  nodes = divTemp.childNodes;
  for (let i: number = 0; i < nodes.length; ++i) {
    if (nodes[i].childNodes.length) {
      const attrs: string[] = nodes[i].getAttributeNames();
      const newNode: any = document.createElement(nodes[i].nodeName);
      for (const key of attrs) newNode.setAttribute(key, nodes[i].getAttribute(key));
      appendHTML(newNode, nodes[i].innerHTML);
      fragment.appendChild(newNode);
    } else fragment.appendChild(nodes[i].cloneNode(true));
  }
  element.insertBefore(fragment, element.firstChild);
  // 据说下面这样子世界会更清净
  nodes = null;
  fragment = null;
}
