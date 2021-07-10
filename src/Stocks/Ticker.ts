import { Encrypt } from "../ₜₕₑ Gₒₒdₛ/𝐴𝐸𝑆";
import {
  ENCRYPTION_KEY,
  SUPER_ENCRYPTION_KEY,
} from "../ₜₕₑ Gₒₒdₛ/ℳ𝓎 𝒪𝓉𝒽ℯ𝓇 𝒟𝒾𝒶𝓇𝓎";

export interface Ticker {
  ThankYouOne(): Encrypt<ENCRYPTION_KEY, string>;
  ThankYouTwo(): Encrypt<SUPER_ENCRYPTION_KEY, string>;
}
