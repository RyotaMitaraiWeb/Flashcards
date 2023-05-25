# Stores

Holds all Pinia states.

## user

```typescript
interface IUserState {
  id: number;
  username: string;
}
```

This state contains information about the current user. `id` and `username` are 0 and an empty string, respectively, when the user is not authenticated. This state can be used to determine whether the user is logged in, as well as check if the user is the creator of a particular deck.

### Actions

```typescript
function setUser(data: IUserState);
```

```typescript
function restartUser();
```

`restartUser()` sets `id` to `0` and username to an empty string.

```typescript
interface ILoadingState {
  status: boolean;
}
```

This state contains information about whether something is loading at the moment and you want encourage the user to wait. The `request` function automatically sets `status` to `true` this while waiting for the request to resolve (and reverts it back to `false` after resolving it). This state can be used to display a loading icon or a different element that indicates that something is loading and the user should wait.

### Actions

```typescript
function startLoading();
```

```typescript
function stopLoading();
```

```typescript
interface IMenuState {
  open: boolean;
}
```

This state contains information about whether the mobile menu is open.

### Actions

```typescript
function open();
```

```typescript
function close();
```

```typescript
interface ISnackbarState {
  open: boolean;
  status: snackbarStatus;
  text: string | string[];
}
```

This state contains information about whether the snackbar is open and how to display it.

### Actions

```typescript
function open(text: string | string[], status: snackbarStatus);

type snackbarStatus = 'primary' | 'success' | 'info' | 'error' | 'warning';
```

```typescript
function close();
```

**Note:** `close()` only sets `open` to `false` and does not modify the other properties in any way.
