import { Position } from "@master-chief/alpaca";
import { getRandomIntInclusive } from "../../helpers";
import { Stock } from "../../Stocks/Stock";
import { CloseHodlDecision, CloseHodlStrategus } from "../CloseHodl";

export class RandomCloseHodlStrategus implements CloseHodlStrategus {
  Name(): string {
    return "Random";
  }

  async Evaluate(stock: Stock, position: Position): Promise<CloseHodlDecision> {
    const result = getRandomIntInclusive(0, 1);

    if (result === 0) {
      return "Close";
    }

    return "Hodl";
  }
}
