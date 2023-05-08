# Resolvers
Resolvers are functions that are used to fetch data before loading a route.

Data that is successfully fetched is typically attached to the route object's ``meta`` property.

## getDeck
```typescript
async function getDeck(to: RouteLocation)
```

**Eligible routes:** this resolver can be used on any route with an ``:id`` route variable.

Sends a GET request to ``/decks/{id}`` in an attempt to retrieve the deck with the given id. If the server responds with status code 200, the response body will be attached to ``route.meta`` as ``deck`` and the function will return ``true``. For status code 404, the function will return a named route object for a 404 page. If the request throws an error (e.g. due to a network error), the function will return a named route object for the home page. In all unsuccessful cases, a snackbar will be displayed with the appropriate message.
