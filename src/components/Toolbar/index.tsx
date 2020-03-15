import React from 'react';
import { Filter } from '../../types';

type Props = {
  filter: Filter,
  setFilter: Function
};

const Toolbar = ({ filter, setFilter }: Props) => (
  <div>
    <input type="text" name="filter" onChange={(e) => setFilter({ value: e.target.value })} value={filter.value} />
  </div>
);


export default Toolbar;
