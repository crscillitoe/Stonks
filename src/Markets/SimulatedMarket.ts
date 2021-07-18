import { Position } from "@master-chief/alpaca";
import { PositionMap, Stock, StockMap } from "../Stocks/Stock";
import { IMarket } from "./IMarket";

export class SimulatedMarket implements IMarket {
  positions: PositionMap = {};
  stockMap: StockMap = {};
  moneyInCents: number;
  constructor(moneyInCents: number) {
    this.moneyInCents = moneyInCents;
  }
  GetPosition(ticker: string): Promise<Position> {
    return Promise.resolve(this.positions[ticker]);
  }
  GetPositions(): Promise<PositionMap> {
    return Promise.resolve(this.positions);
  }

  OpenPosition(ticker: string, shareCount: number): Promise<boolean> {
    this.positions[ticker] = this.buildPosition(ticker, shareCount);
    this.moneyInCents -= Math.floor(
      shareCount * this.stockMap[ticker].openPrice * 100
    );
    return Promise.resolve(true);
  }

  ClosePosition(position: Position): Promise<boolean> {
    const name = position.symbol;
    const cost = Math.round(this.stockMap[name].openPrice * 100);
    if (this.positions[name] === null) {
      console.error(`Position does not exist for ${name}`);
      Promise.reject(false);
    }
    console.log(`SELLING ${name} AT ${cost}`);
    this.moneyInCents += cost * position.qty;
    delete this.positions[name];
    return Promise.resolve(true);
  }
  GetCurrentBalance(): Promise<number> {
    return Promise.resolve(this.moneyInCents);
  }
  Name(): string {
    return "Simulated Market";
  }

  private buildPosition(ticker: string, shareCount: number) {
    return {
      raw: null,
      asset_id: "TODO",
      symbol: ticker,
      exchange: "TODO",
      asset_class: "TODO",
      avg_entry_price: this.stockMap[ticker].openPrice,
      qty: shareCount,
      side: null,
      market_value: 0,
      cost_basis: 0,
      unrealized_pl: 0,
      unrealized_intraday_pl: 0,
      unrealized_intraday_plpc: 0,
      unrealized_plpc: 0,
      current_price: 0,
      lastday_price: 0,
      change_today: 0,
    };
  }
}
