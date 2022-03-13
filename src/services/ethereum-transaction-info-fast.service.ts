import {/* inject, */ BindingScope, injectable, service} from "@loopback/core";
import {repository} from "@loopback/repository";
import {EthereumTransactionInfoRepository} from "../repositories/ethereum-transaction-info.repository";
import {EthereumTransactionInfoFastCrawlServiceService} from "./crawl/ethereum-transaction-info-fast-crawl-service.service";
import {EthereumTransactionInfoBaseService} from "./ethereum-transaction-info-base.service";

@injectable({scope: BindingScope.TRANSIENT})
export class EthereumTransactionInfoFastService extends EthereumTransactionInfoBaseService {
  constructor(
    @service()
    private ethereumTransactionInfoFastCrawlServiceService: EthereumTransactionInfoFastCrawlServiceService,
    @repository(EthereumTransactionInfoRepository)
    public ethereumTransactionInfoRepository: EthereumTransactionInfoRepository
  ) {
    super(
      ethereumTransactionInfoFastCrawlServiceService,
      ethereumTransactionInfoRepository
    );
  }
}
