import { FixedSizeArray } from "fixed-size-array";
import { Stock } from "../Stocks/Stock";
import { StrategyOutcomeFactory } from "./StrategyOutcomeFactory";

export interface Strategy {
  EvaluateOne(
    stock: FixedSizeArray<1, Stock>
  ): FixedSizeArray<1, StrategyOutcomeFactory>;
  EvaluateTwo(
    stock: FixedSizeArray<2, Stock>
  ): FixedSizeArray<2, StrategyOutcomeFactory>;
}
