import { AlpacaClient, Bar, PageOfBars, Position } from "@master-chief/alpaca";
import { StockMap } from "../main";
import { BuyShortChecker, BuyShortDecision } from "../Strategy/BuyShort";
import { CloseHodlDecision } from "../Strategy/CloseHodl";
import { Strategy } from "../Strategy/Strategy";
import { StrategyEvaluator } from "../Strategy/StrategyEvaluator";
import { Encrypt } from "../The Goods/AES";
import { jonsole } from "../The Goods/jonsole";
import { OnePlease } from "../The Goods/ProprietaryUnwrapper";
import { ENCRYPTION_KEY } from "../The Goods/variousConstants";

type PositionMap = {
  [ticker: string]: Position;
};

export class OneSimulator {
  positions: PositionMap;
  map: StockMap;
  moneyInCents: number;
  async Simulate(
    tickers: Encrypt<ENCRYPTION_KEY, StockMap>,
    strategies: Encrypt<ENCRYPTION_KEY, Strategy[]>,
    clientEncrypted: Encrypt<ENCRYPTION_KEY, AlpacaClient>
  ) {
    this.map = OnePlease(tickers);
    const strats = OnePlease(strategies);
    const client = OnePlease(clientEncrypted);
    this.positions = {};
    // 100,000 dollars
    this.moneyInCents = 100_000_00;
    const evaluator = new StrategyEvaluator();
    let cost = 0;

    for (let day = 1; day < 30; day++) {
      jonsole.log([`DAY ${day}, MONEY: ${this.moneyInCents}`]);
      let formattedDay = "" + day;
      if (day < 10) {
        formattedDay = "0" + formattedDay;
      }

      for (const key in this.map) {
        const bars: PageOfBars = await client.getBars({
          symbol: key,
          start: new Date(`2021-03-${formattedDay}T14:30:00.007Z`),
          end: new Date(`2021-03-${formattedDay}T14:31:00.007Z`),
          timeframe: "1Min",
        });

        if (bars.bars.length < 1) {
          continue;
        }
        const bar: Encrypt<ENCRYPTION_KEY, Bar> = [bars.bars[0]];
        this.map[key].UpdateBar(bar);

        // Now we evaluate our strategies on each position and stock
        cost = Math.round(OnePlease(this.map[key].highPrice) * 100);
        if (this.positions[key] != null) {
          for (const strat of strats) {
            try {
              const result = OnePlease(
                evaluator.EvaluateOpenPosition(
                  [strat],
                  [this.map[OnePlease(bar).S]],
                  [this.positions[key]]
                )
              );

              if (result === CloseHodlDecision.HODL_HODL_HODL) {
                continue;
              } else if (result === CloseHodlDecision.CLOSE_CLOSE_CLOSE) {
                this.ClosePosition(key);
              }
            } catch {
              continue;
            }
          }
        } else {
          for (const strat of strats) {
            try {
              const result = OnePlease(
                evaluator.EvaluateNewStock(
                  [strat],
                  [this.map[OnePlease(bar).S]]
                )
              );

              if (result === BuyShortDecision.DO_NOTHING) {
                continue;
              } else if (result === BuyShortDecision.BUY_BUY_BUY) {
                jonsole.log([`BUYING ${key} AT ${cost}`]);
                // Buy 10
                this.moneyInCents -= cost * 10;
                this.positions[key] = {
                  raw: null,
                  asset_id: "TODO",
                  symbol: key,
                  exchange: "TODO",
                  asset_class: "TODO",
                  avg_entry_price: OnePlease(this.map[key].highPrice),
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
              } else if (result === BuyShortDecision.SHORT_SHORT_SHORT) {
                continue;
              }
            } catch {
              continue;
            }
          }
        }
      }
    }

    for (const key in this.positions) {
      this.ClosePosition(key);
    }

    jonsole.log([`DONE, MONEY: ${this.moneyInCents}`]);

    return null;
  }

  ClosePosition(name: string) {
    const position = this.positions[name];
    const cost = Math.round(OnePlease(this.map[name].highPrice) * 100);
    if (position != null) {
      jonsole.log([`SELLING ${name} AT ${cost}`]);
      this.moneyInCents += cost * position.qty;
      this.positions[name] = null;
    }
  }
}
