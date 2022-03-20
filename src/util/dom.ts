/*
 * @Description: dom操作工具库
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-28 21:37:34
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-03-20 13:56:18
 */
import ResizeObserver from 'resize-observer-polyfill';
import { debounce, throttle, shuffle } from 'lodash';

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

// 文字参数类型
type TextArgs = {
  text: string;
  weight: number;
};
// 字体参数类型
type FontArgs = {
  fontWeight: string;
  fontFamily: string;
};
// 生成距离微调参数类型
type DistanceArgs = {
  circle: number; // 超出circle界限offset生效
  offset: number | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
};
// 范围参数类型
type Range = [number, number];
// 位置范围参数类型
type PositionRange = {
  x: Range;
  y: Range;
};
// 位置参数类型
type Position = { x: number; y: number };
// 随机文字接口
interface RandomText {
  text: string;
  position: Position;
  color: string;
  size: number;
}

/**
 * @description: 随机生成聚合
 * @param {TextArgs} textArgs 文字相关参数 `必传参数`
 * @param {string} colorArgs 颜色相关参数 `必传参数`
 * @param {Range} sizeRange 文字大小范围 `必传参数`
 * @param {PositionRange} positionRange 位置范围 `必传参数`
 * @param {boolean} angleRandom 角度随机 `默认为 true`
 * @param {boolean} distanceArgs 生成距离微调参数 `默认为 { circle: 3, offset: 0.8 }`
 * @param {FontArgs} fontArgs 文字生成相关参数 `默认为 { fontWeight: 'bold', fontFamily: 'system-ui' }`
 * @return {RandomText[]} 返回随机化的文字
 * @author: dreamy-xay
 */
export function circleRandomText(
  textArgs: TextArgs[],
  colorArgs: string[],
  sizeRange: Range,
  positionRange: PositionRange,
  angleRandom: boolean = true,
  distanceArgs: DistanceArgs = { circle: 2, offset: 0.8 },
  fontArgs: FontArgs = { fontWeight: 'bold', fontFamily: 'system-ui' }
): RandomText[] {
  const texts: RandomText[] = [];

  // 随机生成数[min,max]
  function randomNumber(min: number, max: number): number {
    return Math.random() * (max - min + 1) + min;
  }

  const canvas: HTMLCanvasElement = document.createElement('canvas'); // 外侧定义画布，节省消耗
  // 获取文字原生px
  function getTextRect(text: string, fontSize: number): { width: number; height: number } {
    const context: CanvasRenderingContext2D = canvas.getContext('2d');
    context.font = fontArgs.fontWeight + ' ' + fontSize + 'px ' + fontArgs.fontFamily;
    const metrics: TextMetrics = context.measureText(text);
    return { width: metrics.width, height: fontSize };
  }

  // 随机生成颜色
  function randomColor(): string {
    return colorArgs[Math.floor(Math.random() * colorArgs.length)];
  }

  // 随机生成文字大小
  let currentSize: number = sizeRange[1];
  function randomSize(avgSize: number): number {
    const size = randomNumber(currentSize - avgSize, currentSize);
    currentSize -= avgSize;
    return size;
  }

  // 计算中心位置
  const centerX = (positionRange.x[1] + positionRange.x[0]) / 2;
  const centerY = (positionRange.y[1] + positionRange.y[0]) / 2;
  // 定义部分辅助变量
  const positionList: Position[] = [];
  const sizeList: number[] = [];
  const circle: number[] = [1];
  // 生成圈数及其对应数量
  let sum: number = 1;
  for (let i: number = 1; ; ++i) {
    const num: number = (2 * i - 1) * 4;
    if (sum + num > textArgs.length) {
      circle.push(textArgs.length - sum);
      break;
    }
    circle.push(num);
    sum += num;
  }
  // 计算avgSize
  const avgSize: number = (sizeRange[1] - sizeRange[0]) / circle.length;
  // 特殊处理均匀化，截取保留文字数量
  let remain: number = 0;
  if (circle.length >= 2 && circle[circle.length - 1] < circle[circle.length - 2]) remain = circle.pop();
  // 计算角度平均偏移距离
  const distanceOffset: number = circle.length > distanceArgs.circle ? distanceArgs.offset : 0;
  const distanceX = (positionRange.x[1] - positionRange.x[0]) / 2 / (circle.length - distanceOffset);
  const distanceY = (positionRange.y[1] - positionRange.y[0]) / 2 / (circle.length - distanceOffset);
  // 记录椭圆开始 a 和 b
  let ovalA: number = 0;
  let ovalB: number = 0;
  // 随机生成位置
  for (let i: number = 0; i < circle.length; ++i) {
    const posArr: Position[] = [];
    // 计算平均偏移度数
    const avgOC: number = (Math.PI * 2) / circle[i];
    let theta: number = 0; // 角度
    // 计算当前size
    const currentSize = randomSize(avgSize);
    for (let j: number = 0; j < circle[i]; ++j) {
      sizeList.push(currentSize);
      posArr.push({
        x: ovalA * Math.cos(angleRandom ? randomNumber(theta - avgOC / 2, theta + avgOC / 2) : theta) + centerX,
        y: ovalB * Math.sin(angleRandom ? randomNumber(theta - avgOC / 2, theta + avgOC / 2) : theta) + centerY
      });
      theta += avgOC;
    }
    // 打乱位置顺序 并将其添加进 list
    positionList.push(...shuffle(posArr));
    ovalA += distanceX;
    ovalB += distanceY;
  }
  // 预处理保留文字
  if (remain) {
    // 计算当前size
    const currentSize = randomSize(avgSize);
    for (let i: number = 0; i < remain; ++i) {
      sizeList.push(currentSize);
      positionList.push({
        x: randomNumber(positionRange.x[0], positionRange.x[1]),
        y: randomNumber(positionRange.y[0], positionRange.y[1])
      });
    }
  }

  // 预处理 text, 权重从大到小排序
  textArgs.sort((a: TextArgs, b: TextArgs) => {
    return b.weight - a.weight;
  });

  // 整合全部数据
  for (let i: number = 0; i < textArgs.length; ++i) {
    const pos: Position = positionList[i];
    const rect = getTextRect(textArgs[i].text, sizeList[i]); // 获取文字实际区域大小
    pos.x -= rect.width / 2;
    pos.y -= rect.height / 2;
    texts.push({
      text: textArgs[i].text,
      position: pos,
      color: randomColor(),
      size: sizeList[i]
    });
  }

  return texts;
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
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element['webkitRequestFullScreen']) {
      element['webkitRequestFullScreen']();
    } else if (element['mozRequestFullScreen']) {
      element['mozRequestFullScreen']();
    } else if (element['msRequestFullscreen']) {
      element['msRequestFullscreen']();
    }
  }
  // 判断全屏状态的变量
  return !fullscreen;
}
