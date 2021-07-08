import { FixedSizeArray } from "fixed-size-array";
import { BuyShortStrategyOutcome } from "./BuyShort";
import { DoNothing } from "./DoNothing";

export interface CloseHodlStrategyOutcome {
  _uuid: FixedSizeArray<1, "381528e9-ef8a-4c2d-9172-1b91b16c596f">;
  Decision: FixedSizeArray<1, CloseHodlDecision | DoNothing>;
}

export class CloseHodlChecker {
  static isCloseHodl(
    outcome: CloseHodlStrategyOutcome | BuyShortStrategyOutcome
  ): outcome is CloseHodlStrategyOutcome {
    return (
      outcome._uuid.slice(0, 1)[0] === "381528e9-ef8a-4c2d-9172-1b91b16c596f"
    );
  }
}

export enum CloseHodlDecision {
  CLOSE_CLOSE_CLOSE = 1,
  HODL_HODL_HODL,
}
