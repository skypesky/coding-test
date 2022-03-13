/* eslint-disable @typescript-eslint/no-invalid-this */
import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor
} from "@loopback/testlab";
import {EthereumTransactionInfoController} from "../../../controllers/ethereum-transaction-info.controller";
import {EthereumTransactionInfoRepository} from "../../../repositories/ethereum-transaction-info.repository";
import {EthereumTransactionInfoFastService} from "../../../services/ethereum-transaction-info-fast.service";
import {EthereumTransactionInfoSlowService} from "../../../services/ethereum-transaction-info-slow.service";

describe(`ethereum-transaction-info.controller.unit`, () => {
  let ethereumTransactionInfoSlowService: StubbedInstanceWithSinonAccessor<EthereumTransactionInfoSlowService>;

  let ethereumTransactionInfoFastService: StubbedInstanceWithSinonAccessor<EthereumTransactionInfoFastService>;

  let ethereumTransactionInfoRepository: StubbedInstanceWithSinonAccessor<EthereumTransactionInfoRepository>;

  beforeEach(() => {
    ethereumTransactionInfoSlowService = createStubInstance(
      EthereumTransactionInfoSlowService
    );

    ethereumTransactionInfoFastService = createStubInstance(
      EthereumTransactionInfoFastService
    );

    ethereumTransactionInfoRepository = createStubInstance(
      EthereumTransactionInfoRepository
    );
  });

  describe(`#slowFindByAddress`, () => {
    it(`#slowFindByAddress find ethereumTransactionInfos `, async function () {
      this.timeout(30000);

      const controller = new EthereumTransactionInfoController(
        ethereumTransactionInfoSlowService,
        ethereumTransactionInfoFastService,
        ethereumTransactionInfoRepository
      );

      ethereumTransactionInfoSlowService.stubs.findByAddress.resolves([]);

      const results = await controller.slowFindByAddress(
        "0xeb2a81e229b68c1c22b6683275c00945f9872d90",
        {}
      );

      expect(results.length).equal(0);

      sinon.assert.calledWithMatch(
        ethereumTransactionInfoSlowService.stubs.findByAddress,
        {
          where: {
            address: "0xeb2a81e229b68c1c22b6683275c00945f9872d90"
          }
        }
      );
    });
  });

  describe(`#fastFindByAddress`, () => {
    it(`#fastFindByAddress find ethereumTransactionInfos `, async function () {
      this.timeout(30000);

      const controller = new EthereumTransactionInfoController(
        ethereumTransactionInfoSlowService,
        ethereumTransactionInfoFastService,
        ethereumTransactionInfoRepository
      );

      ethereumTransactionInfoFastService.stubs.findByAddress.resolves([]);

      const results = await controller.fastFindByAddress(
        "0xeb2a81e229b68c1c22b6683275c00945f9872d90",
        {}
      );

      expect(results.length).equal(0);

      sinon.assert.calledWithMatch(
        ethereumTransactionInfoFastService.stubs.findByAddress,
        {
          where: {
            address: "0xeb2a81e229b68c1c22b6683275c00945f9872d90"
          }
        }
      );
    });
  });

  describe(`#cleanCache`, () => {
    it(`#cleanCache find ethereumTransactionInfos `, async function () {
      this.timeout(30000);

      const controller = new EthereumTransactionInfoController(
        ethereumTransactionInfoSlowService,
        ethereumTransactionInfoFastService,
        ethereumTransactionInfoRepository
      );

      ethereumTransactionInfoRepository.stubs.deleteAll.resolves({count: 0});

      const results = await controller.cleanCache();

      expect(results).containEql({
        count: 0
      });

      sinon.assert.calledOnce(
        ethereumTransactionInfoRepository.stubs.deleteAll
      );
    });
  });
});
