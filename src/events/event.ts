/*
 * @Description: 全局事件通信
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-27 12:19:40
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-29 22:25:20
 */

/**
 * @description: events回调函数类型
 * @author: dreamy-xay
 */
type EventCallback = (...args: any[]) => void;

/**
 * @description: events单次事件类型
 * @author: dreamy-xay
 */
type EventOnce = boolean;

/**
 * @description: events索引事件类型
 * @author: dreamy-xay
 */
type EventInfo = [EventCallback, EventOnce];

/**
 * @description: Events类接口
 * @author: dreamy-xay
 */
export interface EventsInterface<T> {
  /**
   * @description: 发出事件
   * @param {T} eventId 事件名 `必传参数`
   * @param {array} args 多参数 `可传可不传`
   * @return {this} 返回自身，可链式调用
   * @author: dreamy-xay
   */
  emit(eventId: T, ...args: any[]): this;

  /**
   * @description: 绑定接收事件
   * @param {T} eventId 事件名 `必传参数`
   * @param {EventCallback} callback 绑定接收事件回调函数
   * @return {this} 返回自身，可链式调用
   * @author: dreamy-xay
   */
  on(eventId: T, callback: EventCallback): this;

  /**
   * @description: 解除事件绑定
   * @param {T} eventId 事件名 `必传参数`
   * @return {this} 返回自身，可链式调用
   * @author: dreamy-xay
   */
  off(eventId: T): this;

  /**
   * @description: 绑定一次性接收事件
   * @param {T} eventId 事件名 `必传参数`
   * @param {EventCallback} callback 绑定接收事件回调函数
   * @return {this} 返回自身，可链式调用
   * @author: dreamy-xay
   */
  once(eventId: T, callback: EventCallback): this;

  /**
   * @description: 清楚全部事件
   * @return {void}
   * @author: dreamy-xay
   */
  clear(): void;

  /**
   * @description: 遍历全部事件ID
   * @param {function} callback 回调函数，淡事件id参数 `必传参数`
   * @return {void}
   * @author: dreamy-xay
   */
  forEach(callback: (eventId: T) => void): void;

  /**
   * @description: 判断事件是否存在
   * @param {T} eventId 事件名 `必传参数`
   * @return {boolean} 返回是否存在
   * @author: dreamy-xay
   */
  has(eventId: T): boolean;

  /**
   * @description: 获取所有绑定事件
   * @return {T[]} 返回事件名数组
   * @author: dreamy-xay
   */
  allEvents(): T[];

  /**
   * @description: 获取当前事件全部数量
   * @return {number} 返回当前事件全部数量
   * @author: dreamy-xay
   */
  count(): number;

  /**
   * @description: 判断是否一次性事件
   * @param {T} eventId 事件名 `必传参数`
   * @return {boolean} 返回是否一次性事件
   * @author: dreamy-xay
   */
  isOnceEvent(eventId: T): boolean;
}

/**
 * @description: Events类实现
 * @author: dreamy-xay
 */
export default class Events<T extends string | number = string> implements EventsInterface<T> {
  private events: Map<T, EventInfo>; // events hash表

  /**
   * @description: 构造函数，可采用拷贝构造函数
   * @param {Events<T> | undefined} 事件类 `默认为undefined`
   * @author: dreamy-xay
   */
  constructor(events?: Events<T>) {
    if (events) this.events = new Map<T, EventInfo>(JSON.parse(JSON.stringify(events.events)));
    else this.events = new Map<T, EventInfo>();
  }

  public emit(eventId: T, ...args: any[]): this {
    const eventInfo: EventInfo | undefined = this.events.get(eventId);
    if (eventInfo) {
      eventInfo[0](...args);
      if (eventInfo[1]) this.off(eventId);
    }
    return this;
  }

  public on(eventId: T, callback: EventCallback): this {
    this.events.set(eventId, [callback, false]);
    return this;
  }

  public off(eventId: T): this {
    this.events.delete(eventId);
    return this;
  }

  public once(eventId: T, callback: EventCallback): this {
    this.events.set(eventId, [callback, true]);
    return this;
  }

  public clear(): void {
    this.events.clear();
  }

  public forEach(callback: (eventId: T) => void): void {
    this.events.forEach((_, key) => {
      callback(key);
    });
  }

  public has(eventId: T): boolean {
    return this.events.has(eventId);
  }

  public allEvents(): T[] {
    const all: T[] = [];
    this.events.forEach((_, event) => {
      all.push(event);
    });
    return all;
  }

  public count(): number {
    return this.events.size;
  }

  public isOnceEvent(eventId: T): boolean {
    const eventInfo: EventInfo | undefined = this.events.get(eventId);
    if (eventInfo) return eventInfo[1];
    return false;
  }
}
