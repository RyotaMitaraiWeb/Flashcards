import { describe, it, expect, vi, beforeEach } from 'vitest';
import { validationRules } from '../../../constants/validationRules';
import { accountValidator } from './accountValidator';
import { HttpStatus } from '../../../constants/httpstatus';
import { setActivePinia, createPinia } from 'pinia';

const { username, password } = validationRules.account;

describe('accountValidator', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  
  describe('minUsernameLength', () => {
    it('Returns true if validation passes', () => {
      const input = 'a'.repeat(username.minLength);
      
      const result = accountValidator.minUsernameLength(input);
      expect(result).toBe(true);
    });

    it('Returns an error message if validation fails', () => {
      const input = 'a'.repeat(username.minLength - 1);

      const result = accountValidator.minUsernameLength(input);
      expect(typeof result).toBe('string');

      const emptyResult = accountValidator.minUsernameLength();
      expect(typeof emptyResult).toBe('string');
    });
  });

  describe('maxUsernameLength', () => {
    it('Returns true if validation passes', () => {
      const input = 'a'.repeat(username.maxLength);
      
      const result = accountValidator.maxUsernameLength(input);
      expect(result).toBe(true);

      const emptyResult = accountValidator.maxUsernameLength();
      expect(emptyResult).toBe(true);
    });

    it('Returns an error message if validation fails', () => {
      const input = 'a'.repeat(username.maxLength + 1);

      const result = accountValidator.maxUsernameLength(input);
      expect(typeof result).toBe('string');
    });
  });

  describe('minPasswordLength', () => {
    it('Returns true if validation passes', () => {
      const input = 'a'.repeat(password.minLength);
      
      const result = accountValidator.minPasswordLength(input);
      expect(result).toBe(true);
    });

    it('Returns an error message if validation fails', () => {
      const input = 'a'.repeat(password.minLength - 1);

      const result = accountValidator.minPasswordLength(input);
      expect(typeof result).toBe('string');

      const emptyResult = accountValidator.minPasswordLength();
      expect(typeof emptyResult).toBe('string');
    });
  });

  describe('uniqueUsername', () => {
    it('Returns true if validation passes', async () => {
      vi.spyOn(global, 'fetch').mockImplementation(async () => {
        const res = new Response(undefined, {
          status: HttpStatus.NOT_FOUND,
        });

        vi.spyOn(res, 'json').mockImplementation(async () => {});

        return res;
      });

      const input = 'a';
      const result = await accountValidator.uniqueUsername(input);
      expect(result).toBe(true);
    });

    it('Returns an error message if validation fails', async () => {
      vi.spyOn(global, 'fetch').mockImplementation(async () => {
        const res = new Response(undefined, {
          status: HttpStatus.OK,
        });

        vi.spyOn(res, 'json').mockImplementation(async () => {});

        return res;
      });

      const input = 'a';
      const result = await accountValidator.uniqueUsername(input);
      expect(typeof result).toBe('string');

      const emptyResult = await accountValidator.uniqueUsername();
      expect(typeof emptyResult).toBe('string');

      vi.clearAllMocks();

      vi.spyOn(global, 'fetch').mockImplementation(async () => {
        throw new Error();
      });

      const errorResult = await accountValidator.uniqueUsername('a');
      expect(typeof errorResult).toBe('string');
    });
  });

  describe('alphanumericUsername', () => {
    it('Returns true if validation passes', () => {
      const input = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
      
      const result = accountValidator.alphanumericUsername(input);
      expect(result).toBe(true);
    });

    it('Returns an error message if validation fails', () => {
      const result1 = accountValidator.alphanumericUsername();
      expect(typeof result1).toBe('string');

      const result2 = accountValidator.alphanumericUsername('_ryota');
      expect(typeof result2).toBe('string');

      const result3 = accountValidator.alphanumericUsername('ryota_');
      expect(typeof result3).toBe('string');

      const result4 = accountValidator.alphanumericUsername('ry_ota');
      expect(typeof result4).toBe('string');
    });
  });
});