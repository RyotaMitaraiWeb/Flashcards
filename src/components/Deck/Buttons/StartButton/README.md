# StartButton
## Usage
```vue
<StartButton></StartButton>
```

Renders a ``v-btn`` for starting a session. The button does not emit any events by itself, but a parent component can control this, e.g.:

```vue
<template>
  <StartButton @click="$emit('someEvent')"></StartButton>
</template>
```
