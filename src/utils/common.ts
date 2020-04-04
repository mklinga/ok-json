export const identity = (x: any): any => x;

export const noop = (): void => { };

export const not = (x: any): boolean => !x;

export const doto = (method: string, ...args: any) => (x: any) => x[method](...args);

export const pipe = (x: any, ...fns: Array<Function>) => (
  fns.reduce((result, fn) => fn(result), x)
);

export const filter = (fn: (x: any) => boolean) => (xs: Array<any>) => xs.filter(fn);

export const map = (fn: (x: any) => any) => (xs: Array<any>) => xs.map(fn);

export const last = (arr: Array<any>): any => arr[arr.length - 1];

const updateValue = (newValue: any, oldValue: any) => ((typeof newValue === 'function')
  ? newValue(oldValue)
  : newValue);

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
    nextObj[idx] = updateValue(value, nextObj[idx]);
    return nextObj;
  }

  return { ...nextObj, [idx]: updateValue(value, nextObj[idx]) };
};

export const generateId: () => string = () => Math.random().toString(36).substring(2, 15);

export const segmentize = (arr: Array<string>): Array<Array<string>> => {
  const result: Array<Array<string>> = Array.from({ length: arr.length });
  let start = 0;
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = start; j < arr.length; j += 1) {
      result[j] = (result[j] || []).concat(arr[i]);
    }
    start += 1;
  }
  return result;
};
