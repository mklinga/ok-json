export type ResultType = 'number' | 'string';

export type ResultValue = {
  value: any,
  type: ResultType
};

export type ResultObject = {
  [key: string]: ResultValue
};
