import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { useLoadingStore } from './loading';
import type { ILoadingState } from '../../types/store/store';

describe('userStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Initializes state successfully', () => {
    const store = useLoadingStore();

    const loading: ILoadingState = store.loading;

    expect(loading).toEqual<ILoadingState>({
      status: false,
    });
  });

  it('startLoading works', () => {
    const store = useLoadingStore();

    store.startLoading();

    const loading: ILoadingState = store.loading;

    expect(loading).toEqual<ILoadingState>({
      status: true,
    });
  });

  it('stopLoading works', () => {
    const store = useLoadingStore();

    store.startLoading();
    store.stopLoading();

    const loading: ILoadingState = store.loading;

    expect(loading).toEqual<ILoadingState>({
      status: false,
    });
  });
});
