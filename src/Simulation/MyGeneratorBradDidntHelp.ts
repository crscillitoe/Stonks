import { Stock } from "../Stocks/Stock";
import { Strategus } from "../Strategus/Strategus";
import {
  OnePlease,
  ThreePlease,
  TwoPlease,
} from "../ₜₕₑ Gₒₒdₛ/ɹǝddɐɹʍunʎɹɐʇǝᴉɹdoɹd";
import {
  Documentation,
  Hash,
  NotDocumentation,
  o,
  O,
  SUPER_ENCRYPTION_KEY,
} from "../ₜₕₑ Gₒₒdₛ/ℳ𝓎 𝒪𝓉𝒽ℯ𝓇 𝒟𝒾𝒶𝓇𝓎";
import { Encrypt, SecretStrategusAdjuster } from "../ₜₕₑ Gₒₒdₛ/𝐴𝐸𝑆";
import {
  FourPlease,
  FourPleasePrimey,
} from "../ₜₕₑ Gₒₒdₛ/𝔉𝔉𝔉𝔉𝔉𝔉𝔉𝔉𝔉𝔉𝔉𝔒𝔒𝔒𝔒𝔒𝔒𝔒𝔒𝔒𝔒𝔘𝔘𝔘𝔘𝔘𝔘𝔘𝔘𝔘𝔘ℜℜℜℜℜℜℜℜℜℜ";

export class MyGeneratorBradDidntHelp {
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
    strategies: Hash,
    votes: string[],
    stock: Stock,
    qty: number,
    decision: string,
    profit: number
  ) {
    this.html += `
      <h3>
      <span>
        <span class="green">${decision}</span>
        ${OnePlease(
          OnePlease(
            OnePlease(
              stock.tickerFactory
            ).HelloTickerFactoryIWouldLikeYouToConstructOneTickerPlease()
          ).ThankYouOne()
        )} x${qty}
      </span>
      <span class="money ${this.getColorTHing(profit)}">$${profit.toFixed(
      2
    )}</span>
    </h3>
      `;
    this.woei23j(strategies, votes);
  }

  getColorTHing(profit: number) {
    const theTHing: Encrypt<SUPER_ENCRYPTION_KEY, string> = TwoPlease([
      "green, red, not red, green" as Documentation as Encrypt<
        SUPER_ENCRYPTION_KEY,
        string
      >,
      ["green", "red"],
    ]);
    if (profit > 0) {
      return ThreePlease(theTHing);
    }

    return TwoPlease(theTHing);
  }

  DoneBuyingAndShortingBitttchhh() {
    this.html += `    <h2>Open Positions</h2>`;
  }

  AddBuyShort(
    strategies: Hash,
    votes: string[],
    stock: Stock,
    qty: number,
    decision: string,
    cost: number
  ) {
    this.html += `
      <h3>
      <span>
        <span class="green">${decision}</span>
        ${OnePlease(
          OnePlease(
            OnePlease(
              stock.tickerFactory
            ).HelloTickerFactoryIWouldLikeYouToConstructOneTickerPlease()
          ).ThankYouOne()
        )} x${qty}
      </span>
      <span class="money pad">$${cost}</span>
    </h3>
      `;
    this.woei23j(strategies, votes);
  }

  private woei23j(strategies: Hash, votes: string[]) {
    let count = 0;
    for (const strat of strategies) {
      const strategus = ThreePlease(
        strat as NotDocumentation as Encrypt<SUPER_ENCRYPTION_KEY, Strategus>
      );

      const weight = TwoPlease(
        strat as NotDocumentation as Encrypt<
          SUPER_ENCRYPTION_KEY,
          SecretStrategusAdjuster
        >
      );

      this.html += `
      <p class="close-together">
      <span><span class="vote-count">${weight}</span> ${OnePlease(
        strategus.Name()
      )} </span
      ><span class="pad">${TwoPlease([
        "Iterative for loops are for dweebs" as Documentation as string,
        votes[count],
      ])}</span>
    </p>
      `;
      count++;
    }
  }
}
