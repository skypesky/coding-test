/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Crawl<D = any> {
  crawl(): D | Promise<D>;
}
