/*
 * @Description: 日期处理工具函数
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-05 22:17:07
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-10 16:35:59
 */

/**
 * @description: 日期格式化
 * @param {string} fmt 格式化日期模式串，如'YY-mm-dd HH-MM-SS' `必传参数`
 * @param {Date} date 需格式化日期对象 `必传参数`
 * @return {string} 返回已经格式化的日期
 * @author: dreamy-xay
 */
export function dateFormat(fmt: string, date: Date): string {
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (const k in opt) {
    const ret: RegExpExecArray = new RegExp('(' + k + ')').exec(fmt);
    if (ret) fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
  }
  return fmt;
}

/**
 * @description: 获取时间差文字描述
 * @param {Date} date 需计算差日期对象 `必传参数`
 * @return {string} 返回时间差状态文字描述
 * @author: dreamy-xay
 */
export function dateGetText(date: Date): string {
  const timeDiff: number = parseInt((new Date().getTime() - date.getTime()) / 1000 + '');
  if (timeDiff <= 1) return '刚刚';
  else if (timeDiff < 30) return timeDiff + '秒前';
  else if (timeDiff < 60) return '半分钟前';
  else if (timeDiff < 1800) return parseInt(timeDiff / 60 + '') + '分钟前';
  else if (timeDiff < 3600) return '半小时前';
  else if (timeDiff < 86400) return parseInt(timeDiff / 3600 + '') + '小时前';
  else if (timeDiff < 172800) return '昨天';
  else if (timeDiff < 259200) return '前天';
  else if (timeDiff < 604800) return parseInt(timeDiff / 864000 + '') + '天前';
  else if (timeDiff < 1296000) return parseInt(timeDiff / 604800 + '') + '星期前';
  else if (timeDiff < 2592000) return '半月前';
  else if (timeDiff < 15552000) return parseInt(timeDiff / 2592000 + '') + '月前';
  else if (timeDiff < 31104000) return '半年前';
  else return parseInt(timeDiff / 31104000 + '') + '年前';
}
