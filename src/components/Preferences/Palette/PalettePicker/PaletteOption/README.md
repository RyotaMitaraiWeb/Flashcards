# PaletteOption

## Usage

```vue
<PaletteOption value="indigo"></PaletteOption>
```

### Props

```typescript
interface IPaletteOption {
  value: palette;
}
```

Renders a radio button that, upon being checked, changes the primary color (for both dark and light mode). The radio button comes with a label that is invisible to normal users, but visible to users with assistive technologies. The text (``h2``) is rendered as ``aria-hidden``. Both the text and the label are automatically generated based on the value.

Each "option" also comes with a small color block that indicates the color of the option. Clicking any part of the whole component (e.g. the color block or the ``h2``) will emulate a check. The currently selected option is marked with a golden text and a yellow border over the color block. The selected option is also automatically selected upon page load, based on the user's settings in ``localStorage``.

**Note:** each option has an attribute ``name`` that equals ``palette``.