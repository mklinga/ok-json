import { FilterType, OkJsonValue, MatchType } from '../types';
import * as C from './common';

const lastSegment = (str: string): string => C.last(str.split('.'));

export const getHitPaths = (data: OkJsonValue, filter: FilterType): Array<string> => {
  function findHits(value: OkJsonValue, path: string = ''): Array<string | null> {
    switch (value.type) {
      case 'string':
      case 'boolean':
      case 'number':
      case 'null':
        return [filter.matches(`${lastSegment(path)} ${value.value}`) ? path : null];
      case 'array':
        return [filter.matches(lastSegment(path)) ? path : null].concat(
          value.value.flatMap((nestedValue, index) => findHits(nestedValue, `${path}.${index}`)),
        );
      case 'object':
        return [filter.matches(lastSegment(path)) ? path : null].concat(
          Object.entries(value.value).flatMap(([key, nestedValue]) => findHits(nestedValue, `${path}.${key}`)),
        );
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

export const markMatches = (paths: Array<string>, data: OkJsonValue): OkJsonValue => {
  const segmentPaths = paths.flatMap((path) => C.segmentize(path.split('.')))
    .map((pathArray) => pathArray.reduce<Array<string>>((acc, segment) => acc.concat(['value', segment]), []));

  const destinationPaths = paths.map((pathArray) => (
    pathArray
      .split('.')
      .reduce<Array<string>>((acc, segment) => acc.concat(['value', segment]), [])
  ));

  const updateFn = (newValue: MatchType) => (oldValue: object) => (
    { ...oldValue, match: newValue }
  );

  const segments = segmentPaths.reduce(
    (acc, segmentPath) => C.update(segmentPath, updateFn('segment'), acc),
    { ...data },
  );

  const destinations = destinationPaths.reduce(
    (acc, destinationPath) => C.update(destinationPath, updateFn('destination'), acc),
    { ...segments },
  );

  return destinations;
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
