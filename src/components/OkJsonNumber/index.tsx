import React from 'react';

import { OkJsonValue } from '../../types';

type Props = {
  data: {
    key: string,
    value: OkJsonValue
  }
};

const OkJsonNumber: React.FC<Props> = ({ data: { key, value } }) => (
  <div>
    {key}
    {' '}
    :
    {' '}
    {value.value}
  </div>
);

export default OkJsonNumber;
