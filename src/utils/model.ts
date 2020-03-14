/* eslint-disable import/prefer-default-export */
import { ResultObject, ResultType } from '../types';

const parseType = (value: any): ResultType => (Number.isNaN(Number(value)) ? 'string' : 'number');

export const parseDataModel = (data: object): ResultObject => {
  const resultObject: ResultObject = {} as ResultObject;
  Object.entries(data).forEach(([key, value]) => {
    resultObject[key] = {
      value,
      type: parseType(value),
    };
  });

  return resultObject;
};
