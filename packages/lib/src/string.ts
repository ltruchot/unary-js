/** Data last: `strConcat("b")("a")` is `"ab"`. */
export const strConcat =
  (s1: string) =>
  (s2: string): string =>
    s2 + s1;

/** The character at index `n`, `""` out of range. */
export const charAt =
  (n: number) =>
  (s: string): string =>
    s.charAt(n);
