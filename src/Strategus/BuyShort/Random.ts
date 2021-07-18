import { getRandomIntInclusive } from "../../helpers";
import { Stock } from "../../Stocks/Stock";
import { BuyShortStrategus, BuyShortDecision } from "../BuyShort";

export class RandomBuyShortStrategus implements BuyShortStrategus {
  Name(): string {
    return "Random";
  }

  async Evaluate(stock: Stock): Promise<BuyShortDecision> {
    const result = getRandomIntInclusive(0, 2);

    if (result === 0) {
      return "Short";
    } else if (result === 1) {
      return "Buy";
    }

    return "Do Nothing";
  }
}
