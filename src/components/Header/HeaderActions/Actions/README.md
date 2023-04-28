# LinkButton

## Usage
```vue
<LinkButton to="/some-page" icon="mdi-home">Some text here</LinkButton>
```

### Props
```typescript
interface ILinkButton {
  to: string;
  icon: string;
}
```

Renders a ``<v-btn>`` wrapped in a ``<RouterLink>`` that leads to the page provided through the ``to`` prop. The ``<v-btn>`` is rendered as a ``<span>`` tag. The text value of the hyperlink is provided through the default slot.

# SettingsButton

## Usage
```vue
<SettingsButton></SettingsButton>
```

Renders a ``<v-btn>`` wrapped in a ``<RouterLink>`` that leads to the ``/account/settings`` page. The ``<v-btn>`` is rendered as a ``<span>`. The button consists of a gear icon and a tooltip that activates upon hover.
