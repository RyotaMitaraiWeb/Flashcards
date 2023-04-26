# Stores
Holds all Pinia states.

## user
```typescript
interface IUserState {
  id: number;
  username: string;
}
```

This state contains information about the current user. ``id`` and ``username`` are 0 and an empty string, respectively, when the user is not authenticated. This state can be used to determine whether the user is logged in, as well as check if the user is the creator of a particular deck.


```typescript
interface ILoadingState {
 status: boolean;
}
```
This state contains information about whether something is loading at the moment and you want encourage the user to wait. The ``request`` function automatically sets ``status`` to ``true`` this while waiting for the request to resolve (and reverts it back to ``false`` after resolving it). This state can be used to display a loading icon or a different element that indicates that something is loading and the user should wait.

```typescript
interface IMobileMenu {
 open: boolean;
}
```
This state contains information about whether the mobile menu is open.