/*
 * @Description: mock请求拦截
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-10 17:38:14
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-13 18:45:01
 */

import Mock, { MockCbOptions } from 'better-mock';
import intercepter from './app';

/* mock请求延迟 */
Mock.setup({
  timeout: '300-900'
});

/**
 * @description: 判断是否为数字
 * @param {string} val  传入值
 * @return {boolean}  返回是否为数字
 * @author: dreamy-xay
 */
function isNumber(val: string): boolean {
  const regPos = /^\d+(\.\d+)?$/; //非负浮点数
  const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  return regPos.test(val) || regNeg.test(val);
}

/**
 * @description: 将对象key全部小写
 * @param {Record<string, unknown>} obj 传对象 `必传参数`
 * @return {Record<string, unknown>} 返回格式化后对象
 * @author: dreamy-xay
 */
function lowerObjKey(obj: Record<string, unknown>): Record<string, unknown> {
  for (const key in obj) {
    obj[key.toLowerCase()] = obj[key];
    delete obj[key];
  }
  return obj;
}

/**
 * @description: 解析get请求参数
 * @param {string} url
 * @return {Record<string, unknown>}
 * @author: dreamy-xay
 */
function getQuery(url: string): Record<string, unknown> {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ');
  if (!search) return {};
  const obj = {};
  const searchArr = search.split('&');
  searchArr.forEach(v => {
    const index = v.indexOf('=');
    if (index !== -1) {
      const name = v.substring(0, index);
      const val = v.substring(index + 1, v.length);
      obj[name] = isNumber(val) ? parseFloat(val) : val;
    }
  });
  return obj;
}

/**
 * @description: 匹配特殊路由
 * @param {string} url 传入特殊正则路由 `必传参数`
 * @return {RegExp} 返回特殊正则表达式
 * @author: dreamy-xay
 */
function getUrlRegExp(url: string): RegExp {
  return new RegExp(url.replace(/.*?:\/\/.*?(\/.*)/, '$1').replace(/(.*?):.*?(\/|$)/g, '$1.+$2') + '(\\?|$)');
}

/**
 * @description: 获取特殊路由的键值对
 * @param {string} url 传入特殊正则路由 `必传参数`
 * @param {string} realUrl 传入真实路由 `必传参数`
 * @return {Record<string, unknown>} 返回params
 * @author: dreamy-xay
 */
function getParams(url: string, realUrl: string): Record<string, unknown> {
  url = url.replace(/.*?:\/\/.*?(\/.*)/, '$1').replace(/(.*?)\?.*/, '$1');
  realUrl = realUrl.replace(/.*?:\/\/.*?(\/.*)/, '$1').replace(/(.*?)\?.*/, '$1');

  const keyArr: string[] = url.match(/(?<=:).*?(?=(\/|$))/g);
  const ans: Record<string, unknown> = {};

  if (!keyArr) return ans;

  for (const key of keyArr) {
    const preKey: string = url.match(/.*?(?=:)/)[0];
    const value: string = realUrl.substring(realUrl.indexOf(preKey) + preKey.length).split('/')[0];
    ans[key] = value;
    url = url.replace(/(.*?):.*?(\/|$)/, `$1${value}$2`);
  }

  return ans;
}

/* 状态码对应文字 */
const statusText: Record<number, string> = {
  100: 'Continue', // 客户必须继续发出请求
  101: 'Switching protocols', // 客户要求服务器根据请求转换HTTP协议版本
  200: 'OK', // 交易成功
  201: 'Created', // 提示知道新文件的URL
  202: 'Accepted', // 接受和处理、但处理未完成
  203: 'Non-Authoritative Information', // 返回信息不确定或不完整
  204: 'No Content', // 请求收到，但返回信息为空
  205: 'Reset Content', // 服务器完成了请求，用户代理必须复位当前已经浏览过的文件
  206: 'Partial Content', // 服务器已经完成了部分用户的GET请求
  300: 'Multiple Choices', // 请求的资源可在多处得到
  301: 'Moved Permanently', // 删除请求数据
  302: 'Found', // 在其他地址发现了请求数据
  303: 'See Other', // 建议客户访问其他URL或访问方式
  304: 'Not Modified', // 客户端已经执行了GET，但文件未变化
  305: 'Use Proxy', // 请求的资源必须从服务器指定的地址得到
  307: 'Temporary Redirect', // 申明请求的资源临时性删除
  400: 'Bad Request', // 错误请求，如语法错误
  401: 'Unauthorized', // 请求授权失败
  402: 'Payment Required', // 保留有效ChargeTo头响应
  403: 'Forbidden', // 请求不允许(由于服务器上文件或目录的权限设置导致资源不可用)
  404: 'Not Found', // 没有发现文件、查询或URl(没有找到指定的资源)
  405: 'Method Not Allowed', // 用户在Request-Line字段定义的方法不允许
  406: 'Not Acceptable', // 根据用户发送的Accept拖，请求资源不可访问
  407: 'Proxy Authentication Required', // 类似401，用户必须首先在代理服务器上得到授权
  408: 'Request Timeout', // 客户端没有在用户指定的饿时间内完成请求
  409: 'Conflict', // 对当前资源状态，请求不能完成
  410: 'Gone', // 服务器上不再有此资源且无进一步的参考地址
  411: 'Length Required', // 服务器拒绝用户定义的Content-Length属性请求
  412: 'Precondition Failed', // 一个或多个请求头字段在当前请求中错误
  413: 'Request Entity Too Large', // 请求的资源大于服务器允许的大小
  414: 'Request-URI Too Long', // 请求的资源URL长于服务器允许的长度
  415: 'Unsupported Media Type', // 请求资源不支持请求项目格式
  416: 'Requested Range Not Suitable', // 请求中包含Range请求头字段，在当前请求资源范围内没有range指示值，请求也不包含If-Range请求头字段
  417: 'Expectation Failed', // 服务器不满足请求Expect头字段指定的期望值，如果是代理服务器，可能是下一级服务器不能满足请求
  500: 'Internal Server Error', // 服务器产生内部错误
  501: 'Not Implemented', // 服务器不支持请求的函数
  502: 'Bad Gateway', // 服务器暂时不可用，有时是为了防止发生系统过载
  503: 'Service Unavailable', // 服务器过载或暂停维修
  504: 'Gateway Timeout', // 关口过载，服务器使用另一个关口或服务来响应用户，等待时间设定值较长
  505: 'HTTP Version Not Supported' // 服务器不支持或拒绝支请求头中指定的HTTP版本
};

/**
 * @description: request接口
 * @param {Record<string, unknown>} query  get请求参数解析
 * @param {Record<string, unknown>} body  请求body解析
 * @param {string} path 请求路由
 * @param {Record<string, unknown>} 请求头
 * @author: dreamy-xay
 */
export interface Request {
  query: Record<string, unknown>;
  body: Record<string, unknown>;
  headers: Record<string, unknown>;
  params: Record<string, unknown>;
  path: string;
}

/**
 * @description: response接口
 * @method send http返回数据，传递参数返回数据data
 * @method json json返回数据，传递参数返回数据data
 * @method status 设置返回状态，传递参数状态码status
 * @method set 设置响应头内容
 * @author: dreamy-xay
 */
export interface Response {
  send: (data: unknown) => Record<string, unknown>;
  json: (data: Record<string, unknown>) => Record<string, unknown>;
  status: (status: number) => this;
  set: (headersKey: string, value: unknown) => this;
}

/**
 * @description:  response 类对象实现，具体见接口
 * @param {number} Status 状态码
 * @author: dreamy-xay
 */
class ResponseObj implements Response {
  private Status: number;
  private headers: Record<string, unknown>;

  constructor() {
    this.Status = 200;
    this.headers = {
      'content-length': 0,
      'content-type': 'text/html'
    };
  }

  public send(data: unknown): Record<string, unknown> {
    this.headers['content-length'] = new String(data).length;
    return {
      config: {},
      data,
      headers: this.headers,
      request: null,
      status: this.Status,
      statusText: statusText[this.Status]
    };
  }

  public json(data: Record<string, unknown>): Record<string, unknown> {
    this.set('content-type', 'application/json');
    return this.send(data);
  }

  public status(status: number): this {
    this.Status = status;
    return this;
  }

  public set(headersKey: string, value: unknown): this {
    this.headers[headersKey] = value;
    return this;
  }
}

/**
 * @description: request请求
 * @param {string} url 请求路由
 * @param {string} type 请求类型
 * @param {function} callback 请求回调
 * @return {void}
 * @author: dreamy-xay
 */
function request(url: string, type: string, callback: (req: Request, res: Response) => void): void {
  Mock.mock(getUrlRegExp(url), type, (options: MockCbOptions | any) => {
    const req: Request = {
      query: getQuery(options.url),
      body: JSON.parse(options.body),
      params: getParams(url, options.url),
      path: options.url,
      headers: lowerObjKey(options.headers)
    };

    const res: Response = new ResponseObj();
    console.log('request invoke: ' + options.type.toUpperCase() + ' ' + options.url);
    return callback(req, res);
  });
}

/**
 * @description: Application 接口
 * @method get 拦截get请求
 * @method post 拦截post请求
 * @method delete 拦截delete请求
 * @method put 拦截put请求
 * @author: dreamy-xay
 */
export interface Application {
  get: (url: string, callback: (req: Request, res: Response) => void) => void;
  post: (url: string, callback: (req: Request, res: Response) => void) => void;
  delete: (url: string, callback: (req: Request, res: Response) => void) => void;
  put: (url: string, callback: (req: Request, res: Response) => void) => void;
}

(function() {
  if (process.env.VUE_APP_MOCK_SEVER !== 'false' && process.env.VUE_APP_MOCK !== 'false') {
    const app: Application = {
      /**
       * @description: 拦截get请求
       * @param {string} url 请求路由
       * @param {function} callback 请求回调
       * @return {void}
       * @author: dreamy-xay
       */
      get(url: string, callback: (req: Request, res: Response) => void): void {
        request(url, 'get', callback);
      },
      /**
       * @description: 拦截post请求
       * @param {string} url 请求路由
       * @param {function} callback 请求回调
       * @return {void}
       * @author: dreamy-xay
       */
      post(url: string, callback: (req: Request, res: Response) => void): void {
        request(url, 'post', callback);
      },
      /**
       * @description: 拦截delete请求
       * @param {string} url 请求路由
       * @param {function} callback 请求回调
       * @return {void}
       * @author: dreamy-xay
       */
      delete(url: string, callback: (req: Request, res: Response) => void): void {
        request(url, 'delete', callback);
      },
      /**
       * @description: 拦截put请求
       * @param {string} url 请求路由
       * @param {function} callback 请求回调
       * @return {void}
       * @author: dreamy-xay
       */
      put(url: string, callback: (req: Request, res: Response) => void): void {
        request(url, 'put', callback);
      }
    };

    // 拦截
    intercepter(app as any);
  }
})();
