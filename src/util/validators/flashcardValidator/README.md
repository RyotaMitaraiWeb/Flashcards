# flashcardValidator

A validator for flashcard content. All methods should be called for both sides separately.

## Methods

```typescript
function minSideLength(value: string = ''): string | boolean;
```

Validates if the given side has the required minimum amount of characters.

```typescript
function maxSideLength(value: string = ''): string | boolean;
```

Validates if the given side does not exceed the allowed maximum amount of characters. Because the default value is an empty string, calling this method without an argument will always return `true`.
