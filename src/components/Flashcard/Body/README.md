# FlashcardBody
## Usage
```vue
<FlashcardList content="some content for the side" bold bigText></FlashcardList>
```

### Props
```typescript
interface IFlashcardBody {
  content: string;
  bold?: boolean;
  bigText?: boolean;
}
```

Renders a ``v-card`` component that represents the white/black part of the card (the colored "handle" is ``<FlashcardHead>``). ``content`` represents the text to be displayed (typically the front or back side). Passing ``bold`` will bold the text, this is typically used to bold the front side to differentiate it from the back side. ``bigText`` will make the font size ``24pt`` for most viewports, ``12pt`` starting from 650px and less, and ``10pt`` starting 360px or less. In addition, ``bigText`` sets the ``line-height`` to ``1.05``. The ``bigText`` directive is typically used in studying sessions.

The width and height of this component can be configured by targetting the ``flashcard-body`` class, e.g.:

```css
.flashcard-body {
  width: 500px;
  height: 500px;
}
```

This component does not come with any width or height pre-configured.