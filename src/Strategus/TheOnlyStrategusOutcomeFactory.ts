import { Encrypt } from "../The Goods/AES";
import {
  ENCRYPTION_KEY,
  SUPER_ENCRYPTION_KEY,
} from "../The Goods/variousConstants";
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
