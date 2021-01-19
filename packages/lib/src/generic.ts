export type FnGeneric1<T> = (a: T) => T;
export type FnGeneric2<T> = (a: T) => FnGeneric1<T>;
export type FnGeneric3<T> = (a: T) => FnGeneric2<T>;
export type FnGeneric4<T> = (a: T) => FnGeneric3<T>;
