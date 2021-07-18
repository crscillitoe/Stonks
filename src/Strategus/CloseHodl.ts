import { Position } from "@master-chief/alpaca";
import { Stock } from "../Stocks/Stock";

export type CloseHodlDecision = "Close" | "Hodl" | "No Opinion";

export interface CloseHodlStrategus {
  Name(): string;
  Evaluate(stock: Stock, position: Position): Promise<CloseHodlDecision>;
}
