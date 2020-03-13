import React from 'react';

type Props = {
  data: object
};

const component: React.SFC<Props> = ({ data }) => (
  <div>
    Dataa...
    {' '}
    {JSON.stringify(data)}
  </div>
);

export default component;
