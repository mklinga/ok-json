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

const OkJsonString: React.FC<Props> = ({ data: { key, value }, filter }) => {
  const hasHighlight = filter.value && isHit(value.value as boolean, filter);
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
