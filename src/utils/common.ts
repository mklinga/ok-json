export const identity = (x: any): any => x;

export const not = (x: any): boolean => !x;

export const doto = (method: string, ...args: any) => (x: any) => x[method](...args);

export const pipe = (x: any, ...fns: Array<Function>) => (
  fns.reduce((result, fn) => fn(result), x)
);

export const filter = (fn: (x: any) => boolean) => (xs: Array<any>) => xs.filter(fn);

export const map = (fn: (x: any) => any) => (xs: Array<any>) => xs.map(fn);

export const update = (path: Array<string>, value: any, obj: any): any => {
  const isArray = Array.isArray(obj);
  const nextObj = isArray ? [].concat(obj) : { ...obj };

  if (path.length === 0) {
    return nextObj;
  }

  const idx = path[0];
  const nextPath = path.slice(1, path.length);

  if (path.length > 1) {
    if (isArray) {
      const nextValue = update(nextPath, value, nextObj[idx]);
      nextObj[idx] = nextValue;
      return nextObj;
    }

    return { ...nextObj, [idx]: update(nextPath, value, nextObj[idx]) };
  }

  if (isArray) {
    nextObj[idx] = value;
    return nextObj;
  }

  return { ...nextObj, [idx]: value };
};
