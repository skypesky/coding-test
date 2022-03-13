import {BindingScope, inject, injectable, service} from "@loopback/core";
import {Axios} from "axios";
import {AxiosResponse} from "axios-https-proxy-fix";
import {CrawlService} from "../../interfaces/crawl-service.interface";
import {EthereumTransactionInfo} from "../../models";
import {AxiosProvider} from "../../providers/axios.service";
import {SimpleTableHtmlParseService} from "../parse/simple-table-html-parse.service";

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
    public simpleTableHtmlParseService: SimpleTableHtmlParseService,
    @inject(AxiosProvider.KEY)
    public axiosInstance: Axios
  ) {}

  public async crawl(address: string): Promise<EthereumTransactionInfo[]> {
    const pageSize = 100,
      ethereumTransactionInfos: EthereumTransactionInfo[] = [];
    let pageNumber = 1,
      html = await this.getHtml(pageNumber, pageSize, address);

    while (!this.simpleTableHtmlParseService.excute(html).isEmpty()) {
      ethereumTransactionInfos.push(
        ...this.simpleTableHtmlParseService.excute(html).parse()
      );
      ++pageNumber;
      html = await this.getHtml(pageNumber, pageSize, address);
    }

    return ethereumTransactionInfos;
  }

  public async getHtml(
    pageNumber: number,
    pageSize: number,
    address: string
  ): Promise<string> {
    return this.axiosInstance
      .get<string, AxiosResponse<string>>(
        `https://etherscan.io/txs?a=${address}&ps=${pageSize}&p=${pageNumber}`,
        {
          responseType: "document"
        }
      )
      .then(response => response.data);
  }
}
