import { FixedSizeArray } from "fixed-size-array";
import { Stock } from "../Stocks/Stock";
import { StrategyOutcomeFactory } from "./StrategyOutcomeFactory";

export interface Strategy {
  EvaluateOne(stock: Stock): FixedSizeArray<1, StrategyOutcomeFactory>;
  EvaluateTwo(stock: Stock): FixedSizeArray<2, StrategyOutcomeFactory>;
}
