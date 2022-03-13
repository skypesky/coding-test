/* eslint-disable @typescript-eslint/no-explicit-any */

export interface CrawlService<D = any> {
  crawl(): D | Promise<D>;
}
