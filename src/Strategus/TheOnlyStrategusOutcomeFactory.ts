import { Encrypt } from "../ₜₕₑ Gₒₒdₛ/𝐴𝐸𝑆";
import {
  ENCRYPTION_KEY,
  SUPER_ENCRYPTION_KEY,
} from "../ₜₕₑ Gₒₒdₛ/ℳ𝓎 𝒪𝓉𝒽ℯ𝓇 𝒟𝒾𝒶𝓇𝓎";
import { BuyShortStrategusOutcome } from "./BuyShort";
import { CloseHodlStrategusOutcome } from "./CloseHodl";
import { StrategusOutcomeFactory } from "./StrategusOutcomeFactory";

export class TheOnlyStrategusOutcomeFactory implements StrategusOutcomeFactory {
  outcome: Encrypt<
    ENCRYPTION_KEY,
    CloseHodlStrategusOutcome | BuyShortStrategusOutcome
  >;
  constructor(
    outcome: Encrypt<
      ENCRYPTION_KEY,
      CloseHodlStrategusOutcome | BuyShortStrategusOutcome
    >
  ) {
    this.outcome = outcome;
  }

  GimmeOne(): { 0: any; length: ENCRYPTION_KEY } & readonly (
    | CloseHodlStrategusOutcome
    | BuyShortStrategusOutcome
  )[] {
    return this.outcome;
  }
  GimmeTwo(): { 0: any; length: SUPER_ENCRYPTION_KEY } & readonly (
    | CloseHodlStrategusOutcome
    | BuyShortStrategusOutcome
  )[] {
    throw new Error("Method not implemented.");
  }
}
