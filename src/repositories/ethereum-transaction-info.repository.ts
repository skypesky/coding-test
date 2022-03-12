import {BindingScope, inject, injectable} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {EthereumTransactionInfoDataSource} from '../datasources';
import {
  EthereumTransactionInfo,
  EthereumTransactionInfoRelations,
} from '../models';

/**
 *
 * @description 注意,这一层缓存应该是单例的
 * @export
 * @class EthereumTransactionInfoRepository
 * @extends {DefaultCrudRepository<EthereumTransactionInfo, typeof EthereumTransactionInfo.prototype.txnHash, EthereumTransactionInfoRelations>}
 */
@injectable({
  scope: BindingScope.SINGLETON,
})
export class EthereumTransactionInfoRepository extends DefaultCrudRepository<
  EthereumTransactionInfo,
  typeof EthereumTransactionInfo.prototype.txnHash,
  EthereumTransactionInfoRelations
> {
  constructor(
    @inject('datasources.EthereumTransactionInfo')
    dataSource: EthereumTransactionInfoDataSource,
  ) {
    super(EthereumTransactionInfo, dataSource);
  }
}
