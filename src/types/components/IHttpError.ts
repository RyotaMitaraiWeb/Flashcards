import type { HttpStatus } from '../../constants/httpstatus';

/**
 * ```typescript
 * interface IHttpError {
    message: string[];
    statusCode: HttpStatus;
    error: string;
}
 * ```
 * Represents the format in which HTTP errors are formatted from the server.
 */
export interface IHttpError {
  message: string[];
  statusCode: HttpStatus;
  error: string;
}