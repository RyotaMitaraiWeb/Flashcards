import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import * as requestFunctions from '../../../util/request/request';
import { HttpStatus } from '../../../constants/httpstatus';
import { getDeck } from './getDeck';
import { setActivePinia, createPinia } from 'pinia';
import { useSnackbarStore } from '../../../stores/snackbar/snackbar';

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
  });
  
  it('returns true if a deck is retrieved successfully and attaches the result', async () => {
    vi.spyOn(requestFunctions, 'get').mockImplementation(async () => {
      const res = new Response(undefined, {
        status: HttpStatus.OK,
      });

      vi.spyOn(res, 'json').mockImplementation(async () => ({ prop: {} }));
      const data = await res.json();      
      return { res, data };
    });

    const snackbar = useSnackbarStore();
    vi.spyOn(snackbar, 'open').mockImplementation(() => {});

    const result = await getDeck(route);
    expect(result).toBe(true);
    expect(route.meta).toEqual({
      deck: {
        prop: {},
      },
    });

    expect(snackbar.open).not.toHaveBeenCalled();
  });

  it('Returns a redirect object to 404 if deck does not exist', async () => {
    vi.spyOn(requestFunctions, 'get').mockImplementation(async () => {
      const res = new Response(undefined, {
        status: HttpStatus.NOT_FOUND,
      });

      vi.spyOn(res, 'json').mockImplementation(async () => ({ prop: {} }));
      const data = await res.json();      
      return { res, data };
    });

    const snackbar = useSnackbarStore();
    vi.spyOn(snackbar, 'open').mockImplementation(() => {});

    const result = await getDeck(route);
    expect(result).toEqual({
      name: '404',
    });

    expect(snackbar.open).toHaveBeenCalled();
  });

  it('Returns a redirect to home page for a network failure', async () => {
    vi.spyOn(requestFunctions, 'get').mockImplementation(async () => {
      throw new Error();
    });

    const snackbar = useSnackbarStore();
    vi.spyOn(snackbar, 'open').mockImplementation(() => {});

    const result = await getDeck(route);
    expect(result).toEqual({
      name: 'home',
    });

    expect(snackbar.open).toHaveBeenCalled();
  });

  afterEach(() => {
    route.meta = {};
  });
});