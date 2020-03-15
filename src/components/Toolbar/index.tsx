import React from 'react';

import { noop } from '../../utils/common';

import { Filter } from '../../types';

type Props = {
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
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

    const interval = setTimeout(() => setFilter({ value: inputValue }), DEBOUNCE_VALUE);

    return () => clearTimeout(interval);
  }, [inputValue]);

  return (
    <div>
      <input type="text" onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
    </div>
  );
};


export default Toolbar;
