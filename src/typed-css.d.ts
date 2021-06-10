/*
 * @Description: ts css导入声明
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-11 00:25:21
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-11 00:33:20
 */

declare module '*.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
