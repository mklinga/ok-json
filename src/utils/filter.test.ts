import Filter from './filter';

describe('Filter', () => {
  it('Should match targets', () => {
    const filter = new Filter('abc');
    expect(filter.matches('abc')).toBe(true);
  });

  it('Should not match targets', () => {
    const filter = new Filter('abc');
    expect(filter.matches('def')).toBe(false);
  });

  it('Should use smartcase by default', () => {
    const filter = new Filter('aBc');
    expect(filter.matches('abc')).toBe(false);
    expect(filter.matches('aBc')).toBe(true);
  });

  it('Should be able to force ignore case', () => {
    const filter = new Filter('aBc\\c');
    expect(filter.matches('abc')).toBe(true);
    expect(filter.matches('aBc')).toBe(true);
  });

  it('Should be able to force match case', () => {
    const filter = new Filter('abc\\C');
    expect(filter.matches('abc')).toBe(true);
    expect(filter.matches('aBc')).toBe(false);
  });
});
