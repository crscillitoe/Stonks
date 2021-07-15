import { Position } from "@master-chief/alpaca";
import { Stock } from "../../Stocks/Stock";
import { Encrypt } from "../../ₜₕₑ Gₒₒdₛ/𝐴𝐸𝑆";
import { OnePlease, TwoPlease } from "../../ₜₕₑ Gₒₒdₛ/ɹǝddɐɹʍunʎɹɐʇǝᴉɹdoɹd";
import {
  Documentation,
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
import { ReturnEarlyIfNull } from "../../ₜₕₑ Gₒₒdₛ/🄴🄽🄲🅈🄲🄻🄾🄿🄴🄳🄸🄰";

export class DiamondHandsCloseHodlStrategus implements Strategus {
  Name(): { 0: any; length: 1 } & readonly string[] {
    return ["Diamond Hands"];
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
    const r = ReturnEarlyIfNull(position);
    if (r != null) return r;

    const result = OnePlease(this.getRandomInt([10]));
    if (result === 5) {
      return TwoPlease([
        "Always hodl. Diamond Hands." as Documentation as Encrypt<
          ENCRYPTION_KEY,
          TheOnlyStrategusOutcomeFactory
        >,
        [
          new TheOnlyStrategusOutcomeFactory([
            new TheOnlyCloseHodlStrategusOutcome([
              CloseHodlDecision.HODL_DIAMOND_HANDS_HODL_DIAMOND_HANDS_HODL_DIAMOND_HANDS,
            ]),
          ]),
        ],
      ]);
    }
    return TwoPlease([
      "Always hodl. Except when you have no opinion. Hands." as Documentation as Encrypt<
        ENCRYPTION_KEY,
        TheOnlyStrategusOutcomeFactory
      >,
      [
        new TheOnlyStrategusOutcomeFactory([
          new TheOnlyCloseHodlStrategusOutcome([CloseHodlDecision.NO_OPINION]),
        ]),
      ],
    ]);
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
