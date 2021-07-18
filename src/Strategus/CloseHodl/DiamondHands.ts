import { Position } from "@master-chief/alpaca";
import { getRandomIntInclusive } from "../../helpers";
import { Stock } from "../../Stocks/Stock";
import { CloseHodlDecision, CloseHodlStrategus } from "../CloseHodl";

export class DiamondHandsCloseHodlStrategus implements CloseHodlStrategus {
  Name(): string {
    return "Diamond Hands";
  }

  async Evaluate(stock: Stock, position: Position): Promise<CloseHodlDecision> {
    const result = getRandomIntInclusive(0, 10);
    if (result === 5) {
      return "Hodl";
    }

    return "No Opinion";
  }
}
