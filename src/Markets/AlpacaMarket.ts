import { AlpacaClient, Position } from "@master-chief/alpaca";
import { PositionMap } from "../Stocks/Stock";
import { IMarket } from "./IMarket";

export class AlpacaMarket implements IMarket {
  private alpaca: AlpacaClient;
  constructor(alpaca: AlpacaClient) {
    this.alpaca = alpaca;
  }
  Name(): string {
    return "Alpaca Market";
  }
  async GetPositions(): Promise<PositionMap> {
    const rawPositions = await this.alpaca.getPositions();
    const positionMap: PositionMap = {};
    for (const position of rawPositions) {
      positionMap[position.symbol] = position;
    }
    return positionMap;
  }
  async GetPosition(ticker: string): Promise<Position> {
    try {
      return await this.alpaca.getPosition({ symbol: ticker });
    } catch (e) {
      return null;
    }
  }
  async OpenPosition(ticker: string, shareCount: number): Promise<boolean> {
    const order = await this.alpaca.placeOrder({
      symbol: ticker,
      side: "buy",
      type: "market",
      time_in_force: "day",
      qty: shareCount,
    });
    return true;
  }
  async ClosePosition(position: Position): Promise<boolean> {
    this.alpaca.closePosition(position);
    return true;
  }
  async GetCurrentBalance(): Promise<number> {
    const account = await this.alpaca.getAccount();
    return account.buying_power;
  }
}
