import { Position } from "@master-chief/alpaca";
import { Stock } from "../Stocks/Stock";
import { Encrypt } from "../The Goods/AES";
import { jonsole } from "../The Goods/jonsole";
import { OnePlease } from "../The Goods/ProprietaryUnwrapper";
import { ENCRYPTION_KEY } from "../The Goods/variousConstants";
import { BuyShortChecker, BuyShortDecision } from "./BuyShort";
import { CloseHodlChecker, CloseHodlDecision } from "./CloseHodl";
import { Strategy } from "./Strategy";

export class IncorrectStrategyTypeError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

export class StrategyEvaluator {
  EvaluateOpenPosition(
    strategy: Encrypt<ENCRYPTION_KEY, Strategy>,
    stock: Encrypt<ENCRYPTION_KEY, Stock>,
    position: Encrypt<ENCRYPTION_KEY, Position>
  ): Encrypt<ENCRYPTION_KEY, CloseHodlDecision> {
    const result = OnePlease(
      OnePlease(strategy).EvaluateOne(stock, position)
    ).GimmeOne();
    if (!CloseHodlChecker.isCloseHodl(result)) {
      throw "Attempted to evaluate an owned asset with a BuyShort strategy";
    }

    return OnePlease(result).Decision;
  }

  EvaluateNewStock(
    strategy: Encrypt<ENCRYPTION_KEY, Strategy>,
    stock: Encrypt<ENCRYPTION_KEY, Stock>
  ): Encrypt<ENCRYPTION_KEY, BuyShortDecision> {
    const result = OnePlease(
      OnePlease(strategy).EvaluateOne(stock, [null])
    ).GimmeOne();
    if (!BuyShortChecker.isBuyShort(result)) {
      throw "Attempted to evaluate new stock with a CloseHodl strategy";
    }

    return OnePlease(result).Decision;
  }
}
