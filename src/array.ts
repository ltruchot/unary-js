type FnArray1 = (b: any[]) => any[];

export const tail: FnArray1 = (arr) => {
  const [, ...arrTail] = arr;
  return arrTail;
};
