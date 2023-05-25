import { validationRules } from '../../../constants/validationRules';
import { validationErrorMessages } from '../../../constants/validationErrorMessages';
import { get } from '../../request/request';
import { api } from '../../../constants/api';
import type { ValidatorFunction } from '../../../types/util/validators';

const accountRules = validationRules.account;
const accountMessages = validationErrorMessages.account;

export const accountValidator = {
  minUsernameLength(value: string = ''): string | boolean {
    return value.length >= accountRules.username.minLength || accountMessages.username.isTooShort;
  },
  /**
   * If no argument is provided, returns ``true``
   */
  maxUsernameLength(value: string = ''): string | boolean {
    return value.length <= accountRules.username.maxLength || accountMessages.username.isTooLong;
  },

  minPasswordLength(value: string = ''): string | boolean {
    return value.length >= accountRules.password.minLength || accountMessages.password.isTooShort;
  },

  async uniqueUsername(value: string = 'a'): Promise<string | boolean> {
    try {
      const { res } = await get(api.endpoints.accounts.usernameExists(value));
      return !res.ok || accountMessages.username.alreadyExists;
    } catch {
      return 'An error occurred, please try again later';
    }
  },

  alphanumericUsername(value: string = ''): string | boolean {
    return /^[a-z0-9]+$/gim.test(value) || accountMessages.username.isNotAlphanumeric;
  },
};
