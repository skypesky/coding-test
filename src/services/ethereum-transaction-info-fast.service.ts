import { /* inject, */ BindingScope, injectable, service} from '@loopback/core';
import {EthereumTransactionInfoBaseService} from './ethereum-transaction-info-base.service';
import {EthereumTransactionInfoFastCrawlServiceService} from './ethereum-transaction-info-fast-crawl-service.service';

@injectable({scope: BindingScope.TRANSIENT})
export class EthereumTransactionInfoFastService extends EthereumTransactionInfoBaseService {
  constructor(
    @service()
    private ethereumTransactionInfoFastCrawlServiceService: EthereumTransactionInfoFastCrawlServiceService
  ) {
    super(ethereumTransactionInfoFastCrawlServiceService);
  }


}
