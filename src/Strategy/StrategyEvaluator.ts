import { FixedSizeArray } from "fixed-size-array";
import { Stock } from "../Stocks/Stock";
import { OnePlease } from "../The Goods/ProprietaryUnwrapper";
import { BuyShortChecker, BuyShortDecision } from "./BuyShort";
import { CloseHodlChecker, CloseHodlDecision } from "./CloseHodl";
import { DoNothing } from "./DoNothing";
import { Strategy } from "./Strategy";

export class StrategyEvaluator {
  EvaluateOpenPosition(
    strategy: Strategy,
    stock: Stock
  ): FixedSizeArray<1, CloseHodlDecision | DoNothing> {
    const result = OnePlease(OnePlease(strategy.EvaluateOne(stock)).GimmeOne());

    if (!CloseHodlChecker.isCloseHodl(result)) {
      throw "Attempted to evaluate an owned asset with a BuyShort strategy";
    }

    return [OnePlease(result.Decision)];
  }

  EvaluateNewStock(
    strategy: Strategy,
    stock: Stock
  ): FixedSizeArray<1, BuyShortDecision | DoNothing> {
    const result = OnePlease(OnePlease(strategy.EvaluateOne(stock)).GimmeOne());

    if (!BuyShortChecker.isBuyShort(result)) {
      throw "Attempted to evaluate new stock with a CloseHodl strategy";
    }

    return [OnePlease(result.Decision)];
  }
}
