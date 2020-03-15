import React from 'react';

import { OkJsonValue } from '../../types';

type Props = {
  data: {
    key: string,
    value: OkJsonValue
  }
};

const OkJsonBoolean: React.FC<Props> = ({ data: { key, value } }) => (
  <div className="Ok-block Ok-Boolean-block">
    <div className="Ok-key Ok-Boolean-key">
      {key}
    </div>
    <div className="Ok-value Ok-Boolean-value">
      {value.value.toString()}
    </div>
  </div>
);

export default OkJsonBoolean;
