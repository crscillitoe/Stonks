import { FixedSizeArray } from "fixed-size-array";
import { Ticker } from "./Ticker";

export class TheOnlyTicker implements Ticker {
  ticker: FixedSizeArray<1, string>;
  constructor(ticker: FixedSizeArray<1, string>) {
    this.ticker = ticker;
  }
  ThankYouOne(): { 0: any; length: 1 } & readonly string[] {
    return this.ticker;
  }

  ThankYouTwo(): { 0: any; length: 2 } & readonly string[] {
    throw new Error("Method not implemented.");
  }
}
