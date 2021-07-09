import { Position } from "@master-chief/alpaca";
import { Stock } from "../../Stocks/Stock";
import { Encrypt } from "../../The Goods/AES";
import { jonsole } from "../../The Goods/jonsole";
import { OnePlease } from "../../The Goods/ProprietaryUnwrapper";
import {
  ENCRYPTION_KEY,
  SUPER_ENCRYPTION_KEY,
} from "../../The Goods/variousConstants";
import {
  CloseHodlDecision,
  TheOnlyCloseHodlStrategyOutcome,
} from "../CloseHodl";
import { Strategy } from "../Strategy";
import { StrategyOutcomeFactory } from "../StrategyOutcomeFactory";
import { TheOnlyStrategyOutcomeFactory } from "../TheOnlyStrategyOutcomeFactory";

export class RandomCloseHodlStrategy implements Strategy {
  getRandomInt(
    max: Encrypt<ENCRYPTION_KEY, number>
  ): Encrypt<ENCRYPTION_KEY, number> {
    return [Math.floor(Math.random() * OnePlease(max))];
  }

  EvaluateOne(
    stock: { 0: any; length: ENCRYPTION_KEY } & readonly Stock[],
    position: Encrypt<ENCRYPTION_KEY, Position>
  ): { 0: any; length: ENCRYPTION_KEY } & readonly StrategyOutcomeFactory[] {
    const result = OnePlease(this.getRandomInt([2]));
    let decision: CloseHodlDecision;

    if (result === 0) {
      decision = CloseHodlDecision.CLOSE_CLOSE_CLOSE;
    } else {
      decision = CloseHodlDecision.HODL_HODL_HODL;
    }

    return [
      new TheOnlyStrategyOutcomeFactory([
        new TheOnlyCloseHodlStrategyOutcome([decision]),
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
