import {BindingScope, injectable, service} from "@loopback/core";
import axios, {AxiosResponse} from "axios";
import {flatMap} from "lodash";
import {CrawlService} from "../interfaces/crawl-service.interface";
import {EthereumTransactionInfo} from "../models/ethereum-transaction-info.model";
import {SimpleTableHtmlParseService} from "./data-table-parse.service";

@injectable({scope: BindingScope.TRANSIENT})
export class EthereumTransactionInfoFastCrawlServiceService
  implements CrawlService<EthereumTransactionInfo[]>
{
  constructor(
    @service()
    public simpleTableHtmlParseService: SimpleTableHtmlParseService
  ) {}

  public async crawl(): Promise<EthereumTransactionInfo[]> {
    const pageSize = 100;
    const html = await this.getHtml(1, pageSize);
    // 我想知道总共有多少条记录,以便我可以批量去请求数据
    const totalRows: number = this.simpleTableHtmlParseService
        .excute(html)
        .getTotalRows(),
      maxPageNumber = Math.ceil(totalRows / pageSize);

    const martixs = await Promise.all(
      new Array(maxPageNumber).fill(null).map((v, i) => {
        return this.getHtml(i + 1, pageSize).then(_html =>
          this.simpleTableHtmlParseService.excute(_html).parse()
        );
      })
    );

    return flatMap(martixs);
  }

  /**
   *
   * @description 获取页面的html
   * @tips 这一段可以抽取成共用的函数
   * @param {number} pageNumber
   * @param {number} pageSize
   * @return {*}  {Promise<string>}
   * @memberof EthereumTransactionInfoFastCrawlServiceService
   */
  public async getHtml(pageNumber: number, pageSize: number): Promise<string> {
    return axios
      .get<string, AxiosResponse<string>>(
        `https://etherscan.io/txs?a=0xeb2a81e229b68c1c22b6683275c00945f9872d90&ps=${pageSize}&p=${pageNumber}`,
        {
          responseType: "document"
        }
      )
      .then(response => response.data);
  }
}
