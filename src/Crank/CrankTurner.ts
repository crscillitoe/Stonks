import { AlpacaClient } from "@master-chief/alpaca";
import { IMarket } from "../Markets/IMarket";
import { StockMap } from "../Stocks/Stock";
import { WeightedBuyShortStrategi } from "../Strategus/WeightedBuyShorts";
import { WeightedCloseHodlStrategi } from "../Strategus/WeightedCloseHodls";
import { Crank } from "./Crank";

export class CrankTurner {
  private crank: Crank;
  private buyShortStrategies: WeightedBuyShortStrategi;
  private closeHodlStrategies: WeightedCloseHodlStrategi;
  private alpaca: AlpacaClient;
  constructor(
    market: IMarket,
    stockMap: StockMap,
    buyShortStrategies: WeightedBuyShortStrategi,
    closeHodlStrategies: WeightedCloseHodlStrategi,
    alpaca: AlpacaClient
  ) {
    this.crank = new Crank(market, stockMap);
    this.buyShortStrategies = buyShortStrategies;
    this.closeHodlStrategies = closeHodlStrategies;
    this.alpaca = alpaca;
  }

  async SimulateDailyRange(startDate: Date, endDate: Date) {
    let date = new Date(startDate);
    while (date <= endDate) {
      console.debug(`Simulating ${date}`);
      await this.crank.ProcessDate(
        date,
        this.buyShortStrategies,
        this.closeHodlStrategies,
        this.alpaca
      );
      date.setDate(date.getDate() + 1);
    }
  }
}
