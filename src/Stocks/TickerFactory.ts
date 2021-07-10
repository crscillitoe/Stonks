import { Encrypt } from "../ₜₕₑ Gₒₒdₛ/𝐴𝐸𝑆";
import {
  ENCRYPTION_KEY,
  SUPER_ENCRYPTION_KEY,
} from "../ₜₕₑ Gₒₒdₛ/ℳ𝓎 𝒪𝓉𝒽ℯ𝓇 𝒟𝒾𝒶𝓇𝓎";
import { Ticker } from "./Ticker";

export interface TickerFactory {
  HelloTickerFactoryIWouldLikeYouToConstructOneTickerPlease(): Encrypt<
    ENCRYPTION_KEY,
    Ticker
  >;

  HelloTickerFactoryIWouldLikeYouToConstructFourtyTwoTickersPlease(): Encrypt<
    SUPER_ENCRYPTION_KEY,
    Ticker
  >;
}
