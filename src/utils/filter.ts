import { Filter, OkJsonValue } from '../types';
import * as C from './common';

export const isHit = (value: null | string | boolean | number = '', filter: Filter = { value: '' }): boolean => {
  if (value === null) {
    return isHit('null', filter);
  }
  return value.toString().toLowerCase().includes(filter.value.toLowerCase());
};

export const getHitPaths = (data: OkJsonValue, filter: Filter): Array<string> => {
  function findHits(value: OkJsonValue, path: string = ''): Array<string | null> {
    switch (value.type) {
      case 'string':
      case 'boolean':
      case 'number':
      case 'null':
        return [isHit(value.value, filter) ? path : null];
      case 'array':
        return value.value.flatMap((nestedValue, index) => findHits(nestedValue, `${path}.${index}`));
      case 'object':
        return Object.entries(value.value).flatMap(([key, nestedValue]) => findHits(nestedValue, `${path}.${key}`));
      default:
        return [null];
    }
  }

  const removeDotPrefix = (x: string) => x.replace(/^\./, '');

  const hitPaths = C.pipe(
    findHits(data),
    C.filter(C.identity),
    C.map(removeDotPrefix),
  );

  return hitPaths;
};

export const pickByPath = (data: OkJsonValue, path: Array<string>): Array<OkJsonValue> => {
  if (!path || !path.length) {
    return [data];
  }

  // here be monsters..
  const paths = path.map((segment: string) => {
    const parts = segment.split('.');
    const oldParts: any[] = [];
    let res: OkJsonValue = {} as OkJsonValue;

    for (let i = 0; i < parts.length; i += 1) {
      const isFinal = (i === parts.length - 1);
      const parent = oldParts.reduce((acc, op) => acc.value[op], data);
      const part = parts[i];
      const container = parent.type === 'array' ? [] : {};
      let oldValue;
      if (isFinal) {
        oldValue = {
          type: parent.type,
          value: (parent.type === 'array' ? [parent.value[part]] : { [part]: parent.value[part] }),
        };
      } else {
        oldValue = { type: parent.type, value: container };
      }

      const oldPartsWithValue = oldParts.reduce((acc, op) => acc.concat([op, 'value']), ['value']);
      if (oldParts.length) oldPartsWithValue.pop();
      if (i === 0) res = <OkJsonValue>oldValue;
      else res = C.update(oldPartsWithValue, oldValue, res);
      oldParts.push(parts[i]);
    }
    return res;
  });

  return paths;
};
