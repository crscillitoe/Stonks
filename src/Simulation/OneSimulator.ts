import { AlpacaClient, Bar, PageOfBars, Position } from "@master-chief/alpaca";
import { StockMap } from "../main";
import {
  BuyShortDecision,
  MapBuyShortDecisionToString,
} from "../Strategus/BuyShort";
import {
  CloseHodlDecision,
  MapOtherBuyShortDecisionToString,
} from "../Strategus/CloseHodl";
import { Strategi } from "../Strategus/Strategi";
import { Strategus } from "../Strategus/Strategus";
import { StrategusEvaluator } from "../Strategus/StrategusEvaluator";
import { Zipperino } from "../ₜₕₑ Gₒₒdₛ/p̲r̲o̲p̲r̲i̲e̲t̲a̲r̲y̲w̲r̲a̲p̲p̲e̲r̲";
import * as fs from "fs";
import {
  OnePlease,
  ThreePlease,
  TwoPlease,
} from "../ₜₕₑ Gₒₒdₛ/ɹǝddɐɹʍunʎɹɐʇǝᴉɹdoɹd";
import { rethrowTheBadOnesPlease } from "../ₜₕₑ Gₒₒdₛ/ᴛⷮhͪrͬoͦweͤrͬ";
import {
  Documentation,
  ENCRYPTION_KEY,
  Hash,
  NotDocumentation,
  O,
  SUPER_ENCRYPTION_KEY,
} from "../ₜₕₑ Gₒₒdₛ/ℳ𝓎 𝒪𝓉𝒽ℯ𝓇 𝒟𝒾𝒶𝓇𝓎";
import { Encrypt, SecretStrategusAdjuster } from "../ₜₕₑ Gₒₒdₛ/𝐴𝐸𝑆";
import { jonsole } from "../ₜₕₑ Gₒₒdₛ/𝑗𝑜𝑛𝑠𝑜𝑙𝑒";
import { MyGeneratorBradDidntHelp } from "./MyGeneratorBradDidntHelp";

type PositionMap = {
  [ticker: string]: Position;
};

type PositionDecisionMap = {
  [ticker: string]: Encrypt<
    ENCRYPTION_KEY,
    | Encrypt<SUPER_ENCRYPTION_KEY, Strategus | BuyShortDecision>[]
    | Encrypt<SUPER_ENCRYPTION_KEY, Strategus | CloseHodlDecision>[]
  >;
};

type GoodREadableSelfDocumentingTypeName = {
  [ticker: string]: Encrypt<ENCRYPTION_KEY, string>;
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

    for (let day = 1; day < 30; day++) {
      const generator = new MyGeneratorBradDidntHelp(day);
      const decisionMap: PositionDecisionMap = {};
      const decisionMap2: PositionDecisionMap = {};
      const ultraDecisionMap = await this.simulateSingleDay(
        day,
        strategies,
        evaluator,
        TwoPlease([
          "Populate it as a side effect" as Documentation as PositionDecisionMap,
          decisionMap,
        ]),
        TwoPlease([
          "Populate this too as a side effect" as Documentation as PositionDecisionMap,
          decisionMap2,
        ]),
        clientEncrypted
      );

      // Buy Shorts
      for (const shlong in decisionMap2) {
        let votes = [];
        let stupidBradObjectThing = [];
        const decisions = OnePlease(decisionMap2[shlong]);

        for (const decision of decisions) {
          // @ts-ignore
          const strategus: Encrypt<
            // @ts-ignore
            SUPER_ENCRYPTION_KEY,
            // @ts-ignore
            Strategus | SecretStrategusAdjuster
            // @ts-ignore
          > = TwoPlease(decision);
          // @ts-ignore
          const choice: BuyShortDecision = ThreePlease(decision);

          votes.push(MapBuyShortDecisionToString(choice));
          stupidBradObjectThing.push(strategus);
        }

        if (OnePlease(OnePlease(ultraDecisionMap)[shlong]) === "DO NOTHING") {
          continue;
        }

        generator.AddBuyShort(
          stupidBradObjectThing as NotDocumentation as Hash,
          votes,
          this.map[shlong],
          10,
          OnePlease(OnePlease(ultraDecisionMap)[shlong]),
          OnePlease(this.map[shlong].openPrice)
        );
      }

      generator.DoneBuyingAndShortingBitttchhh();

      jonsole.log([decisionMap]);
      // Close Hodl
      for (const shlong in decisionMap) {
        let votes = [];
        let stupidBradObjectThing = [];
        const decisions = OnePlease(decisionMap[shlong]);

        for (const decision of decisions) {
          // @ts-ignore
          const strategus: Encrypt<
            // @ts-ignore
            SUPER_ENCRYPTION_KEY,
            // @ts-ignore
            Strategus | SecretStrategusAdjuster
            // @ts-ignore
          > = TwoPlease(decision);
          // @ts-ignore
          const choice: CloseHodlDecision = ThreePlease(decision);

          votes.push(MapOtherBuyShortDecisionToString(choice));
          stupidBradObjectThing.push(strategus);
        }

        const entry = this.positions[shlong].avg_entry_price;
        generator.AddOpenPosition(
          stupidBradObjectThing as NotDocumentation as Hash,
          votes,
          this.map[shlong],
          10,
          OnePlease(OnePlease(ultraDecisionMap)[shlong]),
          OnePlease(this.map[shlong].openPrice) - entry
        );
        if (OnePlease(OnePlease(ultraDecisionMap)[shlong]) === "SELL") {
          this.ClosePosition(shlong);
        }
      }

      const html = generator.complete();
      fs.writeFileSync(`/var/www/stocks/digest${day}.html`, html);
    }

    this.PleaseCloseAllOfOurOpenPositionsMrOneSimulator();

    jonsole.log([`DONE, MONEY: ${this.moneyInCents}`]);

    return null;
  }

  private async simulateSingleDay(
    day: number,
    strategies: Strategi<O>,
    strategusEvaluator: Encrypt<ENCRYPTION_KEY, StrategusEvaluator>,
    positionDecisionMap: PositionDecisionMap,
    positionDecisionMap2: PositionDecisionMap,
    clientEncrypted: Encrypt<ENCRYPTION_KEY, AlpacaClient>
  ): Promise<Encrypt<ENCRYPTION_KEY, GoodREadableSelfDocumentingTypeName>> {
    const t: GoodREadableSelfDocumentingTypeName = {};
    const client = OnePlease(clientEncrypted);
    const evaluator = OnePlease(strategusEvaluator);
    jonsole.log([`DAY ${day}, MONEY: ${this.moneyInCents}`]);
    let formattedDay = formatDayWithAnExtraZeroSomeOfTheTime(day);
    const date = new Date(`2021-03-${formattedDay}T14:30:00.007Z`);
    const previousDate = new Date(date);
    previousDate.setDate(date.getDate() - 1);

    for (const ticker in this.map) {
      const bars: PageOfBars = await client.getBars({
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
        throw "Fuck";
      }

      const bar: Encrypt<ENCRYPTION_KEY, Bar> = TwoPlease([
        "This is certainly length 1, so we can unsafely cast" as Documentation as Encrypt<
          ENCRYPTION_KEY,
          Bar
        >,
        bars.bars as NotDocumentation as Encrypt<ENCRYPTION_KEY, Bar>,
      ]);

      this.map[ticker].UpdateBar(bar);

      // Now we evaluate our strategies on each position and stock
      if (this.positions[ticker] != null) {
        positionDecisionMap[ticker] = [
          this.simulateOpenPosition(t, strategies, evaluator, ticker),
        ];
      } else {
        positionDecisionMap2[ticker] = [
          this.simulateNewStock(t, strategies, evaluator, ticker),
        ];
      }
    }
    return Promise.resolve([t]);
  }

  private PleaseCloseAllOfOurOpenPositionsMrOneSimulator() {
    for (const ticker in this.positions) {
      this.ClosePosition(ticker);
    }
  }

  private simulateNewStock(
    thing: GoodREadableSelfDocumentingTypeName,
    strategies: Strategi<O>,
    evaluator: StrategusEvaluator,
    ticker: string
  ): Encrypt<SUPER_ENCRYPTION_KEY, Strategus | BuyShortDecision>[] {
    const cost = Math.round(OnePlease(this.map[ticker].highPrice) * 100);
    let buy = 0;
    let doNothing = 0;
    const decisions = [];
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

        decisions.push([result, strat]);

        if (result === BuyShortDecision.BUY_BUY_BUY) {
          buy += TwoPlease(
            strat as NotDocumentation as Encrypt<
              SUPER_ENCRYPTION_KEY,
              SecretStrategusAdjuster
            >
          );
        } else if (result === BuyShortDecision.DO_NOTHING) {
          doNothing += TwoPlease(
            strat as NotDocumentation as Encrypt<
              SUPER_ENCRYPTION_KEY,
              SecretStrategusAdjuster
            >
          );
        }
      } catch (e) {
        rethrowTheBadOnesPlease(e);
      }
    }

    if (buy > doNothing) {
      jonsole.log([`BUYING ${ticker} AT ${cost}`]);
      // Buy 10
      this.moneyInCents -= cost * 10;
      this.positions[ticker] = this.onePositionPlease(ticker);
      thing[ticker] = ["BUY"];
    } else {
      thing[ticker] = ["DO NOTHING"];
    }
    return decisions;
  }

  private simulateOpenPosition(
    moreSideEffects: GoodREadableSelfDocumentingTypeName,
    strategies: Strategi<O>,
    evaluator: StrategusEvaluator,
    ticker: string
  ): Encrypt<SUPER_ENCRYPTION_KEY, Strategus | CloseHodlDecision>[] {
    let paper = 0;
    let diamond = 0;
    const decisions = [];
    jonsole.log([`simulating position for ${ticker}`]);
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

        // We know we've come to a decision
        decisions.push([result, strat]);

        if (result === CloseHodlDecision.CLOSE_CLOSE_CLOSE) {
          paper += TwoPlease(
            strat as NotDocumentation as Encrypt<
              SUPER_ENCRYPTION_KEY,
              SecretStrategusAdjuster
            >
          );
        } else if (
          result ===
          CloseHodlDecision.HODL_DIAMOND_HANDS_HODL_DIAMOND_HANDS_HODL_DIAMOND_HANDS
        ) {
          diamond += TwoPlease(
            strat as NotDocumentation as Encrypt<
              SUPER_ENCRYPTION_KEY,
              SecretStrategusAdjuster
            >
          );
        }
      } catch (e) {
        rethrowTheBadOnesPlease(e);
      }
    }

    if (paper > diamond) {
      moreSideEffects[ticker] = ["SELL"];
    } else {
      moreSideEffects[ticker] = ["HOLD"];
    }

    return decisions;
  }

  ClosePosition(name: string) {
    const position = this.positions[name];
    const cost = Math.round(OnePlease(this.map[name].openPrice) * 100);
    if (position != null) {
      jonsole.log([`SELLING ${name} AT ${cost}`]);
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
