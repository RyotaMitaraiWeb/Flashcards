# CataloguePaginator

## Usage
```vue
<CataloguePaginator :page="1" :total="25" endpoint="/decks/all"></CataloguePaginator>
```

### Props
```typescript
interface IPaginator {
  page?: number;
  total: number;
  endpoint: string;
}
```

Renders a ``v-pagination`` that helps with updating a catalogue of decks when interacted with.

``page`` refers to the page button that has to be selected upon load. Upon interaction, the focus will change to the currently selected page. If this prop is not passed, ``page`` defaults to ``1``.

``total`` represents the total amount of decks that the server can theoritically retrieve for this request. The paginator uses this to generate the length of the paginator. The server associated with this project serves six decks per page (therefore, the amount of pages will be ``total / 6`` rounded to the bigger number).

When interacting with the paginator, the URL's ``page`` query will be updated with the new page's number (this also updates the history state, thus this will be counted as a separate navigation). A parent component can watch for changes in the route to fetch new data.

Note that queries are updated even if the navigation fails (e.g. due to a network failure)

The paginator is disabled when the loading store's ``status`` is set to ``true``.