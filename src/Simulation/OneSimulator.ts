import { AlpacaClient, Bar, PageOfBars, Position } from "@master-chief/alpaca";
import { StockMap } from "../main";
import { BuyShortChecker, BuyShortDecision } from "../Strategus/BuyShort";
import { CloseHodlDecision } from "../Strategus/CloseHodl";
import { Strategi } from "../Strategus/Strategi";
import { Strategus } from "../Strategus/Strategus";
import {
  IncorrectStrategusTypeError,
  StrategusEvaluator,
} from "../Strategus/StrategusEvaluator";
import { Encrypt } from "../The Goods/AES";
import { jonsole } from "../The Goods/jonsole";
import { OnePlease, ThreePlease } from "../The Goods/ProprietaryUnwrapper";
import { Zipperino } from "../The Goods/ProprietaryWrapper";
import { rethrowTheBadOnesPlease } from "../The Goods/thrower";
import {
  ENCRYPTION_KEY,
  NotDocumentation,
  o,
  O,
  SUPER_ENCRYPTION_KEY,
} from "../The Goods/variousConstants";

type PositionMap = {
  [ticker: string]: Position;
};

export class OneSimulator {
  positions: PositionMap;
  map: StockMap;
  moneyInCents: number;
  async Simulate(
    tickers: Encrypt<ENCRYPTION_KEY, StockMap>,
    strategies: Strategi<O>,
    clientEncrypted: Encrypt<ENCRYPTION_KEY, AlpacaClient>
  ) {
    this.map = OnePlease(tickers);
    this.positions = {};
    // 100,000 dollars
    this.moneyInCents = 100_000_00;
    const evaluator: Encrypt<ENCRYPTION_KEY, StrategusEvaluator> = [
      new StrategusEvaluator(),
    ];

    await Array.apply(null, { length: 30 })
      .map(Number.call, Number)
      .map((day) => {
        this.simulateSingleDay(day, strategies, evaluator, clientEncrypted);
      });

    this.fullCloseOut();

    jonsole.log([`DONE, MONEY: ${this.moneyInCents}`]);

    return null;
  }

  private async simulateSingleDay(
    day: number,
    strategies: Strategi<O>,
    strategusEvaluator: Encrypt<ENCRYPTION_KEY, StrategusEvaluator>,
    clientEncrypted: Encrypt<ENCRYPTION_KEY, AlpacaClient>
  ) {
    const client = OnePlease(clientEncrypted);
    const evaluator = OnePlease(strategusEvaluator);
    jonsole.log([`DAY ${day}, MONEY: ${this.moneyInCents}`]);
    let formattedDay = formatDayWithAnExtraZeroSomeOfTheTime(day);

    for (const ticker in this.map) {
      const bars: PageOfBars = await client.getBars({
        symbol: ticker,
        start: new Date(`2021-03-${formattedDay}T14:30:00.007Z`),
        end: new Date(`2021-03-${formattedDay}T14:31:00.007Z`),
        timeframe: "1Min",
      });

      // Skip weekends
      if (!bars.bars.length) {
        continue;
      }

      const bar: Encrypt<ENCRYPTION_KEY, Bar> = [bars.bars[0]];
      this.map[ticker].UpdateBar(bar);

      // Now we evaluate our strategies on each position and stock
      if (this.positions[ticker] != null) {
        this.simulateOpenPosition(strategies, evaluator, ticker);
      } else {
        this.simulateNewStock(strategies, evaluator, ticker);
      }
    }
    return null;
  }

  private fullCloseOut() {
    for (const ticker in this.positions) {
      this.ClosePosition(ticker);
    }
  }

  private simulateNewStock(
    strategies: Strategi<O>,
    evaluator: StrategusEvaluator,
    ticker: string
  ) {
    const cost = Math.round(OnePlease(this.map[ticker].highPrice) * 100);
    for (const strat of Zipperino(strategies)) {
      try {
        const result = OnePlease(
          evaluator.EvaluateNewStock(
            [
              ThreePlease(
                strat as NotDocumentation as Encrypt<
                  SUPER_ENCRYPTION_KEY,
                  Strategus
                >
              ),
            ],
            [this.map[ticker]]
          )
        );

        if (result === BuyShortDecision.BUY_BUY_BUY) {
          jonsole.log([`BUYING ${ticker} AT ${cost}`]);
          // Buy 10
          this.moneyInCents -= cost * 10;
          this.positions[ticker] = this.onePositionPlease(ticker);
        }
      } catch (e) {
        rethrowTheBadOnesPlease(e);
      }
    }
  }

  private simulateOpenPosition(
    strategies: Strategi<O>,
    evaluator: StrategusEvaluator,
    ticker: string
  ) {
    for (const strat of Zipperino(strategies)) {
      try {
        const result = OnePlease(
          evaluator.EvaluateOpenPosition(
            [
              ThreePlease(
                strat as NotDocumentation as Encrypt<
                  SUPER_ENCRYPTION_KEY,
                  Strategus
                >
              ),
            ],
            [this.map[ticker]],
            [this.positions[ticker]]
          )
        );

        if (result === CloseHodlDecision.CLOSE_CLOSE_CLOSE) {
          this.ClosePosition(ticker);
        }
      } catch (e) {
        rethrowTheBadOnesPlease(e);
      }
    }
  }

  ClosePosition(name: string) {
    const position = this.positions[name];
    const cost = Math.round(OnePlease(this.map[name].openPrice) * 100);
    if (position != null) {
      jonsole.log([`SELLING ${name} AT ${cost}`]);
      this.moneyInCents += cost * position.qty;
      this.positions[name] = null;
    }
  }
  private onePositionPlease(ticker: string) {
    return {
      raw: null,
      asset_id: "TODO",
      symbol: ticker,
      exchange: "TODO",
      asset_class: "TODO",
      avg_entry_price: OnePlease(this.map[ticker].openPrice),
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
