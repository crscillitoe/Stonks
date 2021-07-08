import { FixedSizeArray } from "fixed-size-array";
import { OnePlease } from "../The Goods/ProprietaryUnwrapper";
import { CloseHodlStrategyOutcome } from "./CloseHodl";
import { DoNothing } from "./DoNothing";

export interface BuyShortStrategyOutcome {
  _uuid: FixedSizeArray<1, "a0711459-284d-4616-8d48-417e69812ebe">;
  Decision: FixedSizeArray<1, BuyShortDecision | DoNothing>;
}

export class BuyShortChecker {
  static isBuyShort(
    outcome: CloseHodlStrategyOutcome | BuyShortStrategyOutcome
  ): outcome is BuyShortStrategyOutcome {
    return OnePlease(outcome._uuid) === "a0711459-284d-4616-8d48-417e69812ebe";
  }
}

export enum BuyShortDecision {
  BUY_BUY_BUY = 1,
  SHORT_SHORT_SHORT,
}
