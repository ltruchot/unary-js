type FnArrayToItem1 = <T>(list: readonly T[]) => T
export const head: FnArrayToItem1 = (arr) => arr[0];
