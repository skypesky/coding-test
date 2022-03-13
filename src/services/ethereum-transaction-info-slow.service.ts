import {/* inject, */ BindingScope, injectable, service} from "@loopback/core";
import {repository} from "@loopback/repository";
import {EthereumTransactionInfoRepository} from "../repositories/ethereum-transaction-info.repository";
import {EthereumTransactionInfoSlowCrawlService} from "./crawl/ethereum-transaction-info-slow-crawl.service";
import {EthereumTransactionInfoBaseService} from "./ethereum-transaction-info-base.service";

@injectable({scope: BindingScope.TRANSIENT})
export class EthereumTransactionInfoSlowService extends EthereumTransactionInfoBaseService {
  constructor(
    @service()
    private ethereumTransactionInfoSlowCrawlService: EthereumTransactionInfoSlowCrawlService,
    @repository(EthereumTransactionInfoRepository)
    public ethereumTransactionInfoRepository: EthereumTransactionInfoRepository
  ) {
    super(
      ethereumTransactionInfoSlowCrawlService,
      ethereumTransactionInfoRepository
    );
  }
}
