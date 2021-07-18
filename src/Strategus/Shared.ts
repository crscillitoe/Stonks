import { BuyShortDecision, BuyShortStrategus } from "./BuyShort";
import { CloseHodlDecision, CloseHodlStrategus } from "./CloseHodl";
import {
  BuyShortDecisionSummary,
  BuyShortStrategusDecisionPair,
  CloseHodlDecisionSummary,
  CloseHodlStrategusDecisionPair,
} from "./DecisionSummary";
import {
  WeightedBuyShortStrategi,
  WeightedBuyShortStrategus,
} from "./WeightedBuyShorts";
import {
  WeightedCloseHodlStrategi,
  WeightedCloseHodlStrategus,
} from "./WeightedCloseHodls";

export type StrategusDecision = BuyShortDecision | CloseHodlDecision;

export type Strategus = BuyShortStrategus | CloseHodlStrategus;

export type WeightedStrategus =
  | WeightedBuyShortStrategus
  | WeightedCloseHodlStrategus;

export type WeightedStrategi =
  | WeightedBuyShortStrategi
  | WeightedCloseHodlStrategi;

export interface DecisionSummary {
  finalDecision: StrategusDecision;
  predictors: StrategusDecisionPair[];
}

export interface StrategusDecisionPair {
  weightedStrategus: WeightedStrategus;
  decision: StrategusDecision;
}

export async function GenericEvaluate(
  strategi: WeightedStrategi,
  evaluationFunction: (strategus: Strategus) => Promise<StrategusDecision>
): Promise<DecisionSummary> {
  // String to Number
  let resultMap = {};
  let decisions: StrategusDecisionPair[] = [];
  for (const weightedStrategus of strategi.strategies) {
    const result = await evaluationFunction(weightedStrategus.strategy);

    decisions.push({ weightedStrategus: weightedStrategus, decision: result });

    if (resultMap[result]) {
      resultMap[result] += weightedStrategus.weight;
    } else {
      resultMap[result] = weightedStrategus.weight;
    }
  }

  let decision: StrategusDecision = null;
  let max = -1;
  for (const key in resultMap) {
    if (resultMap[key] > max) {
      decision = key as StrategusDecision;
    }
  }

  return { finalDecision: decision, predictors: decisions };
}
