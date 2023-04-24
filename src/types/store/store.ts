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