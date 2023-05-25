# BasicData

## Usage

```vue
<BasicData @update-title="funcForTitleEmit" @update-description="funcForDescEmit"></BasicData>
```

### Props

```typescript
interface IBasicData {
  title?: string;
  description?: string;
}
```

Renders fields for inputting a deck's title and description. Every time the title field is updated, this component will emit an `updateTitle` event, while updating the description field will cause the component to emit an `updateDescription` event. In both cases, the value of the fields will be passed to the emit. This can be used to track the values from a parent component.

Passing `title` and `description` can happen in the context of editing the deck where the initial values are already known.
