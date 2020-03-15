import React from 'react';
import RenderBlock from '../RenderBlock';

import { getHitPaths, pickByPath } from '../../utils/filter';

import { Filter, OkJsonValue } from '../../types';

import './Viewer.css';

type Props = {
  data: OkJsonValue,
  filter: Filter
};

const Viewer: React.SFC<Props> = ({ data, filter }) => {
  const visibleData = (filter.value) ? pickByPath(data, getHitPaths(data, filter)) : data;

  return (
    <div>
      <RenderBlock data={{ key: '', value: visibleData }} />
    </div>
  );
};

export default Viewer;
