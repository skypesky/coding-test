import {/* inject, */ BindingScope, injectable, service} from "@loopback/core";
import {EthereumTransactionInfoBaseService} from "./ethereum-transaction-info-base.service";
import {EthereumTransactionInfoSlowCrawlService} from "./ethereum-transaction-info-slow-crawl.service";

@injectable({scope: BindingScope.TRANSIENT})
export class EthereumTransactionInfoSlowService extends EthereumTransactionInfoBaseService {
  constructor(
    @service()
    private ethereumTransactionInfoSlowCrawlService: EthereumTransactionInfoSlowCrawlService
  ) {
    super(ethereumTransactionInfoSlowCrawlService);
  }
}
