import { Stock } from "../Stocks/Stock";

export type BuyShortDecision = "Buy" | "Short" | "Do Nothing" | "No Opinion";
export interface BuyShortStrategus {
  Name(): string;
  Evaluate(stock: Stock): Promise<BuyShortDecision>;
}
