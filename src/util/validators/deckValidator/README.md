# deckValidator

A validator for decks during creation or editing.

## Methods

```typescript
function minTitleLength(value: string = ''): string | boolean;
```

Validates if the title has the required minimum amount of characters.

```typescript
function maxTitleLength(value: string = ''): string | boolean;
```

Validates if the title does not exceed the allowed maximum amount of characters. Because the default value is an empty string, calling this method without an argument will always return `true`.

```typescript
function maxDescriptionLength(value: string = ''): string | boolean;
```

Validates if the description does not exceed the allowed maximum amount of characters. Because the default value is an empty string, calling this method without an argument will always return `true`.

**Note:** because the description is optional, there's no "min" equivalent.

```typescript
function minFlashcardsAmount(value: number = 0): string | boolean;
```

Validates whether `value` is below the minimum amount of flashcards required.
