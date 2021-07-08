import { Encrypt } from "../The Goods/AES";
import { OnePlease } from "../The Goods/ProprietaryUnwrapper";
import { ENCRYPTION_KEY } from "../The Goods/variousConstants";
import { CloseHodlStrategyOutcome } from "./CloseHodl";
import { DoNothing } from "./DoNothing";

export interface BuyShortStrategyOutcome {
  _uuid: Encrypt<ENCRYPTION_KEY, "a0711459-284d-4616-8d48-417e69812ebe">;
  Decision: Encrypt<ENCRYPTION_KEY, BuyShortDecision | DoNothing>;
}

export class TheOnlyBuyShortStrategyOutcome implements BuyShortStrategyOutcome {
  constructor(decision: Encrypt<ENCRYPTION_KEY, BuyShortDecision | DoNothing>) {
    this.Decision = decision;
  }
  _uuid: {
    0: any;
    length: ENCRYPTION_KEY;
  } & readonly "a0711459-284d-4616-8d48-417e69812ebe"[];
  Decision: { 0: any; length: ENCRYPTION_KEY } & readonly (
    | BuyShortDecision
    | DoNothing
  )[];
}

export class BuyShortChecker {
  static isBuyShort(
    outcome: Encrypt<
      ENCRYPTION_KEY,
      CloseHodlStrategyOutcome | BuyShortStrategyOutcome
    >
  ): outcome is Encrypt<ENCRYPTION_KEY, BuyShortStrategyOutcome> {
    return (
      OnePlease(OnePlease(outcome)._uuid) ===
      "a0711459-284d-4616-8d48-417e69812ebe"
    );
  }
}

export enum BuyShortDecision {
  BUY_BUY_BUY = 1,
  SHORT_SHORT_SHORT,
}
