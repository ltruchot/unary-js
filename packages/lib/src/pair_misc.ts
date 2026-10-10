import { equals } from "./any.ts";
import { gt } from "./number.ts";
import { left, right } from "./pair.ts";
import type { Pair } from "./pair.ts";

export const isBalancedPair = <T>(a: Readonly<Pair<T>>): boolean => equals(left(a))(right(a));
export const isLeftGreater = (a: Readonly<Pair<number>>): boolean => gt(right(a))(left(a));
