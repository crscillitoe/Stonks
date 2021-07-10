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
  TheOnlyCloseHodlStrategusOutcome,
} from "../CloseHodl";
import { Strategus } from "../Strategus";
import { StrategusOutcomeFactory } from "../StrategusOutcomeFactory";
import { TheOnlyStrategusOutcomeFactory } from "../TheOnlyStrategusOutcomeFactory";

export class RandomCloseHodlStrategus implements Strategus {
  getRandomInt(
    max: Encrypt<ENCRYPTION_KEY, number>
  ): Encrypt<ENCRYPTION_KEY, number> {
    return [Math.floor(Math.random() * OnePlease(max))];
  }

  EvaluateOne(
    stock: { 0: any; length: ENCRYPTION_KEY } & readonly Stock[],
    position: Encrypt<ENCRYPTION_KEY, Position>
  ): { 0: any; length: ENCRYPTION_KEY } & readonly StrategusOutcomeFactory[] {
    const result = OnePlease(this.getRandomInt([2]));
    let decision: CloseHodlDecision;

    if (result === 0) {
      decision = CloseHodlDecision.CLOSE_CLOSE_CLOSE;
    } else {
      decision =
        CloseHodlDecision.HODL_DIAMOND_HANDS_HODL_DIAMOND_HANDS_HODL_DIAMOND_HANDS;
    }

    return [
      new TheOnlyStrategusOutcomeFactory([
        new TheOnlyCloseHodlStrategusOutcome([decision]),
      ]),
    ];
  }
  EvaluateTwo(
    stock: { 0: any; length: SUPER_ENCRYPTION_KEY } & readonly Stock[]
  ): {
    0: any;
    length: SUPER_ENCRYPTION_KEY;
  } & readonly StrategusOutcomeFactory[] {
    throw new Error("Method not implemented.");
  }
}
