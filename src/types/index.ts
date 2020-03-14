export type ResultType = 'number' | 'string' | 'array' | 'object';

type OkJsonNumberPrimitive = {
  type: 'number',
  value: number
};

type OkJsonStringPrimitive = {
  type: 'string',
  value: string
};

type OkJsonArrayPrimitive = {
  type: 'array',
  value: Array<any>
};

type OkJsonObjectPrimitive = {
  type: 'object',
  value: {
    [key: string]: OkJsonNumberPrimitive |
    OkJsonStringPrimitive |
    OkJsonArrayPrimitive |
    OkJsonObjectPrimitive
  }
};

export type OkJsonValue =
  OkJsonNumberPrimitive |
  OkJsonStringPrimitive |
  OkJsonArrayPrimitive |
  OkJsonObjectPrimitive;

export type OkJsonObject = {
  [key: string]: OkJsonValue
};
