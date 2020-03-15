import React from 'react';

import { parseDataModel } from '../../utils/model';

import { OkJsonValue } from '../../types';

import './DataInput.css';

type Props = {
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setData: React.Dispatch<React.SetStateAction<OkJsonValue | null>>
};

const mockJson = parseDataModel({
  bigObject: {
    cute_array: [
      1,
      { is_this: true },
      'or is this',
      null,
    ],
    c: 99,
    id: '0xdeaddaed',
  },
  smallObject: {
    e: 12,
  },
  straightText: 'Oh boy! A well.',
  big_number: 1234567890,
  false: false,
  very: { nested: { and: { surprisingly: { boring: { object: true } } } } },
});

const DataInput = ({ setError, setData }: Props) => {
  const bigBox = React.useRef<HTMLTextAreaElement>(null);
  const internetUrl = React.useRef<HTMLInputElement>(null);

  const pasteFromClipboard = () => {
    navigator.clipboard.readText()
      .then((text) => {
        try {
          setError(null);
          setData(parseDataModel(JSON.parse(text)));
        } catch (e) {
          setError('That does not look like json...');
        }
      })
      .catch(() => setError('You really need to give the permission for this one...'));
  };

  const useMockData = () => {
    setError(null);
    setData(mockJson);
  };

  const loadFromBigBox = () => {
    setError(null);
    if (bigBox && bigBox.current) {
      try {
        setData(parseDataModel(JSON.parse(bigBox.current.value)));
      } catch (e) {
        setError('That does not look like json...');
      }
    }
  };

  const loadFromUrl = async () => {
    setError(null);
    if (internetUrl && internetUrl.current && internetUrl.current.value) {
      try {
        const response = await fetch(internetUrl.current.value);
        setData(parseDataModel(await response.json()));
      } catch (e) {
        setError(`Oh no, not ${internetUrl.current.value}.`);
      }
    }
  };

  const canPaste = !!navigator.clipboard.readText;

  return (
    <div className="DataInput-main">
      <button type="button" onClick={useMockData}>Use Mock Data</button>
      {canPaste
        ? <button type="button" onClick={pasteFromClipboard}>Paste from clipboard</button>
        : null}
      <textarea ref={bigBox} placeholder="Or just read from here..." />
      <button type="button" onClick={loadFromBigBox}>Load from the big box</button>
      <input ref={internetUrl} type="text" placeholder="url" />
      <button type="button" onClick={loadFromUrl}>
        Load from
        {' '}
        <i>the internet</i>
      </button>
    </div>
  );
};

export default DataInput;
