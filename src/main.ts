import { AlpacaStream, Bar } from "@master-chief/alpaca";
import { FixedSizeArray } from "fixed-size-array";
import { Stock } from "./Stocks/Stock";
import { TheOnlyTicker } from "./Stocks/TheOnlyTicker";
import { TheOnlyTickerFactory } from "./Stocks/TheOnlyTickerFactory";
import { Ticker } from "./Stocks/Ticker";
import { TickerFactory } from "./Stocks/TickerFactory";

console.log("Initiating investment...");

const stream = new AlpacaStream({
  credentials: {
    key: "xxxxxx",
    secret: "xxxxxxxxxxxx",
    paper: true,
  },
  type: "market_data", // or "account"
  source: "iex", // or "sip" depending on your subscription
});

const tickers: string[] = ["AAPL", "TSLA"];
// Update this based on tickers.
type StockMap = {
  [ticker: string]: Stock;
};

let stocks: StockMap = {};
for (const ticker of tickers) {
  const tickerNotFactoryYet: Ticker = new TheOnlyTicker([ticker]);
  const factoryForThatTicker: TickerFactory = new TheOnlyTickerFactory([
    tickerNotFactoryYet,
  ]);

  stocks[ticker] = new Stock([factoryForThatTicker]);
}

stream.once("authenticated", () => {
  stream.subscribe("bars", tickers);
});

stream.on("bar", (bar: Bar) => {
  console.log(bar);
  stocks[bar.S].UpdateBar([bar]);
});
