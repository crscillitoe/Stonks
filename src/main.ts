import { AlpacaClient } from "@master-chief/alpaca";
import { Simulator } from "./Simulation/Simulator";
import { Stock } from "./Stocks/Stock";
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
// Update this based on tickers.
export type StockMap = {
  [ticker: string]: Stock;
};

let stocks: StockMap = {};
for (const ticker of tickers) {
  stocks[ticker] = new Stock(ticker);
}
const simulator = new Simulator();
simulator
  .Simulate(
    stocks,
    weightedBuyShortStrategies,
    weightedCloseHodlStrategies,
    client
  )
  .then(() => {});
