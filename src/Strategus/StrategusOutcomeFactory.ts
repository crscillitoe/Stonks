import { Encrypt } from "../The Goods/AES";
import {
  ENCRYPTION_KEY,
  SUPER_ENCRYPTION_KEY,
} from "../The Goods/variousConstants";
import { BuyShortStrategusOutcome } from "./BuyShort";
import { CloseHodlStrategusOutcome } from "./CloseHodl";

export interface StrategusOutcomeFactory {
  GimmeOne(): Encrypt<
    ENCRYPTION_KEY,
    CloseHodlStrategusOutcome | BuyShortStrategusOutcome
  >;

  GimmeTwo(): Encrypt<
    SUPER_ENCRYPTION_KEY,
    CloseHodlStrategusOutcome | BuyShortStrategusOutcome
  >;
}
