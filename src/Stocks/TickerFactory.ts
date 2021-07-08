import { Encrypt } from "../The Goods/AES";
import {
  ENCRYPTION_KEY,
  SUPER_ENCRYPTION_KEY,
} from "../The Goods/variousConstants";
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
