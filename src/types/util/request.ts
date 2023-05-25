export type method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface IRequest {
  headers: HeadersInit;
  method: method;
  body?: any;
}

/**
 * ```typescript
 * interface IResponse<T> {
    res: Response,
    data: T | undefined,
  }
 * ```
 * This represents an object containing the response and its body from an HTTP request. ``data``
 * should be ``undefined`` when the response status code is 204 (as there is no response body to be
 * parse).
 */
export interface IResponse<T> {
  res: Response;
  data: T | undefined;
}
