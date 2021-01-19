export type FnVoid = (a: any) => void;
export const log: FnVoid = (a) => {
  // eslint-disable-next-line no-console
  console.log(a);
};
