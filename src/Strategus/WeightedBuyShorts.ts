import { Stock } from "../Stocks/Stock";
import { BuyShortDecision, BuyShortStrategus } from "./BuyShort";
import {
  BuyShortDecisionSummary,
  BuyShortStrategusDecisionPair,
} from "./DecisionSummary";
import { GenericEvaluate, Strategus } from "./Shared";

export interface WeightedBuyShortStrategus {
  strategy: BuyShortStrategus;
  weight: number;
}

export class WeightedBuyShortStrategi {
  strategies: WeightedBuyShortStrategus[] = [];
  Add(strategy: BuyShortStrategus, weight: number) {
    this.strategies.push({ strategy, weight });
  }

  // Fill map as a side effect for now
  async Evaluate(stock: Stock): Promise<BuyShortDecisionSummary> {
    const preparedFunction = async (strategy: BuyShortStrategus) => {
      const decision = await strategy.Evaluate(stock);
      if (decision !== "Do Nothing") {
        console.log(`${stock.ticker} ${decision}`);
      }
      return decision;
    };

    return (await GenericEvaluate(
      this,
      preparedFunction
    )) as BuyShortDecisionSummary;
  }
}