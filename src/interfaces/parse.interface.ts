/* eslint-disable @typescript-eslint/no-explicit-any */

export interface HtmlParse<S = any, T = any> {
  /**
   *
   * @description 将html转化为有效数据
   * @param {S} source
   * @return {*}  {T}
   * @memberof Parse
   */
  parse(source: S): T;

  /**
   *
   * @description 判断html中是否存在有效数据,如果没有就是数据为空,返回true,否则就是有数据返回false
   * @param {S} source
   * @return {*}  {boolean}
   * @memberof Parse
   */
  isEmpty(source: S): boolean;
}
