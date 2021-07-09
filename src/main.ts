import { AlpacaClient, AlpacaStream, Bar } from "@master-chief/alpaca";
import { OneSimulator } from "./Simulation/OneSimulator";

import { Stock } from "./Stocks/Stock";
import { TheOnlyTicker } from "./Stocks/TheOnlyTicker";
import { TheOnlyTickerFactory } from "./Stocks/TheOnlyTickerFactory";
import { Ticker } from "./Stocks/Ticker";
import { TickerFactory } from "./Stocks/TickerFactory";
import { RandomBuyShortStrategy } from "./Strategy/BuyShortNotBuyHodlStrategies/Random";
import { RandomCloseHodlStrategy } from "./Strategy/CloseHodlNotCloseBuyStrategies/Random";
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

const strategies = [
  new RandomBuyShortStrategy(),
  new RandomCloseHodlStrategy(),
];

const tickers: string[] = ["AAPL", "TSLA"];
// Update this based on tickers.
export type StockMap = {
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

// Simulate.
if (true) {
  const simulator = new OneSimulator();
  simulator.Simulate([stocks], [strategies], [client]).then(() => {});
} else {
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
}
