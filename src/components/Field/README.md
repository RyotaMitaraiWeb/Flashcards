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
  v-model="fieldVariable"
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
  modelValue: string;
  textarea?: boolean;
}
```

Renders a `<v-text-field>` by default to which you can easily add functional validation. Passing the `textarea` prop will turn this into a `v-textarea`, which also grows in height when needed.

`rules` is an array of validator functions. Each validator function returns `true` for valid values and an error message (string) if validation fails. The validator functions can be asynchronous if needed. The field will update itself with all error messages that have been returned (if such have been returned). After all validations have been called, the field will emit `validateField`, passing a boolean property that indicates whether the input is valid or not.
If no array of rules are provided, no validations happen and the field will never emit `validateField`.

In addition to the above, you can pass a ref string as `v-model` to track the value from a parent component.

`counter` tracks the amount of characters the user has inputted. Passing a numeric value will also display the maximum amount of characters that the field allows if `displayMaxCounter` is also passed.
