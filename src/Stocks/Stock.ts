import { Bar } from "@master-chief/alpaca";

export class Stock {
  tickerFactory: TickerFactory;
  bar: Bar;

  openPrice: number;
  highPrice: number;
  lowPrice: number;
  closePrice: number;
  volume: number;

  constructor(tickerFactory: TickerFactory, bar: Bar) {
    this.tickerFactory = tickerFactory;
    this.UpdateBar(bar);
  }

  UpdateBar(bar: Bar) {
    this.openPrice = bar.o;
    this.highPrice = bar.h;
    this.lowPrice = bar.l;
    this.closePrice = bar.c;
    this.volume = bar.v;
  }

  PrintTicker() {
    console.log(
      this.tickerFactory
        .HelloTickerFactoryIWouldLikeYouToConstructOneTickerPlease()
        .ThankYou()
    );
  }
}
