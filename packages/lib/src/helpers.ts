import { FnGeneric2, FnGeneric3, FnGeneric4 } from './generic';

const trampoline = (t: any): any => {
  let result = t;
  while (t && t.isBounce) {
    result = t.f();
  }
  return result;
};

export const safeY2 = (rf: FnGeneric3<any>): any => {
  const bounce2 = (f: FnGeneric2<any>) => (x: any) => (y: any) => ({
    isBounce: true, f: () => f(x)(y),
  });
  const Y2 = (f: FnGeneric3<any>): any => bounce2(
    (x: any) => (y: any) => f(Y2(f))(x)(y),
  );
  return (x: any) => (y: any) => trampoline(Y2(rf)(x)(y));
};

export const safeY3 = (rf: FnGeneric4<any>): any => {
  const bounce3 = (f: FnGeneric3<any>) => (x: any) => (y: any) => (z: any) => ({
    isBounce: true, f: () => f(x)(y)(z),
  });
  const Y3 = (f: FnGeneric3<any>): any => bounce3(
    (x: any) => (y: any) => (z: any) => f(Y3(f))(x)(y)(z),
  );
  return (x: any) => (y: any) => (z: any) => trampoline(Y3(rf)(x)(y)(z));
};
