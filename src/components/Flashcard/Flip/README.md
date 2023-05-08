# FlipCard
## Usage
```html
<FlipCard v-model="someFlipState">
  <template v-slot:front>
  <!-- content of the front side -->
  </template>
  <template>
  <!-- content on the back side-->
  </template>
</FlipCard>
```

### Props
```typescript
interface IFlipCard {
  modelValue: boolean; // this is passed as v-model
}
```

This is a component which renders the ``front`` and ``back`` slots and flips between them like a card upon clicking the content. When the model state is ``false``, the content is flipped to the front side and vice versa. The flip is animated.