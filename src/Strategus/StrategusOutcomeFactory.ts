import { Encrypt } from "../ₜₕₑ Gₒₒdₛ/𝐴𝐸𝑆";
import {
  ENCRYPTION_KEY,
  SUPER_ENCRYPTION_KEY,
} from "../ₜₕₑ Gₒₒdₛ/ℳ𝓎 𝒪𝓉𝒽ℯ𝓇 𝒟𝒾𝒶𝓇𝓎";
import { BuyShortStrategusOutcome } from "./BuyShort";
import { CloseHodlStrategusOutcome } from "./CloseHodl";

export interface StrategusOutcomeFactory {
  GimmeOne(): Encrypt<
    ENCRYPTION_KEY,
    CloseHodlStrategusOutcome | BuyShortStrategusOutcome
  >;

  GimmeTwo(): Encrypt<
    SUPER_ENCRYPTION_KEY,
    CloseHodlStrategusOutcome | BuyShortStrategusOutcome
  >;
}
