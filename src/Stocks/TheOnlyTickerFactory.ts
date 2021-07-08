import { FixedSizeArray } from "fixed-size-array";
import { Ticker } from "./Ticker";
import { TickerFactory } from "./TickerFactory";

export class TheOnlyTickerFactory implements TickerFactory {
  ticker: FixedSizeArray<1, Ticker>;
  constructor(ticker: FixedSizeArray<1, Ticker>) {
    this.ticker = ticker;
  }
  HelloTickerFactoryIWouldLikeYouToConstructOneTickerPlease(): {
    0: any;
    length: 1;
  } & readonly Ticker[] {
    return this.ticker;
  }

  HelloTickerFactoryIWouldLikeYouToConstructFourtyTwoTickersPlease(): {
    0: any;
    length: 42;
  } & readonly Ticker[] {
    throw new Error("Method not implemented.");
  }
}
