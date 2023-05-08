import { describe, it, expect } from 'vitest';
import { toShortDate } from './toShortDate';
describe('toShortDate', () => {
  it('Converts into the correct format successfully', () => {
    const dateString = '2023-05-03T08:58:28.830Z';

    const date = toShortDate(dateString);

    expect(date).toBe('03.05.2023');
  });
});