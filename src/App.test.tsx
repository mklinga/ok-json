import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders', () => {
  const { getByText } = render(<App />);
  const title = getByText(/Feed me JSON/i);
  expect(title).toBeInTheDocument();
});
