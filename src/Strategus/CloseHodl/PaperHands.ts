import { Position } from "@master-chief/alpaca";
import { Stock } from "../../Stocks/Stock";
import { CloseHodlDecision, CloseHodlStrategus } from "../CloseHodl";

export class PaperHandsCloseHodlStrategus implements CloseHodlStrategus {
  Name(): string {
    return "Paper Hands";
  }

  async Evaluate(stock: Stock, position: Position): Promise<CloseHodlDecision> {
    if (position.avg_entry_price < stock.openPrice) {
      return "Close";
    }

    return "Hodl";
  }
}
