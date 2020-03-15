export type ResultType = 'number' | 'string' | 'array' | 'object' | 'boolean';

type OkJsonNumberPrimitive = {
  type: 'number',
  value: number
};

type OkJsonStringPrimitive = {
  type: 'string',
  value: string
};

type OkJsonBooleanPrimitive = {
  type: 'boolean',
  value: boolean
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
    OkJsonBooleanPrimitive |
    OkJsonArrayPrimitive |
    OkJsonObjectPrimitive
  }
};

export type OkJsonValue =
  OkJsonNumberPrimitive |
  OkJsonStringPrimitive |
  OkJsonBooleanPrimitive |
  OkJsonArrayPrimitive |
  OkJsonObjectPrimitive;

export type OkJsonObject = {
  [key: string]: OkJsonValue
};

export type Filter = {
  value: string
};
