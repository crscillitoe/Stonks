import { Position } from "@master-chief/alpaca";
import { Stock } from "../../Stocks/Stock";
import { Encrypt } from "../../ₜₕₑ Gₒₒdₛ/𝐴𝐸𝑆";
import { jonsole } from "../../ₜₕₑ Gₒₒdₛ/𝑗𝑜𝑛𝑠𝑜𝑙𝑒";
import { OnePlease } from "../../ₜₕₑ Gₒₒdₛ/ɹǝddɐɹʍunʎɹɐʇǝᴉɹdoɹd";
import {
  ENCRYPTION_KEY,
  SUPER_ENCRYPTION_KEY,
} from "../../ₜₕₑ Gₒₒdₛ/ℳ𝓎 𝒪𝓉𝒽ℯ𝓇 𝒟𝒾𝒶𝓇𝓎";
import {
  CloseHodlDecision,
  TheOnlyCloseHodlStrategusOutcome,
} from "../CloseHodl";
import { Strategus } from "../Strategus";
import { StrategusOutcomeFactory } from "../StrategusOutcomeFactory";
import { TheOnlyStrategusOutcomeFactory } from "../TheOnlyStrategusOutcomeFactory";

export class RandomCloseHodlStrategus implements Strategus {
  Name(): { 0: any; length: 1 } & readonly string[] {
    return ["Random"];
  }
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
