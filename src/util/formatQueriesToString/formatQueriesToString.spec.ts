import { describe, it, expect } from 'vitest';
import type { LocationQuery } from 'vue-router';
import { formatQueriesToString } from './formatQueriesToString';

describe('formatQueriesToString', () => {
  it('Returns a query string of two (or more) query parameters', () => {
    const query: LocationQuery = {
      page: '2',
      order: 'asc',
    };

    const result = formatQueriesToString(query);
    expect(result).toBe(`?page=${query.page}&order=${query.order}`);
  });

  it('Returns a query string of one query parameter', () => {
    const query: LocationQuery = {
      page: '2',
    };

    const result = formatQueriesToString(query);
    expect(result).toBe(`?page=${query.page}`);
  });

  it('Returns only the question mark if the query object is empty', () => {
    const result = formatQueriesToString({});
    expect(result).toBe('?');
  });
});
