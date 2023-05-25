# BasicInfo

## Usage

```vue
<BasicInfo :deck={ /* insert deck data */}></BasicInfo>
```

### Props

```typescript
interface DeckDetails {
  deck: IDeck;
}
```

Renders a `v-card` with the following structure:

- a title that matches the deck's title
- a subtitle that shows when the deck was created and last updated. If the deck has never been edited, only the creation date will be shown. The dates are shortened to format `dd.mm.yyyy`.
- a text content representing the deck's description
