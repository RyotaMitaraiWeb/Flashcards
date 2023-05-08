# ListToggler
## Usage
```vue
<ListToggler v-model="someModelValue"></ListToggler>
```

### props
```typescript
interface IListToggler {
  modelValue: boolean; // this is passed as v-model
}
```

Renders a ``v-btn`` which can toggle the value of the passed v-model state upon a click. Clicking the button will cause it to toggle its icon and text.

## Limitations
For testing purposes, render the ``ListTogglerTestWrapper`` component, which maintains its own model state.