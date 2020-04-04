import React from 'react';

import { noop } from '../../utils/common';
import Filter from '../../utils/filter';

import { FilterType } from '../../types';

import './Toolbar.css';

type Props = {
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>
};

const DEBOUNCE_VALUE = 300;

const Toolbar = ({ setFilter }: Props) => {
  const [inputValue, setInputValue] = React.useState('');
  const firstMount = React.useRef(true);

  React.useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      return noop;
    }

    const interval = setTimeout(
      () => setFilter(new Filter(inputValue)),
      DEBOUNCE_VALUE,
    );

    return () => clearTimeout(interval);
  }, [inputValue]);

  return (
    <div className="Toolbar">
      <input
        className="Toolbar-filter"
        type="text"
        placeholder="filter"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
    </div>
  );
};


export default Toolbar;
