// Stack-safe recursion: a recursive call returns a `Bounce` instead of growing
// the stack, and `trampoline` runs the bounces in a loop. That loop is the one
// `while` of the library: JavaScript engines other than JavaScriptCore have no
// tail call optimization.

/** A suspended recursive call. */
export class Bounce<R> {
  readonly run: () => Step<R>;

  constructor(run: () => Step<R>) {
    this.run = run;
  }
}

/** What a function made safe returns: its result, or its next recursive call. */
export type Step<R> = R | Bounce<R>;

const trampoline = <R>(first: Step<R>): R => {
  let step = first;
  while (step instanceof Bounce) {
    step = step.run();
  }
  return step;
};

type Rec1<A, R> = (a: A) => Step<R>;
type Rec2<A, B, R> = (a: A) => Rec1<B, R>;
type Rec3<A, B, C, R> = (a: A) => Rec2<B, C, R>;
type Rec4<A, B, C, D, R> = (a: A) => Rec3<B, C, D, R>;

/** Stack-safe fixed point of a recursive function of one argument. */
export const safeY1 = <A, R>(rf: (self: Rec1<A, R>) => Rec1<A, R>): ((a: A) => R) => {
  const self: Rec1<A, R> = (a) => new Bounce(() => rf(self)(a));
  return (a) => trampoline(self(a));
};

/** Stack-safe fixed point of a recursive function of two curried arguments. */
export const safeY2 = <A, B, R>(
  rf: (self: Rec2<A, B, R>) => Rec2<A, B, R>,
): ((a: A) => (b: B) => R) => {
  const self: Rec2<A, B, R> = (a) => (b) => new Bounce(() => rf(self)(a)(b));
  return (a) => (b) => trampoline(self(a)(b));
};

/** Stack-safe fixed point of a recursive function of three curried arguments. */
export const safeY3 = <A, B, C, R>(
  rf: (self: Rec3<A, B, C, R>) => Rec3<A, B, C, R>,
): ((a: A) => (b: B) => (c: C) => R) => {
  const self: Rec3<A, B, C, R> = (a) => (b) => (c) => new Bounce(() => rf(self)(a)(b)(c));
  return (a) => (b) => (c) => trampoline(self(a)(b)(c));
};

/** Stack-safe fixed point of a recursive function of four curried arguments. */
export const safeY4 = <A, B, C, D, R>(
  rf: (self: Rec4<A, B, C, D, R>) => Rec4<A, B, C, D, R>,
): ((a: A) => (b: B) => (c: C) => (d: D) => R) => {
  const self: Rec4<A, B, C, D, R> = (a) => (b) => (c) => (d) =>
    new Bounce(() => rf(self)(a)(b)(c)(d));
  return (a) => (b) => (c) => (d) => trampoline(self(a)(b)(c)(d));
};
