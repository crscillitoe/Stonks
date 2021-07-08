import { AlpacaStream, Bar } from "@master-chief/alpaca";

const stream = new AlpacaStream({
  credentials: {
    key: "xxxxxx",
    secret: "xxxxxxxxxxxx",
    paper: true,
  },
  type: "market_data", // or "account"
  source: "iex", // or "sip" depending on your subscription
});

stream.once("authenticated", () => {
  stream.subscribe("bars", ["AAPL", "TSLA"]);
});

stream.on("bar", (bar: Bar) => console.log(bar));
console.log("Initiating investment...");
