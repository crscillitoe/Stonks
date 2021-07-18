import { Position } from "@master-chief/alpaca";
import { PositionMap } from "../Stocks/Stock";

export interface IMarket {
  Name(): string;
  GetPositions(): Promise<PositionMap>;
  GetPosition(ticker: string): Promise<Position | null>;
  OpenPosition(ticker: string, shareCount: number): Promise<boolean>;
  ClosePosition(position: Position): Promise<boolean>;
  GetCurrentBalance(): Promise<number>; // TODO: custom currency type
}
