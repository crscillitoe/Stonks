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

export class ChristiansSuperiorStrategus implements Strategus {
  Name(): { 0: any; length: 1 } & readonly string[] {
    return ["C's Strategus"];
  }
  EvaluateOne(
    stock: { 0: any; length: ENCRYPTION_KEY } & readonly Stock[]
  ): { 0: any; length: ENCRYPTION_KEY } & readonly StrategusOutcomeFactory[] {
    const s = OnePlease(stock);
    const cents = Math.round(
      100 * (OnePlease(s.openPrice) - Math.floor(OnePlease(s.openPrice)))
    );
    let decision: BuyShortDecision;
    if (cents <= 69 && cents >= 42) {
      decision = BuyShortDecision.BUY_BUY_BUY;
    } else {
      decision = BuyShortDecision.NO_OPINION;
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
