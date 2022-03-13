import {/* inject, */ BindingScope, injectable} from "@loopback/core";
import {CheerioAPI, Element, load} from "cheerio";
import {isEmpty} from "lodash";
import {Parse} from "../interfaces/parse.interface";
import {EthereumTransactionInfo} from "../models/ethereum-transaction-info.model";

@injectable({scope: BindingScope.TRANSIENT})
export class DataTableParseService
  implements Parse<string, EthereumTransactionInfo[]>
{
  private $: CheerioAPI;

  constructor() {}

  public excute(html: string): this {
    this.$ = load(html);
    return this;
  }

  public parse(): EthereumTransactionInfo[] {
    if (this.isEmpty()) {
      return [];
    }

    const $ = this.$,
      selector = `#paywall_mask > table > tbody > tr`,
      ethereumTransactionInfos: EthereumTransactionInfo[] = [];

    $(selector).each((index: number, element: Element) => {
      ethereumTransactionInfos.push(
        new EthereumTransactionInfo({
          address: this.getAddress(),
          txnHash: this.getTxnHash(element),
          method: this.getMethod(element),
          block: this.getBlock(element),
          createTime: this.getCreateTime(element),
          from: this.getFrom(element),
          tradingDirection: this.getTradingDirection(element),
          to: this.getTo(element),
          value: this.getValue(element),
          txnFee: this.getTxnFee(element)
        })
      );
    });

    return ethereumTransactionInfos;
  }

  public isEmpty(): boolean {
    if (isEmpty(this.$.html())) {
      return true;
    }

    const $ = this.$;

    const hasEmptyDataMessage: boolean = $(
        `#paywall_mask > table > tbody > tr:nth-child(1) > td > div`
      )
        .text()
        .includes(`There are no matching entries`),
      pageSize: number = +$(
        `#ContentPlaceHolder1_ddlRecordsPerPage > option[selected="selected"]`
      ).text();

    return hasEmptyDataMessage || !pageSize;
  }

  public getTotalRows(): number {
    return +(
      this.$(`#ContentPlaceHolder1_topPageDiv > p > span`)
        .text()
        ?.replace(/\,/g, "")
        ?.match(/\d+/)?.[0] ?? 0
    );
  }

  private getAddress(): string {
    return this.$(`#ContentPlaceHolder1_divPageTitle > a > span`).text();
  }

  private getTxnHash(element: Element): string {
    return this.$(element).find(`td:nth-child(2)`).text().trim();
  }

  private getMethod(element: Element): string {
    return this.$(element).find(`td:nth-child(3)`).text().trim();
  }

  private getBlock(element: Element): number {
    return +this.$(element).find(`td:nth-child(4)`).text().trim();
  }

  private getCreateTime(element: Element): string {
    return this.$(element).find(`td:nth-child(5) > span`).text();
  }

  private getFrom(element: Element): string {
    const valueFromADataOriginalTitle: string =
        this.$(element)
          .find(`td:nth-child(7) a`)
          .attr("data-original-title")
          ?.trim()
          ?.match(UID_MATCH_REGEX)?.[0] ?? "",
      valueFromSpan: string = this.$(element)
        .find(`td:nth-child(7) > span`)
        .text()
        .trim(),
      valueFromATitle: string =
        this.$(element)
          .find(`td:nth-child(7) a`)
          .attr("title")
          ?.trim()
          ?.match(UID_MATCH_REGEX)?.[0] ?? "";

    return valueFromADataOriginalTitle || valueFromSpan || valueFromATitle;
  }

  private getTradingDirection(element: Element): string {
    return this.$(element).find(`td:nth-child(8) > span`).text().trim();
  }

  private getTo(element: Element): string {
    const valueFromADataOriginalTitle: string =
        this.$(element)
          .find(`td:nth-child(9) a`)
          .attr("data-original-title")
          ?.trim()
          ?.match(UID_MATCH_REGEX)?.[0] ?? "",
      valueFromSpan: string = this.$(element)
        .find(`td:nth-child(9) span`)
        .text()
        .trim(),
      valueFromATitle: string =
        this.$(element)
          .find(`td:nth-child(9) a`)
          .attr("title")
          ?.trim()
          ?.match(UID_MATCH_REGEX)?.[0] ?? "";

    return valueFromADataOriginalTitle || valueFromSpan || valueFromATitle;
  }

  private getValue(element: Element): string {
    return this.$(element).find(`td:nth-child(10)`).text().trim();
  }

  private getTxnFee(element: Element): number {
    return +this.$(element).find(`td:nth-child(11)`).text().trim();
  }
}

const UID_MATCH_REGEX = /0x[^\)]*/;
