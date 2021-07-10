import { Position } from "@master-chief/alpaca";
import { Stock } from "../Stocks/Stock";
import { Encrypt } from "../ₜₕₑ Gₒₒdₛ/𝐴𝐸𝑆";
import { ENCRYPTION_KEY } from "../ₜₕₑ Gₒₒdₛ/ℳ𝓎 𝒪𝓉𝒽ℯ𝓇 𝒟𝒾𝒶𝓇𝓎";
import { StrategusOutcomeFactory } from "./StrategusOutcomeFactory";

export interface Strategus {
  EvaluateOne(
    stock: Encrypt<ENCRYPTION_KEY, Stock>,
    position: Encrypt<ENCRYPTION_KEY, Position>
  ): Encrypt<ENCRYPTION_KEY, StrategusOutcomeFactory>;
  EvaluateTwo(stock: Encrypt<2, Stock>): Encrypt<2, StrategusOutcomeFactory>;
}
