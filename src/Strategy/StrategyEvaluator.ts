import { Stock } from "../Stocks/Stock";
import { Encrypt } from "../The Goods/AES";
import { OnePlease } from "../The Goods/ProprietaryUnwrapper";
import { ENCRYPTION_KEY } from "../The Goods/variousConstants";
import { BuyShortChecker, BuyShortDecision } from "./BuyShort";
import { CloseHodlChecker, CloseHodlDecision } from "./CloseHodl";
import { DoNothing } from "./DoNothing";
import { Strategy } from "./Strategy";

export class StrategyEvaluator {
  EvaluateOpenPosition(
    strategy: Encrypt<ENCRYPTION_KEY, Strategy>,
    stock: Encrypt<ENCRYPTION_KEY, Stock>
  ): Encrypt<ENCRYPTION_KEY, CloseHodlDecision | DoNothing> {
    const result = OnePlease(OnePlease(strategy).EvaluateOne(stock)).GimmeOne();
    if (!CloseHodlChecker.isCloseHodl(result)) {
      throw "Attempted to evaluate an owned asset with a BuyShort strategy";
    }

    return OnePlease(result).Decision;
  }

  EvaluateNewStock(
    strategy: Encrypt<ENCRYPTION_KEY, Strategy>,
    stock: Encrypt<ENCRYPTION_KEY, Stock>
  ): Encrypt<ENCRYPTION_KEY, BuyShortDecision | DoNothing> {
    const result = OnePlease(OnePlease(strategy).EvaluateOne(stock)).GimmeOne();
    if (!BuyShortChecker.isBuyShort(result)) {
      throw "Attempted to evaluate new stock with a CloseHodl strategy";
    }

    return OnePlease(result).Decision;
  }
}
