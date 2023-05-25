# Snackbar

## Usage

```vue
<Snackbar></Snackbar>
```

Renders a `v-snackbar` component temporarily. In order to activate this component, you need to dispatch the snackbar store's `open` action. You can pass to the action either a string or an array of strings as a message; each string is rendered as a separate `<p>`. The snackbar will automatically close itself after a certain time, which can be controlled with the `VITE_SNACKBAR_TIMEOUT` environment variable (expressed in milliseconds). Furthermore, the snackbar provides a "Close" button, which will dispatch the `close` action, effectively closing the snackbar.

**Note:** it is recommended to inject this component in a root component like `App.vue`.
