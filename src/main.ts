import { AlpacaClient } from "@master-chief/alpaca";
import { CrankTurner } from "./Crank/CrankTurner";
import { Logger } from "./logger";
import { SimulatedMarket } from "./Markets/SimulatedMarket";
import { Stock, StockMap } from "./Stocks/Stock";
import { _69420 } from "./Strategus/BuyShort/69420";
import { RandomBuyShortStrategus } from "./Strategus/BuyShort/Random";
import { DiamondHandsCloseHodlStrategus } from "./Strategus/CloseHodl/DiamondHands";
import { PaperHandsCloseHodlStrategus } from "./Strategus/CloseHodl/PaperHands";
import { RandomCloseHodlStrategus } from "./Strategus/CloseHodl/Random";
import { WeightedBuyShortStrategi } from "./Strategus/WeightedBuyShorts";
import { WeightedCloseHodlStrategi } from "./Strategus/WeightedCloseHodls";
import { api_url, notSecret, secret } from "./ₜₕₑ Gₒₒdₛ/𝓶𝔂 𝓭𝓲𝓪𝓻𝔂";

console.log("Initiating investment...");
console.log(`connecting to ${api_url}`);

const client = new AlpacaClient({
  credentials: {
    key: notSecret,
    secret: secret,
    paper: true,
  },
  rate_limit: true,
});

const weightedBuyShortStrategies: WeightedBuyShortStrategi =
  new WeightedBuyShortStrategi();
weightedBuyShortStrategies.Add(new RandomBuyShortStrategus(), 1);
weightedBuyShortStrategies.Add(new _69420(), Number.POSITIVE_INFINITY);

const weightedCloseHodlStrategies: WeightedCloseHodlStrategi =
  new WeightedCloseHodlStrategi();
weightedCloseHodlStrategies.Add(new RandomCloseHodlStrategus(), 1);
weightedCloseHodlStrategies.Add(
  new DiamondHandsCloseHodlStrategus(),
  Number.POSITIVE_INFINITY
);
weightedCloseHodlStrategies.Add(new PaperHandsCloseHodlStrategus(), 1);

const tickers: string[] = [
  "AAPL",
  "TSLA",
  "DAC",
  "SBOW",
  "UAN",
  "JYNT",
  "SAVA",
  "SIG",
];
let stocks: StockMap = {};
for (const ticker of tickers) {
  stocks[ticker] = new Stock(ticker);
}
// $100,000 investment
const moneyInCents = 100_000_00;
const market = new SimulatedMarket(moneyInCents);
const crankTurner = new CrankTurner(
  market,
  stocks,
  weightedBuyShortStrategies,
  weightedCloseHodlStrategies,
  client
);
const startDate = new Date(2021, 3, 1);
const endDate = new Date(2021, 3, 31);
Logger.overwriteLogger();
Logger.setDebug(true);
console.log("test");
// crankTurner.SimulateDailyRange(startDate, endDate).then(() => {});
