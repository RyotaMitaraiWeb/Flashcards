# Menu

## Usage

```vue
<Menu></Menu>
```

Renders a "temporary" `<v-navigation-drawer>` which is to be used in the header. The menu is tied to the menu store's `open` property. However, Vuetify's built-in methods for closing the drawer menu (e.g. clicking the overlay or navigating) will also successfully close the menu (and also mutate the state directly).

The drawer opens on the left side of the screen.

The rendered `<v-navigation-drawer>` consists of a `<SearchField>` and a `<v-list>` consisting of various `<MenuItem>`s and a `<CloseButton>`. The `MenuItem`s are hyperlinks to other pages, in this case, the Home page, the All decks page, and the settings page. Clicking the `CloseButton` will close the menu.

## Limitations

`<Menu>` can only be used within a `<v-layout>` tag. When unit testing this component, you can render the component from `MenuTestWrapper.test.vue`. This test component consists of a `<v-layout>` tag that wraps the `<Menu>`, thereby letting you test the base component without having to configure anything.
