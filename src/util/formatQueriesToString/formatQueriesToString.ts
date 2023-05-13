import type { LocationQuery } from 'vue-router';

/**
 * Returns a query string composed of the provided query parameters that can
 * be appended to the URL.
 * 
 * **Examples:**
 * ```typescript
  const query: LocationQuery = {
    page: 1,
    sortBy: 'title',
    order: 'asc',
  }; // ?page=1&sortBy=title&order=asc

  const query: LocationQuery = {
    page: 1,
  }; // ?page=1

  const query: LocationQuery = {}; // ?
  ```
 *
 * @param query 
 * @returns A query string of the query parameters
 */
export function formatQueriesToString(query: LocationQuery): string {
  const queriesArray = Object.entries(query);
  const queryStringsArray = queriesArray.map(q => q.join('='));
  const queryString = queryStringsArray.join('&');
  return '?' + queryString;
}