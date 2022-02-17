/*
 * @Description: 混合式工具类库
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-02 11:13:42
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-17 13:29:06
 */
/**
 * @description: 通过图片url 获取图片file对象
 * @param {string} url 图片路径 `必传参数`
 * @param {string} fileName 文件名称(一定要带后缀) `必传参数`
 * @param {(file: File) => void} callback 回调函数 `必传参数`
 * @returns {void}
 */
export function getImageFileFromUrl(url: string, fileName: string, callback: (file: File) => void): void {
  const xhr: XMLHttpRequest = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.setRequestHeader('Accept', 'image/jpeg');
  xhr.responseType = 'blob';
  xhr.onload = () => {
    if (xhr.status == 200) callback(new File([xhr.response], fileName, { type: 'image/jpeg' }));
  };
  xhr.send();
}

/**
 * @description: base64 转 blob
 * @param {string} base64Data base64字符串 `必传参数`
 * @return {Blob} 返回Blob对象
 * @author: dreamy-xay
 */
export function base64ToBlob(base64Data: string): Blob {
  const arr: string[] = base64Data.split(',');
  const fileType: string = arr[0].match(/:(.*?);/)[1];
  const bstr: string = atob(arr[1]);
  let len: number = bstr.length;
  const u8Arr: Uint8Array = new Uint8Array(len);
  while (len--) u8Arr[len] = bstr.charCodeAt(len);
  return new Blob([u8Arr], { type: fileType });
}

/**
 * @description: base64 转 file
 * @param {string} base64Data base64字符串 `必传参数`
 * @param {string} filename 文件名 `默认为'file'`
 * @return {Blob} 返回Blob对象
 * @author: dreamy-xay
 */
export function base64ToFile(base64Data: string, fileName: string = 'file'): Blob {
  const blob: any = base64ToBlob(base64Data);
  blob.lastModifiedDate = new Date();
  blob.name = fileName;
  return blob;
}

/**
 * @description: 获取数字的指定位数分割
 * @param {string | number} num 传入数字 `必传参数`
 * @param {number} count 指定分割位数 `默认为3，千位分割`
 * @param {string} split 指定分割嵌入字符串 `默认为,`
 * @return {string} 返回符合条件分割字符串
 * @author: dreamy-xay
 */
export function getSplitNum(num: string | number, count: number = 3, split: string = ','): string {
  // 字符串反转
  function reverse(str: string): string {
    let ans: string = '';
    for (let i: number = str.length - 1; i >= 0; --i) ans += str[i];
    return ans;
  }

  const str: string = parseInt(num + '').toString();
  if (str === 'NaN') return '0';
  let ans: string = '';
  split = reverse(split);
  for (let i: number = str.length - 1, j: number = 1; i >= 0; --i, ++j) {
    ans += str[i];
    if (j % count === 0) ans += split;
  }
  if (str.length % count === 0) ans = ans.slice(0, ans.length - 1);
  return reverse(ans);
}

/**
 * @description: 获取格式化之后的字符串
 * @param {string ｜ number} num 需要格式化的数字 `必传参数`
 * @param {number} fixed 保留的小数位数 `默认为 1`
 * @param {number} divisor 一倍数 `默认为 1000`
 * @param {string} endStr 结尾添加字符串 `默认为 (divisor === 1000 ? 'K' : '')`
 * @return {string} 返回格式化之后的字符串
 * @author: dreamy-xay
 */
export function getDivisionFormatNum(
  num: string | number,
  fixed: number = 1,
  divisor: number = 1000,
  endStr: string = divisor === 1000 ? 'K' : ''
): string {
  num = parseInt(num as string);
  if (isNaN(num)) return '0';
  if (<number>num < divisor) return String(num);
  else return (<number>num / divisor).toFixed(fixed) + endStr;
}

/**
 * @description: 颜色16进制转10进制
 * @param {string} color 传入16进制颜色，如 '#ff0a4a' `必传参数`
 * @return {{r: number, g: number, b: number, rgb: string}} 返回对象,其中rgb为字符串  如 121,255,10 => r(121) g(255) b(10)
 * @author: dreamy-xay
 */
export function colorHexToDec(color: string): { r: number; g: number; b: number; rgb: string } {
  if (!new RegExp(/#[0-9a-fA-F]{6}/).test(color)) return { r: 0, g: 0, b: 0, rgb: '0,0,0' };
  const r = parseInt(color.substr(1, 2), 16),
    g = parseInt(color.substr(3, 2), 16),
    b = parseInt(color.substr(5, 2), 16);
  return {
    r,
    g,
    b,
    rgb: `${r},${g},${b}`
  };
}
