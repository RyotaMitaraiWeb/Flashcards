# dateFormatter

A function that returns an appropriate message about when a deck was created and last updated

```typescript
function dateFormatter(createdAt: string, updatedAt: string): string;
```

Returns `Created on: {createdAt}` if the deck has never been updated (aka both `createdAt` and `updatedAt` are the same value) or `Created on: {createdAt}. Last updated on: {updatedAt}` otherwise. All dates are shortened via `toShortDate`.
