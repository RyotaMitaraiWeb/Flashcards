import { validationErrorMessages } from '../../../constants/validationErrorMessages';
import { validationRules } from '../../../constants/validationRules';

const deckRules = validationRules.deck;
const deckMessages = validationErrorMessages.deck;

export const deckValidator = {
  minTitleLength(value: string = ''): string | boolean {
    return value.length >= deckRules.title.minLength || deckMessages.title.isTooShort;
  },
  maxTitleLength(value: string = ''): string | boolean {
    return value.length <= deckRules.title.maxLength || deckMessages.title.isTooLong;
  },
  maxDescriptionLength(value: string = ''): string | boolean {
    return value.length <= deckRules.description.maxLength || deckMessages.description.isTooLong;
  },
  minFlashcardsAmount(value: number = 0): string | boolean {
    return (
      value >= deckRules.flashcards.minimumFlashcards || deckMessages.flashcards.notEnoughFlashcards
    );
  },
};
