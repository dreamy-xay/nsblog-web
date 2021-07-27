/*
 * @Description: 全局事件通信建立
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-27 12:22:37
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-27 12:41:53
 */

import Events, { EventsInterface } from './event';

const events: EventsInterface<number | string> = new Events<number | string>();

export default events;
