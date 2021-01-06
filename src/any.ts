type FnAny1<T> = (a: T) => T;
export const identity: FnAny1<any> = (a) => a;

// helpers
export const log: FnAny1<any> = (a) => {
  console.log(a);
  return a;
};
