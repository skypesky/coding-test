import {
  createStubInstance,
  expect,
  StubbedInstanceWithSinonAccessor
} from "@loopback/testlab";
import {cloneDeep} from "lodash";
import sinon from "sinon";
import {CodingTestApplication} from "../../../application";
import {EthereumTransactionInfo} from "../../../models/ethereum-transaction-info.model";
import {EthereumTransactionInfoRepository} from "../../../repositories/ethereum-transaction-info.repository";
import {
  EthereumTransactionInfoFastCrawlServiceService,
  EthereumTransactionInfoFastService
} from "../../../services";
import {setupApplication} from "../../acceptance/test-helper";

describe(`ethereum-transaction-info-fast.service.unit`, () => {
  let ethereumTransactionInfoFastCrawlServiceService: StubbedInstanceWithSinonAccessor<EthereumTransactionInfoFastCrawlServiceService>;
  let app: CodingTestApplication;
  let ethereumTransactionInfoRepository: EthereumTransactionInfoRepository;

  before(async () => {
    ({app} = await setupApplication());
    app.repository(EthereumTransactionInfoRepository);
    ethereumTransactionInfoRepository = await app.getRepository(
      EthereumTransactionInfoRepository
    );
  });

  beforeEach(async () => {
    ethereumTransactionInfoFastCrawlServiceService = createStubInstance(
      EthereumTransactionInfoFastCrawlServiceService
    );
    await ethereumTransactionInfoRepository.deleteAll();
  });

  describe(`#findByAddress`, () => {
    it(`#findByAddress(without cache) should be work!`, async function () {
      const ethereumTransactionInfoFastService =
        new EthereumTransactionInfoFastService(
          ethereumTransactionInfoFastCrawlServiceService,
          ethereumTransactionInfoRepository
        );

      const expectValue = [
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

      ethereumTransactionInfoFastCrawlServiceService.stubs.crawl.resolves(
        cloneDeep(expectValue)
      );

      const results = await ethereumTransactionInfoFastService.findByAddress({
        where: {
          address: `0xeb2a81e229b68c1c22b6683275c00945f9872d90`
        }
      });

      expect(results).containDeep(results);

      sinon.assert.calledWith(
        ethereumTransactionInfoFastCrawlServiceService.stubs.crawl,
        "0xeb2a81e229b68c1c22b6683275c00945f9872d90"
      );
    });

    it(`#findByAddress(has cache) should be work!`, async function () {
      const ethereumTransactionInfoFastService =
        new EthereumTransactionInfoFastService(
          ethereumTransactionInfoFastCrawlServiceService,
          ethereumTransactionInfoRepository
        );

      const cacheValue = [
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

      await ethereumTransactionInfoRepository.createAll(cacheValue);

      // 假装返回空数组
      ethereumTransactionInfoFastCrawlServiceService.stubs.crawl.resolves([]);

      const results = await ethereumTransactionInfoFastService.findByAddress({
        where: {
          address: `0xeb2a81e229b68c1c22b6683275c00945f9872d90`
        }
      });

      expect(results).containDeep(results);

      // 正常来说走了缓存的话,你应该不会调用到我
      sinon.assert.notCalled(
        ethereumTransactionInfoFastCrawlServiceService.stubs.crawl
      );
    });
  });
});
