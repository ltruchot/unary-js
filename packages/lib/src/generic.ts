export type FnAppend1<T> = (a: T) => T;
export type FnAppend2<T> = (a: T) => FnAppend1<T>;
export type FnAppend3<T> = (a: T) => FnAppend2<T>;
export type FnAppend4<T> = (a: T) => FnAppend3<T>;
export type FnAppend5<T> = (a: T) => FnAppend4<T>;

export type FnTransform1<I, O> = (a: I) => O;
export type FnTransform2<I, O> = (a: I) => FnTransform1<I, O>;
export type FnTransform3<I, O> = (a: I) => FnTransform2<I, O>;
export type FnTransform4<I, O> = (a: I) => FnTransform3<I, O>;
export type FnTransform5<I, O> = (a: I) => FnTransform4<I, O>;
