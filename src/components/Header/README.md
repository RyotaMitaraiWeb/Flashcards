# Header
## Usage
```vue
<Header></Header>
```

Renders a ``<v-app-bar>`` whose color matches the current Vuetify primary color theme. The header consists of a ``<NavigationButton>`` (which opens ``<Menu>`` upon a click), an icon link to ``Settings`` and a ``<HeaderActions>``. The header also displays the user's ``username`` from the user store if the user's ``id`` is different from 0 (aka they are logged in).

While app bar is normally ``fixed`` in its position, this component overrides its position to ``relative``. In addition, the header has a height of 64px. In case it overflows, it will also become scrollable.

## Limitations
``<Header>`` can only be used within a ``<v-layout>`` tag. When unit testing this component, you can render the component from ``HeaderTestWrapper.test.vue``. This test component consists of a ``<v-layout>`` tag that wraps the ``<Header>``, thereby letting you test the base component without having to configure anything.