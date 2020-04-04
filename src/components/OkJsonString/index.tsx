import React from 'react';

import { OkJsonValue, FilterType } from '../../types';

type Props = {
  data: {
    key: string,
    value: OkJsonValue
  },
  filter: FilterType
};

const OkJsonString: React.FC<Props> = ({ data: { key, value }, filter }) => {
  const hasHighlight = filter.matches(value.value as boolean);
  const valueClassName = `Ok-value Ok-String-value ${hasHighlight ? 'Ok-highlighted-value' : ''}`;
  return (
    <div className="Ok-block Ok-String-block">
      <div className="Ok-key Ok-String-key">
        {key}
      </div>
      <div className={valueClassName}>
        &quot;
        {value.value}
        &quot;
      </div>
    </div>
  );
};

export default OkJsonString;
