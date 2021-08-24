/*
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-24 22:42:10
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-24 22:46:55
 */
import langDefault from './lang/enUK';

let lang = langDefault;

export const i18n = (translations: Record<string, unknown>) => {
  lang = { ...langDefault, ...translations };
};

// Sample parse translation
export const t = (term: string) => {
  const properties = term.split('.');
  let text = lang;

  properties.forEach(p => {
    text = text[p];
  });

  return text;
};

export default { i18n, t };
