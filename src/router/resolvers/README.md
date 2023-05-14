# Resolvers
Resolvers are functions that are used to fetch data before loading a route.

Data that is successfully fetched is typically attached to the route object's ``meta`` property.

## getDeck
```typescript
async function getDeck(to: RouteLocation)
```

**Eligible routes:** this resolver can be used on any route with an ``:id`` route variable.

Sends a GET request to ``/decks/{id}`` in an attempt to retrieve the deck with the given id. If the server responds with status code 200, the response body will be attached to ``route.meta`` as ``deck`` and the function will return ``true``. For status code 404, the function will return a named route object for a 404 page. If the request throws an error (e.g. due to a network error), the function will return a named route object for the home page. In all unsuccessful cases, a snackbar will be displayed with the appropriate message.

## getCatalogueDecks
```typescript
async function getCatalogueDecks(route: RouteLocation)
```

**Eligible routes:** this resolver should be used on routes that have an equivalent server endpoint (for example, if used on the route ``/decks/all``, the server should have such an endpoint too). Examples of valid routes (when using the provided server for this project) are ``/decks/all``, ``/decks/search``, and ``/decks/own``. For routes that require credentials to be accessed, you need to use some of the available guards in combination with this resolver.

Sends a GET request to the same endpoint as ``route``'s ``fullPath`` (for example, if the full path is ``/decks/all?page=2``, the function will send a GET request to  the server's ``/decks/all?page=2`` endpoint). If the request is successful, it will attach the result to ``route.meta.decks``, otherwise, displays an error snackbar and redirects to the home page.

## getBookmarkedDecks
```typescript
async function getBookmarkedDecks(route: RouteLocation, _from: RouteLocation, next: NavigationGuardNext): Promise<void>
```

**Eligible routes:** this resolver can be used on any route, though keep in mind that ``getCatalogueDecks`` attaches the result to the same meta property as ``getBookmarkedDecks``, so it's not recommended to use both together. This resolver does not perform any redirections, so if used on an authorized route, it needs to be combined with some of the guards.

If the user is logged in (aka their ``id`` is different from 0), this resolver will perform a GET request to ``/bookmarks`` and, if the status code is OK, it will attach the result to ``route.meta.decks``. For other status codes, nothing is attached. If the request throws an error, it will also display a snackbar to indicate an error.

If the user is not logged in, the resolver does not make a request at all.

Regardless of the outcome, the resolver always resolves and moves on to the next function in the pipeline.

**Note:** the ``_from`` argument is there only because Vue Router passes ``next`` as the third argument, but it is otherwise unused.