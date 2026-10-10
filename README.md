# unary-js

Only unary functions, for the glory of functional programming in JavaScript.

⚠️ An educational project: do not use it in production. ⚠️

```ts
import { compose3, filter, gt0, map, mul, sum } from "unary-js";

const sumOfDoubledPositives = compose3(sum)(map(mul(2)))(filter(gt0));

sumOfDoubledPositives([-1, 2, 3]); // 10
```

## Description

unary-js is an attempt to demonstrate the concepts of functional programming (FP) in
JavaScript by sticking to **curried unary functions**: every function of the library takes
exactly one argument, and returns either a value or the next function.

A handful of primitives each wrap one thing the language provides: an operator (`add` is `+`,
`equals` is `===`), a property (`length`), a method (`charAt`), or a conversion (`toNumber` is
`Number`). Everything else is built by combining them, with no statements, operators, or method
calls: branching is a function (`ifElse`), and so is iteration (`reduce`). The two exceptions
are the functions called for their effect (`log`, `tap`) and the trampoline described below.

Iterating without loops means recursion, and recursion in JavaScript overflows the stack:
[proper tail calls](https://en.wikipedia.org/wiki/Tail_call) are
[part of the ES2015 standard](https://262.ecma-international.org/6.0/#sec-tail-position-calls),
but JavaScriptCore (Safari) is the only major engine that implements them. V8 (Chrome, Edge,
Node.js) and SpiderMonkey (Firefox) do not.

The library works around this with stack-safe fixed-point combinators, `safeY1` to `safeY4`:
a recursive call returns a suspended call instead of growing the stack, and a trampoline runs
the suspended calls one after the other. That trampoline holds the only loop of the library
(see [`safe.ts`](packages/lib/src/safe.ts)). The list and string functions are built on these
combinators, so they do not overflow the stack. They are still slow: each step copies the list,
so the time grows with the square of its length.

## Packages

| Package                                                  | What it is                                                        |
| -------------------------------------------------------- | ----------------------------------------------------------------- |
| [`packages/lib`](packages/lib)                           | The library, published to npm as `unary-js`: its API.             |
| [`packages/unary-hackerrank`](packages/unary-hackerrank) | [HackerRank](https://www.hackerrank.com) problems solved with it. |

## But why?

- Collect, one day, the 1001 tiny functions that solve most programming problems. There are
  about a hundred so far.
- Make JavaScript more [Lisp-like](https://lisp-lang.org/) and more [Elm-like](https://elm-lang.org/).
- Demonstrate [currying](https://en.wikipedia.org/wiki/Currying).
- Demonstrate how simple unit tests become with pure functions.
- Discover [lambda calculus](https://www.youtube.com/watch?v=3VQ382QG-y4).
- Discover [category theory](https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/).
- Have fun with FP, and grow its hidden cult.

Ideas for more examples: [LeetCode](https://leetcode.com/problemset/),
[Project Euler](https://projecteuler.net/), [Advent of Code](https://adventofcode.com/),
and [JavaScript Algorithms](https://github.com/trekhleb/javascript-algorithms). None of them
is started.

## Why does this strange syntax work?

Lambda calculus and Turing machines are two models of computation from the 1930s. They look
nothing alike, yet they are equivalent: whatever one can compute, the other can too.

The Turing machine, and the von Neumann architecture that followed, inspired procedural and
object-oriented languages. A program is a list of statements acting on a shared state:

- create variables;
- change them with operators, control structures, and methods until the state is the one you want.

Lambda calculus leads to FP. A program is one expression made of pure functions:

- create functions (input → transformation → output);
- combine them, apply them to immutable inputs, and get your result.

Most modern languages mix the two approaches and let you code in both styles, often without
showing where one ends and the other begins.

Because the two models are equivalent, you can replace one approach with the other and get the
same result from two very different programs: they are two ways of describing the same problem.

This library sticks to the lambda calculus side.

## Why TypeScript?

JavaScript is dynamically and weakly typed. That is handy for a quick proof of concept or a
small solo project, but a library is better off with types. They:

- find bugs before the code runs, as you type in a good editor;
- make you think of a function by its signature, so you state the problem before you solve it;
- show your intentions to your teammates;
- document the code;
- tell you where you are in a curried function: one more argument to give, or the final result.

Types do not remove bugs: they move a class of them from run time to compile time. Here
they matter for one more reason: a collection of a thousand tiny functions is unusable without
documentation, and a signature is the shortest one.

One day, the library should come with a search by signature, like
[Hoogle](https://hoogle.haskell.org/) for Haskell: if you want to turn a list of strings into
a string, few functions have that signature, and you find `join` without knowing its name.
That tool does not exist yet.

The library is written in TypeScript and published as JavaScript with its type declarations:
you can use it with or without TypeScript.

## Why not just Ramda?

unary-js borrows a lot from [Ramda](https://ramdajs.com/docs/): small functions, curried, with
the data as the last argument, made to be composed. It is not a drop-in replacement, though:

- Functions are strictly unary: `add(1)(2)`, never `add(1, 2)`.
- Some names differ: `where` is Ramda's `when`, `t` and `f` are `T` and `F`, and `sub`, `mul`,
  `div`, and `mod` are `subtract`, `multiply`, `divide`, and `modulo`.
- The data comes last even for operators: `sub(2)(44)` is `44 - 2` and `gt(0)(n)` is `n > 0`,
  whereas `R.subtract(44, 2)` and `R.gt(n, 0)` read from left to right.
- Some signatures differ: `reduce(acc)(f)(xs)` takes the accumulator first, `equals` is `===`
  and not a deep comparison, and `split` takes no separator.

The goals differ too. Ramda is made for production: its implementations use loops and `if`
statements to stay fast. unary-js does not care about performance at all. It cares about
building everything from unary functions, from the bottom up.

## Development

The repository is a [Vite+](https://viteplus.dev) workspace: every command goes through `vp`.

| Command                   | Does                                                           |
| ------------------------- | -------------------------------------------------------------- |
| `vp install`              | Installs the dependencies and the Git hooks                    |
| `vp run ready`            | The whole gate: format, lint, type check, build, and all tests |
| `vp check --fix`          | Formats and fixes what the linter can fix                      |
| `vp -C packages/lib test` | The tests of the library                                       |
| `vp -C packages/lib pack` | Builds the library into `packages/lib/dist`                    |

Working on the code with Claude Code: see [`CLAUDE.md`](CLAUDE.md) and `.claude/skills/`.

## License

[CC BY-NC 4.0](LICENSE): you may share and adapt this work for noncommercial purposes, with
attribution.
