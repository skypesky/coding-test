/* eslint-disable @typescript-eslint/no-explicit-any */

export interface CrawlService<D = any> {
  /**
   *
   * @description 爬取数据,能返回爬取完成的数据给我即可
   * @return {*}  {(D | Promise<D>)}
   * @memberof CrawlService
   */
  crawl(): D | Promise<D>;
}
