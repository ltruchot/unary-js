import { equals } from './any';
import { gt } from './number';
import { left, right, Pair } from './pair';

export const isBalancedPair = <T>(a: Pair<T>): boolean => equals(<T>left(a))(<T>right(a));
export const isLeftGreater = (a: Pair<number>): boolean => gt(<number>right(a))(<number>left(a));
