import {Entity, model, property} from "@loopback/repository";

@model()
export class EthereumTransactionInfo extends Entity {
  @property({
    type: "string",
    id: true,
    generated: false,
    required: true,
    jsonSchema: {
      description:
        "形如: 0x3d59522f59401ce7d0b8c0a59adbac208b6921f3cc4a2aeb556ff5f2be2eedaa"
    }
  })
  txnHash: string;

  @property({
    type: "string",
    required: true,
    jsonSchema: {
      description: "形如: 0xeb2a81e229b68c1c22b6683275c00945f9872d90"
    }
  })
  address: string;

  @property({
    type: "string",
    required: true,
    jsonSchema: {
      description: "形如: Multicall"
    }
  })
  method: string;

  @property({
    type: "number",
    required: true,
    jsonSchema: {
      description: "形如: 14282502"
    }
  })
  block: number;

  @property({
    type: "string",
    required: true,
    jsonSchema: {
      description: "形如: 2022-02-26 15:26:02"
    }
  })
  createTime: string;

  @property({
    type: "string",
    required: true,
    jsonSchema: {
      description: "形如: 0xeb2a81e229b68c1c22b6683275c00945f9872d90"
    }
  })
  from: string;

  @property({
    type: "string",
    required: true,
    jsonSchema: {
      description: "交易的流向,取值范围为: [IN, OUT]"
    }
  })
  tradingDirection: string;

  @property({
    type: "string",
    required: true,
    jsonSchema: {
      description: "形如: 0xeb2a81e229b68c1c22b6683275c00945f9872d90"
    }
  })
  to: string;

  @property({
    type: "string",
    required: true,
    jsonSchema: {
      description: "形如: 0.315 Ether"
    }
  })
  value: string;

  @property({
    type: "number",
    required: true,
    jsonSchema: {
      description: "0.00643977"
    }
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
