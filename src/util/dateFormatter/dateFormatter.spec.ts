import { describe, expect, it } from 'vitest';
import { dateFormatter } from './dateFormatter';

const createdAt = '2023-05-02T15:33:39.690Z';

describe('dateFormatter', () => {
  it('Returns only created date when arguments are the same', () => {
    const result = dateFormatter(createdAt, createdAt);
    expect(result).toBe('Created on: 02.05.2023');
  });

  it('Returns created and updated date when arguments are different', () => {
    const updatedAt = '2023-05-07T12:55:32.928Z';
    const result = dateFormatter(createdAt, updatedAt);
    expect(result).toBe('Created on: 02.05.2023. Last updated on: 07.05.2023');
  });
});
