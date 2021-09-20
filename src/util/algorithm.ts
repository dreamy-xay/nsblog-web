/*
 * @Description: 算法帮助函数
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-18 10:30:50
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-18 16:07:25
 */

/**
 * @description: 二分查找指定值
 * @param {T[]} arr 查找数组传入 `必传参数`
 * @param {T} searchValue 查找值 `必传参数`
 * @return {number} 返回查找值的数组下标，未找到返回下标 >= arr.length
 * @author: dreamy-xay
 */
export function binary_search<T>(arr: T[], searchValue: T): number;
/**
 * @description: 二分查找指定值
 * @param {T[]} arr 查找数组传入 `必传参数`
 * @param {function} callback 查找函数，(value: T) => number，返回0表示查找成功，返回 <0 表示小于搜索值，反之大于搜索值 `默认为 (value: T) => (value === searchValue ? 0 : value < searchValue ? -1 : 1)`
 * @return {number} 返回查找值的数组下标，未找到返回下标 >= arr.length
 * @author: dreamy-xay
 */
export function binary_search<T>(arr: T[], callback: (value: T) => number): number;
export function binary_search<T>(arr: T[], condition: T | ((value: T) => number)): number {
  if (!(typeof condition === 'function'))
    condition = (value: T) => (value === condition ? 0 : value < condition ? -1 : 1);
  let low: number = 0,
    high: number = arr.length,
    mid: number,
    status: number;
  while (low < high) {
    mid = low + ((high - low) >> 1);
    status = (<(value: T) => number>condition)(arr[mid]);
    if (status === 0) return mid;
    else if (status > 0) low = mid + 1;
    else high = mid;
  }
  return arr.length;
}

/**
 * @description: 二分查找大于等于或小于等于指定值的第一个值
 * @param {T[]} arr 查找数组传入 `必传参数`
 * @param {T} searchValue 查找值 `必传参数`
 * @return {number} 返回查找值的数组下标，未找到返回下标 >= arr.length
 * @author: dreamy-xay
 */
export function binary_bound<T>(arr: T[], searchValue: T): number;
/**
 * @description: 二分查找大于等于或小于等于指定值的第一个值
 * @param {T[]} arr 查找数组传入 `必传参数`
 * @param {function} callback 查找函数，(value: T) => boolean，返回 true 表示符合查找方向条件，反之不符合 `默认为(value: T) => value >= searchValue`
 * @return {number} 返回查找值的数组下标，未找到返回下标 >= arr.length
 * @author: dreamy-xay
 */
export function binary_bound<T>(arr: T[], callback: (value: T) => boolean): number;
export function binary_bound<T>(arr: T[], condition: T | ((value: T) => boolean)): number {
  if (!(typeof condition === 'function')) condition = (value: T) => value >= condition;
  let low: number = 0,
    high: number = arr.length,
    mid: number;
  while (low < high) {
    mid = low + ((high - low) >> 1);
    if ((<(value: T) => boolean>condition)(arr[mid])) high = mid;
    else low = mid + 1;
  }
  return low;
}
