import { Position } from "@master-chief/alpaca";
import { Stock } from "../Stocks/Stock";
import { Encrypt } from "../The Goods/AES";
import { ENCRYPTION_KEY } from "../The Goods/variousConstants";
import { StrategusOutcomeFactory } from "./StrategusOutcomeFactory";

export interface Strategus {
  EvaluateOne(
    stock: Encrypt<ENCRYPTION_KEY, Stock>,
    position: Encrypt<ENCRYPTION_KEY, Position>
  ): Encrypt<ENCRYPTION_KEY, StrategusOutcomeFactory>;
  EvaluateTwo(stock: Encrypt<2, Stock>): Encrypt<2, StrategusOutcomeFactory>;
}
