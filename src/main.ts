import { AlpacaClient, AlpacaStream, Bar } from "@master-chief/alpaca";
import { FixedSizeArray } from "fixed-size-array";
import { Stock } from "./Stocks/Stock";
import { TheOnlyTicker } from "./Stocks/TheOnlyTicker";
import { TheOnlyTickerFactory } from "./Stocks/TheOnlyTickerFactory";
import { Ticker } from "./Stocks/Ticker";
import { TickerFactory } from "./Stocks/TickerFactory";
import { jonsole } from "./The Goods/jonsole";
import { OnePlease } from "./The Goods/ProprietaryUnwrapper";
import { notKey, notSecret, the_apiThing } from "./The Goods/secrets";

jonsole.log(["Initiating investment..."]);
jonsole.log([`connecting to ${OnePlease(the_apiThing)}`]);

const stream = new AlpacaStream({
  credentials: {
    key: OnePlease(notSecret),
    secret: OnePlease(notKey),
    paper: true,
  },
  type: "market_data", // or "account"
  source: "iex", // or "sip" depending on your subscription
});

const client = new AlpacaClient({
  credentials: {
    key: OnePlease(notSecret),
    secret: OnePlease(notKey),
    paper: true,
  },
  rate_limit: true,
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
  jonsole.log(["We have authenticated BAYBEEEE"]);
  stream.subscribe("bars", tickers);
});

stream.on("bar", (bar: Bar) => {
  jonsole.log([bar]);
  stocks[bar.S].UpdateBar([bar]);
});

client.getAccount().then((account) => {
  jonsole.log([account.buying_power]);
});

client
  .getBars({
    symbol: "SPY",
    start: new Date("2021-02-26T14:30:00.007Z"),
    end: new Date("2021-02-26T14:35:00.007Z"),
    timeframe: "1Min",
  })
  .then((bars) => {
    jonsole.log([bars]);
  });
