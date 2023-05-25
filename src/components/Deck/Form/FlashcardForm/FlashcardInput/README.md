# FlashcardInput

## Usage

```vue
<FlashcardInput content="some content" side="front"></FlashcardInput>
```

### Props

```typescript
interface IFlashcardInput {
  content: string;
  side: 'front' | 'back';
}
```

Renders a form representing a side of a flashcard. This form consists of:

- A `<h2>` that indicates which side this form represents
- A `<v-card>` consisting of:
- - A `<FlashcardHead>`.
- - A `<v-card-text>` that contains a `textarea`. The textarea has bolded text when `side` is `front`. The textarea also receives focus when `<FlashcardHead>` or the outer parts of `<v-card-text>` (aka the areas not covered by the textarea) are clicked.
- A counter that shows how many characters the side has (out of the maximum allowed)
- An error message that asks the user to fill the form when the textarea has no value. The error message has a red color that matches the user's current theme. The user cannot input any new characters if the textarea has reached its max length.

The form does not update its input value by itself. Instead, every time the user tries to input something, the component emits an `updateContent` event. The emit passes an object of type `IUpdateContent` as an argument, with the `side` property matching the `side` prop. Thus, a parent component should pass an updated `content` when `updateContent` is emitted in order to update the form's field. Check the example below to see this in action.

### Example in parent component

```vue
<script setup lang="ts">
import { ref } from 'vue';

const content = ref('');

function updateContent(update: IUpdateContent) {
  content.value = update.value;
}
</script>

<template>
  <FlashcardInput side="front" :content="content" @update-content="updateContent"></FlashcardInput>
</template>
```

With this, every time the user inputs something in the form, the parent component will listen for the `updateContent` event, update its own ref variable, and pass that to the component, updating its state.

## Limitations

When testing the component, render the `FlashcardInputTestWrapper` so that the textarea's value is updated.
