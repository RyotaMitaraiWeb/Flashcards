import { allowedPreferences } from '../../constants/allowedPreferences';
import type { palette, theme } from '../../types/store/store';

/**
 * Retrieves the current theme on application load. If the theme is invalid, returns the first valid
 * one.
 * @returns value of ``theme`` in ``localStorage`` or the first valid theme if ``theme`` is invalid.
 */
export function getLocalStorageTheme() {
  const theme = localStorage.getItem('theme') || '';
  if (!allowedPreferences.themes.includes(theme as theme)) {
    return allowedPreferences.themes[0];
  }

  return theme as theme;
}

/**
 * Retrieves the current palette color on application load.
 * If the palette color is invalid, returns the first valid one.
 * @returns value of ``palette`` in ``localStorage`` or the first valid palette color if ``palette``
 * is invalid.
 */
export function getLocalStoragePalette() {
  const palette = localStorage.getItem('palette') || '';
  if (!allowedPreferences.palettes.includes(palette as palette)) {
    return allowedPreferences.palettes[0];
  }

  return palette as palette;
}
