import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import * as requestFunctions from '../../../util/request/request';
import { HttpStatus } from '../../../constants/httpstatus';
import { setActivePinia, createPinia } from 'pinia';
import { useSnackbarStore } from '../../../stores/snackbar/snackbar';
import { getBookmarkedDecks } from './getBookmarkedDecks';
import { useUserStore } from '../../../stores/user/user';

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

  it('Attaches result to route.meta.decks if server responds with 200', async () => {
    const user = useUserStore();
    user.setUser({
      id: 1,
      username: 'ryota1',
    });

    vi.spyOn(requestFunctions, 'get').mockImplementation(async () => {
      const res = new Response(undefined, {
        status: HttpStatus.OK,
      });

      const data = 1;
      return { res, data };
    });

    await getBookmarkedDecks(route, route, () => {});
    expect(route.meta).toEqual({
      decks: 1,
    });
  });

  it('Does not attach the result to route.meta if the user\'s id is 0', async () => {
    const user = useUserStore();
    user.restartUser();

    vi.spyOn(requestFunctions, 'get').mockImplementation(async () => {
      const res = new Response(undefined, {
        status: HttpStatus.OK,
      });

      const data = 1;
      return { res, data };
    });

    await getBookmarkedDecks(route, route, () => {});
    expect(route.meta).toEqual({});
  });

  it('Does not attach the result to route.meta if the user\'s id is different from 0, but does not successfuly retrieve the result', async () => {
    const user = useUserStore();
    user.setUser({
      id: 1,
      username: 'ryota1',
    });

    vi.spyOn(requestFunctions, 'get').mockImplementation(async () => {
      const res = new Response(undefined, {
        status: HttpStatus.UNAUTHORIZED,
      });

      const data = 1;
      return { res, data };
    });

    await getBookmarkedDecks(route, route, () => {});
    expect(route.meta).toEqual({});
  });

  it('Does not attach the result to route.meta if the user\'s id is different from 0, but the request throws', async () => {
    const user = useUserStore();
    user.setUser({
      id: 1,
      username: 'ryota1',
    });

    vi.spyOn(requestFunctions, 'get').mockImplementation(async () => {
      throw new Error();
    });

    await getBookmarkedDecks(route, route, () => {});
    expect(route.meta).toEqual({});
  });

  afterEach(() => {
    route.meta = {};
  });
});