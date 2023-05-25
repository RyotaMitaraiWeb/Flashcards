import { validationErrorMessages } from '../../../constants/validationErrorMessages';
import { validationRules } from '../../../constants/validationRules';

const flashcardRules = validationRules.flashcard;
const flashcardMessages = validationErrorMessages.flashcard;

export const flashcardValidator = {
  minSideLength(value: string): string | boolean {
    return value.length >= flashcardRules.sideMinLength || flashcardMessages.sideIsTooShort;
  },
  maxSideLength(value: string): string | boolean {
    return value.length <= flashcardRules.sideMaxLength || flashcardMessages.sideIsTooLong;
  },
};
