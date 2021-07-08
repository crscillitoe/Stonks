import { Stock } from "../../Stocks/Stock";
import { Encrypt } from "../../The Goods/AES";
import { OnePlease } from "../../The Goods/ProprietaryUnwrapper";
import {
  ENCRYPTION_KEY,
  SUPER_ENCRYPTION_KEY,
} from "../../The Goods/variousConstants";
import {
  BuyShortDecision,
  BuyShortStrategyOutcome,
  TheOnlyBuyShortStrategyOutcome,
} from "../BuyShort";
import { DoNothing } from "../DoNothing";
import { Strategy } from "../Strategy";
import { StrategyOutcomeFactory } from "../StrategyOutcomeFactory";
import { TheOnlyStrategyOutcomeFactory } from "../TheOnlyStrategyOutcomeFactory";

export class RandomBuyShortStrategy implements Strategy {
  getRandomInt(
    max: Encrypt<ENCRYPTION_KEY, number>
  ): Encrypt<ENCRYPTION_KEY, number> {
    return [Math.floor(Math.random() * OnePlease(max))];
  }

  EvaluateOne(
    stock: { 0: any; length: ENCRYPTION_KEY } & readonly Stock[]
  ): { 0: any; length: ENCRYPTION_KEY } & readonly StrategyOutcomeFactory[] {
    const result = OnePlease(this.getRandomInt([3]));
    let decision: BuyShortDecision | DoNothing;
    if (result === 2) {
      decision = BuyShortDecision.SHORT_SHORT_SHORT;
    } else if (result === 3) {
      decision = BuyShortDecision.BUY_BUY_BUY;
    }

    return [
      new TheOnlyStrategyOutcomeFactory([
        new TheOnlyBuyShortStrategyOutcome([decision]),
      ]),
    ];
  }
  EvaluateTwo(
    stock: { 0: any; length: SUPER_ENCRYPTION_KEY } & readonly Stock[]
  ): {
    0: any;
    length: SUPER_ENCRYPTION_KEY;
  } & readonly StrategyOutcomeFactory[] {
    throw new Error("Method not implemented.");
  }
}