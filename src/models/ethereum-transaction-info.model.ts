import {Entity, model, property} from '@loopback/repository';

@model()
export class EthereumTransactionInfo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  txnHash: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  method: string;

  @property({
    type: 'number',
    required: true,
  })
  block: number;

  @property({
    type: 'string',
    required: true,
  })
  createTime: string;

  @property({
    type: 'string',
    required: true,
  })
  from: string;

  @property({
    type: 'string',
    required: true,
  })
  to: string;

  @property({
    type: 'string',
    required: true,
  })
  value: string;

  @property({
    type: 'number',
    required: true,
  })
  txnFee: number;

  constructor(data?: Partial<EthereumTransactionInfo>) {
    super(data);
  }
}

export interface EthereumTransactionInfoRelations {
  // describe navigational properties here
}

export type EthereumTransactionInfoWithRelations = EthereumTransactionInfo &
  EthereumTransactionInfoRelations;
