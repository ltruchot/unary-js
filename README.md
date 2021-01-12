# Unary JavaScript

Only unary functions, for the glory of Functional Programming in JS.


⚠️ DO NOT USE IN PROD️ ⚠️


## Description

Unary JS is an educational attempt to demonstrate the concepts of Functional Programming (FP) in JavaScript.  
The idea is to stick to **pure unary functions** to do any kind of calculation.


This implies that there is no longer any operator or control structure in the language, but only first-class functions, to compose and combine.


For example, iterations are always performed by recursion (no for / no while) and so on.  
It's sadly preventing JS from becoming efficient in intensive iteration with this approach.  
Even if [TCO](https://en.wikipedia.org/wiki/Tail_call) is [part of ES6 standards](http://www.ecma-international.org/ecma-262/6.0/#sec-tail-position-calls), only Safari implements it. SpiderMonkey (Mozilla) don't have it [and Chromium V8 dropped it](https://stackoverflow.com/questions/42788139/es6-tail-recursion-optimisation-stack-overflow) therefore Firefox, Chrome, Edge and Node.js cannot ensure a good execution of this library: do not not use in production !

## But why ?

- be ready for the [V8 implementation](https://www.chromestatus.com/feature/5516876633341952)
- create a definitive pack of 1000 tiny functions that can handle 99.99% of IT problems
- make JS more [LISP-like](https://lisp-lang.org/), [Elm-like](https://elm-lang.org/)
- discover the [lambda calculus](https://www.youtube.com/watch?v=3VQ382QG-y4)
- discover the [theory of categories](https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/)
- be playful with FP and grow the FP hidden cult

## Example of use

- [hackerrank problems] (https://github.com/ltruchot/unary-hackerrank) with unaryJS