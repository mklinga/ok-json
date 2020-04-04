import React from 'react';

import { OkJsonValue, FilterType } from '../../types';

type Props = {
  data: {
    key: string,
    value: OkJsonValue
  },
  filter: FilterType
};

const OkJsonNumber: React.FC<Props> = ({ data: { key, value }, filter }) => {
  const hasHighlight = filter.matches(value.value as boolean);
  const valueClassName = `Ok-value Ok-Number-value ${hasHighlight ? 'Ok-highlighted-value' : ''}`;
  return (
    <div className="Ok-block Ok-Number-block">
      <div className="Ok-key Ok-Number-key">
        {key}
      </div>
      <div className={valueClassName}>
        {value.value}
      </div>
    </div>
  );
};
export default OkJsonNumber;
