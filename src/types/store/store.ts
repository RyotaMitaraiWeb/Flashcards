/**
 * ```typescript
 * interface IUserState {
    id: number;
    username: string;
}
 * ```
 * Holds information about the user state.
 */
export interface IUserState {
  id: number;
  username: string;
}

/**
 * ```typescript
 * interface ILoadingState {
    status: boolean;
}
 * ```
 * Holds information about whether a request is being made. This can be used to display a loading bar
 * or similar.
 */
export interface ILoadingState {
  status: boolean;
}

/**
 * ```typescript
 * interface IMenuState {
    open: boolean;
}
 * ```
 * Holds information about whether the navigation menu is open or not.
 */
export interface IMenuState {
  open: boolean;
}

export type palette = 'deepPurple' | 'indigo' | 'blue' | 'green' | 'blueGrey' | 'red' | 'pink';
export type theme = 'light' | 'dark';

/**
 * ```typescript
 * interface ISnackbarState {
    open: boolean;
    status: snackbarStatus;
    text: string | string[];
}
 * ```
 * Holds information about whether the snackbar is open and how to display it.
 */
export interface ISnackbarState {
  open: boolean;
  status: snackbarStatus;
  text: string | string[];
}

export type snackbarStatus = 'primary' | 'success' | 'info' | 'error' | 'warning';
