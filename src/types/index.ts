export type ResultType = 'number' | 'string' | 'array' | 'object' | 'boolean' | 'null';

export type MatchType = 'no-match' | 'segment' | 'destination';

export type OkJsonNumberPrimitive = {
  type: 'number',
  match?: MatchType
  value: number
};

export type OkJsonStringPrimitive = {
  type: 'string',
  match?: MatchType
  value: string
};

export type OkJsonNullPrimitive = {
  type: 'null',
  match?: MatchType
  value: null
};

export type OkJsonBooleanPrimitive = {
  type: 'boolean',
  match?: MatchType
  value: boolean
};

export type OkJsonArrayPrimitive = {
  type: 'array',
  match?: MatchType
  value: Array<any>
};

export type OkJsonObjectPrimitive = {
  type: 'object',
  match?: MatchType
  value: {
    [key: string]: OkJsonNumberPrimitive |
    OkJsonStringPrimitive |
    OkJsonNullPrimitive |
    OkJsonBooleanPrimitive |
    OkJsonArrayPrimitive |
    OkJsonObjectPrimitive
  }
};

export type OkJsonValue =
  OkJsonNumberPrimitive |
  OkJsonStringPrimitive |
  OkJsonNullPrimitive |
  OkJsonBooleanPrimitive |
  OkJsonArrayPrimitive |
  OkJsonObjectPrimitive;

export type OkJsonObject = {
  [key: string]: OkJsonValue
};

export interface FilterType {
  matches: (obj: any) => boolean;
  hasValue: () => boolean;
}

export type FilterQueryFlags = {
  ignoreCase: boolean,
  matchCase: boolean
};

export type FilterQuery = {
  value: string,
  flags: FilterQueryFlags
};
