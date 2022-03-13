import {/* inject, */ BindingScope, injectable, service} from "@loopback/core";
import {Filter, repository} from "@loopback/repository";
import {isEmpty} from "lodash";
import {EthereumTransactionInfo} from "../models";
import {EthereumTransactionInfoRepository} from "../repositories";
import {EthereumTransactionInfoFastCrawlServiceService} from "./ethereum-transaction-info-fast-crawl-service.service";
import {EthereumTransactionInfoSlowCrawlService} from "./ethereum-transaction-info-slow-crawl.service";

@injectable({scope: BindingScope.TRANSIENT})
export class EthereumTransactionInfoService {
  constructor(
    @repository(EthereumTransactionInfoRepository)
    public ethereumTransactionInfoRepository: EthereumTransactionInfoRepository,
    @service()
    private ethereumTransactionInfoSlowCrawlService: EthereumTransactionInfoSlowCrawlService,
    @service()
    private ethereumTransactionInfoFastCrawlServiceService: EthereumTransactionInfoFastCrawlServiceService
  ) {}

  public async findByAddress(
    filter?: Filter<EthereumTransactionInfo>
  ): Promise<EthereumTransactionInfo[]> {
    const cacheValue: EthereumTransactionInfo[] =
      await this.ethereumTransactionInfoRepository.find(filter);

    if (!isEmpty(cacheValue)) {
      console.warn("wow! by cache");
      return cacheValue;
    }
    // 选做: 缓存失效了怎么办?
    const ethereumTransactionInfos =
      await this.ethereumTransactionInfoSlowCrawlService.crawl();

    await this.ethereumTransactionInfoRepository.createAll(
      ethereumTransactionInfos
    );

    return this.ethereumTransactionInfoRepository.find(filter);
  }

  public async fastFindByAddress(
    filter?: Filter<EthereumTransactionInfo>
  ): Promise<EthereumTransactionInfo[]> {
    const cacheValue: EthereumTransactionInfo[] =
      await this.ethereumTransactionInfoRepository.find(filter);

    if (!isEmpty(cacheValue)) {
      console.warn("wow! by cache");
      return cacheValue;
    }

    const ethereumTransactionInfos =
      await this.ethereumTransactionInfoFastCrawlServiceService.crawl();

    await this.ethereumTransactionInfoRepository.createAll(
      ethereumTransactionInfos
    );

    return this.ethereumTransactionInfoRepository.find(filter);
  }
}
