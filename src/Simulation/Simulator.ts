import { AlpacaClient, PageOfBars, Position } from "@master-chief/alpaca";
import { Stock } from "../Stocks/Stock";
import { BuyShortDecision, BuyShortStrategus } from "../Strategus/BuyShort";
import { CloseHodlDecision, CloseHodlStrategus } from "../Strategus/CloseHodl";
import {
  Strategus,
  StrategusDecision,
  WeightedStrategus,
} from "../Strategus/Shared";
import { WeightedBuyShortStrategi } from "../Strategus/WeightedBuyShorts";
import { WeightedCloseHodlStrategi } from "../Strategus/WeightedCloseHodls";
import { HTMLDigestGenerator } from "./HTMLDigestGenerator";
import * as fs from "fs";

// Okay for now
export type PositionMap = {
  [ticker: string]: Position;
};

// Okay for now
type PositionDecisionMap = {
  // Don't use tuple forever
  [ticker: string]: [Strategus, StrategusDecision][];
};

// Ok
export type FinalDecisions = {
  // Not that clean tho
  [ticker: string]: StrategusDecision;
};

// Good
export type StockMap = {
  [ticker: string]: Stock;
};

export class Simulator {
  positions: PositionMap;
  map: StockMap;
  moneyInCents: number;
  async Simulate(
    tickers: StockMap,
    buyShortStrategies: WeightedBuyShortStrategi,
    closeHodlStrategies: WeightedCloseHodlStrategi,
    alpaca: AlpacaClient
  ) {
    // Sim
    this.map = tickers;

    // Sim
    this.positions = {};
    // 100,000 dollars
    this.moneyInCents = 100_000_00;

    // Crank
    for (let day = 1; day < 30; day++) {
      const generator = new HTMLDigestGenerator(day);
      const buyShortDecisions: PositionDecisionMap = {};
      const closeHodlDecisions: PositionDecisionMap = {};
      const finalStrategyDecisions = await this.simulateSingleDay(
        day,
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

        for (const decision of decisions) {
          votes.push(decision[1] as BuyShortDecision);
        }

        if (finalStrategyDecisions[ticker] === "Do Nothing") {
          continue;
        }

        generator.AddBuyShort(
          buyShortStrategies,
          votes,
          this.map[ticker],
          10,
          finalStrategyDecisions[ticker],
          this.map[ticker].openPrice
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

        const entry = this.positions[ticker].avg_entry_price;
        generator.AddOpenPosition(
          closeHodlStrategies,
          votes,
          this.map[ticker],
          10,
          finalStrategyDecisions[ticker],
          this.map[ticker].openPrice - entry
        );
        if (finalStrategyDecisions[ticker] === "Close") {
          this.ClosePosition(ticker);
        }
      }

      const html = generator.complete();
      fs.writeFileSync(`/var/www/stocks/digest${day}.html`, html);
    }

    this.PleaseCloseAllOfOurOpenPositionsMrOneSimulator();

    console.log([`DONE, MONEY: ${this.moneyInCents}`]);

    return null;
  }

  // God no
  private async simulateSingleDay(
    day: number,
    buyShortStrategies: WeightedBuyShortStrategi,
    closeHodlStrategies: WeightedCloseHodlStrategi,
    // Please don't pass in maps and fill as side effects
    buyShortDecisions: PositionDecisionMap,
    // Please don't pass in maps and fill as side effects
    closeHodlDecisions: PositionDecisionMap,
    alpaca: AlpacaClient
  ): Promise<FinalDecisions> {
    const toReturn: FinalDecisions = {};
    console.log(`DAY ${day}, MONEY: ${this.moneyInCents}`);
    let formattedDay = formatDayWithAnExtraZeroSomeOfTheTime(day);
    const date = new Date(`2021-03-${formattedDay}T14:30:00.007Z`);
    const previousDate = new Date(date);
    previousDate.setDate(date.getDate() - 1);

    for (const ticker in this.map) {
      const bars: PageOfBars = await alpaca.getBars({
        symbol: ticker,
        start: previousDate,
        end: date,
        timeframe: "1Day",
      });

      // Skip weekends
      if (bars.bars.length < 1) {
        continue;
      }

      if (bars.bars.length !== 1) {
        throw "Unexpected state: Received multiple bars for one 24hr window";
      }

      const bar = bars.bars[0];
      this.map[ticker].UpdateBar(bar);

      // Now we evaluate our strategies on each position and stock
      if (this.positions[ticker] != null) {
        closeHodlDecisions[ticker] =
          // Please don't pass in maps and fill as side effects
          await this.simulateOpenPosition(
            toReturn,
            closeHodlStrategies,
            ticker
          );
      } else {
        buyShortDecisions[ticker] =
          // Please don't pass in maps and fill as side effects
          await this.simulateNewStock(toReturn, buyShortStrategies, ticker);
      }
    }

    return Promise.resolve(toReturn);
  }

  private PleaseCloseAllOfOurOpenPositionsMrOneSimulator() {
    for (const ticker in this.positions) {
      this.ClosePosition(ticker);
    }
  }

  private async simulateNewStock(
    finalDecisionMap: FinalDecisions,
    strategies: WeightedBuyShortStrategi,
    ticker: string
  ): Promise<[BuyShortStrategus, BuyShortDecision][]> {
    const result = await strategies.Evaluate(this.map[ticker]);
    // Don't fucking side effect return tuples it's ugly
    finalDecisionMap[ticker] = result[0];
    return result[1];
  }

  private async simulateOpenPosition(
    // Please don't fill maps in as a side effect
    finalDecisionMap: FinalDecisions,
    strategies: WeightedCloseHodlStrategi,
    // Do we really need to pass just a ticker?
    // Maybe if we passed positions we wouldn't need
    // a global variable to store all of our shit
    ticker: string
  ): Promise<[CloseHodlStrategus, CloseHodlDecision][]> {
    const result = await strategies.Evaluate(
      this.map[ticker],
      this.positions[ticker]
    );

    // Don't fucking side effect return tuples it's ugly
    finalDecisionMap[ticker] = result[0];
    return result[1];
  }

  ClosePosition(name: string) {
    const position = this.positions[name];
    const cost = Math.round(this.map[name].openPrice * 100);
    if (position != null) {
      console.log(`SELLING ${name} AT ${cost}`);
      this.moneyInCents += cost * position.qty;
      delete this.positions[name];
    }
  }

  private onePositionPlease(ticker: string) {
    return {
      raw: null,
      asset_id: "TODO",
      symbol: ticker,
      exchange: "TODO",
      asset_class: "TODO",
      avg_entry_price: this.map[ticker].openPrice,
      qty: 10,
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
function formatDayWithAnExtraZeroSomeOfTheTime(day: number) {
  let formattedDay = "" + day;
  if (day < 10) {
    formattedDay = "0" + formattedDay;
  }
  return formattedDay;
}
