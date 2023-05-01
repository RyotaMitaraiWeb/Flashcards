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
  @change-valid-status="functionToListenToEmit"
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
}
```

Renders a ``<v-text-field>`` to which you can easily add functional validation.

``rules`` is an array of validator functions. Each validator function returns ``true`` for valid values and an error message (string) if validation fails. The validator functions can be asynchronous if needed. The field will update itself with all error messages that have been returned (if such have been returned). In addition, the field will emit a ``changeValidStatus`` event that returns ``true`` if there are no validation errors and ``false`` otherwise. This emit can be used to disable a submit button, for example. Validations for a particular field run every time the user changes that field's value.

If no array of rules are provided, no validations happen and the field will never emit ``changeValidStatus``.

``counter`` tracks the amount of characters the user has inputted. Passing a numeric value will also display the maximum amount of characters that the field allows if ``displayMaxCounter`` is also passed.