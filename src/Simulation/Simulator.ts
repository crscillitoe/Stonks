import { AlpacaClient, PageOfBars, Position } from "@master-chief/alpaca";
import { PositionMap, StockMap } from "../Stocks/Stock";
import { StrategusDecision } from "../Strategus/Shared";
import { WeightedBuyShortStrategi } from "../Strategus/WeightedBuyShorts";
import { WeightedCloseHodlStrategi } from "../Strategus/WeightedCloseHodls";
import { IMarket } from "../Markets/IMarket";

export class Simulator {
  stockMap: StockMap;
  positionMap: PositionMap;
  market: IMarket;
  async Simulate(
    tickers: StockMap,
    market: IMarket,
    buyShortStrategies: WeightedBuyShortStrategi,
    closeHodlStrategies: WeightedCloseHodlStrategi,
    alpaca: AlpacaClient
  ) {
    this.stockMap = tickers;
    this.market = market;

    this.CloseAllPositions();

    return null;
  }

  // God no

  private async CloseAllPositions() {
    const positions = await this.market.GetPositions();
    for (const ticker in positions) {
      this.market.ClosePosition(positions[ticker]);
    }
  }
}
