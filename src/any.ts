import { FnGeneric1 } from './generic';

export const identity: FnGeneric1<any> = (a) => a;

// helpers
export const log: FnGeneric1<any> = (a) => {
  console.log(a);
  return a;
};
