import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Filter, repository} from '@loopback/repository';
import {isEmpty} from 'lodash';
import {CrawlService} from '../interfaces/crawl-service.interface';
import {EthereumTransactionInfo} from '../models';
import {EthereumTransactionInfoRepository} from '../repositories/ethereum-transaction-info.repository';

@injectable({scope: BindingScope.TRANSIENT})
export class EthereumTransactionInfoBaseService {

  @repository(EthereumTransactionInfoRepository)
  public ethereumTransactionInfoRepository: EthereumTransactionInfoRepository

  constructor(
    public crawlService: CrawlService,
  ) { }

  public async findByAddress(
    filter?: Filter<EthereumTransactionInfo>
  ): Promise<EthereumTransactionInfo[]> {
    const cacheValue: EthereumTransactionInfo[] =
      await this.ethereumTransactionInfoRepository.find(filter);

    if (!isEmpty(cacheValue)) {
      console.info("wow! by cache");
      return cacheValue;
    }

    // 选做: 缓存失效了怎么办?很简单,我们可以通过比对记录总数,就能知道是否需要更新缓存,详细可以再找我讨论
    const ethereumTransactionInfos =
      await this.crawlService.crawl();

    await this.ethereumTransactionInfoRepository.createAll(
      ethereumTransactionInfos
    );

    return this.ethereumTransactionInfoRepository.find(filter);
  }

}
