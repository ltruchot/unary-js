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
- create a definitive pack of 1001 tiny functions that can handle 99.99% of IT problems
- make JS more [LISP-like](https://lisp-lang.org/), [Elm-like](https://elm-lang.org/)
- demonstrate [currying](https://en.wikipedia.org/wiki/Currying)
- demonstrate the efficiency and simplicity of unit tests in FP
- discover the [lambda calculus](https://www.youtube.com/watch?v=3VQ382QG-y4)
- discover the [theory of categories](https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/)
- be playful with FP and grow the FP hidden cult

## Example of use

- [Hacker Rank](https://www.hackerrank.com) problems are solved with unary-js in `demo` subfolder (WIP)
- [Project Euler](https://projecteuler.net/) WIP
- [Advent of Code](https://adventofcode.com/) WIP
- [JavaScript Algorithms](https://github.com/trekhleb/javascript-algorithms) WIP

## Why this strange syntaxe actually works ?

Lambda Calculus and Turing Machine are two competing concepts covering the same field: automated calculations.
They are very similar, both are proof that with a machine capable of "memory" (state) and "jump instructions" (goto), we can perform any calculation.


With the Turing machine (and the Von Neuman architecture which inspires procedural and OOP languages), your program will be a set of "statements" and shared states:
- create variables
- mutate them with operations (+, -...), control structures (if, for ...) and methods (setters) until the desired state is obtained


On the contrary, Lambda Calculus, leads to FP: your program will be a bunch of "expressions" and pure functions.
- create functions (in terms of Input -> Transformation -> Output)
- combine them, run them with immutable inputs, get your result


Most modern languages ​​are chaotic mixtures of these two approaches, giving us everything we need to code in both styles, often without even showing the boundary.


But due to equal Turing's completeness, you can substitute one approach for the other and get the same result with 2 very different programs - these are just different ways of describing the same problem.


This package focuses entirely on the Lambda Calculus / FP approach.

## Why TypeScript?

JavaScript is loosely and dynamically typed. This is useful for quick POCs and small / solo projects.
That said, it's not a perfect solution for creating libraries because the types:
- helps you find a bug before runtime, even before compile time with a good IDE
- forces to think of your function "by signature", helping you to define your problem before implementation
- simplifies teamwork by denoting your intentions
- provides automatic documentation
- helps you understand your sets and categories of primitives / objects
- helps you know when you are in a step of a curry function, or in the final return

Arguably, these advantages are theoretical, but practically overwhelming, and only shift the problems from runtime to compile-time. I can understand this limit, but here we want to discover and share the 1001 most important functions of Computer Science. It will be a total mess without documentation.

Also, we really want to provide a "signature search" tool, like in Haskell or Rust documentations.
Indeed, if you know that you want to make your array a string, there will be few functions that will do it, and you will find what you are looking quickly, even without knowing the name "join", for example.

## Why not just Ramda?

Unary-js really looks like Ramda: the functions have the same signature, the same name, you can combine them in the same way (and even better) and they are curried.

But Ramda is a production project, aiming to make operators and main functions useful in a point-free style, without losing performance. In Ramda's implementations, you'll find a ton of "while", "if" and other statements that we don't want to use here. We are not focusing on performance at all, but only on a unary function without statements, only made up of other functions.