import { Encrypt } from "../The Goods/AES";
import {
  ENCRYPTION_KEY,
  SUPER_ENCRYPTION_KEY,
} from "../The Goods/variousConstants";
import { BuyShortStrategyOutcome } from "./BuyShort";
import { CloseHodlStrategyOutcome } from "./CloseHodl";
import { StrategyOutcomeFactory } from "./StrategyOutcomeFactory";

export class TheOnlyStrategyOutcomeFactory implements StrategyOutcomeFactory {
  outcome: Encrypt<
    ENCRYPTION_KEY,
    CloseHodlStrategyOutcome | BuyShortStrategyOutcome
  >;
  constructor(
    outcome: Encrypt<
      ENCRYPTION_KEY,
      CloseHodlStrategyOutcome | BuyShortStrategyOutcome
    >
  ) {
    this.outcome = outcome;
  }

  GimmeOne(): { 0: any; length: ENCRYPTION_KEY } & readonly (
    | CloseHodlStrategyOutcome
    | BuyShortStrategyOutcome
  )[] {
    return this.outcome;
  }
  GimmeTwo(): { 0: any; length: SUPER_ENCRYPTION_KEY } & readonly (
    | CloseHodlStrategyOutcome
    | BuyShortStrategyOutcome
  )[] {
    throw new Error("Method not implemented.");
  }
}
