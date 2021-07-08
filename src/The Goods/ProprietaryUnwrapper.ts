import { FixedSizeArray } from "fixed-size-array";

export function OnePlease<T>(theGOods: FixedSizeArray<1, T>): T {
  return theGOods.slice(0, 1)[0];
}

export function TwoPlease<T>(theBads: FixedSizeArray<2, T>): any {
  // TODO(bwbonanno): I had a dream where I wrote this but I forgot
  // TODO(christian): I think we can do this recursively with OnePlease?
  // TODO(bwbonanno): That might work but I'm not sure it's atomic
  // TODO(christian):
  throw "gotta write this one";
}
