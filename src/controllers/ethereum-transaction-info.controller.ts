/* eslint-disable @typescript-eslint/naming-convention */
import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, response} from '@loopback/rest';
import {EthereumTransactionInfo} from '../models';
import {EthereumTransactionInfoRepository} from '../repositories';

export class EthereumTransactionInfoController {
  constructor(
    @repository(EthereumTransactionInfoRepository)
    public ethereumTransactionInfoRepository: EthereumTransactionInfoRepository,
  ) {}

  @get('/api/txs/{address}')
  @response(200, {
    description: 'Array of EthereumTransactionInfo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EthereumTransactionInfo, {
            includeRelations: true,
          }),
        },
      },
    },
  })
  async findByAddress(
    @param.query.string('address', {
      example: '0xeb2a81e229b68c1c22b6683275c00945f9872d90',
    })
    address: string,
    @param.filter(EthereumTransactionInfo)
    filter?: Filter<EthereumTransactionInfo>,
  ): Promise<EthereumTransactionInfo[]> {
    filter = filter ?? {};
    filter.where = {
      ...filter.where,
      ...{
        address,
      },
    };
    return this.ethereumTransactionInfoRepository.find(filter);
  }
}
