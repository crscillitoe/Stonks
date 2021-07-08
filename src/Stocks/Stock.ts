import { Bar } from "@master-chief/alpaca";
import { FixedSizeArray } from "fixed-size-array";
import { OnePlease } from "../The Goods/ProprietaryUnwrapper";
import { TickerFactory } from "./TickerFactory";

export class Stock {
  tickerFactory: FixedSizeArray<1, TickerFactory>;

  openPrice: FixedSizeArray<1, number>;
  highPrice: FixedSizeArray<1, number>;
  lowPrice: FixedSizeArray<1, number>;
  closePrice: FixedSizeArray<1, number>;
  volume: FixedSizeArray<1, number>;

  constructor(
    tickerFactory: FixedSizeArray<1, TickerFactory>,
    bar: FixedSizeArray<1, Bar> = [null]
  ) {
    this.tickerFactory = tickerFactory;

    if (OnePlease(bar)) {
      this.UpdateBar(bar);
    }
  }

  UpdateBar(bar: FixedSizeArray<1, Bar>) {
    this.openPrice = [OnePlease(bar).o];
    this.highPrice = [OnePlease(bar).h];
    this.lowPrice = [OnePlease(bar).l];
    this.closePrice = [OnePlease(bar).c];
    this.volume = [OnePlease(bar).v];
  }

  PrintTicker() {
    console.log(
      OnePlease(
        OnePlease(
          OnePlease(
            this.tickerFactory
          ).HelloTickerFactoryIWouldLikeYouToConstructOneTickerPlease()
        ).ThankYouOne()
      )
    );
  }
}
