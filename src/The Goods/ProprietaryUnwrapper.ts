import { FixedSizeArray } from "fixed-size-array";

export function OnePlease<T>(theGOods: FixedSizeArray<1, T>): T {
  return theGOods.slice(0, 1)[0];
}
