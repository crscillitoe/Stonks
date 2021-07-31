import { AlpacaClient, PageOfBars, Position } from "@master-chief/alpaca";
import { IMarket } from "../Markets/IMarket";
import { HTMLDigestGenerator } from "../Simulation/HTMLDigestGenerator";
import { BuyShortDecision, BuyShortStrategus } from "../Strategus/BuyShort";
import { CloseHodlDecision, CloseHodlStrategus } from "../Strategus/CloseHodl";
import {
  Strategus,
  StrategusDecision,
  StrategusDecisionPair,
} from "../Strategus/Shared";
import { WeightedBuyShortStrategi } from "../Strategus/WeightedBuyShorts";
import { WeightedCloseHodlStrategi } from "../Strategus/WeightedCloseHodls";
import * as fs from "fs";
import { StockMap } from "../Stocks/Stock";
import {
  BuyShortStrategusDecisionPair,
  CloseHodlStrategusDecisionPair,
} from "../Strategus/DecisionSummary";

type PositionDecisionMap = {
  [ticker: string]: StrategusDecisionPair[];
};

// Ok
export type FinalDecisions = {
  // Not that clean tho
  [ticker: string]: StrategusDecision;
};

export class Crank {
  private market: IMarket;
  private stockMap: StockMap;
  constructor(market: IMarket, stockMap: StockMap) {
    this.market = market;
    this.stockMap = stockMap;
  }
  async ProcessDate(
    date: Date,
    buyShortStrategies: WeightedBuyShortStrategi,
    closeHodlStrategies: WeightedCloseHodlStrategi,
    alpaca: AlpacaClient
  ) {
    const generator = new HTMLDigestGenerator(date);
    const buyShortDecisions: PositionDecisionMap = {};
    const closeHodlDecisions: PositionDecisionMap = {};
    const finalStrategyDecisions = await this.evaluateSingleDay(
      date,
      buyShortStrategies,
      closeHodlStrategies,
      buyShortDecisions,
      closeHodlDecisions,
      alpaca
    );

    // Buy Shorts
    for (const ticker in buyShortDecisions) {
      let votes: BuyShortDecision[] = [];
      const decisions = buyShortDecisions[ticker];
      console.debug("TICKER: " + ticker, decisions);

      for (const decision of decisions) {
        votes.push(decision[1] as BuyShortDecision);
      }

      if (finalStrategyDecisions[ticker] === "Do Nothing") {
        continue;
      }
      console.debug(`Opening position for ${ticker}`);
      this.market.OpenPosition(ticker, 10);

      generator.AddBuyShort(
        buyShortStrategies,
        votes,
        this.stockMap[ticker],
        10,
        finalStrategyDecisions[ticker],
        this.stockMap[ticker].openPrice
      );
    }

    generator.CompleteBuyShort();

    // Close Hodl
    for (const ticker in closeHodlDecisions) {
      let votes: CloseHodlDecision[] = [];
      const decisions = closeHodlDecisions[ticker];

      for (const decision of decisions) {
        votes.push(decision[1] as CloseHodlDecision);
      }

      const position = await this.market.GetPosition(ticker);
      if (position === null) {
        console.error(`No open position for ticker ${ticker}`);
        return Promise.reject();
      }
      const entry = position.avg_entry_price;
      generator.AddOpenPosition(
        closeHodlStrategies,
        votes,
        this.stockMap[ticker],
        10,
        finalStrategyDecisions[ticker],
        this.stockMap[ticker].openPrice - entry
      );
      if (finalStrategyDecisions[ticker] === "Close") {
        this.market.ClosePosition(position);
      }
    }

    const html = generator.complete();
    const digestName = generator.getDigestName(date);
    fs.writeFileSync(`/var/www/stocks/${digestName}`, html);
  }

  private async evaluateSingleDay(
    date: Date,
    buyShortStrategies: WeightedBuyShortStrategi,
    closeHodlStrategies: WeightedCloseHodlStrategi,
    // Please don't pass in maps and fill as side effects
    buyShortDecisions: PositionDecisionMap,
    // Please don't pass in maps and fill as side effects
    closeHodlDecisions: PositionDecisionMap,
    alpaca: AlpacaClient
  ): Promise<FinalDecisions> {
    const toReturn: FinalDecisions = {};
    const previousDate = new Date(date);
    previousDate.setDate(date.getDate() - 1);

    for (const ticker in this.stockMap) {
      console.debug(`Grabbing bars for ticker ${ticker}`);
      // Pull out grabbing bars into the crank turner
      const bars: PageOfBars = await alpaca.getBars({
        symbol: ticker,
        start: previousDate,
        end: date,
        timeframe: "1Day",
      });
      console.debug(bars);

      // Skip weekends
      if (bars.bars.length < 1) {
        continue;
      }

      if (bars.bars.length !== 1) {
        throw "Unexpected state: Received multiple bars for one 24hr window";
      }

      // Crank
      const bar = bars.bars[0];
      this.stockMap[ticker].UpdateBar(bar);

      // Now we evaluate our strategies on each position and stock
      console.debug(`Retrieving position for ${ticker}`);
      const position = await this.market.GetPosition(ticker);
      console.debug("Retrieved position: ", position);
      if (position != null) {
        closeHodlDecisions[ticker] =
          // Please don't pass in maps and fill as side effects
          await this.evaluateOpenPosition(
            toReturn,
            closeHodlStrategies,
            position
          );
      } else {
        buyShortDecisions[ticker] =
          // Please don't pass in maps and fill as side effects
          await this.evaluateNewStock(toReturn, buyShortStrategies, ticker);
      }
    }

    return Promise.resolve(toReturn);
  }
  private async evaluateNewStock(
    finalDecisionMap: FinalDecisions,
    strategies: WeightedBuyShortStrategi,
    ticker: string
  ): Promise<BuyShortStrategusDecisionPair[]> {
    const result = await strategies.Evaluate(this.stockMap[ticker]);
    finalDecisionMap[ticker] = result.finalDecision;
    return result.predictors;
  }

  private async evaluateOpenPosition(
    finalDecisionMap: FinalDecisions,
    strategies: WeightedCloseHodlStrategi,
    position: Position
  ): Promise<CloseHodlStrategusDecisionPair[]> {
    const ticker = position.symbol;
    const result = await strategies.Evaluate(this.stockMap[ticker], position);

    finalDecisionMap[ticker] = result.finalDecision;
    return result.predictors;
  }
}
