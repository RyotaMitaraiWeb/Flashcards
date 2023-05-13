# CatalogueDeck

## Usage
```vue
<CatalogueDeck :deck="{/* insert deck object here */}"></CatalogueDeck>
```

### Props
```typescript
interface ICatalogueDeckItem {
  deck: ICatalogueDeck;
}
```

Renders a ``v-card`` representing information about a single deck within a catalogue. Catalogues include search results, list of bookmarked decks, list of decks created by the user, and the entire catalogue of decks.

The card will show when the deck was last updated only if it has ever been updated (aka ``createdAt`` and ``updatedAt`` are different).