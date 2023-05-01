# Header
## Usage
```vue
<Submit :disabled="false" prepend-icon="mdi-login-variant" color="primary">
  Some Text
</Submit>
```

### Props
```typescript
interface ISubmit {
  icon?: string;
  color?: string;
  disabled?: boolean;
}
```

Renders a ``<v-btn>`` of type ``submit``. The button automatically disables itself if the loading store's ``status`` is set to ``true``. In addition, you can explicitly pass a boolean value to disable the button; an example of this is to signal that the user's input is invalid and thus the button should not be clickable.

By default, the button renders with text "Submit", but you can pass a slot to change the text.