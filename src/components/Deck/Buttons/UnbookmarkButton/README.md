# BasicInfo

## Usage

```vue
<UnbookmarkButton :id="4"></UnbookmarkButton>
```

### Props

```typescript
interface IUnbookmarkButton {
  id: number;
}
```

Renders a `v-btn` which removes the user's bookmark from the deck.

When clicking the button, a `DELETE` request is sent to `/bookmarks/{id}`. If the server responds with status code 204, the button will emit an `unbookmark` event. No matter the response, a snackbar will be displayed with the appropriate message.

If the loading store's status is set to `true`, the button will be disabled.
