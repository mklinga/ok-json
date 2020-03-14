import React from 'react';

import { OkJsonValue } from '../../types';

type Props = {
  data: {
    key: string,
    value: OkJsonValue
  }
};

const OkJsonNumber: React.FC<Props> = ({ data: { key, value } }) => (
  <div className="Ok-block Ok-Number-block">
    <div className="Ok-key Ok-Number-key">
      {key}
    </div>
    <div className="Ok-value Ok-Number-value">
      {value.value}
    </div>
  </div>
);

export default OkJsonNumber;
