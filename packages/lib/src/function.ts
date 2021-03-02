type FnUnary = (a: any) => any;
type FnFunction1 = (f: FnUnary) => (g: FnUnary) => (a: any) => any;
export const compose2: FnFunction1 = (f) => (g) => (a) => f(g(a));

type FnFunction2 = (f: FnUnary) => (g: FnUnary) => (h: FnUnary) => (a: any) => any;
export const compose3: FnFunction2 = (f) => (g) => (h) => (a) => f(g(h(a)));

export const applyTo = (a: any) => (f: Function) => f(a);
