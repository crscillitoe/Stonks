import { BuyShortDecision } from "./BuyShort";
import { CloseHodlDecision } from "./CloseHodl";
import { WeightedBuyShortStrategus } from "./WeightedBuyShorts";
import { WeightedCloseHodlStrategus } from "./WeightedCloseHodls";

export interface CloseHodlStrategusDecisionPair {
  weightedStrategus: WeightedCloseHodlStrategus;
  decision: CloseHodlDecision;
}

export interface CloseHodlDecisionSummary {
  finalDecision: CloseHodlDecision;
  predictors: CloseHodlStrategusDecisionPair[];
}

export interface BuyShortStrategusDecisionPair {
  weightedStrategus: WeightedBuyShortStrategus;
  decision: BuyShortDecision;
}

export interface BuyShortDecisionSummary {
  finalDecision: BuyShortDecision;
  predictors: BuyShortStrategusDecisionPair[];
}
