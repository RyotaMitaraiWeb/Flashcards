# BasicInfo

## Usage

```vue
<DeckActions :deck={ /* insert deck data */}></DeckActions>
```

### Props

```typescript
interface DeckActions {
  deck: IDeck;
}
```

Renders a `v-card` with several action buttons. What action buttons are rendered depend on the user's ownership and authentication status. The follow action buttons can be rendered:

- **Start Studying**: This button is rendered for all users (including guests). Clicking the button emits the `start` event (this emit is delegated to `DeckActions` and is not emitted directly from the button).
- **Bookmark**: clicking this button will save the deck for the currently logged in user. It is rendered for logged in users that have not bookmarked the deck and are not its author.
- **Remove Bookmark**: clicking this button will remove the bookmark for the current user. It is rendered for logged in users that have bookmarked the deck and are not its author.
- **Edit / Delete**: Those buttons are rendered only for the creator of the deck. Clicking the Edit button will take the user to the deck's edit page. Clicking the delete button will send a `DELETE` request for the given deck.

Successfully bookmarking / removing a bookmark will also update which bookmark button is rendered. No button comes with a pre-configured width or height, so this can be controlled from the parent component.

For more information on what events are emitted when clicking some of the buttons,check each button's documentation
