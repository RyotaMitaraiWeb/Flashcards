# FlashcardList

## Usage

```vue
<FlashcardList flashcards="[]"></FlashcardList>
```

### Props

```typescript
interface IFlashcardsList {
  flashcards: IFlashcard[];
}
```

Renders a `<ListToggler>` with an attached v-model and a preview of the deck's flashcards. A pair of `FlashcardBody` components is created for each element in `flashcards`. A divider is also rendered between each pair (no divider is rendered is there is only one pair). Clicking the `<ListToggler>` will toggle the flashcards' visibility.
