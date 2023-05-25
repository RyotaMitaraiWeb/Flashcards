import { validationRules } from '../../../constants/validationRules';
import { deckValidator } from './deckValidator';
import { expect, it, describe } from 'vitest';

const { title, description, flashcards } = validationRules.deck;

describe('deckValidator', () => {
  describe('minTitleLength', () => {
    it('Returns true if validation passes', () => {
      const result = deckValidator.minTitleLength('a'.repeat(title.minLength));
      expect(result).toBe(true);
    });

    it('Returns an error message if validation fails', () => {
      const result = deckValidator.minTitleLength('a'.repeat(title.minLength - 1));
      expect(typeof result).toBe('string');
    });
  });

  describe('maxTitleLength', () => {
    it('Returns true if validation passes', () => {
      const result = deckValidator.maxTitleLength('a'.repeat(title.maxLength));
      expect(result).toBe(true);
    });

    it('Returns an error message if validation fails', () => {
      const result = deckValidator.maxTitleLength('a'.repeat(title.maxLength + 1));
      expect(typeof result).toBe('string');
    });
  });

  describe('maxDescriptionLength', () => {
    it('Returns true if validation passes', () => {
      const result = deckValidator.maxDescriptionLength('a'.repeat(description.maxLength));
      expect(result).toBe(true);
    });

    it('Returns an error message if validation fails', () => {
      const result = deckValidator.maxDescriptionLength('a'.repeat(description.maxLength + 1));
      expect(typeof result).toBe('string');
    });
  });

  describe('minFlashcardsAmount', () => {
    it('Returns true if validation passes', () => {
      const result = deckValidator.minFlashcardsAmount(flashcards.minimumFlashcards);
      expect(result).toBe(true);
    });

    it('Returns an error message if validation fails', () => {
      const result = deckValidator.minFlashcardsAmount(flashcards.minimumFlashcards - 1);
      expect(typeof result).toBe('string');
    });
  });
});
