import { Stock } from "../Stocks/Stock";
import { BuyShortDecision } from "../Strategus/BuyShort";
import { CloseHodlDecision } from "../Strategus/CloseHodl";
import { WeightedStrategi } from "../Strategus/Shared";
import { WeightedBuyShortStrategi } from "../Strategus/WeightedBuyShorts";
import { WeightedCloseHodlStrategi } from "../Strategus/WeightedCloseHodls";

export class HTMLDigestGenerator {
  style = `
    <style>
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");
  * {
    font-family: "Open Sans", sans-serif;
    color: white;
  }
  html {
    background-color: #303030;
  }
  .green {
    color: lightgreen;
  }
  .yellow {
    color: #f8ff8f;
  }
  .red {
    color: orangered;
  }
  .close-together {
    line-height: 0.3rem;
    display: flex;
    justify-content: space-between;
  }
  .pad {
    padding-left: 50px;
  }
  h3 {
    display: flex;
    justify-content: space-between;
  }
  .outer-div {
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
  }
  .inner-div {
    padding-left: 5rem;
    padding-right: 5rem;
    background-color: #404040;
    border-radius: 5px;
  }
  .center {
    text-align: center;
  }
  .money pad {
    font-family: "Roboto Mono", monospace;
  }
  .vote-count {
    font-family: "Roboto Mono", monospace;
    padding-right: 1em;
  }
</style>`;

  html: string = "";

  constructor(day: number) {
    this.html = "";
    this.html += this.style;
    this.html += `
<div class="outer-div">
    <a href="https://stocks.woohoojin.dev/digest${day - 1}.html">back</a>
    <a href="https://stocks.woohoojin.dev/digest${day + 1}.html">next</a>
  <div class="inner-div">
    <h1>Day ${day}</h1>
    <hr />
    <h2>Positions Opened</h2>
    `;
  }

  complete(): string {
    this.html += `
      </div>
      </div>
      `;

    return this.html;
  }

  AddOpenPosition(
    strategies: WeightedCloseHodlStrategi,
    votes: CloseHodlDecision[],
    stock: Stock,
    qty: number,
    decision: string,
    profit: number
  ) {
    this.html += `
      <h3>
      <span>
        <span class="green">${decision}</span>
        ${stock.ticker} x${qty}
      </span>
      <span class="money ${this.getColorForProfit(profit)}">$${profit.toFixed(
      2
    )}</span>
    </h3>
      `;

    this.listStrategusVotes(strategies, votes);
  }

  getColorForProfit(profit: number): "green" | "red" {
    if (profit > 0) {
      return "green";
    }

    return "red";
  }

  /**
   * Call once you finish adding BuyShort results to the
   * digest. Call before adding open positions.
   */
  CompleteBuyShort() {
    this.html += `    <h2>Open Positions</h2>`;
  }

  AddBuyShort(
    strategies: WeightedBuyShortStrategi,
    votes: BuyShortDecision[],
    stock: Stock,
    qty: number,
    decision: string,
    cost: number
  ) {
    this.html += `
      <h3>
      <span>
        <span class="green">${decision}</span>
        ${stock.ticker} x${qty}
      </span>
      <span class="money pad">$${cost}</span>
    </h3>
      `;
    this.listStrategusVotes(strategies, votes);
  }

  private listStrategusVotes(weighted: WeightedStrategi, votes: string[]) {
    let count = 0;
    for (const weightedStrat of weighted.strategies) {
      this.html += `
      <p class="close-together">
      <span><span class="vote-count">${
        weightedStrat.weight
      }</span> ${weightedStrat.strategy.Name()} </span
      ><span class="pad">${votes[count]}</span>
    </p>
      `;
      count++;
    }
  }
}
