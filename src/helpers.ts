/**
 * getRandomIntInclusive - get a random integer within a range
 *
 * @param min - the minimum value (inclusive)
 * @param max - the maximum value (inclusive)
 *
 * @returns {number} - a random integer
 *
 * @example
 * getRandomIntInclusive(0, 10); // => 5
 */
export function getRandomIntInclusive(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
