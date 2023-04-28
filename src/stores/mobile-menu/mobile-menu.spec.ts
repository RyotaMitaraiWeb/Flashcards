import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest';
import { useMenuStore } from './mobile-menu';
import type { IMenuState } from '../../types/store/store';

describe('userStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Initializes state successfully', () => {
    const store = useMenuStore();

    const menu: IMenuState = store.menu;

    expect(menu).toEqual<IMenuState>({
      open: false,
    });
  });

  it('open works', () => {
    const store = useMenuStore();
    store.open();

    const menu: IMenuState = store.menu;

    expect(menu).toEqual<IMenuState>({
      open: true,
    });
  });

  it('close works', () => {
    const store = useMenuStore();
    store.open();
    store.close();
    
    const menu: IMenuState = store.menu;

    expect(menu).toEqual<IMenuState>({
      open: false,
    });
  });
});