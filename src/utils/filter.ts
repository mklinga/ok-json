import { FilterType, FilterQuery } from '../types';

export default class Filter implements FilterType {
  query: FilterQuery;

  constructor(str: string = '') {
    this.query = Filter.parseSearchString(str || '');
  }

  static parseSearchString(str: string): FilterQuery {
    console.log('parsing', str);
    return { value: str };
  }

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

    return obj.toString().toLowerCase().includes(this.query.value.toLowerCase());
  }
}
