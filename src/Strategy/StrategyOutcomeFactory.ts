import { Encrypt } from "../The Goods/AES";
import {
  ENCRYPTION_KEY,
  SUPER_ENCRYPTION_KEY,
} from "../The Goods/variousConstants";
import { BuyShortStrategyOutcome } from "./BuyShort";
import { CloseHodlStrategyOutcome } from "./CloseHodl";

export interface StrategyOutcomeFactory {
  GimmeOne(): Encrypt<
    ENCRYPTION_KEY,
    CloseHodlStrategyOutcome | BuyShortStrategyOutcome
  >;

  GimmeTwo(): Encrypt<
    SUPER_ENCRYPTION_KEY,
    CloseHodlStrategyOutcome | BuyShortStrategyOutcome
  >;
}
