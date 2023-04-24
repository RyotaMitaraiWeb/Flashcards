import { HttpStatus } from '../../constants/httpstatus';
import { useLoadingStore } from '../../stores/loading/loading';
import type { IRequest, IResponse, method } from '../../types/util/request';

/**
 * This is a generic function to make requests to servers. It takes care of attaching needed headers
 * and conditionally attaching the body to the request. This will also temporarily set the loading
 * store's ``status`` to ``true`` (which reverts back to ``false`` after the response is parsed successfully
 * or returns ``undefined``)
 * @param method 
 * @param url 
 * @param body 
 * @returns 
 */
async function request<T>(method: method, url: string, body?: any): Promise<IResponse<T>> {
  const headers: HeadersInit = {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    'Access-Control-Allow-Origin': '*',
  };

  const request: IRequest = {
    headers,
    method,
  };

  if (body !== undefined && body !== null) {
    request.body = JSON.stringify(body);
    headers['Content-Type'] = 'application/json';
  }

  const loading = useLoadingStore();
  loading.startLoading();

  const res = await fetch(url, request);
  let data: T | undefined = undefined;

  if (res.status !== HttpStatus.NO_CONTENT) {
    data = await res.json() as T;
  }

  loading.stopLoading();

  return { res, data } as IResponse<T>;
}

/**
 * Makes a ``GET`` request to the specified URL. ``T`` specifies the expected data type of the
 * response body. The JWT
 * 
 * **Note:** ``data`` is undefined if the status code is 204. This method does not expose a request
 * body, as GET requests cannot have bodies by specification.
 * @param url 
 * @returns A promise that resolves to an ``IResponse`` object of type ``T``.
 */
export function get<T>(url: string): Promise<IResponse<T>> {
  return request<T>('GET', url);
}

/**
  * Makes a ``POST`` request to the specified URL. If ``body`` is different from ``undefined``
  * or ``null``, it will be attached to the request.
  * ``T`` specifies the expected data type of the
 * response body.
 * 
 * **Note:** ``data`` is undefined if the status code is 204.
 * @param url 
 * @param body 
 * @returns A promise that resolves to an ``IResponse`` object of type ``T``.
 */
export function post<T>(url: string, body?: any): Promise<IResponse<T>> {
  return request<T>('POST', url, body);
}

/**
  * Makes a ``PUT`` request to the specified URL. If ``body`` is different from ``undefined``
  * or ``null``, it will be attached to the request.
  * ``T`` specifies the expected data type of the
 * response body.
 * 
 * **Note:** ``data`` is undefined if the status code is 204.
 * @param url 
 * @param body 
 * @returns A promise that resolves to an ``IResponse`` object of type ``T``. 
 */
export function put<T>(url: string, body?: any): Promise<IResponse<T>> {
  return request<T>('PUT', url, body);
}

/**
 * Makes a ``DELETE`` request to the specified URL. ``T`` specifies the expected data type of the
 * response body.
 * 
 * **Note:** ``data`` is undefined if the status code is 204. This method does not expose a request
 * body, as DELETE requests cannot have bodies by specification.
 * @param url 
 * @returns A promise that resolves to an ``IResponse`` object of type ``T``.
 */
export function del<T>(url: string): Promise<IResponse<T>> {
  return request<T>('DELETE', url);
}