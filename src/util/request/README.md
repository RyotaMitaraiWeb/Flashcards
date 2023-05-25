# request

A function that simplifies `fetch` requests.

## Base function

```typescript
async function request<T>(method: method, url: string, body?: any): Promise<IResponse<T>>;
```

This is the base function upon which all other request functions are built. The function takes care of the following tasks:

- attaches all necessary headers to the request as follows:
- - `Authorization` is set to `Bearer [jwt]`, where `[jwt]` is the value of `accessToken` in `localStorage` (or an empty string if `accessToken` does not exist).
- - `'Access-Control-Allow-Origin'` is set to `*`
- - if `body` is different from `undefined` or `null`, `Content-Type` is set to `application/json`, otherwise, it is not attached at all.
- Stringifies `body` in a JSON string if it is not `undefined` or `null`.
- Temporarily sets the `loadingStore`'s status to `true`, this can be used to display a loading icon or other element while waiting for the request to resolve. After the request is resolved, the state is set back to `false`.

Once the request is sent, the function will retrieve both the response object and the response body. If the status code is 204, the response body will be `undefined`, otherwise, it will be typed as `T`. The function then returns an object containing the response and the response body.

This function is not publicly exposed, but rather, you can use some of the publicly exposed ones that call this function with the appropriate `method`.

```typescript
function get<T>(url: string): Promise<IResponse<T>>;
function post<T>(url: string, body?: any): Promise<IResponse<T>>;
function put<T>(url: string, body?: any): Promise<IResponse<T>>;
function del<T>(url: string): Promise<IResponse<T>>;
```

Those functions will call the base function while passing the corresponding `method` argument. Note that `GET` and `DELETE` requests cannot have bodies per the HTTP specification, thus you cannot provide request bodies for them.
