// function -> function -> function -> a -> b
export const lift = (f: any) => (g: any) => (h: any) => (a: any) => f(g(a))(h(a));

// function -> function -> function -> a -> b
export const substitution = (f: any) => (g: any) => (a: any) => f(a)(g(a));
