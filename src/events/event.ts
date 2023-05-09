/*
 * @Description: 全局事件通信
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-27 12:19:40
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-05-09 16:50:56
 */

/**
 * @description: events回调函数类型
 * @author: dreamy-xay
 */
type EventCallback = (...args: any[]) => void | unknown;

/**
 * @description: 单个事件回调信息
 * @author: dreamy-xay
 */
type EventCallbackInfo = {
  callback: EventCallback;
  remainingTimes: string | number;
};

/**
 * @description: events事件状态，含计数器
 * @author: dreamy-xay
 */
class EventStatus {
  private count: number; // 事件剩余执行次数
  private infinite: boolean; // 事件是否无穷次执行

  // 事件类型构造函数
  constructor(count?: number) {
    if (count && count > 0) {
      // 执行次数大于零，否则被认为是无限次
      this.count = count;
      this.infinite = false;
    } else {
      this.count = 0; // 无穷次数事件，次数将不计数
      this.infinite = true;
    }
  }

  /**
   * @description: 事件执行一次
   * @return {this} 返回对象本身，方便链式调用
   * @author: dreamy-xay
   */
  public execute(): this {
    if (this.infinite) return this;
    --this.count;
    return this;
  }

  /**
   * @description: 判断当前事件是否有效
   * @return {boolean} 返回事件是否以及失效
   * @author: dreamy-xay
   */
  public invalid(): boolean {
    if (this.infinite) return false;
    return this.count <= 0;
  }

  /**
   * @description: 计算当前事件剩余执行次数
   * @return {string | number} 有限次返回次数，无限次返回 'infinite'
   * @author: dreamy-xay
   */
  public remainingTimes(): string | number {
    return this.infinite ? 'infinite' : this.count;
  }
}

/**
 * @description: events事件hash表
 * @author: dreamy-xay
 */
type EventsMap = Map<EventCallback, EventStatus>;

/**
 * @description: Events类接口
 * @author: dreamy-xay
 */
export interface EventsInterface<T> {
  /**
   * @description: 发出事件并获得事件返回的结果
   * @param {T} eventId 事件名 `必传参数`
   * @param {any[]} args 多参数 `可传可不传`
   * @return {unknown[]} 返回事件返回值列表
   * @author: dreamy-xay
   */
  emitAndReturn(eventId: T, ...args: any[]): unknown[];

  /**
   * @description: 发出事件
   * @param {T} eventId 事件名 `必传参数`
   * @param {any[]} args 多参数 `可传可不传`
   * @return {this} 返回自身，可链式调用
   * @author: dreamy-xay
   */
  emit(eventId: T, ...args: any[]): this;

  /**
   * @description: 绑定接收事件
   * @param {T} eventId 事件名 `必传参数`
   * @param {EventCallback} callback 绑定接收事件回调函数 `必传参数`
   * @param {boolean} override 是否覆盖之前绑定的事件 `默认为false`
   * @param {number} count 事件可执行次数，执行次数大于零，否则被认为是无限次 `默认为undefined`
   * @return {this} 返回自身，可链式调用
   * @author: dreamy-xay
   */
  on(eventId: T, callback: EventCallback, override?: boolean, count?: number): this;

  /**
   * @description: 解除事件绑定
   * @param {T} eventId 事件名 `必传参数`
   * @param {EventCallback | undefined} callback 事件指定回调函数，传入则只删除该回调函数，否则删除事件id下所有回调函数 `默认为undefined`
   * @return {this} 返回自身，可链式调用
   * @author: dreamy-xay
   */
  off(eventId: T, callback?: EventCallback): this;

  /**
   * @description: 绑定一次性接收事件
   * @param {T} eventId 事件名 `必传参数`
   * @param {EventCallback} callback 绑定接收事件回调函数 `必传参数`
   * @param {boolean} 是否覆盖之前绑定的事件 `默认为false`
   * @return {this} 返回自身，可链式调用
   * @author: dreamy-xay
   */
  once(eventId: T, callback: EventCallback, override?: boolean): this;

  /**
   * @description: 清楚全部事件
   * @return {void}
   * @author: dreamy-xay
   */
  clear(): void;

  /**
   * @description: 遍历全部事件ID
   * @param {function} callback 回调函数，参数和Map类似 `必传参数`
   * @return {void}
   * @author: dreamy-xay
   */
  forEach(callback: (eventCallbackInfoList?: EventCallbackInfo[], eventId?: T, events?: this) => void): void;

  /**
   * @description: 判断事件是否存在
   * @param {T} eventId 事件名 `必传参数`
   * @return {boolean} 返回是否存在
   * @author: dreamy-xay
   */
  has(eventId: T): boolean;

  /**
   * @description: 获取所有绑定事件
   * @return {[T, EventCallbackInfo[]][]} 返回事件名数组
   * @author: dreamy-xay
   */
  allEvents(): [T, EventCallbackInfo[]][];

  /**
   * @description: 获取所有绑定事件的id
   * @return {T[]} 返回事件名数组
   * @author: dreamy-xay
   */
  allEventsId(): T[];

  /**
   * @description: 获取所有绑定事件的回调函数信息列表
   * @return {EventCallbackInfo[][]} 返回事件名数组
   * @author: dreamy-xay
   */
  allEventsCallbackInfoList(): EventCallbackInfo[][];

  /**
   * @description: 获取当前事件全部数量
   * @return {number} 返回当前事件全部数量
   * @author: dreamy-xay
   */
  count(): number;

  /**
   * @description: toString 接口的实现
   * @return {string} 返回对象字符串表示
   * @author: dreamy-xay
   */
  toString(): string;
}

/**
 * @description: Events类实现
 * @author: dreamy-xay
 */
export default class Events<T extends string | number = string> implements EventsInterface<T> {
  private events: Map<T, EventsMap>; // events hash表

  /**
   * @description: 构造函数，可采用拷贝构造函数
   * @param {Events<T> | undefined} events 事件类 `默认为undefined`
   * @author: dreamy-xay
   */
  constructor(events?: Events<T>) {
    if (events) this.events = new Map<T, EventsMap>(JSON.parse(JSON.stringify(events.events)));
    // 深拷贝
    else this.events = new Map<T, EventsMap>();
  }

  public emitAndReturn(eventId: T, ...args: any[]): unknown[] {
    const returnValueList: unknown[] = []; // 返回值列表
    const eventsMap: EventsMap | undefined = this.events.get(eventId);
    if (eventsMap) {
      const offEventCallback: Set<EventCallback> = new Set<EventCallback>(); // 事件移除列表
      for (const [eventCallback, eventStatus] of eventsMap) {
        returnValueList.push(eventCallback(...args)); // 执行事件
        if (eventStatus.execute().invalid())
          // 判断事件是否失效
          offEventCallback.add(eventCallback); // 无效加入移除列表
      }

      // 移除失效事件
      if (offEventCallback.size) for (const eventCallback of offEventCallback) eventsMap.delete(eventCallback);
    }
    return returnValueList;
  }

  public emit(eventId: T, ...args: any[]): this {
    this.emitAndReturn(eventId, ...args);
    return this;
  }

  public on(eventId: T, callback: EventCallback, override?: boolean, count?: number): this {
    if (!override && this.events.has(eventId)) this.events.get(eventId)?.set(callback, new EventStatus(count));
    else
      this.events.set(
        eventId,
        new Map<EventCallback, EventStatus>([[callback, new EventStatus(count)]])
      );
    return this;
  }

  public off(eventId: T, callback?: EventCallback): this {
    if (callback) this.events.get(eventId)?.delete(callback);
    // 删除事件内指定函数
    else this.events.delete(eventId); // 否则删除整个事件
    return this;
  }

  public once(eventId: T, callback: EventCallback, override: boolean = false): this {
    return this.on(eventId, callback, override, 1);
  }

  public clear(): void {
    this.events.clear();
  }

  private getEventsMapInfo(eventsMap: EventsMap): EventCallbackInfo[] {
    return [...eventsMap].map((value: [EventCallback, EventStatus]) => ({
      callback: value[0],
      remainingTimes: value[1].remainingTimes()
    }));
  }

  public forEach(callback: (eventCallbackInfoList?: EventCallbackInfo[], eventId?: T, events?: this) => void): void {
    this.events.forEach((eventsMap: EventsMap, eventId: T) =>
      callback(this.getEventsMapInfo(eventsMap), eventId, this)
    );
  }

  public has(eventId: T): boolean {
    return this.events.has(eventId);
  }

  public allEvents(): [T, EventCallbackInfo[]][] {
    const all: [T, EventCallbackInfo[]][] = [];
    for (const [eventId, eventsMap] of this.events) all.push([eventId, this.getEventsMapInfo(eventsMap)]);
    return all;
  }

  public allEventsId(): T[] {
    const all: T[] = [];
    for (const [eventId, _] of this.events) all.push(eventId);
    return all;
  }

  public allEventsCallbackInfoList(): EventCallbackInfo[][] {
    const all: EventCallbackInfo[][] = [];
    for (const [_, eventsMap] of this.events) all.push(this.getEventsMapInfo(eventsMap));
    return all;
  }

  public count(): number {
    return this.events.size;
  }

  public toString(): string {
    return '[object Events]';
  }
}
