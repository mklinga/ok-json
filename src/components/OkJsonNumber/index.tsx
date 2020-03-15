import React from 'react';

import { isHit } from '../../utils/filter';
import { OkJsonValue, Filter } from '../../types';

type Props = {
  data: {
    key: string,
    value: OkJsonValue
  },
  filter: Filter
};

const OkJsonNumber: React.FC<Props> = ({ data: { key, value }, filter }) => {
  const hasHighlight = filter.value && isHit(value.value as boolean, filter);
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
