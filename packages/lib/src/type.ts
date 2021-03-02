export const toNumber = (a: any): number => Number(a);
export const toString = (a: any): string => String(a);
export const toBoolean = (a: any): boolean => Boolean(a);
export const isArray = (a: any): a is any[] => a instanceof Array;
