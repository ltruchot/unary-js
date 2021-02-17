import { equals, where } from './any';
import { compose2 } from './function';
import { FnTransform1 } from './generic';
import {
  add, lt,
  FnNumber1, FnNumber1ToBoolean, FnNumber2ToBoolean, mod, sub, negate,
} from './number';

export const inc: FnNumber1 = add(1);
export const dec: FnNumber1 = sub(1);

export const eq0: FnTransform1<number, boolean> = equals(0);
export const lt0: FnNumber1ToBoolean = lt(0);
export const isMultipleOf: FnNumber2ToBoolean = (n) => compose2(eq0)(mod(n));
export const abs = where(lt0)(negate);
