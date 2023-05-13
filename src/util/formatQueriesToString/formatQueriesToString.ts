import type { LocationQuery } from 'vue-router';

export function formatQueriesToString(query: LocationQuery): string {
  const queriesArray = Object.entries(query);
  const queryStringsArray = queriesArray.map(q => q.join('='));
  const queryString = queryStringsArray.join('&');
  return '?' + queryString;
}