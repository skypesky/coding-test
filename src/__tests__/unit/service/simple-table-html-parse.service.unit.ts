import {expect} from "@loopback/testlab";
import {readFileSync} from "fs";
import {SimpleTableHtmlParseService} from "../../../services/parse/simple-table-html-parse.service";

describe(`simple-table-html-parse.service.unit`, () => {
  let simpleTableHtmlParseService: SimpleTableHtmlParseService;
  let hasDataHtml: string;
  let notDataHtml: string;

  before(async () => {
    simpleTableHtmlParseService = new SimpleTableHtmlParseService();

    hasDataHtml = readFileSync(
      `${process.cwd()}/src/__tests__/fixtures/data/has-data.html`
    ).toString();
    notDataHtml = readFileSync(
      `${process.cwd()}/src/__tests__/fixtures/data/no-data.html`
    ).toString();
  });

  it(`#getEthereumTransactionInfos() should be work!`, () => {
    const datas = simpleTableHtmlParseService.excute(hasDataHtml).parse();

    expect(!!datas.length).eql(true);

    // tips: 以下测试基本涵盖了字段的所有的形态,更好的做法是我们还可以通过二维数组来完成测试
    expect(datas[0].address).eql(`0xeb2a81e229b68c1c22b6683275c00945f9872d90`);
    expect(datas[0].txnHash).eql(
      `0xcb3dea18451d79090898be81846cf798e0dd13e7f0132e900612c1984f34835a`
    );
    expect(datas[0].method).eql(`Multicall`);
    expect(datas[0].block).eql(14368506);
    expect(datas[0].createTime).eql(`2022-03-11 23:46:25`);
    expect(datas[0].from).eql(`0xeb2a81e229b68c1c22b6683275c00945f9872d90`);
    expect(datas[0].tradingDirection).eql(`OUT`);
    expect(datas[0].to).eql(`0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45`);
    expect(datas[0].value).eql(
      `0.201969670327634\n                        Ether`
    );
    expect(datas[0].txnFee).eql(0.00441367);

    expect(datas[2].from).eql(`0xf60c2ea62edbfe808163751dd0d8693dcb30019c`);
    expect(datas[2].to).eql(`0xeb2a81e229b68c1c22b6683275c00945f9872d90`);

    expect(datas[3].from).eql("0xeb2a81e229b68c1c22b6683275c00945f9872d90");
  });

  describe(`#isEmpty`, () => {
    it(`#isEmpty(Empty String) should be return true!`, () => {
      expect(simpleTableHtmlParseService.excute("").isEmpty()).eql(true);
    });

    // @tips: 注意此处可以也可使用异步来做
    it(`#isEmpty(No Data String) should be return true!`, async () => {
      expect(simpleTableHtmlParseService.excute("abc").isEmpty()).eql(true);
      expect(simpleTableHtmlParseService.excute(notDataHtml).isEmpty()).eql(
        true
      );
    });

    it(`#isEmpty(Has Data String) should be return true!`, () => {
      expect(simpleTableHtmlParseService.excute(hasDataHtml).isEmpty()).eql(
        false
      );
    });
  });

  describe(`#getTotalRows`, () => {
    it(`#getTotalRows(empty data) should be return 0`, () => {
      expect(simpleTableHtmlParseService.excute("").getTotalRows()).eql(0);
      expect(simpleTableHtmlParseService.excute("abc").getTotalRows()).eql(0);
    });

    it(`#getTotalRows(has data) should be return actual rows`, () => {
      expect(
        simpleTableHtmlParseService.excute(hasDataHtml).getTotalRows()
      ).eql(1441);
    });
  });
});
