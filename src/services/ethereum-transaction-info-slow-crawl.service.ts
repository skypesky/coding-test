import {BindingScope, injectable, service} from "@loopback/core";
import axios from "axios";
import {AxiosResponse} from "axios-https-proxy-fix";
import {CrawlService} from "../interfaces/crawl-service.interface";
import {EthereumTransactionInfo} from "../models/ethereum-transaction-info.model";
import {DataTableParseService} from "./data-table-parse.service";

/**
 *
 *
 * @export
 * @class EthereumTransactionInfoCrawlService
 * @implements {Crawl<EthereumTransactionInfo[]>}
 */
@injectable({scope: BindingScope.TRANSIENT})
export class EthereumTransactionInfoSlowCrawlService
  implements CrawlService<EthereumTransactionInfo[]>
{
  constructor(
    @service()
    public dataTableParseService: DataTableParseService
  ) { }

  public async crawl(): Promise<EthereumTransactionInfo[]> {
    const pageSize = 100,
      ethereumTransactionInfos: EthereumTransactionInfo[] = [];
    let pageNumber = 1,
      html = await this.getHtml(pageNumber, pageSize);

    while (!this.dataTableParseService.excute(html).isEmpty()) {
      ethereumTransactionInfos.push(
        ...this.dataTableParseService.excute(html).parse()
      );
      ++pageNumber;
      html = await this.getHtml(pageNumber, pageSize);
    }

    return ethereumTransactionInfos;
  }

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
