import { ENCRYPTION_KEY } from "../../ₜₕₑ Gₒₒdₛ/ℳ𝓎 𝒪𝓉𝒽ℯ𝓇 𝒟𝒾𝒶𝓇𝓎";
import { Encrypt } from "../../ₜₕₑ Gₒₒdₛ/𝐴𝐸𝑆";

export interface SimulationStep {
  /**
   * Evaluates the simulation step. Carefully.
   */
  EvaluateMeSomeSimulatorPlease(): Promise<
    Encrypt<ENCRYPTION_KEY, Error> | Encrypt<ENCRYPTION_KEY, null>
  >;
}
