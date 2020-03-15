import React from 'react';
import { isHit } from '../../utils/filter';

import { OkJsonNullPrimitive, Filter } from '../../types';

type Props = {
  data: {
    key: string,
    value: OkJsonNullPrimitive
  },
  filter: Filter
};

const OkJsonNull: React.FC<Props> = ({ data: { key, value }, filter }) => {
  const hasHighlight = filter.value && isHit(value.value as null, filter);
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
