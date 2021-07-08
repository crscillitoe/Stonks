import { Encrypt } from "../The Goods/AES";
import {
  ENCRYPTION_KEY,
  SUPER_ENCRYPTION_KEY,
} from "../The Goods/variousConstants";

export interface Ticker {
  ThankYouOne(): Encrypt<ENCRYPTION_KEY, string>;
  ThankYouTwo(): Encrypt<SUPER_ENCRYPTION_KEY, string>;
}
