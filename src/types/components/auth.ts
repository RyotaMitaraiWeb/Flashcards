import type { IUserState } from '../store/store';

/**
 * ```typescript
 * interface ICreatedSession {
    user: IUserState;
    token: string;
}
 * ```
 * Represents the response body of a successful register, login, or session request.
 */
export interface ICreatedSession {
  user: IUserState;
  token: string;
}
