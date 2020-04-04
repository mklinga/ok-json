import React from 'react';

import { OkJsonNullPrimitive, FilterType } from '../../types';

type Props = {
  data: {
    key: string,
    value: OkJsonNullPrimitive
  },
  filter: FilterType
};

const OkJsonNull: React.FC<Props> = ({ data: { key, value }, filter }) => {
  const hasHighlight = filter.matches(value.value as null);
  const valueClassName = `Ok-value Ok-Null-value ${hasHighlight ? 'Ok-highlighted-value' : ''}`;
  return (
    <div className="Ok-block Ok-Null-block">
      <div className="Ok-key Ok-Null-key">
        {key}
      </div>
      <div className={valueClassName}>
        null
      </div>
    </div>
  );
};

export default OkJsonNull;
