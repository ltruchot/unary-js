type FnNumber1ToBoolean = (n: number) => boolean;
type FnNumber2ToBoolean = (n: number) => FnNumber1ToBoolean;
export const gt: FnNumber2ToBoolean = (a) => (b) => b > a;
