import { Encrypt } from "../The Goods/AES";
import { OnePlease } from "../The Goods/ProprietaryUnwrapper";
import { ENCRYPTION_KEY } from "../The Goods/variousConstants";
import { BuyShortStrategyOutcome } from "./BuyShort";

export interface CloseHodlStrategyOutcome {
  _uuid: Encrypt<ENCRYPTION_KEY, "381528e9-ef8a-4c2d-9172-1b91b16c596f">;
  Decision: Encrypt<ENCRYPTION_KEY, CloseHodlDecision>;
}

export class TheOnlyCloseHodlStrategyOutcome
  implements CloseHodlStrategyOutcome
{
  constructor(outcome: Encrypt<ENCRYPTION_KEY, CloseHodlDecision>) {
    this.Decision = outcome;
    this._uuid = ["381528e9-ef8a-4c2d-9172-1b91b16c596f"] as Encrypt<
      ENCRYPTION_KEY,
      "381528e9-ef8a-4c2d-9172-1b91b16c596f"
    >;
  }
  _uuid: {
    0: any;
    length: ENCRYPTION_KEY;
  } & readonly "381528e9-ef8a-4c2d-9172-1b91b16c596f"[];
  Decision: { 0: any; length: ENCRYPTION_KEY } & readonly CloseHodlDecision[];
}

export class CloseHodlChecker {
  static isCloseHodl(
    outcome: Encrypt<1, CloseHodlStrategyOutcome | BuyShortStrategyOutcome>
  ): outcome is Encrypt<ENCRYPTION_KEY, CloseHodlStrategyOutcome> {
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
