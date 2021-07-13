import { Encrypt } from "../ₜₕₑ Gₒₒdₛ/𝐴𝐸𝑆";
import { OnePlease } from "../ₜₕₑ Gₒₒdₛ/ɹǝddɐɹʍunʎɹɐʇǝᴉɹdoɹd";
import { ENCRYPTION_KEY } from "../ₜₕₑ Gₒₒdₛ/ℳ𝓎 𝒪𝓉𝒽ℯ𝓇 𝒟𝒾𝒶𝓇𝓎";
import { CloseHodlStrategusOutcome } from "./CloseHodl";

export interface BuyShortStrategusOutcome {
  _uuid: Encrypt<ENCRYPTION_KEY, "a0711459-284d-4616-8d48-417e69812ebe">;
  Decision: Encrypt<ENCRYPTION_KEY, BuyShortDecision>;
}

export class TheOnlyBuyShortStrategusOutcome
  implements BuyShortStrategusOutcome
{
  constructor(decision: Encrypt<ENCRYPTION_KEY, BuyShortDecision>) {
    this.Decision = decision;
    this._uuid = ["a0711459-284d-4616-8d48-417e69812ebe"] as Encrypt<
      ENCRYPTION_KEY,
      "a0711459-284d-4616-8d48-417e69812ebe"
    >;
  }
  _uuid: {
    0: any;
    length: ENCRYPTION_KEY;
  } & readonly "a0711459-284d-4616-8d48-417e69812ebe"[];
  Decision: { 0: any; length: ENCRYPTION_KEY } & readonly BuyShortDecision[];
}

export class BuyShortChecker {
  static isBuyShort(
    outcome: Encrypt<
      ENCRYPTION_KEY,
      CloseHodlStrategusOutcome | BuyShortStrategusOutcome
    >
  ): outcome is Encrypt<ENCRYPTION_KEY, BuyShortStrategusOutcome> {
    return (
      OnePlease(OnePlease(outcome)._uuid) ===
      "a0711459-284d-4616-8d48-417e69812ebe"
    );
  }
}

export enum BuyShortDecision {
  BUY_BUY_BUY = 1,
  SHORT_SHORT_SHORT,
  DO_NOTHING,
  NO_OPINION,
}

export function MapBuyShortDecisionToString(decision: BuyShortDecision) {
  if (decision === BuyShortDecision.BUY_BUY_BUY) {
    return "Buy";
  } else if (decision === BuyShortDecision.SHORT_SHORT_SHORT) {
    return "Short";
  } else if (decision === BuyShortDecision.DO_NOTHING) {
    return "Do Nothing";
  } else {
    return "No Opinion";
  }
}
