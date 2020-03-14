import React from 'react';

type Props = {
  data: object
};

const Viewer: React.SFC<Props> = ({ data }) => (
  <div>
    {JSON.stringify(data)}
  </div>
);

export default Viewer;
