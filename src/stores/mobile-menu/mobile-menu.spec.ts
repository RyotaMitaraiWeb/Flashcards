import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest';
import { useMobileMenuStore } from './mobile-menu';
import type { IMobileMenuState } from '../../types/store/store';

describe('userStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Initializes state successfully', () => {
    const store = useMobileMenuStore();

    const menu: IMobileMenuState = store.menu;

    expect(menu).toEqual<IMobileMenuState>({
      open: false,
    });
  });

  it('open works', () => {
    const store = useMobileMenuStore();
    store.open();

    const menu: IMobileMenuState = store.menu;

    expect(menu).toEqual<IMobileMenuState>({
      open: true,
    });
  });

  it('close works', () => {
    const store = useMobileMenuStore();
    store.open();
    store.close();
    
    const menu: IMobileMenuState = store.menu;

    expect(menu).toEqual<IMobileMenuState>({
      open: false,
    });
  });
});