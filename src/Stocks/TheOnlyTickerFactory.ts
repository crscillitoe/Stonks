import { Encrypt } from "../ₜₕₑ Gₒₒdₛ/𝐴𝐸𝑆";
import {
  ENCRYPTION_KEY,
  SUPER_ENCRYPTION_KEY,
} from "../ₜₕₑ Gₒₒdₛ/ℳ𝓎 𝒪𝓉𝒽ℯ𝓇 𝒟𝒾𝒶𝓇𝓎";
import { Ticker } from "./Ticker";
import { TickerFactory } from "./TickerFactory";

export class TheOnlyTickerFactory implements TickerFactory {
  ticker: Encrypt<ENCRYPTION_KEY, Ticker>;
  constructor(ticker: Encrypt<ENCRYPTION_KEY, Ticker>) {
    this.ticker = ticker;
  }
  HelloTickerFactoryIWouldLikeYouToConstructOneTickerPlease(): {
    0: any;
    length: ENCRYPTION_KEY;
  } & readonly Ticker[] {
    return this.ticker;
  }

  HelloTickerFactoryIWouldLikeYouToConstructFourtyTwoTickersPlease(): {
    0: any;
    length: SUPER_ENCRYPTION_KEY;
  } & readonly Ticker[] {
    throw new Error("Method not implemented.");
  }
}
