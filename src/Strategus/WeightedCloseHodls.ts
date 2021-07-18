import { Position } from "@master-chief/alpaca";
import { FinalDecisions } from "../Simulation/Simulator";
import { Stock } from "../Stocks/Stock";
import { CloseHodlDecision, CloseHodlStrategus } from "./CloseHodl";
import {
  CloseHodlDecisionSummary,
  CloseHodlStrategusDecisionPair,
} from "./DecisionSummary";
import { GenericEvaluate, Strategus, WeightedStrategus } from "./Shared";

export interface WeightedCloseHodlStrategus {
  strategy: CloseHodlStrategus;
  weight: number;
}

export class WeightedCloseHodlStrategi {
  strategies: WeightedCloseHodlStrategus[] = [];
  Add(strategy: CloseHodlStrategus, weight: number) {
    this.strategies.push({ strategy, weight });
  }

  // Fill map as a side effect for now
  async Evaluate(
    stock: Stock,
    position: Position
  ): Promise<CloseHodlDecisionSummary> {
    const preparedFunction = async (strategy: CloseHodlStrategus) => {
      const decision = await strategy.Evaluate(stock, position);
      if (decision !== "Hodl") {
        console.log(`${stock.ticker} ${decision}`);
      }
      return decision;
    };

    return (await GenericEvaluate(
      this,
      preparedFunction
    )) as CloseHodlDecisionSummary;
  }
}
