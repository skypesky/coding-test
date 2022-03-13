/* eslint-disable @typescript-eslint/no-invalid-this */
import {Client, expect} from "@loopback/testlab";
import {CodingTestApplication} from "../../application";
import {EthereumTransactionInfo} from "../../models/ethereum-transaction-info.model";
import {EthereumTransactionInfoRepository} from "../../repositories/ethereum-transaction-info.repository";
import {setupApplication} from "./test-helper";

// 冒烟测试
describe(`ethereum-transaction-info.accpetance`, () => {
  let app: CodingTestApplication;
  let client: Client;
  let ethereumTransactionInfoRepository: EthereumTransactionInfoRepository;

  before(async () => {
    ({app, client} = await setupApplication());
    ethereumTransactionInfoRepository = await app.getRepository(
      EthereumTransactionInfoRepository
    );
  });

  beforeEach(async () => {
    await ethereumTransactionInfoRepository.deleteAll();
  });

  describe(`#slowFindByAddress => /api/txs/{address}`, () => {
    it(`#slowFindByAddress(has data address) find success by cache`, async function () {
      this.timeout(30000);
      const expected = <EthereumTransactionInfo[]>[
        new EthereumTransactionInfo({
          "txnHash":
            "0x00b7ab5c6ff7ea29166029be256c06c1357f314bcab622532bdc09f78041cc2d",
          "address": "0xeb2a81e229b68c1c22b6683275c00945f9872d90",
          "method": "0x414bf389",
          "block": 12825815,
          "createTime": "2021-07-14 15:03:54",
          "from": "0xeb2a81e229b68c1c22b6683275c00945f9872d90",
          "tradingDirection": "OUT",
          "to": "0xe592427a0aece92de3edee1f18e0157c05861564",
          "value": "0.1 Ether",
          "txnFee": 0.00564969
        })
      ];
      await ethereumTransactionInfoRepository.createAll(expected);

      const response = await client
        .get("/api/txs/0xeb2a81e229b68c1c22b6683275c00945f9872d90")
        .expect(200);
      expect(response.body).to.containDeep(expected);
    });
  });

  describe(`#fastFindByAddress => /api/txs/fast/{address}`, () => {
    it(`#fastFindByAddress(has data address) find success by cache`, async function () {
      this.timeout(30000);
      const expected = <EthereumTransactionInfo[]>[
        new EthereumTransactionInfo({
          "txnHash":
            "0x00b7ab5c6ff7ea29166029be256c06c1357f314bcab622532bdc09f78041cc2d",
          "address": "0xeb2a81e229b68c1c22b6683275c00945f9872d90",
          "method": "0x414bf389",
          "block": 12825815,
          "createTime": "2021-07-14 15:03:54",
          "from": "0xeb2a81e229b68c1c22b6683275c00945f9872d90",
          "tradingDirection": "OUT",
          "to": "0xe592427a0aece92de3edee1f18e0157c05861564",
          "value": "0.1 Ether",
          "txnFee": 0.00564969
        })
      ];
      await ethereumTransactionInfoRepository.createAll(expected);

      const response = await client
        .get("/api/txs/fast/0xeb2a81e229b68c1c22b6683275c00945f9872d90")
        .expect(200);
      expect(response.body).to.containDeep(expected);
    });
  });

  describe(`#cleanCache`, () => {
    it(`#cleanCache find ethereumTransactionInfos `, async function () {
      this.timeout(30000);

      await ethereumTransactionInfoRepository.createAll([
        new EthereumTransactionInfo({
          "txnHash":
            "0x00b7ab5c6ff7ea29166029be256c06c1357f314bcab622532bdc09f78041cc2d",
          "address": "0xeb2a81e229b68c1c22b6683275c00945f9872d90",
          "method": "0x414bf389",
          "block": 12825815,
          "createTime": "2021-07-14 15:03:54",
          "from": "0xeb2a81e229b68c1c22b6683275c00945f9872d90",
          "tradingDirection": "OUT",
          "to": "0xe592427a0aece92de3edee1f18e0157c05861564",
          "value": "0.1 Ether",
          "txnFee": 0.00564969
        })
      ]);

      const response = await client.delete("/api/txs/cleanCache").expect(200);

      expect(response.body).to.containDeep({
        count: 1
      });
    });
  });
});
