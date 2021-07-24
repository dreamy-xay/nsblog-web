/*
 * @Description: 工具函数
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-24 13:14:19
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-24 17:48:20
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * @description: 读取json文件
 * @param {string} dir 读取文件目录 `必传参数`
 * @return {Record<string, Record<string, unknown>[]>} 返回json对象，读取失败返回undefined
 * @author: dreamy-xay
 */
function readJson(dir: string): Record<string, Record<string, unknown>[]> {
  if (process.env.VUE_APP_MOCK_SEVER !== 'false') return require('./data.json');

  const jsonFilePath: string = path.join(__dirname, dir + '.json');

  // 判断是否存在此文件
  if (fs.existsSync(jsonFilePath))
    // 读取文件内容，并转化为Json对象
    return JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
  return undefined;
}

/**
 * @description: 编辑json文件
 * @param {string} dir 写入文件目录 `必传参数`
 * @param {Record<string, Record<string, unknown>[]>} data 写入数据 `必传参数`
 * @return {boolean} 返回是否成功写入
 * @author: dreamy-xay
 */
function writeJson(dir: string, data: Record<string, Record<string, unknown>[]>): boolean {
  if (process.env.VUE_APP_MOCK_SEVER !== 'false') return false;

  const jsonFilePath: string = path.join(__dirname, dir + '.json');

  // 判断是否存在此文件
  if (fs.existsSync(jsonFilePath)) {
    // 写入json文件
    fs.writeFileSync(jsonFilePath, JSON.stringify(data), 'utf8');
    return true;
  }
  return false;
}

/**
 * @description: 数据操作接口
 * @method findOne 查找一个
 * @method findAll 查找多个
 * @method find 自行回调查找多个
 * @method insertOne 插入一个
 * @method insert 插入多个
 * @method removeOne 删除一个
 * @method removeAll 删除多个
 * @method remove 自行回调删除多个
 * @method modifyOne 修改一个
 * @method modifyAll 修改多个
 * @method modefy 自行回调修改多个
 * @author: dreamy-xay
 */
export interface DataBaseOperator {
  findOne: (match: Record<string, unknown>) => Record<string, unknown>;
  findAll: (match: Record<string, unknown>) => Record<string, unknown>[];
  find: (callback: (item: Record<string, unknown>) => boolean) => Record<string, unknown>[];
  insertOne: (data: Record<string, unknown>) => boolean;
  insert: (data: Record<string, unknown>[]) => boolean;
  removeOne: (match: Record<string, unknown>) => boolean;
  removeAll: (match: Record<string, unknown>) => boolean;
  remove: (callback: (item: Record<string, unknown>) => boolean) => boolean;
  modifyOne: (match: Record<string, unknown>, data: Record<string, unknown>) => boolean;
  modifyAll: (match: Record<string, unknown>, data: Record<string, unknown>) => boolean;
  modify: (callback: (item: Record<string, unknown>) => boolean, data: Record<string, unknown>) => boolean;
}

/**
 * @description: 数据操作接口实现
 * @author: dreamy-xay
 */
class DataBaseOp implements DataBaseOperator {
  private database: Record<string, Record<string, unknown>[]>;
  private table: Record<string, unknown>[];
  private tableKey: string;

  constructor(filename: string, table: string) {
    this.database = readJson(filename);
    this.table = this.database[table];
    this.tableKey = table;
  }

  public findOne(match: Record<string, unknown>): Record<string, unknown> {
    for (const item of this.table) {
      let flag: boolean = true;
      for (const key in match)
        if (item[key] !== match[key]) {
          flag = false;
          break;
        }
      if (flag) return JSON.parse(JSON.stringify(item));
    }
    return undefined;
  }

  public findAll(match: Record<string, unknown>): Record<string, unknown>[] {
    const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
    for (const item of this.table) {
      let flag: boolean = true;
      for (const key in match)
        if (item[key] !== match[key]) {
          flag = false;
          break;
        }
      if (flag) ans.push(item);
    }
    return JSON.parse(JSON.stringify(ans));
  }

  public find(callback: (item: Record<string, unknown>) => boolean): Record<string, unknown>[] {
    const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
    for (const item of this.table) if (callback(item)) ans.push(item);
    return JSON.parse(JSON.stringify(ans));
  }

  public insertOne(data: Record<string, unknown>): boolean {
    this.table.push(data);
    this.database[this.tableKey] = this.table;
    return writeJson('data', this.database);
  }

  public insert(data: Record<string, unknown>[]): boolean {
    this.table.splice(this.table.length, 0, ...data);
    this.database[this.tableKey] = this.table;
    return writeJson('data', this.database);
  }

  public removeOne(match: Record<string, unknown>): boolean {
    for (let i: number = 0; i < this.table.length; ++i) {
      let flag: boolean = true;
      for (const key in match)
        if (this.table[i][key] !== match[key]) {
          flag = false;
          break;
        }
      if (flag) {
        this.table.splice(i, 1);
        break;
      }
    }
    this.database[this.tableKey] = this.table;
    return writeJson('data', this.database);
  }

  public removeAll(match: Record<string, unknown>): boolean {
    const table: Record<string, unknown>[] = new Array<Record<string, unknown>>();
    for (const item of this.table) {
      let flag: boolean = true;
      for (const key in match)
        if (item[key] !== match[key]) {
          flag = false;
          break;
        }
      if (!flag) table.push(item);
    }
    this.database[this.tableKey] = this.table = table;
    return writeJson('data', this.database);
  }

  public remove(callback: (item: Record<string, unknown>) => boolean): boolean {
    const table: Record<string, unknown>[] = new Array<Record<string, unknown>>();
    for (const item of this.table) if (callback(item)) table.push(item);
    this.database[this.tableKey] = this.table = table;
    return writeJson('data', this.database);
  }

  public modifyOne(match: Record<string, unknown>, data: Record<string, unknown>): boolean {
    for (let i: number = 0; i < this.table.length; ++i) {
      let flag: boolean = true;
      for (const key in match)
        if (this.table[i][key] !== match[key]) {
          flag = false;
          break;
        }
      if (flag) {
        for (const key in data) if (this.table[i][key]) this.table[i][key] = data[key];
        break;
      }
    }
    this.database[this.tableKey] = this.table;
    return writeJson('data', this.database);
  }

  public modifyAll(match: Record<string, unknown>, data: Record<string, unknown>): boolean {
    for (let i: number = 0; i < this.table.length; ++i) {
      let flag: boolean = true;
      for (const key in match)
        if (this.table[i][key] !== match[key]) {
          flag = false;
          break;
        }
      if (flag) for (const key in data) if (this.table[i][key]) this.table[i][key] = data[key];
    }
    this.database[this.tableKey] = this.table;
    return writeJson('data', this.database);
  }

  public modify(callback: (item: Record<string, unknown>) => boolean, data: Record<string, unknown>): boolean {
    for (let i: number = 0; i < this.table.length; ++i)
      if (callback(this.table[i])) for (const key in data) if (this.table[i][key]) this.table[i][key] = data[key];
    this.database[this.tableKey] = this.table;
    return writeJson('data', this.database);
  }
}

/**
 * @description: 选择表
 * @param {string} table 表名 `必传参数`
 * @return {DataBaseOperator} 返回数据操作接口
 * @author: dreamy-xay
 */
export default function select(table: string): DataBaseOperator {
  return new DataBaseOp('data', table);
}
