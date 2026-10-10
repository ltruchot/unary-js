export const toNumber: (a: unknown) => number = Number;
export const toString: (a: unknown) => string = String;
export const toBoolean: (a: unknown) => boolean = Boolean;
export const isArray = (a: unknown): a is unknown[] => Array.isArray(a);
export const isUndefined = (a: unknown): a is undefined => a === undefined;
