import type { palette } from '../types/store/store';

export const colors: colorValues = Object.freeze({
  deepPurple: '#5E35B1',
  indigo: '#3949AB',
  blue: '#1E88E5',
  green: '#43A047',
  blueGrey: '#78909C',
  red: '#E53935',
  pink: '#EC407A',
});

type colorValues = Record<palette, string>;