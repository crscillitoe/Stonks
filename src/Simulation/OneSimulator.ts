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
import { Encrypt } from "../ₜₕₑ Gₒₒdₛ/𝐴𝐸𝑆";
import { jonsole } from "../ₜₕₑ Gₒₒdₛ/𝑗𝑜𝑛𝑠𝑜𝑙𝑒";
import { OnePlease, ThreePlease } from "../ₜₕₑ Gₒₒdₛ/ɹǝddɐɹʍunʎɹɐʇǝᴉɹdoɹd";
import { Zipperino } from "../ₜₕₑ Gₒₒdₛ/p̲r̲o̲p̲r̲i̲e̲t̲a̲r̲y̲w̲r̲a̲p̲p̲e̲r̲";
import { rethrowTheBadOnesPlease } from "../ₜₕₑ Gₒₒdₛ/ᴛⷮhͪrͬoͦweͤrͬ";
import {
  ENCRYPTION_KEY,
  NotDocumentation,
  o,
  O,
  SUPER_ENCRYPTION_KEY,
} from "../ₜₕₑ Gₒₒdₛ/ℳ𝓎 𝒪𝓉𝒽ℯ𝓇 𝒟𝒾𝒶𝓇𝓎";

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

    await this.simulateSingleDay(1, strategies, evaluator, clientEncrypted);
    await this.simulateSingleDay(2, strategies, evaluator, clientEncrypted);
    await this.simulateSingleDay(3, strategies, evaluator, clientEncrypted);
    await this.simulateSingleDay(4, strategies, evaluator, clientEncrypted);
    await this.simulateSingleDay(5, strategies, evaluator, clientEncrypted);
    await this.simulateSingleDay(6, strategies, evaluator, clientEncrypted);
    await this.simulateSingleDay(7, strategies, evaluator, clientEncrypted);
    await this.simulateSingleDay(8, strategies, evaluator, clientEncrypted);
    await this.simulateSingleDay(9, strategies, evaluator, clientEncrypted);
    await this.simulateSingleDay(10, strategies, evaluator, clientEncrypted);
    await this.simulateSingleDay(11, strategies, evaluator, clientEncrypted);
    await this.simulateSingleDay(12, strategies, evaluator, clientEncrypted);
    await this.simulateSingleDay(13, strategies, evaluator, clientEncrypted);
    await this.simulateSingleDay(14, strategies, evaluator, clientEncrypted);
    await this.simulateSingleDay(15, strategies, evaluator, clientEncrypted);
    await this.simulateSingleDay(16, strategies, evaluator, clientEncrypted);
    await this.simulateSingleDay(17, strategies, evaluator, clientEncrypted);
    await this.simulateSingleDay(18, strategies, evaluator, clientEncrypted);
    await this.simulateSingleDay(19, strategies, evaluator, clientEncrypted);
    await this.simulateSingleDay(20, strategies, evaluator, clientEncrypted);
    await this.simulateSingleDay(21, strategies, evaluator, clientEncrypted);
    await this.simulateSingleDay(22, strategies, evaluator, clientEncrypted);
    await this.simulateSingleDay(23, strategies, evaluator, clientEncrypted);
    await this.simulateSingleDay(24, strategies, evaluator, clientEncrypted);
    await this.simulateSingleDay(25, strategies, evaluator, clientEncrypted);

    this.PleaseCloseAllOfOurOpenPositionsMrOneSimulator();

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
    let formattedDay = FormatDayWIthANExTraZeROSOMEOFtheT_time(day);

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
        this.SimulateOpenPosition(strategies, evaluator, ticker);
      } else {
        this.SimulateNewStock(strategies, evaluator, ticker);
      }
    }
    return null;
  }

  private PleaseCloseAllOfOurOpenPositionsMrOneSimulator() {
    for (const ticker in this.positions) {
      this.ClosePosition(ticker);
    }
  }

  private SimulateNewStock(
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
          this.positions[ticker] = this.OnePositionPlease(ticker);
        }
      } catch (e) {
        rethrowTheBadOnesPlease(e);
      }
    }
  }

  private SimulateOpenPosition(
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
  private OnePositionPlease(ticker: string) {
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
function FormatDayWIthANExTraZeROSOMEOFtheT_time(day: number) {
  let formattedDay = "" + day;
  if (day < 10) {
    formattedDay = "0" + formattedDay;
  }
  return formattedDay;
}
