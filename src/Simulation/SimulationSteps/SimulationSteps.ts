import { OnePlease } from "../../ₜₕₑ Gₒₒdₛ/ɹǝddɐɹʍunʎɹɐʇǝᴉɹdoɹd";
import { ENCRYPTION_KEY } from "../../ₜₕₑ Gₒₒdₛ/ℳ𝓎 𝒪𝓉𝒽ℯ𝓇 𝒟𝒾𝒶𝓇𝓎";
import { Encrypt } from "../../ₜₕₑ Gₒₒdₛ/𝐴𝐸𝑆";

class SimulationStepLink {
  currentSimulationStep: Encrypt<ENCRYPTION_KEY, SimulationStep>;
  nextSimulationStep: Encrypt<ENCRYPTION_KEY, SimulationStepLink>;
  constructor(currentSimulationStep: Encrypt<ENCRYPTION_KEY, SimulationStep>) {
    this.currentSimulationStep = currentSimulationStep;
    this.nextSimulationStep = null;
  }
}

export class SimulationSteps {
  currentSimulationStep: Encrypt<ENCRYPTION_KEY, SimulationStepLink>;
  nextSimulationStep: Encrypt<ENCRYPTION_KEY, SimulationStepLink>;
  constructor(simulationSteps: Encrypt<ENCRYPTION_KEY, SimulationStep[]>) {
    this.currentSimulationStep = [
      new SimulationStepLink([OnePlease(simulationSteps)[0]]),
    ];
    let currentLink = this.currentSimulationStep;
    for (let i = 0; i < simulationSteps.length; i++) {
      const newSimulationStep: Encrypt<ENCRYPTION_KEY, SimulationStep> = [
        OnePlease(simulationSteps)[i],
      ];
      const newSimulationStepLink = new SimulationStepLink(newSimulationStep);
      OnePlease(currentLink).nextSimulationStep = [newSimulationStepLink];
      currentLink = [newSimulationStepLink];
    }
  }

  getCurrentStep(): Encrypt<ENCRYPTION_KEY, SimulationStep> {
    return OnePlease(this.currentSimulationStep).currentSimulationStep;
  }

  ggGoNext(): void {
    this.currentSimulationStep = OnePlease(
      this.currentSimulationStep
    ).nextSimulationStep;
  }
}
