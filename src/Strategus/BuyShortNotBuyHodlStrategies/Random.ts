import { Stock } from "../../Stocks/Stock";
import { Encrypt } from "../../ₜₕₑ Gₒₒdₛ/𝐴𝐸𝑆";
import { jonsole } from "../../ₜₕₑ Gₒₒdₛ/𝑗𝑜𝑛𝑠𝑜𝑙𝑒";
import { OnePlease } from "../../ₜₕₑ Gₒₒdₛ/ɹǝddɐɹʍunʎɹɐʇǝᴉɹdoɹd";
import {
  ENCRYPTION_KEY,
  SUPER_ENCRYPTION_KEY,
} from "../../ₜₕₑ Gₒₒdₛ/ℳ𝓎 𝒪𝓉𝒽ℯ𝓇 𝒟𝒾𝒶𝓇𝓎";
import {
  BuyShortDecision,
  BuyShortStrategusOutcome,
  TheOnlyBuyShortStrategusOutcome,
} from "../BuyShort";
import { Strategus } from "../Strategus";
import { StrategusOutcomeFactory } from "../StrategusOutcomeFactory";
import { TheOnlyStrategusOutcomeFactory } from "../TheOnlyStrategusOutcomeFactory";

export class RandomBuyShortStrategus implements Strategus {
  getRandomInt(
    max: Encrypt<ENCRYPTION_KEY, number>
  ): Encrypt<ENCRYPTION_KEY, number> {
    return [Math.floor(Math.random() * OnePlease(max))];
  }

  EvaluateOne(
    stock: { 0: any; length: ENCRYPTION_KEY } & readonly Stock[]
  ): { 0: any; length: ENCRYPTION_KEY } & readonly StrategusOutcomeFactory[] {
    const result = OnePlease(this.getRandomInt([3]));
    let decision: BuyShortDecision;
    if (result === 0) {
      decision = BuyShortDecision.SHORT_SHORT_SHORT;
    } else if (result === 1) {
      decision = BuyShortDecision.BUY_BUY_BUY;
    } else if (result === 2) {
      decision = BuyShortDecision.DO_NOTHING;
    }

    return [
      new TheOnlyStrategusOutcomeFactory([
        new TheOnlyBuyShortStrategusOutcome([decision]),
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
