import { Encrypt, SecretStrategusAdjuster } from "../ₜₕₑ Gₒₒdₛ/𝐴𝐸𝑆";
import { Strategus } from "./Strategus";
export type Strategi<N extends number> = Encrypt<
  N,
  Strategus | SecretStrategusAdjuster
>;
