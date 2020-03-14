import React from 'react';

import { OkJsonValue } from '../../types';

type Props = {
  data: {
    key: string,
    value: OkJsonValue
  }
};

const OkJsonString: React.FC<Props> = ({ data: { key, value } }) => (
  <div className="Ok-block Ok-Number-block">
    <div className="Ok-key Ok-Number-key">
      {key}
    </div>
    <div className="Ok-value Ok-Number-value">
      &quot;
      {value.value}
      &quot;
    </div>
  </div>
);

export default OkJsonString;
