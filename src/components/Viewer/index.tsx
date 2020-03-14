import React from 'react';
import RenderBlock from '../RenderBlock';

import './Viewer.css';

type Props = {
  data: {
    [key: string]: any
  }
};

const Viewer: React.SFC<Props> = ({ data }) => (
  <div>
    {Object.entries(data).map(([key, value]) => <RenderBlock key={key} data={{ key, value }} />)}
  </div>
);

export default Viewer;
