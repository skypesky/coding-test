import {/* inject, */ BindingScope, injectable, service} from "@loopback/core";
import {EthereumTransactionInfoSlowCrawlService} from "./crawl/ethereum-transaction-info-slow-crawl.service";
import {EthereumTransactionInfoBaseService} from "./ethereum-transaction-info-base.service";

@injectable({scope: BindingScope.TRANSIENT})
export class EthereumTransactionInfoSlowService extends EthereumTransactionInfoBaseService {
  constructor(
    @service()
    private ethereumTransactionInfoSlowCrawlService: EthereumTransactionInfoSlowCrawlService
  ) {
    super(ethereumTransactionInfoSlowCrawlService);
  }
}
