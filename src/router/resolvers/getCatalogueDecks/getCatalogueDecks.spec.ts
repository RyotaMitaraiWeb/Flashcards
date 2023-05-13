import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import * as requestFunctions from '../../../util/request/request';
import { HttpStatus } from '../../../constants/httpstatus';
import { setActivePinia, createPinia } from 'pinia';
import { useSnackbarStore } from '../../../stores/snackbar/snackbar';
import { getCatalogueDecks } from './getCatalogueDecks';

const route = {
  meta: {},
  matched: [],
  fullPath: '',
  query: {},
  hash: '',
  redirectedFrom: undefined,
  name: undefined,
  path: '',
  params: {},
}

describe('getDeck resolver', () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    const snackbar = useSnackbarStore();
    vi.spyOn(snackbar, 'open').mockImplementation(() => { });
  });

  it('Returns true and attaches result to route.meta.decks if successful', async () => {
    vi.spyOn(requestFunctions, 'get').mockImplementation(async () => {
      const res = new Response(undefined, {
        status: HttpStatus.OK,
      });

      const data = 1;
      return { res, data };
    });

    const result = await getCatalogueDecks(route);
    expect(result).toBe(true);
    expect(route.meta).toEqual({
      decks: 1,
    });
  });

  it('Returns a redirect object to home page if response status code is not ok', async () => {
    vi.spyOn(requestFunctions, 'get').mockImplementation(async () => {
      const res = new Response(undefined, {
        status: HttpStatus.UNAUTHORIZED,
      });

      const data = 1;
      return { res, data };
    });

    const result = await getCatalogueDecks(route);
    expect(result).toEqual({ name: 'home' });
  });

  it('Returns a redirect object to home page if get request throws an error', async () => {
    vi.spyOn(requestFunctions, 'get').mockImplementation(async () => {
      throw new Error();
    });

    const result = await getCatalogueDecks(route);
    expect(result).toEqual({ name: 'home' });
  });

  afterEach(() => {
    route.meta = {};
  });
});