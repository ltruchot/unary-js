import {
  FnAppend2, FnAppend3, FnAppend4, FnAppend5,
} from './generic';

const trampoline = (bounce: any): any => {
  let result = bounce;
  while (result && result.isBounce) {
    result = result.f();
  }
  return result;
};

export const safeY2 = (rf: FnAppend3<any>): any => {
  const bounce2 = (f: FnAppend2<any>) => (x: any) => (y: any) => ({
    isBounce: true, f: () => f(x)(y),
  });
  const Y2 = (f: FnAppend3<any>): any => bounce2(
    (x: any) => (y: any) => f(Y2(f))(x)(y),
  );
  return (x: any) => (y: any) => trampoline(Y2(rf)(x)(y));
};

export const safeY3 = (rf: FnAppend4<any>): any => {
  const bounce3 = (f: FnAppend3<any>) => (x: any) => (y: any) => (z: any) => ({
    isBounce: true, f: () => f(x)(y)(z),
  });
  const Y3 = (f: FnAppend3<any>): any => bounce3(
    (x: any) => (y: any) => (z: any) => f(Y3(f))(x)(y)(z),
  );
  return (x: any) => (y: any) => (z: any) => trampoline(Y3(rf)(x)(y)(z));
};

export const safeY4 = (rf: FnAppend5<any>): any => {
  const bounce4 = (f: FnAppend4<any>) => (a1: any) => (a2: any) => (a3: any) => (a4: any) => ({
    isBounce: true, f: () => f(a1)(a2)(a3)(a4),
  });
  const Y4 = (f: FnAppend4<any>): any => bounce4(
    (a1: any) => (a2: any) => (a3: any) => (a4: any) => f(Y4(f))(a1)(a2)(a3)(a4),
  );
  return (a1: any) => (a2: any) => (a3: any) => (a4: any) => trampoline(Y4(rf)(a1)(a2)(a3)(a4));
};
