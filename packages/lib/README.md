# unary-js

Only unary functions, for the glory of functional programming in JavaScript.

⚠️ An educational project: do not use it in production. ⚠️

Every function takes exactly one argument and returns either a value or the next function.
The why and the how are in the [repository's README](https://github.com/ltruchot/unary-js#readme).

## Install

```sh
npm install unary-js
```

The package is ESM only (`import`, not `require`), ships its TypeScript declarations, and has no
dependencies. It needs Node.js 22.18 or later, or a bundler.

## Usage

```ts
import { compose3, filter, gt0, map, mul, sum } from "unary-js";

const sumOfDoubledPositives = compose3(sum)(map(mul(2)))(filter(gt0));

sumOfDoubledPositives([-1, 2, 3]); // 10
```

One argument at a time, the data last. For an operator, that means the first argument is the
right-hand operand:

```ts
import { add, gt, ifElse, sub } from "unary-js";

add(1)(2); // 3
sub(2)(44); // 42, as in 44 - 2
gt(0)(5); // true, as in 5 > 0

const describeSign = ifElse(gt(0))(() => "positive")(() => "not positive");
describeSign(5); // "positive"
describeSign(-5); // "not positive"
```

Lists and strings:

```ts
import { add, join, map, reduce, toFixed, toString, zip } from "unary-js";

reduce(0)(add)([1, 2, 3]); // 6
zip(["a", "b"])([1, 2]); // [[1, "a"], [2, "b"]]
join("-")(map(toString)([1, 2, 3])); // "1-2-3"
toFixed(2)(231.7888); // "231.79"
```

Stack-safe recursion: `safeY2` gives a recursive function of two curried arguments a `self` to
call instead of its own name, and runs it without growing the stack.

```ts
import { safeY2 } from "unary-js";

const factorial = safeY2<number, number, number>(
  (self) => (n) => (acc) => (n === 0 ? acc : self(n - 1)(n * acc)),
);

factorial(5)(1); // 120
factorial(100_000)(1); // Infinity, and no stack overflow
```

## API

Each function is typed: your editor shows its signature. The functions, by module:

| Module        | Functions                                                                                                                                 |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `any`         | `identity`, `equals`, `ifElse`, `unless`, `where`                                                                                         |
| `boolean`     | `t`, `f`, `not`, `and`, `nand`, `or`, `nor`, `without`, `xor`, `xor2`, `xor3`                                                             |
| `function`    | `compose2`, `compose3`, `applyTo`                                                                                                         |
| `number`      | `negate`, `add`, `sub`, `mul`, `div`, `pow`, `mod`, `gt`, `gte`, `lt`, `lte`, `isFinite`, `parseIntWithRadix`                             |
| `number_misc` | `inc`, `dec`, `eq0`, `lt0`, `gt0`, `isMultipleOf`, `abs`, `dropDecimal`, `round`, `roundFloat`                                            |
| `format_misc` | `toFixed`                                                                                                                                 |
| `pair`        | `left`, `right`, `bmap`, `lmap`, `rmap`                                                                                                   |
| `pair_misc`   | `isBalancedPair`, `isLeftGreater`                                                                                                         |
| `string`      | `strConcat`, `charAt`                                                                                                                     |
| `string_misc` | `strLength`, `split`, `join`, `padEnd`, `padStart`                                                                                        |
| `type`        | `toNumber`, `toString`, `toBoolean`, `isArray`, `isUndefined`                                                                             |
| `xs`          | `length`, `head`, `second`, `last`, `tail`, `isNonEmpty`, `uncons`, `matchNested`                                                         |
| `xs_misc`     | `isEmpty`, `reduce`, `reduceIndexed`, `reduceIndexedAndKeep`, `map`, `filter`, `zip`, `slice`, `flatten`, `takeAndKeep`, `eqLastX`, `sum` |
| `misc`        | `incHead`, `incSecond`, `lmapInc`, `rmapInc`, `lastIndex`, `take`, `dropLast`, `indexOf`, `splitAtChar`                                   |
| `effect_misc` | `log`, `tap`, `forEach`, `logEach`                                                                                                        |
| `safe`        | `safeY1`, `safeY2`, `safeY3`, `safeY4`, `Bounce`                                                                                          |

Everything is exported from the package root. `xs` means "a list of x". A module without
`_misc` holds primitives, each one wrapping an operator, a property, or a method of the language;
a `_misc` module is built from the other functions only.

Worth knowing:

- `where` is what Ramda calls `when`.
- `equals` is `===`: two different arrays with the same items are not equal.
- `round` rounds halves away from zero: `round(-1.5)` is `-2`, whereas `Math.round(-1.5)` is `-1`.
- `zip(xs)(ys)` puts the item of `ys` first in each pair, and stops at the end of the shorter list.
- `forEach` returns an empty list.
- `head`, `second`, and `last` return `undefined` when there is no such item.
- `toFixed` rounds as `round` does, so on a tie it may differ from `Number.prototype.toFixed`.
- The list and string functions do not overflow the stack, but they copy the list at each step:
  their time grows with the square of its length.

## License

[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/): you may share and adapt this
work for noncommercial purposes, with attribution.
