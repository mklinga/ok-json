import { FilterType, FilterQuery } from '../types';

const defaultQuery: FilterQuery = {
  value: '',
  flags: {
    ignoreCase: false,
    matchCase: false,
  },
};

export default class Filter implements FilterType {
  query: FilterQuery;

  constructor(str: string = '') {
    this.query = str
      ? Filter.parseSearchString(str)
      : defaultQuery;
  }

  /* eslint-disable no-useless-escape */
  static parseSearchString(value: string): FilterQuery {
    const flags = {
      ignoreCase: value.indexOf('\\c') > -1,
      matchCase: value.indexOf('\\C') > -1,
    };

    const cleanFlags = (str: string): string => str.replace(/\\[C|c]/g, '');

    return {
      value: cleanFlags(value),
      flags,
    };
  }
  /* eslint-enable no-useless-escape */

  hasValue() {
    return !!this.query.value;
  }

  matches(obj: null | string | boolean | number = ''): boolean {
    if (!this.hasValue()) {
      return false;
    }

    if (obj === null) {
      return this.matches('null');
    }

    const hay = obj.toString();
    const needle = this.query.value;

    if (this.query.flags.matchCase) {
      return hay.indexOf(needle) > -1;
    } if (this.query.flags.ignoreCase) {
      return hay.toLowerCase().indexOf(needle.toLowerCase()) > -1;
    }

    // "smartCase" by default
    return needle !== needle.toLowerCase()
      ? hay.indexOf(needle) > -1
      : hay.toLowerCase().indexOf(needle.toLowerCase()) > -1;
  }
}
