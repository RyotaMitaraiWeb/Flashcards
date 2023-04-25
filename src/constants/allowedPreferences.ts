import type { palette, theme } from '../types/store/store';

export const allowedPreferences = Object.freeze({
  themes: ['light', 'dark'] as readonly theme[],
  palettes: ['deepPurple', 'blue', 'blueGrey', 'green', 'indigo', 'pink', 'red'] as readonly palette[],
});