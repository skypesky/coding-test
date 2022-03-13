/* eslint-disable @typescript-eslint/naming-convention */
import {service} from "@loopback/core";
import {Count, Filter, repository} from "@loopback/repository";
import {get, getModelSchemaRef, param, post, response} from "@loopback/rest";
import {EthereumTransactionInfo} from "../models";
import {EthereumTransactionInfoRepository} from "../repositories";
import {EthereumTransactionInfoService} from "../services/ethereum-transaction-info.service";

export class EthereumTransactionInfoController {
  constructor(
    @service()
    public ethereumTransactionInfoService: EthereumTransactionInfoService,
    @repository(EthereumTransactionInfoRepository)
    public ethereumTransactionInfoRepository: EthereumTransactionInfoRepository
  ) {}

  @get("/api/txs/{address}")
  @response(200, {
    description: "Array of EthereumTransactionInfo model instances",
    content: {
      "application/json": {
        schema: {
          type: "array",
          items: getModelSchemaRef(EthereumTransactionInfo, {
            includeRelations: true
          })
        }
      }
    }
  })
  async findByAddress(
    @param.path.string("address", {
      example: "0xeb2a81e229b68c1c22b6683275c00945f9872d90"
    })
    address: string,
    @param.query.object(
      "filter",
      {},
      {
        description: `<p><a href="https://loopback.io/doc/en/lb4/Where-filter" target="_blank">更多搜索用法请参考</a></p>`,
        examples: {
          "使用方法-查询所有": {
            value: {}
          },
          "使用方法-按条件搜索": {
            value: {
              "where": {
                "txnHash":
                  "0xe2477075c6c56215e50be1b994010f19fd8d0181a8390b3bb1a4401d19da4484"
              }
            }
          },
          "使用方法-返回指定字段": {
            value: {
              "where": {
                "txnHash":
                  "0xe2477075c6c56215e50be1b994010f19fd8d0181a8390b3bb1a4401d19da4484"
              },
              "fields": {
                "txnHash": true,
                "address": true,
                "method": true
              }
            }
          },
          "使用方法-分页搜索+排序": {
            value: {
              "offset": 0,
              "limit": 100,
              "order": "createTime desc"
            }
          }
        }
      }
    )
    filter?: Filter<EthereumTransactionInfo>
  ): Promise<EthereumTransactionInfo[]> {
    filter = filter ?? {};
    filter.where = {
      ...filter.where,
      ...{
        address
      }
    };
    return this.ethereumTransactionInfoService.findByAddress(filter);
  }

  @get("/api/txs/fast/{address}")
  @response(200, {
    description: "Array of EthereumTransactionInfo model instances",
    content: {
      "application/json": {
        schema: {
          type: "array",
          items: getModelSchemaRef(EthereumTransactionInfo, {
            includeRelations: true
          })
        }
      }
    }
  })
  async fastFindByAddress(
    @param.path.string("address", {
      example: "0xeb2a81e229b68c1c22b6683275c00945f9872d90"
    })
    address: string,
    @param.query.object(
      "filter",
      {},
      {
        description: `<p><a href="https://loopback.io/doc/en/lb4/Where-filter" target="_blank">更多搜索用法请参考</a></p>`,
        examples: {
          "使用方法-查询所有": {
            value: {}
          },
          "使用方法-按条件搜索": {
            value: {
              "where": {
                "txnHash":
                  "0xe2477075c6c56215e50be1b994010f19fd8d0181a8390b3bb1a4401d19da4484"
              }
            }
          },
          "使用方法-返回指定字段": {
            value: {
              "where": {
                "txnHash":
                  "0xe2477075c6c56215e50be1b994010f19fd8d0181a8390b3bb1a4401d19da4484"
              },
              "fields": {
                "txnHash": true,
                "address": true,
                "method": true
              }
            }
          },
          "使用方法-分页搜索+排序": {
            value: {
              "offset": 0,
              "limit": 100,
              "order": "createTime desc"
            }
          }
        }
      }
    )
    filter?: Filter<EthereumTransactionInfo>
  ): Promise<EthereumTransactionInfo[]> {
    filter = filter ?? {};
    filter.where = {
      ...filter.where,
      ...{
        address
      }
    };
    return this.ethereumTransactionInfoService.fastFindByAddress(filter);
  }

  @post("/api/txs/cleanCache")
  public async cleanCache(): Promise<Count> {
    return this.ethereumTransactionInfoRepository.deleteAll();
  }
}
