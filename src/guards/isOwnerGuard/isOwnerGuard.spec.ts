import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { useUserStore } from '../../stores/user/user';
import { IsOwnerGuard } from './isOwnerGuard';
import type { RouteLocation } from 'vue-router';
import type { IDeck } from '../../types/components/decks';

const deck: IDeck = {
  title: 'some title',
  description: '',
  bookmarked: false,
  id: 1,
  authorId: 1,
  createdAt: '2023-04-22T09:00:36.607Z',
  updatedAt: '2023-04-22T09:00:36.607Z',
  flashcards: [{
    front: 'a',
    back: 'a',
  }],
}

const route: RouteLocation = {
  matched: [],
  fullPath: '',
  query: {},
  hash: '',
  name: undefined,
  path: '',
  params: {},
  redirectedFrom: undefined,
  meta: {
    deck
  }
}

describe('IsOwnerGuard', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Returns true if authorId and user\'s id match', () => {
    const userStore = useUserStore();
    userStore.setUser({ username: 'ryota1', id: 1 });

    const result = IsOwnerGuard(route);
    expect(result).toBe(true);
  });

  it('Returns a redirect object to home if IDs do not match', () => {
    const userStore = useUserStore();
    userStore.setUser({ username: 'ryota1', id: 2 });

    const result = IsOwnerGuard(route);
    expect(result).toEqual({ name: 'home' });
  });

  it('Returns a redirect object to 404 if IDs do not match', () => {
    const newRoute = { ...route };
    newRoute.meta = { deck: undefined };
    const userStore = useUserStore();
    userStore.setUser({ username: 'ryota1', id: 1 });

    const result = IsOwnerGuard(newRoute);
    expect(result).toEqual({ name: '404' });
  });
});