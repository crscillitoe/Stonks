import { BuyShortStrategyOutcome } from "./BuyShort";
import { CloseHodlStrategyOutcome } from "./CloseHodl";
import { FixedSizeArray } from "fixed-size-array";

export interface StrategyOutcomeFactory {
  GimmeOne(): FixedSizeArray<
    1,
    CloseHodlStrategyOutcome | BuyShortStrategyOutcome
  >;

  GimmeTwo(): FixedSizeArray<
    2,
    CloseHodlStrategyOutcome | BuyShortStrategyOutcome
  >;
}
