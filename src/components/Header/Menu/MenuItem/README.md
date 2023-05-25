# MenuItem

## Usage

```vue
<MenuItem title="Some Title" value="A unique identifier" icon="mdi-home" to="/some-page"></MenuItem>
```

### Props

```typescript
interface IMenuItem {
  title: string;
  to: string;
  value: string;
  icon: string;
}
```

Renders a `v-list-item` which is to be used within the navigation drawer menu. `icon` typically starts with `mdi-` as this is what the project uses. `value` is the value passed to `v-list-item`'s own `value` property, which is used for selection. `title` refers to the content of the list item. `to` is the path to a given page, with the component rendering the hyperlink as a `RouterLink` (thus enabling client-side navigation).
