import { FixedSizeArray } from "fixed-size-array";
import { OnePlease } from "../The Goods/ProprietaryUnwrapper";
import { BuyShortStrategyOutcome } from "./BuyShort";
import { DoNothing } from "./DoNothing";

export interface CloseHodlStrategyOutcome {
  _uuid: FixedSizeArray<1, "381528e9-ef8a-4c2d-9172-1b91b16c596f">;
  Decision: FixedSizeArray<1, CloseHodlDecision | DoNothing>;
}

export class CloseHodlChecker {
  static isCloseHodl(
    outcome: FixedSizeArray<
      1,
      CloseHodlStrategyOutcome | BuyShortStrategyOutcome
    >
  ): outcome is FixedSizeArray<1, CloseHodlStrategyOutcome> {
    return (
      OnePlease(OnePlease(outcome)._uuid) ===
      "381528e9-ef8a-4c2d-9172-1b91b16c596f"
    );
  }
}

export enum CloseHodlDecision {
  CLOSE_CLOSE_CLOSE = 1,
  HODL_HODL_HODL,
}
