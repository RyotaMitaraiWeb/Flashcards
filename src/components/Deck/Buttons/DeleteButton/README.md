# DeleteButton

## Usage

```vue
<DeleteButton :id="4"></DeleteButton>
```

### Props

```typescript
interface IDeleteButton {
  id: number;
}
```

Renders a `v-btn` which sends a DELETE request to `/decks/{id}` upon a click. The following redirects are applied:

- For status code 204, the user is redirected to the home page.
- For status code 401, the user is redirected to the login page.
- For status code 404, the user is redirected to the 404 page.
- In any other case (e.g. 403, network failures), the user is redirected to the home page.

If the loading store's status is set to `true`, the button will be disabled.
