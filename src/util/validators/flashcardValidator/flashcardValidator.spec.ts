import { validationRules } from '../../../constants/validationRules';
import { flashcardValidator } from './flashcardValidator';
import { describe, it, expect } from 'vitest';

const { sideMinLength, sideMaxLength } = validationRules.flashcard;

describe('flashcardValidator', () => {
  describe('minSideLength', () => {
    it('Returns true if validation passes', () => {
      const result = flashcardValidator.minSideLength('a'.repeat(sideMinLength));
      expect(result).toBe(true);
    });

    it('Returns an error message if validation fails', () => {
      const result = flashcardValidator.minSideLength('a'.repeat(sideMinLength - 1));
      expect(typeof result).toBe('string');
    });
  });

  describe('maxSideLength', () => {
    it('Returns true if validation passes', () => {
      const result = flashcardValidator.maxSideLength('a'.repeat(sideMaxLength));
      expect(result).toBe(true);
    });

    it('Returns an error message if validation fails', () => {
      const result = flashcardValidator.maxSideLength('a'.repeat(sideMaxLength + 1));
      expect(typeof result).toBe('string');
    });
  });
});