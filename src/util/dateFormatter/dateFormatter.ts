import { toShortDate } from '../toShortDate/toShortDate';

/**
 * Returns information about when the deck was created and, if applicable, last updated.
 * 
 * This calls ``toShortDate`` to format the result dates.
 
 * @param createdAt 
 * @param updatedAt 
 * @returns A formatted message about creation and update dates.
 */
export function dateFormatter(createdAt: string, updatedAt: string) {
  const shortCreatedAt = toShortDate(createdAt);

  if (createdAt === updatedAt) {
    return `Created on: ${shortCreatedAt}`;
  }

  const shortUpdatedAt = toShortDate(updatedAt);
  return `Created on: ${shortCreatedAt}. Last updated on: ${shortUpdatedAt}`;
}