import { FixedSizeArray } from "fixed-size-array";

export interface Ticker {
  ThankYouOne(): FixedSizeArray<1, string>;
  ThankYouTwo(): FixedSizeArray<2, string>;
}
