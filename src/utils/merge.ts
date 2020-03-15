/* eslint-disable import/prefer-default-export */

type Obj = {
  [key: string]: any
};

const addToArray = (arr: any[], value: any) => arr.concat([value]);
const addToObj = (obj: Obj, value: any, key: string) => ({ ...obj, [key]: value });

const isMergable = (value: object): boolean => (!!value && (typeof value === 'object'));

export const merge = <T extends any[] | Obj, S extends any[] | Obj>(obj1: T, obj2: S): T & S => {
  const isArrayMerge = Array.isArray(obj1);
  let destination = isArrayMerge ? [] : {};

  Object.entries(obj1).forEach(([key, value]) => {
    if (isArrayMerge) {
      destination = addToArray(destination as any[], value);
    } else {
      destination = addToObj(destination as Obj, value, key);
    }
  });

  Object.entries(obj2).forEach(([key, value]) => {
    if (isArrayMerge) {
      destination = addToArray(destination as any[], value);
    } else {
      const nextDestination: any = destination;
      if (nextDestination[key] !== undefined) {
        if (isMergable(nextDestination[key])) {
          destination = addToObj(destination as Obj, merge(nextDestination[key], value), key);
        } else {
          // Replacing the existing primitive :shrug:
          destination = addToObj(destination as Obj, value, key);
        }
      } else {
        destination = addToObj(destination as Obj, value, key);
      }
    }
  });

  return destination as T & S;
};
