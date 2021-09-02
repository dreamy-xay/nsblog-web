/*
 * @Description: 混合式工具类库
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-02 11:13:42
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-02 15:26:52
 */
/**
 * 通过图片url 获取图片file对象
 * @param {string} url 图片路径 `必传参数`
 * @param {string} fileName 文件名称(一定要带后缀) `必传参数`
 * @param {(file: File) => void} callback 回调函数 `必传参数`
 * @returns {void}
 */
export function getImageFileFromUrl(url: string, fileName: string, callback: (file: File) => void) {
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
