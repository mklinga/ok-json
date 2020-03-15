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

const OkJsonBoolean: React.FC<Props> = ({ data: { key, value }, filter }) => {
  const hasHighlight = filter.value && isHit(value.value as boolean, filter);
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
