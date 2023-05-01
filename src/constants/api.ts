const root = (import.meta.env.VITE_API_URL as string) || '';
const accounts = `${root}/accounts`;
const decks = `${root}/decks`;
const bookmarks = `${root}/bookmarks`;

export const api = Object.freeze({
  root,
  endpoints: {
    accounts: {
      register: `${accounts}/register`,
      login: `${accounts}/login`,
      logout: `${accounts}/logout`,
      session: `${accounts}/session`,
      usernameExists: (username: string) => `${accounts}/username/${username}`,
    },
    decks: {
      root: `${decks}`,
      create: `${decks}`,
      delete: (id: string | number) => `${decks}/${id}`,
      id: (id: string | number) => `${decks}/${id}`,
      edit: (id: string | number) => `${decks}/${id}`,
      own: `${decks}/own`,
      all: `${decks}/all`,
      search: (title: string) => `${decks}/search?title=${title}`,
    },
    bookmarks: {
      root: `${bookmarks}`,
      add: (id: string | number) => `${bookmarks}/${id}`,
      remove: (id: string | number) => `${bookmarks}/${id}`,
      saved: `${bookmarks}`
    },
  },
});
