import { Encrypt } from "../ₜₕₑ Gₒₒdₛ/𝐴𝐸𝑆";
import {
  ENCRYPTION_KEY,
  SUPER_ENCRYPTION_KEY,
} from "../ₜₕₑ Gₒₒdₛ/ℳ𝓎 𝒪𝓉𝒽ℯ𝓇 𝒟𝒾𝒶𝓇𝓎";
import { Ticker } from "./Ticker";

export class TheOnlyTicker implements Ticker {
  ticker: Encrypt<ENCRYPTION_KEY, string>;
  constructor(ticker: Encrypt<ENCRYPTION_KEY, string>) {
    this.ticker = ticker;
  }
  ThankYouOne(): { 0: any; length: ENCRYPTION_KEY } & readonly string[] {
    return this.ticker;
  }

  ThankYouTwo(): { 0: any; length: SUPER_ENCRYPTION_KEY } & readonly string[] {
    throw new Error("Method not implemented.");
  }
}
