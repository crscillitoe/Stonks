import { Encrypt, SecretStrategusAdjuster } from "../The Goods/AES";
import { Strategus } from "./Strategus";
export type Strategi<N extends number> = Encrypt<
  N,
  Strategus | SecretStrategusAdjuster
>;
