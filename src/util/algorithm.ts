/*
 * @Description: 算法帮助函数
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-18 10:30:50
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-18 11:19:41
 */

/**
 * @description: 二分查找指定值
 * @param {T[]} arr 查找数组传入 `必传参数`
 * @param {T} searchValue 查找值 `必传参数`
 * @param {function} callback 查找函数，(value: T) => number，返回0表示查找成功，返回 <0 表示小于搜索值，反之大于搜索值 `默认为 (value: T) => (value === searchValue ? 0 : value < searchValue ? -1 : 1)`
 * @return {number} 返回查找值的数组下标，未找到返回下标 >= arr.length
 * @author: dreamy-xay
 */
export function binary_search<T>(
  arr: T[],
  searchValue: T,
  callback: (value: T) => number = (value: T) => (value === searchValue ? 0 : value < searchValue ? -1 : 1)
): number {
  let low: number = 0,
    high: number = arr.length,
    mid: number,
    status: number;
  while (low < high) {
    mid = low + ((high - low) >> 1);
    status = callback(arr[mid]);
    if (status === 0) return mid;
    else if (status > 0) low = mid + 1;
    else high = mid;
  }
  return arr.length;
}

/**
 * @description: 二分查找大于等于或小于等于指定值的第一个值，使用方法和c++ STL一致
 * @param {T[]} arr 查找数组传入 `必传参数`
 * @param {T} searchValue 查找值 `必传参数`
 * @param {function} callback 查找函数，(value: T) => boolean，返回 true 表示符合查找方向条件，反之不符合 `默认为(value: T) => value >= searchValue`
 * @return {number} 返回查找值的数组下标，未找到返回下标 >= arr.length
 * @author: dreamy-xay
 */
export function lower_bound<T>(
  arr: T[],
  searchValue: T,
  callback: (value: T) => boolean = (value: T) => value >= searchValue
): number {
  let low: number = 0,
    high: number = arr.length,
    mid: number;
  while (low < high) {
    mid = low + ((high - low) >> 1);
    if (callback(arr[mid])) high = mid;
    else low = mid + 1;
  }
  return low;
}

/**
 * @description: 二分查找大于或小于指定值的第一个值，使用方法和c++ STL一致
 * @param {T[]} arr 查找数组传入 `必传参数`
 * @param {T} searchValue 查找值 `必传参数`
 * @param {function} callback 查找函数，(value: T) => boolean，返回 true 表示符合查找方向条件，反之不符合 `默认为(value: T) => value > searchValue`
 * @return {number} 返回查找值的数组下标，未找到返回下标 >= arr.length
 * @author: dreamy-xay
 */
export function upper_bound<T>(
  arr: T[],
  searchValue: T,
  callback: (value: T) => boolean = (value: T) => value > searchValue
): number {
  let low: number = 0,
    high: number = arr.length,
    mid: number;
  while (low < high) {
    mid = low + ((high - low) >> 1);
    if (callback(arr[mid])) high = mid;
    else low = mid + 1;
  }
  return low;
}
