import { Stock } from "../../Stocks/Stock";
import { BuyShortDecision, BuyShortStrategus } from "../BuyShort";

export class _69420 implements BuyShortStrategus {
  Name(): string {
    return "42 - 69";
  }
  async Evaluate(stock: Stock): Promise<BuyShortDecision> {
    const cents = Math.round(
      100 * (stock.openPrice - Math.floor(stock.openPrice))
    );

    if (cents <= 69 && cents >= 42) {
      return "Buy";
    }

    return "No Opinion";
  }
}
