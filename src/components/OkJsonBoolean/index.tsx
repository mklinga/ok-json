import React from 'react';

import { OkJsonBooleanPrimitive, FilterType } from '../../types';

type Props = {
  data: {
    key: string,
    value: OkJsonBooleanPrimitive
  },
  filter: FilterType
};

const OkJsonBoolean: React.FC<Props> = ({ data: { key, value }, filter }) => {
  const hasHighlight = filter.matches(value.value as boolean);
  const valueClassName = `Ok-value Ok-Boolean-value ${hasHighlight ? 'Ok-highlighted-value' : ''}`;
  return (
    <div className="Ok-block Ok-Boolean-block">
      <div className="Ok-key Ok-Boolean-key">
        {key}
      </div>
      <div className={valueClassName}>
        {value.value.toString()}
      </div>
    </div>
  );
};

export default OkJsonBoolean;
