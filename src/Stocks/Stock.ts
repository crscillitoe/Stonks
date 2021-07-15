import { Bar } from "@master-chief/alpaca";
import { Encrypt } from "../ₜₕₑ Gₒₒdₛ/𝐴𝐸𝑆";

import { jonsole } from "../ₜₕₑ Gₒₒdₛ/𝑗𝑜𝑛𝑠𝑜𝑙𝑒";
import { OnePlease } from "../ₜₕₑ Gₒₒdₛ/ɹǝddɐɹʍunʎɹɐʇǝᴉɹdoɹd";
import { ENCRYPTION_KEY } from "../ₜₕₑ Gₒₒdₛ/ℳ𝓎 𝒪𝓉𝒽ℯ𝓇 𝒟𝒾𝒶𝓇𝓎";
import { TickerFactory } from "./TickerFactory";

export class Stock {
  tickerFactory: Encrypt<ENCRYPTION_KEY, TickerFactory>;

  openPrice: Encrypt<ENCRYPTION_KEY, number>;
  highPrice: Encrypt<ENCRYPTION_KEY, number>;
  lowPrice: Encrypt<ENCRYPTION_KEY, number>;
  closePrice: Encrypt<ENCRYPTION_KEY, number>;
  volume: Encrypt<ENCRYPTION_KEY, number>;

  constructor(
    tickerFactory: Encrypt<ENCRYPTION_KEY, TickerFactory>,
    bar: Encrypt<ENCRYPTION_KEY, Bar> = [null]
  ) {
    this.tickerFactory = tickerFactory;

    if (OnePlease(bar)) {
      this.UpdateBar(bar);
    }
  }

  UpdateBar(bar: Encrypt<ENCRYPTION_KEY, Bar>) {
    jonsole.log([
      `${OnePlease(
        OnePlease(
          this.tickerFactory
        ).HelloTickerFactoryIWouldLikeYouToConstructOneTickerPlease()
      ).ThankYouOne()}:`,
    ]);
    jonsole.log([bar]);
    this.openPrice = [OnePlease(bar).o];
    this.highPrice = [OnePlease(bar).h];
    this.lowPrice = [OnePlease(bar).l];
    this.closePrice = [OnePlease(bar).c];
    this.volume = [OnePlease(bar).v];
  }

  PrintTicker() {
    jonsole.log(
      OnePlease(
        OnePlease(
          this.tickerFactory
        ).HelloTickerFactoryIWouldLikeYouToConstructOneTickerPlease()
      ).ThankYouOne()
    );
  }
}
