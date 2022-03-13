import { /* inject, */ BindingScope, injectable, service} from "@loopback/core";
import {EthereumTransactionInfoBaseService} from './ethereum-transaction-info-base.service';
import {EthereumTransactionInfoSlowCrawlService} from "./ethereum-transaction-info-slow-crawl.service";

@injectable({scope: BindingScope.TRANSIENT})
export class EthereumTransactionInfoSlowService extends EthereumTransactionInfoBaseService {
  constructor(
    // @repository(EthereumTransactionInfoRepository)
    // public ethereumTransactionInfoRepository: EthereumTransactionInfoRepository,
    @service()
    private ethereumTransactionInfoSlowCrawlService: EthereumTransactionInfoSlowCrawlService,
    // @service()
    // private ethereumTransactionInfoFastCrawlServiceService: EthereumTransactionInfoFastCrawlServiceService
  ) {
    super(ethereumTransactionInfoSlowCrawlService);
  }

  // public async findByAddress(
  //   filter?: Filter<EthereumTransactionInfo>
  // ): Promise<EthereumTransactionInfo[]> {
  //   const cacheValue: EthereumTransactionInfo[] =
  //     await this.ethereumTransactionInfoRepository.find(filter);

  //   if (!isEmpty(cacheValue)) {
  //     console.warn("wow! by cache");
  //     return cacheValue;
  //   }
  //   // 选做: 缓存失效了怎么办?
  //   const ethereumTransactionInfos =
  //     await this.ethereumTransactionInfoSlowCrawlService.crawl();

  //   await this.ethereumTransactionInfoRepository.createAll(
  //     ethereumTransactionInfos
  //   );

  //   return this.ethereumTransactionInfoRepository.find(filter);
  // }

  // public async fastFindByAddress(
  //   filter?: Filter<EthereumTransactionInfo>
  // ): Promise<EthereumTransactionInfo[]> {
  //   const cacheValue: EthereumTransactionInfo[] =
  //     await this.ethereumTransactionInfoRepository.find(filter);

  //   if (!isEmpty(cacheValue)) {
  //     console.warn("wow! by cache");
  //     return cacheValue;
  //   }

  //   const ethereumTransactionInfos =
  //     await this.ethereumTransactionInfoFastCrawlServiceService.crawl();

  //   await this.ethereumTransactionInfoRepository.createAll(
  //     ethereumTransactionInfos
  //   );

  //   return this.ethereumTransactionInfoRepository.find(filter);
  // }
}
