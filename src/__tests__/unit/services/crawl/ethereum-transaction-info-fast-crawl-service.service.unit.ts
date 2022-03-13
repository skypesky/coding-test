/* eslint-disable @typescript-eslint/no-invalid-this */
import {
  createStubInstance,
  expect,
  StubbedInstanceWithSinonAccessor
} from "@loopback/testlab";
import {Axios} from "axios";
import {cloneDeep} from "lodash";
import sinon from "sinon";
import {CodingTestApplication} from "../../../../application";
import {EthereumTransactionInfo} from "../../../../models/ethereum-transaction-info.model";
import {EthereumTransactionInfoRepository} from "../../../../repositories";
import {EthereumTransactionInfoFastCrawlServiceService} from "../../../../services/crawl/ethereum-transaction-info-fast-crawl-service.service";
import {SimpleTableHtmlParseService} from "../../../../services/parse/simple-table-html-parse.service";
import {setupApplication} from "../../../acceptance/test-helper";

describe(`ethereum-transaction-info-fast-crawl-service.service.unit`, () => {
  let simpleTableHtmlParseService: StubbedInstanceWithSinonAccessor<SimpleTableHtmlParseService>;
  let axiosStub: StubbedInstanceWithSinonAccessor<Axios>;

  let app: CodingTestApplication;
  let ethereumTransactionInfoRepository: EthereumTransactionInfoRepository;

  before(async () => {
    ({app} = await setupApplication());
    ethereumTransactionInfoRepository = await app.getRepository(
      EthereumTransactionInfoRepository
    );
  });

  beforeEach(async () => {
    simpleTableHtmlParseService = createStubInstance(
      SimpleTableHtmlParseService
    );
    axiosStub = createStubInstance(Axios);
    await ethereumTransactionInfoRepository.deleteAll();
  });

  describe(`#crawl`, () => {
    it(`#crawl() should be work!`, async function () {
      this.timeout(30000);

      const service = new EthereumTransactionInfoFastCrawlServiceService(
        simpleTableHtmlParseService,
        axiosStub
      );

      axiosStub.stubs.get.resolves({
        data: "abc"
      });

      // 构造数据
      const mockValue = [
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

      simpleTableHtmlParseService.stubs.excute.returnsThis();
      simpleTableHtmlParseService.stubs.getTotalRows.returns(900);
      simpleTableHtmlParseService.stubs.parse.resolves([cloneDeep(mockValue)]);

      const results = await service.crawl("abc");

      expect(results.length).eql(9);

      sinon.assert.callCount(axiosStub.stubs.get, 10);
    });
  });
});
