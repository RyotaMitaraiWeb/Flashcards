# formatQueriesToString
A function to turn a query object into a string that can be appended to URLs.

```typescript
function formatQueriesToString(query: LocationQuery): string
```

``query`` is an object consisting of key-value pairs. Each key-value pair is converted to a string resembling ``{key}={value}``. Each pair is separated from the others with an ampersand (&). The end result is prepended by a question mark (?).

## Examples:

```typescript
const query: LocationQuery = {
  page: 1,
  sortBy: 'title',
  order: 'asc',
};
```

this object will be mapped to ``?page=1&sortBy=title&order=asc``.

```typescript
const query: LocationQuery = {
  page: 1,
};
```

this object will be mapped to ``?page=1``.

```typescript
const query: LocationQuery = {};
```

An empty object simply results in ``?`` being returned
