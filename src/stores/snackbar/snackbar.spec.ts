import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest';
import { useSnackbarStore } from './snackbar';
import type { ISnackbarState } from '../../types/store/store';

describe('snackbarStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Initializes state successfully', () => {
    const store = useSnackbarStore();

    const snackbar: ISnackbarState = store.snackbar;

    expect(snackbar).toEqual<ISnackbarState>({
      open: false,
      status: 'info',
      text: ''
    });
  });

  it('open works', () => {
    const store = useSnackbarStore();
    store.open('a', 'error');

    const snackbar: ISnackbarState = store.snackbar;

    expect(snackbar).toEqual<ISnackbarState>({
      open: true,
      status: 'error',
      text: 'a',
    });

    store.open(['a'], 'error');
    const snackbar2: ISnackbarState = store.snackbar;
    
    expect(snackbar2).toEqual<ISnackbarState>({
      open: true,
      status: 'error',
      text: ['a'],
    });
  });

  it('close works', () => {
    const store = useSnackbarStore();
    store.open('a', 'error');
    store.close();
    
    const snackbar: ISnackbarState = store.snackbar;

    expect(snackbar).toEqual<ISnackbarState>({
      open: false,
      status: 'error',
      text: 'a',
    });
  });
});