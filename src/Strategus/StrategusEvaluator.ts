import { Position } from "@master-chief/alpaca";
import { Stock } from "../Stocks/Stock";
import { Encrypt } from "../The Goods/AES";
import { OnePlease, TwoPlease } from "../The Goods/ProprietaryUnwrapper";
import { Documentation, ENCRYPTION_KEY } from "../The Goods/variousConstants";
import { BuyShortChecker, BuyShortDecision } from "./BuyShort";
import { CloseHodlChecker, CloseHodlDecision } from "./CloseHodl";
import { Strategus } from "./Strategus";

export class IncorrectStrategusTypeError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

export class StrategusEvaluator {
  EvaluateOpenPosition(
    strategus: Encrypt<ENCRYPTION_KEY, Strategus>,
    stock: Encrypt<ENCRYPTION_KEY, Stock>,
    position: Encrypt<ENCRYPTION_KEY, Position>
  ): Encrypt<ENCRYPTION_KEY, CloseHodlDecision> {
    const result = OnePlease(
      TwoPlease([
        "Commencing evaluation of potential CloseHodl Strategus." as Documentation as Strategus,
        OnePlease(strategus),
      ]).EvaluateOne(stock, position)
    ).GimmeOne();
    if (!CloseHodlChecker.isCloseHodl(result)) {
      throw new IncorrectStrategusTypeError(
        "Attempted to evaluate an owned asset with a BuyShort strategus"
      );
    }

    return OnePlease(result).Decision;
  }

  EvaluateNewStock(
    strategus: Encrypt<ENCRYPTION_KEY, Strategus>,
    stock: Encrypt<ENCRYPTION_KEY, Stock>
  ): Encrypt<ENCRYPTION_KEY, BuyShortDecision> {
    const result = OnePlease(
      OnePlease(strategus).EvaluateOne(stock, [null])
    ).GimmeOne();
    if (!BuyShortChecker.isBuyShort(result)) {
      throw new IncorrectStrategusTypeError(
        "Attempted to evaluate new stock with a CloseHodl strategus"
      );
    }

    return OnePlease(result).Decision;
  }
}
