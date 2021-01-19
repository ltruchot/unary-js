type FnUnary = (a: any) => any;
type FnFunction1 = (f: FnUnary) => (g: FnUnary) => (a: any) => any;
export const compose: FnFunction1 = (f) => (g) => (a) => f(g(a));
