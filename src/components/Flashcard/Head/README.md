# FlashcardHead
## Usage
```vue
<FlashcardHead></FlashcardHead>
```

Renders a ``v-sheet`` whose background color matches the theme's primary color. This component is typically placed above a ``FlashcardBody``.

The width and height of the component can be controlled with CSS in other components. This can be done by targetting the ``flashcard-head`` class, e.g.:

```css
.flashcard-head {
  width: 200px;
  height: 30px;
}
```

The component does not come with any width or height pre-configured.