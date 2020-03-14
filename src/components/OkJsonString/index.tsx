import React from 'react';

import { OkJsonValue } from '../../types';

type Props = {
  data: {
    key: string,
    value: OkJsonValue
  }
};

const OkJsonString: React.FC<Props> = ({ data: { key, value } }) => {
  console.log('got value', value, 'for key', key);
  return (
    <div>
      {key}
      {' '}
      :
      {' '}
      &quot;
      {value.value}
      &quot;
    </div>
  );
};

export default OkJsonString;
