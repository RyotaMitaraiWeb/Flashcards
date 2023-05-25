# CatalogueSorter

## Usage

```vue
<CatalogueSorter sortBy="title" order="asc" endpoint="/decks/all"></CatalogueSorter>
```

### Props

```typescript
interface ICatalogueSorter {
  sortBy?: string;
  order?: string;
  endpoint: string;
}
```

Renders a `v-select` which helps update a catalogue of decks when interacted.

The valid sort categories (passed to `sortBy`) are `title`, `createdAt`, and `updatedAt`. The valid order values are `asc` and `desc`.

The sorter maintains its own array of "select items", from which it derives each option. All "items" are formatted like the following object:

```typescript
{
  displayName: 'Title', // this is how the option is displayed to the user
  sort: 'title-desc' // this is the value of the option. This is used by <v-select> to maintain the currently selected option. The formatting for this is {sortCategory}-{order} (all letters are lowercased)
}
```

the `sortBy` and `order` props instruct the sorter which option to select during the initial load. They default to `title` and `asc`, respectively, if they are not passed. If invalid props are passed, the sorter will select the first option by default.

When the `v-select` is updated, the URL's `sortBy` and `order` queries will be updated with the new values (this also updates the history state, thus this will be counted as a separate navigation). A parent component can watch for changes in the route to fetch new data.

Note that queries are updated even if the navigation fails (e.g. due to a network failure)

The sorter is disabled when the loading store's `status` is set to `true`.
