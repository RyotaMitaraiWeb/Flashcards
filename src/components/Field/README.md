# Field
## Usage
```vue
<Field
  label="Username"
  name="username"
  hint="Validation rules and so on"
  type="text"
  counter="15"
  :rules="[someValidator1, someValidator2]"
  display-max-counter
  v-model="fieldIsValid"
>
</Field>
```

### Props
```typescript
interface IField {
  label: string;
  name: string;
  rules?: ValidatorFunction[];
  hint: string;
  type: 'text' | 'password';
  counter?: number;
  displayMaxCounter?: boolean;
  modelValue: boolean;
}
```

Renders a ``<v-text-field>`` to which you can easily add functional validation.

``rules`` is an array of validator functions. Each validator function returns ``true`` for valid values and an error message (string) if validation fails. The validator functions can be asynchronous if needed. The field will update itself with all error messages that have been returned (if such have been returned). You can attach a boolean ``v-model`` to track whether the field's value is valid or not; this is useful if you want to disable the form's submit button, for example

If no array of rules are provided, no validations happen and the field will never emit ``update:modelValue``.

``counter`` tracks the amount of characters the user has inputted. Passing a numeric value will also display the maximum amount of characters that the field allows if ``displayMaxCounter`` is also passed.