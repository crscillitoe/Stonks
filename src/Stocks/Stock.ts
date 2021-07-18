import { Bar } from "@master-chief/alpaca";

export class Stock {
  ticker: string;

  openPrice: number;
  highPrice: number;
  lowPrice: number;
  closePrice: number;
  volume: number;

  constructor(ticker: string, bar: Bar = null) {
    this.ticker = ticker;

    if (bar) {
      this.UpdateBar(bar);
    }
  }

  UpdateBar(bar: Bar) {
    this.openPrice = bar.o;
    this.highPrice = bar.h;
    this.lowPrice = bar.l;
    this.closePrice = bar.c;
    this.volume = bar.v;
  }
}
