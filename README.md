# Unary JavaScript

Only unary functions, for the glory of Functional Programming in JS.

⚠️ DO NOT USE IN PROD️ ⚠️

## Description

Unary JS is an educational attempt to demonstrate the concepts of Functional Programming (FP) in JavaScript.
The idea is to stick to **pure unary functions** to do any kind of calculation.

This implies that there is no longer any operator or control structure in the language, but only first-class functions, to compose and combine.

For example, iterations are always performed by recursion (no for / no while) and so on.
It's sadly preventing JS from becoming efficient in intensive iteration with this approach.
Even if TCO is part of ES6, only Safari implements it. [SpiderMonkey don't have it, and V8 dropped it] (https://github.com/tc39/proposal-ptc-syntax) therefore chrome, node.js and firefox cannot ensure a good execution of this library: do not not use in production !

## But why ?

- create a definitive pack of 1000 tiny functions that can handle 99.99% of IT problems
- make JS more LISP-like, Elm-like
- discover the lambda calculation
- discover the theory of categories
- be playful with FP

## Example of use
- [hackerrank problems] (https://github.com/ltruchot/unary-hackerrank) with unaryJS