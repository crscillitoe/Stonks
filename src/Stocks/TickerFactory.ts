import { FixedSizeArray } from "fixed-size-array";
import { Ticker } from "./Ticker";

export interface TickerFactory {
  HelloTickerFactoryIWouldLikeYouToConstructOneTickerPlease(): FixedSizeArray<
    1,
    Ticker
  >;

  HelloTickerFactoryIWouldLikeYouToConstructFourtyTwoTickersPlease(): FixedSizeArray<
    42,
    Ticker
  >;
}
