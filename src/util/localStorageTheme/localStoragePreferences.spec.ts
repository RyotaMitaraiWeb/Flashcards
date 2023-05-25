import { describe, it, expect, vi } from 'vitest';
import { allowedPreferences } from '../../constants/allowedPreferences';
import { getLocalStoragePalette, getLocalStorageTheme } from './localStoragePreferences';

describe('localStoragePreferences', () => {
  describe('getLocalStorageTheme', () => {
    it('Returns local storage value if it is valid', () => {
      localStorage.setItem('theme', allowedPreferences.themes[1]);

      const theme = getLocalStorageTheme();
      expect(theme).toBe(allowedPreferences.themes[1]);
    });

    it('Returns the first valid theme if localStorage returns null', () => {
      localStorage.removeItem('theme');

      const theme = getLocalStorageTheme();
      expect(theme).toBe(allowedPreferences.themes[0]);
    });

    it('Returns the first valid theme if localStorage returns an invalid theme', () => {
      localStorage.setItem('theme', 'a');

      const theme = getLocalStorageTheme();
      expect(theme).toBe(allowedPreferences.themes[0]);
    });
  });

  describe('getLocalStoragePalette', () => {
    it('Returns local storage value if it is valid', () => {
      localStorage.setItem('palette', allowedPreferences.palettes[1]);

      const palette = getLocalStoragePalette();
      expect(palette).toBe(allowedPreferences.palettes[1]);
    });

    it('Returns the first valid palette if localStorage returns null', () => {
      localStorage.removeItem('palette');

      const palette = getLocalStoragePalette();
      expect(palette).toBe(allowedPreferences.palettes[0]);
    });

    it('Returns the first valid palette if localStorage returns an invalid palette', () => {
      localStorage.setItem('palette', 'a');

      const palette = getLocalStoragePalette();
      expect(palette).toBe(allowedPreferences.palettes[0]);
    });
  });
});
